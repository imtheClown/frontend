import React, { useState } from 'react' 
import "../styles/Card2.css"
import agencylogo from "../assets/AGENCY_LOGO.png";
function Card() 
{
    const [title,setTitle] = useState("Activity Log");
    const [agency1_Name,setName] = useState("PSA REGION VI");
    const [agency2_Name,setName2] = useState("DEPED REGION VI");
    const [agency1_reviewSubject,setSubject] = useState("Good Service 10/10");
    const [agency2_reviewSubject,setSubject2] = useState("What a Great Staff! Wow!");
    const [agency1_review,setReview1] = useState("Wow! It has bidet. It is good. Caters to customer needs. Has good");
    const [agency2_review,setReview2] = useState("Good service. It has good staff. They attend to your needs and make sure that you do not experience customer inconvenience");
    const [agency1_date,setDate1] = useState(" June 3, 2023");
    const [agency2_date,setDate2] = useState(" June 3, 2023");
  return (
    <div className= 'popularRev_container'>
        <div className ="popularReviews-upper"> 
            <h3 className='popularReviews-title'> { title } </h3>
        </div>
       
        <div className = 'popularRev-Agency1-container'>
            <div className = 'agency1Logo-container'>
                <img  src = {agencylogo}/>
            </div>
            <h3 className='agency1_Name'> { agency1_Name } </h3>
            <h3 className='agency1_reviewSubject'> { agency1_reviewSubject } </h3>
            <p className='agency1_review'> { agency1_review }</p>
            <p className='agency1_date'> { agency1_date }</p>
        </div>
        
        <div className = 'popularRev-Agency2-container'>
            <div className = 'agency2Logo-container'>
            <img  src = {agencylogo}/>
        </div>
            <h3 className='agency2_Name'> { agency2_Name } </h3>
            <h3 className='agency2_reviewSubject'> { agency2_reviewSubject } </h3>
            <p className='agency2_review'> { agency2_review }</p>
            <p className='agency2_date'> { agency2_date }</p>
        </div>
        
    </div>
  )
}

export default Card
