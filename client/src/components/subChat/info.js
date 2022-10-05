import "./sub.css"
import { useState } from "react";
function Info() {
    const [ava,setAva]=useState(JSON.parse(localStorage.getItem("userInfo")))
  return (
    <div className="info">
        <div  style={{ backgroundImage: `url(${ava.pic})`} } className="info_ava"></div>
        <div className="info_name">{ava.name}</div>
        
    </div>
  
  );
}

export default Info;