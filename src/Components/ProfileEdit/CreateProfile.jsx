import '../ProfileEdit/create.css';
import { useEffect, useState } from "react";
import axios from "axios";
import logo from '../Assets/tugonlogo.png';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';

const Profile = (props)=>{
    const [photo, setPhoto] = useState(null)
    const [intro, setIntro] = useState("")
    const [location, setLocation] = useState("")
    const navigate = useNavigate()
    async function editProfile(event){
        axios.defaults.xsrfCookieName = 'csrftoken'//tokens for csrf protocols
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"//tokens for csrf protocols
        await axios({
            method: "PUT",
            url: `http://localhost:8000/api/profile/edit/`,
            data: {
                user_id: sessionStorage.getItem("user_id"),
                user_photo: photo,
                introduction: intro,
                location: location
            },headers:{
                'content-type': 'multipart/form-data'//tells the api that the data send is from form thus enabling form/dataparsers
              }
        }).then(resp => {
            event.preventDefault()
            navigate("/profile")
        }).catch(err =>{
            alert("Failed to update info")
        })
    }

    function fileHandler(event){
        setPhoto(event.target.files[0]);
    }
    function introChange(event){
        setIntro(event.target.value)
    }
    function locationChange(event){
        setLocation(event.target.value)
    }
    function check(event){
        event.preventDefault()
        if(intro.length & location.length & photo){
            
        }
        editProfile(event)
    }


    return (
        <div className="wrapper">
            <div className="container main">
                <div className="row">
                    <div className="col-md-6 side-imagereg">
                    </div>
                    <div className="col-md-6 right">
                        <div className="input-box">
                            <div className="logo">
                                <img className='img' src={logo}alt=""></img>
                            </div>
                            <div className="header-title">
                                <header>Edit your Profile</header>
                                <p>Welcome to Tugon! Tell us more about yourself.</p>
                            </div>
                            {/*}
                            {
                                errorMessage.length > 0 &&
                                <div class="alert alert-danger myAlert ">
                                <i className="material-icons" style={{fontSize: 15 +"px", color:`rgb(169, 43, 43)` }}></i>
                                    <div className="error-message" id="message"><strong>Error!</strong>{errorMessage}</div> 
                                </div>
                            }*/}
                            <form className="input-field" onSubmit={check}>
                                <div className="prof-pic"></div>
                                <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={fileHandler}/>
                           
                            <div className="input-field">
                                <input value={intro} type="text" className="input" id="intro" required autoComplete="on" onChange ={introChange} name="intro" ></input>
                                <label htmlFor="intro">Introduction</label>
                            </div>
                            <div className="input-field">
                                <input value={location} type="text" className="input" id="loc" required autoComplete="on"onChange ={locationChange} name = 'location'></input>
                                <label htmlFor="location">Location</label>
                            </div>
                        
                            <div className="register">
                                <input id ='submitButton'type="submit" className="submit" value="Save Changes"></input>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;
