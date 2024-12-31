import React, { use } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components_style/home.css"; // Import the CSS file

const Home = () => {
  const [button, HandleButton] = useState()
  const navigate = useNavigate()
  
  return (
    <div className="homepage">
      <div className="button-container">
        <div className="Homebutton" onClick={()=>navigate('/Clock')}>Clock</div>
        <div className="Homebutton" onClick={()=>navigate('/Tables')}>Orders</div>
        <div className="Homebutton" onClick={()=>navigate('/Billing')}>Billings</div>
        <div className="Homebutton">Home</div>
      </div>
    </div>
  );
};

export default Home;
