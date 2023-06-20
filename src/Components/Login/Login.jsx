import { useEffect, useState } from "react";
import axios from "axios";
import logo from '../Assets/Images/tugonlogo.png';
import './style-log.css';
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        email: localStorage.getItem('email'),
        password:'',
    })
    const [blank, setBlank] = useState({
        email: 1,
        password: 1
    })
    const [remember, setRemember] = useState(0);
    const [changed, setChanged] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");

    function checkBlank(){
        if(blank.email ==0 & blank.password ==0){
            getAccessToken()
        }else{
            setErrorMessage("Please Fill In All Information")
        }
    }
    function blankHandler(name, value){
        setBlank(prev =>({
            ...prev, [name]: value
        }))
    }

    function emailChecker(){
        if(userDetails.email.length){
            blankHandler("email", 0)
        }else{
            blankHandler("email", 1)
        }
    }
    function passwordChecker(){
        if(userDetails.password.length){
            blankHandler("password", 0)
        }
        else{
            blankHandler("password", 1)
        }
    }
    function handleChange(event){
        setErrorMessage("");
        const {name, value} = event.target;
        setUserDetails(prevDetails => ({
            ...prevDetails, [name]: value}))
        }

    async function getAccessToken(){
        axios.defaults.xsrfCookieName = 'csrftoken'//tokens for csrf protocols
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"//tokens for csrf protocols

        await axios({
            method:"POST",
            url: "http://localhost:8000/api/login/",
            data:{
                email:userDetails.email,
                password:userDetails.password
            },
            headers:{
                'content-type': 'multipart/form-data'//tells the api that the data send is from form thus enabling form/dataparsers
              }
        }).catch((error) =>{
            if(error.code === "ERR_BAD_REQUEST"){
                setErrorMessage("Invalid Email or Wrong Password");
            }
            //if error == 304 (unauthorized) then display an error text
        }).then((response) =>{
            if(response){
                localStorage.clear();
                sessionStorage.setItem('access_token', response.data.tokens['access']);
                sessionStorage.setItem('refresh_token', response.data.tokens['refresh']);
                sessionStorage.setItem('user_id',response.data['user_id']);
                if(remember){
                    localStorage.setItem("email", userDetails.email);
                }
                navigate("/") 
            }else{
                setErrorMessage("Invalid Email or Wrong Password");
            }
                //successful log in means redirect to the main page
            //should change if user is site admin or normal user
        });

    }

    function handleCheck(event){
        if(remember){
            setRemember(0);
        }else{
            setRemember(1);
        }
    }
    
    return (
    <>
        <div className="wrapper" >
            <div className="container main">
                <div className="row">
                    <div className="col-md-6 side-image">
                        <div className="text">
                            <p>Rating and feedback made <i>easier</i></p>
                        </div>
                    </div>
                    <div className="col-md-6 right">
                        <div className="input-box">
                            <div className="logo">
                                <img className="img" src={logo} alt=""></img>
                            </div>
                            <div className="header-title">
                                <header>Welcome back!</header>
                                <p>Please enter your details.</p>
                            </div>
                            {
                                errorMessage.length > 0 &&
                                <div class="alert alert-danger myAlert ">
                                <i className="material-icons" style={{fontSize: 15 +"px", color:`rgb(169, 43, 43)` }}></i>
                                    <div className="error-message" id="message"><strong>Error!</strong>{errorMessage}</div> 
                                </div>
                            }
                            <div className="input-field">
                                <input onBlur={emailChecker} onChange={handleChange} name = 'email' type="text" className="input" id="email" value={userDetails.email} required autoComplete="off"></input>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input onBlur={passwordChecker} onChange={handleChange} name = 'password' type="password" className="input" id="password" required></input>
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="remember">
                                <input onChange={handleCheck} value={remember}  type="checkbox" id="remember"></input>
                                <label htmlFor="remember">Remember Me</label>
                                <label className="psw"> <a href="#">Forgot password?</a></label>
                            </div>
                            <div className="login">
                                <input type="submit" onClick={checkBlank}  className="submit" value="Login"></input>
                            </div>
                            <div className="signin">
                                <span className="signup" >Don't have an account?<Link to = '/register'> Sign up for free </Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

