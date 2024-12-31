import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "../DynamicRoutes/table.css"


const Table = () => {
    let {id} = useParams()
    const [table, setTable] = useState({})
    const [order, setOrder] =  useState({})

    const navigate = useNavigate()
    useEffect(() => {
      
        const fetchData = async () => {
          try {
            const res = await axios.get(`http://127.0.0.1:8000/api/Tables?id=${id}`);
            setTable(res.data); // Set the state with the data
          } catch (error) {
            console.error("Error fetching table data:", error);
          }
        };
    
        fetchData(); // Call the async function
      }, [id]); 


    const handleDelete = async ()=>{
      try {
        let deleted = await axios.delete("http://127.0.0.1:8000/api/Order/",{
          params: { id: table.order_id },
        })
        
      } catch (error) {
        console.log(error)
      }

      const res = await axios.patch(`http://127.0.0.1:8000/api/Tables/`,{
        "id": id,
        "data":{
          "has_customer":false,
          "order_id": -1
        }
      
      })
      navigate(0)
    }
    
    
 
    return (
      <div className="container">
        <div className="card">
          <h2 className="title">Table {table.id}</h2>

          {table.order_id>0 ?<>
            <div className="info-row">
            <span className="label">ID:</span>
            <span className="value">{table.id}</span>
          </div>
            <div className="info-row">
            <span className="label">Has Customer:</span>
            <span className="value">{table.has_customer ? "Yes" : "No"}</span>
          </div>
          <div className="info-row">
            <span className="label">Table Number:</span>
            <span className="value">{table.table_number}</span>
          </div>
            <div className="info-row">
            <span className="label">Order number</span>
            <span className="value">{table.order_id}</span>
            </div>
          </> : <button className="card-button" onClick={()=>navigate(`/Order/${table.id}`)

          }>{table.order_id>0? "Add Item": "New Order"}</button>}
          
        </div>
        <div className="button-container">
          {table.order_id>0 &&
          <>
          <button className="button" onClick={()=>navigate(`/Old/${table.id}`)}>Change Order</button>
           <button className="button" onClick={()=>navigate(`/Bill/${table.order_id}`)}> Check</button>
            <button className="button" onClick={handleDelete}>Delete Order</button>
          </>}
          
        </div>
      </div>
    );
  };
  
  
export default Table
