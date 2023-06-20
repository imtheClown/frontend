import React, { useState, useEffect } from 'react' 
import "../UserProfile/Card3.css"
import profPic from "./profPic.jpg";
import placeholder_agency from "./placeholder_agency.png";
import axios from 'axios';
function Card3() 
{
    const [userReviewed,setReviewed] = useState(null);
    async function getPics(){
      await axios({
        method: "GET",
        url: `http://localhost:8000/api/profile/get_pictures/${sessionStorage.getItem("user_id")}/`
      }).then(resp =>{
        if(resp){
          if(resp.data.length){
            setReviewed(resp.data)
          }
          else{
            setReviewed(null)
          }
        }
      })
    }
    useEffect(()=>{
      getPics()
    }, [])

  return (
    <div className= 'Card3'>

        <div className="historyUpper">
            <h3 className='userReviewed'> { userReviewed } </h3>
        </div>
        <div className='agency-list'>
          {userReviewed? userReviewed.map(item=>{
            return <img src={`http://localhost:8000/${item["logo"]}`}></img>
          }): <>No Reviewed Agencies Yet</> }
        </div>
    </div>
    
  )
}

export default Card3
