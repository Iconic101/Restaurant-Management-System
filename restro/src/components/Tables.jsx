import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../Components_style/Tables.css"
import { Link } from "react-router-dom";


const Tables = () => {

    const [tables, SetTables]  = useState([])

    useEffect(()=>{
      let getTables = async ()=>{
        let res = await axios.get("http://127.0.0.1:8000/api/Tables/")
        SetTables(res.data)
      }
      getTables()
    },[])
      
    console.log(tables)

  



  return (
<>
    <div className="restaurant-layout">
      {tables.map((table) => (
        <div
          key={table.id}
          className={`table-block ${table.has_customer ? "occupied" : "available"}`}
        >
          <div className="table-label">
          <Link to={`/Tables/${table.id}`}>Table{table.id}</Link>
          </div>
          <div className="table-seats">Seats: {table.seats}</div>
        </div>
      ))}
    </div>
</>
  );
};

export default Tables;



