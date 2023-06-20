import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import './myagency.css'
import logo from '../../Assets/tugonlogo.png'
import { Link } from "react-router-dom";
const Header = (props)=>{
    const [agency_id, setAgencyId] = useState(props.agency_id)
    const [profile, setProfile] = useState({
        user_id: "",
        user_photo: ""
    });
    const user_id = localStorage.getItem("user_id");

    async function GetUserProfile(){
        await axios({
            method: "GET",
            url:`http://localhost:8000/api/user_profile/${props.user_id}/`,
        }).catch((err)=>{
            console.log(err);
        }).then((resp) => {
            setProfile(resp.data);
            console.log(resp);
        })
    }
    useEffect(()=>{
        GetUserProfile();
    },[])

    return(
        <>
            <div key={agency_id} class="tb">
                <div class="td" id="logo">
                    <Link to = '/'><img src={logo}/></Link>
                </div>
                <div class="td" id="search-form">
                    <form  method="get" action="#">
                        <input className="input" type="text" placeholder="Search Agency"/>
                        <button className="button" type="submit"><i class="material-icons">search</i></button>
                    </form>
                </div>
                <div class="td" id="f-name-l"><span>{profile.user_name}</span></div>
                <div class="td" id="i-links">
                    <div class="tb">
                        <div class="td">
                            <a href="userprofile.html" id="p-link">
                                <img src={`http://localhost:8000/${profile.user_photo}`}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;