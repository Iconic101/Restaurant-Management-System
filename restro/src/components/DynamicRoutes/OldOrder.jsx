import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Order.css"

const Order = () => {
  let {table} = useParams()
  const navigate = useNavigate()

  const [Item, setItem] = useState([])
  const [activeTab, setActiveTab] = useState("apetizer");
  const [cart, setCart] = useState([]);
  const [oldItems, setoldItems] = useState([])
  const [orderId, setOrderId] = useState(0)


  const itemTypes = ["apetizer", "Main", "dessert", "topping", "drink"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Tres = await axios.get(`http://127.0.0.1:8000/api/Tables?id=${table}`);
        const res = await axios.get(`http://127.0.0.1:8000/api/items`);
        setItem(res.data);
  
        const order = await axios.get(`http://127.0.0.1:8000/api/Order?id=${Tres.data.order_id}`);
       
        setoldItems(order.data.ordered_items);
        setOrderId(order.data.id)
        console.log(oldItems)
        const oldcart = order.data.ordered_items.map(itemId =>
          res.data.find(item => item.id === itemId)
        ).filter(Boolean); // Ensure no undefined items are added
        setCart(oldcart);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };
  
    fetchData();
  }, [table])



  const filteredItems = Item.filter(item => item.type === activeTab);

  const addToCart = item => setCart([...cart, item]);
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

  const PlaceOrder = async ()=>{
    console.log(items)
    let res = await axios.patch(`http://127.0.0.1:8000/api/Order/`,{
        "id":orderId,
        "change":{
          "ordered_items": items,
          "bill_amount": totalPrice
        }
  })
  console.log("Order created successfully:", res.data.id);


  navigate('/Tables')
  }


  
  let items =[]
  if (cart.length>0){
    
     cart.forEach(item=>{
      items.push(item.id)
     })
  }
  return (
    <div className="item-tabs-container">
      <div className="tabs">
        {itemTypes.map(type => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`tab-button ${activeTab === type ? "active" : ""}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="item-list">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="item">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price}</span>
              <button className="add-button" onClick={() => addToCart(item)}>
                Add
              </button>
            </div>
          ))
        ) : (
          <p className="no-items">No items available for this category.</p>
        )}
      </div>

      <div className="cart">
        <h3>Cart</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-items">Your cart is empty.</p>
        )}
        <div className="cart-total">Total: ${totalPrice}</div>
        <button className="add-button" onClick={PlaceOrder}>
                Update Order
              </button>

      </div>
    </div>
  );
};




export default Order
