import "../Components_style/billing.css"

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Billing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [orderedItems, setOrderedItems] = useState([]);
  const [tip, setTip] = useState(0);
  

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(`http://127.0.0.1:8000/api/Order?id=${id}`);
        const orderData = orderResponse.data;

        setOrder(orderData);
        setTip(parseFloat(orderData.tip) || 0);

        if (orderData.ordered_items.length > 0) {
          const itemsResponse = await axios.get('http://127.0.0.1:8000/api/items');
          const itemDetails = itemsResponse.data.filter(item =>
            orderData.ordered_items.includes(item.id)
          );
          setOrderedItems(itemDetails);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const settleCheck = async () => {
    try {
      const totalAmount = (parseFloat(order.bill_amount)*1.1 + parseFloat(tip)).toFixed(2);
    let res = await axios.patch(`http://127.0.0.1:8000/api/Order/`, {
        id: id,
        change: {
          is_settled: true,
          tip: tip.toFixed(2),
          total_amount: totalAmount,
        },
      });

    console.log(res.data)
     await axios.patch(`http://127.0.0.1:8000/api/Tables/`,{
      "id": order.table_number,
      "data":{
        "order_id":-1,
        "has_customer":false
      }
     })
      console.log("Order settled successfully.");
      navigate('/Tables');
    } catch (error) {
      console.error("Error settling the check:", error);
    }
  };

  if (!order) {
    return <div className="loading">Loading order details...</div>;
  }

  return (
    <div className="billing-container">
      <h2>Billing</h2>

      <div className="order-details">
        <p><strong>Table:</strong> {order.table_number}</p>
        <p><strong>Server:</strong> {order.server_name}</p>
        <p><strong>People:</strong> {order.people}</p>
      </div>

      <div className="ordered-items">
        <h3>Ordered Items</h3>
        {orderedItems.length > 0 ? (
          <ul>
            {orderedItems.map(item => (
              <li key={item.id} className="item-row">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-items">No items ordered.</p>
        )}
      </div>

      <div className="bill-summary">
        <p><strong>sub-total</strong> ${order.bill_amount}</p>
        <p><strong>Taxes& fees</strong> ${order.bill_amount*0.1}</p>
        <div className="tip-input">
          <label htmlFor="tip">Tip: </label>
          <input
            type="number"
            id="tip"
            value={tip}
            onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
            placeholder="Enter tip"
          />
        </div>
        <p><strong>Total:</strong> ${(parseFloat(order.bill_amount)*1.1 + parseFloat(tip)).toFixed(2)}</p>
      </div>

      <button className="settle-button" onClick={settleCheck}>Settle Check</button>
    </div>
  );
};

export default Billing;
