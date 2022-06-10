import React from "react";
import { useNavigate } from "react-router-dom"
import "./Homepage.css";
  
export default function Homepage(props) {
    
  const navigate = useNavigate();
    
  return (
    <div className="home-horizontal">
      <div className="home-vertical">
        <div className="home-title">BlueBook</div>
        <br/>
        <button onClick={()=>navigate("/login")}>Log In</button>
        <br/>
        <button onClick={()=>navigate("/signup")}>Sign Up</button>
      </div>
    </div>
  )
};
  