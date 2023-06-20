import React, { useState } from 'react' 
import "../styles/Card3.css"
import profPic from "../assets/profPic.jpg";
import placeholder_agency from "../assets/placeholder_agency.png";
function Card3() 
{
    const [userReviewed,setReviewed] = useState("Agencies Reviewed");
    
    

  return (
    <div className= 'Card3'>

        <div className="historyUpper">
            <h3 className='userReviewed'> { userReviewed } </h3>
        </div>
        <div className="agency-list">
          <img src={placeholder_agency} alt="Sample photo"/> 
          <img src={placeholder_agency} alt="Sample photo"/> 
          <img src={placeholder_agency} alt="Sample photo"/> 
        </div>
        <div className="agency-list">
          <img src={placeholder_agency} alt="Sample photo"/> 
          <img src={placeholder_agency} alt="Sample photo"/> 
          <img src={placeholder_agency} alt="Sample photo"/> 
        </div>
    </div>
    
  )
}

export default Card3
