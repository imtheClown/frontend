import React, { useState, useEffect } from 'react' 
import "../UserProfile/Card.css"
import profPic from "./profPic.jpg";
import {MdLocationOn} from "react-icons/md";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Card(props) 
{
  const user_id = sessionStorage.getItem("user_id")
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
    const [username,setName] = useState ("Demi Lovato");
    const [about_user, setAbout] = useState ("My mama told me when I was young We are all born superstars She rolled my hair and put my lipstick on. In the glass of her boudoir");
    const [job, setJob] = useState ("Iloilo City");
  async function getProfile(){
    await axios({
      method: "GET",
      url: `http://localhost:8000/api/profile/get/${user_id}/`,
    }).then(resp => {
      if(resp){
        setProfile(resp.data)
      }
    })
  }
    
  return (
    <div className= 'aboutUser-Container'>
      <div className = 'upper-container'>
        <div className = 'userProfpic-image-container'>
            <img  src = {`http://localhost:8000/${profile["user_photo"]}`}   />
        </div>
        <div className ="lower-container"> 
            <h3 className='username'> { profile["user_name"] } </h3>
            <p className='about_user'> { profile["introduction"] }</p>
            <div className='user-loc'>
               <MdLocationOn className='icon-loc2'/>
               <a href="https://www.google.com/maps/place/DepEd+Iloilo+City+SDO/">{profile["location"]? profile["location"]: "Not Set"}</a>, <a href="https://www.google.com/maps/place/Philippines/">PHILIPPINES</a></div>
            </div>
            <button onClick={() => {navigate("/edit")}} className="editProfButton">Edit Profile</button>
            
        </div>
        
      </div>
   
  )
}

export default Card
