import React, { useState } from 'react' 
import "../styles/Card.css"
import profPic from "../assets/profPic.jpg";
import {MdLocationOn} from "react-icons/md";
function Card() 
{
    const [username,setName] = useState ("Demi Lovato");
    const [about_user, setAbout] = useState ("My mama told me when I was young We are all born superstars She rolled my hair and put my lipstick on. In the glass of her boudoir");
    const [job, setJob] = useState ("Iloilo City");
    

  return (
    <div className= 'aboutUser-Container'>
      <div className = 'upper-container'>
        <div className = 'userProfpic-image-container'>
            <img  src = {profPic}   />
        </div>
        <div className ="lower-container"> 
            <h3 className='username'> { username } </h3>
            <p className='about_user'> { about_user }</p>
            <div className='user-loc'>
               <MdLocationOn className='icon-loc2'/>
               <a href="https://www.google.com/maps/place/DepEd+Iloilo+City+SDO/">ILOILO</a>, <a href="https://www.google.com/maps/place/Philippines/">PHILIPPINES</a></div>
            </div>
            <button className="editProfButton">Edit Profile</button>
            
        </div>
        
      </div>
   
  )
}

export default Card
