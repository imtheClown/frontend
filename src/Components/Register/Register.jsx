import './style-reg.css';
import { useEffect, useState } from "react";
import axios from "axios";
import logo from '../Assets/tugonlogo.png';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { Balloon } from 'phosphor-react';

function Register() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        username:'',
        email:'',
        password:'',
        confirm_password:'',
    })

    const [errors, setErrors] = useState({
        username:1,
        email:1,
        password: 1,
        confirm_password: 1,
    })
    const [blank, setBlank] = useState({
        username: 1,
        email: 1,
        password: 1,
        confirm_password: 1
    })

    const [errorMessage, setErrorMessage] = useState("");
    function handleChange(event) { 
        setErrorMessage("")
        const {value, name} = event.target
        setUserDetails(prevDetails => ({
            ...prevDetails, [name]: value}))

    }
    function handleErrors(name, value) { 
        setErrors(prevDetails => ({
            ...prevDetails, [name]: value}))

    }
    function handleBlanks(name, value) { 
        setBlank(prevDetails => ({
            ...prevDetails, [name]: value}))

    }

    function submitButtonStateManager(event){
        console.log(blank)
        if(checkBlanks()){
            if(errors.username ===0 & errors.email === 0 & errors.password === 0 & errors.confirm_password === 0){
                registerUser(event);
            }
            else{
                if(errors.username == 1){
                    setErrorMessage("Invalid input for username")
                }
                else if(errors.email == 1){
                    setErrorMessage("Invalid input for email")
                }else if(errorMessage.password == 1){
                    setErrorMessage("Invalid input for password")
                }else{
                    setErrorMessage("Passwords do not match")
                }
            }
        }else{
            setErrorMessage("Please Fill Up the Form")
        }
    }

    function userNameChecker(){
        if(userDetails.username.length){
            handleBlanks("username", 0)
            if (userDetails.username.length < 6) {
                setErrorMessage("Username is too short")
                console.log("Username is to short")//place it on the forms
                handleErrors("username", 1);
            }else{
                const userNameRegEx = /^[A-Za-z][A-Za-z0-9_]{6,30}$/;
                if(!userNameRegEx.test(userDetails.username)){
                    handleErrors("username", 1);
                    setErrorMessage("Invalid username")

                }
                else{
                    handleErrors("username", 0);
                }
            }
        }else{
            handleBlanks("user_name", 1)
        }
            
    }

    function emailChecker(){
        if(userDetails.email.length){
            handleBlanks("email", 0)
            const userNameRegEx = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!userNameRegEx.test(userDetails.email)) {
                setErrorMessage("Invalid Email")
                handleErrors("email", 1);
            }
            else{
                handleErrors("email", 0);
            }
        }else{
            handleBlanks("email 1")
        }
    }

    function passwordChecker(){
        if(userDetails.password.length){
            handleBlanks("password", 0)
            const userNameRegEx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
            if (!userNameRegEx.test(userDetails.password)) {
                setErrorMessage("Weak password")
                console.log("Weak Password\n");
                handleErrors("password", 1);
            }
            else{
                handleErrors("password", 0);
            }
        }else{
            handleBlanks("password", 1)
        }
    }

    function confirm_passwordChecker(){
        if(userDetails.confirm_password.length){
            handleBlanks("confirm_password", 0)
            if (userDetails.password != userDetails.confirm_password) {
                setErrorMessage("Passwords do not match")
                console.log("Passwords do not match\n");
                handleErrors("confirm_password", 1);
            }
            else{
                handleErrors("confirm_password", 0);
            }
        }else{
            handleBlanks("confirm_password", 1)
        }
    }

    function checkBlanks(){
        if(blank.username ==0 & blank.email == 0 & blank.confirm_password == 0 & blank.password == 0){
            return true
        }else{
            return false
        }
    }
    function registerUser(event){
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
        axios({
            method:"POST",
            url:"http://localhost:8000/api/register/",
            data : {
                name: userDetails.username,
                email: userDetails.email,
                password: userDetails.password,
            },
            headers:{
                'content-type': 'multipart/form-data'
              }
        }).catch( response =>{
            if(response.response){
                console.log(response.response.status);
                if (response.response.status == 403) {
                    setErrorMessage("User already exists")
                }
                if (response.response.status == 400) {
                    setErrorMessage("Invalid inputs. Please Try Again");
                }
            }
        }).then((response) => {
            console.log(response);
            if (response) {
                    navigate('/login', {replace: true})

            }
        })


    }
    //useEffect for displaying errors

    return (
        <div className="wrapper">
            <div className="container main">
                <div className="row">
                    <div className="col-md-6 side-imagereg">
                    </div>
                    <div className="col-md-6 right">
                        <div className="input-box">
                            <div className="logoreg">
                                <img className='img-reg' src={logo}alt=""></img>
                            </div>
                            <div className="header-title">
                                <header className='header-reg'>Create an account</header>
                                <p>Get started with Tugon.</p>
                            </div>
                            {
                                errorMessage.length > 0 &&
                                <div class="alert alert-danger myAlert ">
                                <i className="material-icons" style={{fontSize: 15 +"px", color:`rgb(169, 43, 43)` }}></i>
                                    <div className="error-message" id="message"><strong>Error!</strong>{errorMessage}</div> 
                                </div>
                            }
                            <div className="input-field">
                                <input onBlur={userNameChecker} type="text" className="input" id="username" required autoComplete="on" onChange ={handleChange} value = {userDetails.username} name="username" ></input>
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="input-field">
                                <input onBlur={emailChecker} type="text" className="input" id="email" required autoComplete="on"onChange ={handleChange} value = {userDetails.email} name = 'email'></input>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input onBlur={passwordChecker} type="password" className="input" id="password" required value = {userDetails.password} onChange ={handleChange} name='password'></input>
                                <label htmlFor="password">Password</label>
                                <span className="reminder">Minimum 6 characters, at least one number, and special character
                                </span>
                            </div>
                            <div className="input-field">
                                <input onBlur={passwordChecker} type="password" className="input" id="confirm-pass" required value = {userDetails.confirm_password} onChange ={handleChange} name = 'confirm_password'></input>
                                <label htmlFor="confirm-pass">Confirm Password</label>
                            </div>
                            <div  onBlur={confirm_passwordChecker}className="register">
                                <input id ='submitButton' onClick = {submitButtonStateManager} type="submit" className="submit" value="Create account"></input>
                            </div>
                            <div className="signin">
                                <span className="login">Already have an account? <Link to='/login'>Login</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;