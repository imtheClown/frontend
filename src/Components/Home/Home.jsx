import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./home.css";
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import Button from "../Button/Button";



axios.defaults.withCredentials = true;


function Home() {
    //below is for the dropdownlist
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [municipality, setMunicipality] = useState(null);
    const [possibleMuns, setPossibleMuns] = useState(null);
    const [mun_id, setMunID] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [show, setShow] = useState(false)
    //below functions is for the dropdownlist

    async function MunicipalityQuery(){
        await axios({
            method: "GET",
            url: 'http://localhost:8000/api/home/'
        }).catch((errors) => {
            if (errors){
                console.log("Empty Database");
            }
        }).then((response) =>{
            const data = response.data
            setMunicipality(data);
            setPossibleMuns(data);
        });

        if(sessionStorage.getItem('user_id') != null){
            setIsAuth(true)
        }


    }

    function changeHandler(event) {
        setValue(event.target.value);
    }

    useEffect(() => {
        MunicipalityQuery();
    }, []);

    function valueChecker(event){
        var existed = false;
        municipality.forEach(element => {
            if(element.municipality_name === value){
                existed = true;
            }
        });
        if(existed === true){
            navigate('/location', {
                state: value
            });
        }else{
            alert("Sorry we have no data for the given input\n");
        }

        event.preventDefault();

    }
    
    return(
        <div className="wrapperHome">
        <nav>
            {isAuth? null:<Button/>}
            <div className="logo">
               
            </div>
        </nav>
        <div className="container mainHome">
                <div className="text">
                    <header>Explore and rate public offices near you</header>
                    <p>Tugon is a centralized rating system that allows users to rate and provide 
                        feedback to government offices and public utilities.</p>
                    <div onFocus={()=>{setPossibleMuns(municipality)}} onMouseOver={()=>{setPossibleMuns(municipality)}} onPointerLeave={()=>{setPossibleMuns(null)}}>
                        <form autoComplete="off" onSubmit={valueChecker} >
                            <div className="search-input">
                                <input onFocus={()=> setShow(true)} onChange={changeHandler} type="text" placeholder="Enter your location"value={value}></input>
                                <button type="submit">Search</button>
                            </div>
                            {
                                show?<ul className="list">
                                {
                                possibleMuns &&value !== '' && possibleMuns.map((item) => {
                                    if (item.municipality_name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                                        let index = item.municipality_name.toLowerCase().indexOf(value.toLowerCase())

                                        return <li key={item['municipality_name']} className="list-items" onClick={()=>{setValue(item["municipality_name"]) 
                                        setShow(false)}}

                                         >{item['municipality_name'].substring(0, index)}<b>{item['municipality_name'].substring(index, index + value.length)}</b>{item['municipality_name'].substring(index + value.length, item['municipality_name'].length)}</li>
                                    }
                                })
                                }
                            </ul>: <></>
                            }
                        </form>
                    </div>
                </div>
                <div>
                </div>
        </div>
        
    </div>

    )
}

export default Home