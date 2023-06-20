import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SearchBox from "./SearchBox";
import Main from "../Main/Main";
import NavBar from "../Navbar/Navbar";
import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from "axios";
export default function Location(){

    useEffect(()=>{
        Aos.init({duration:2000})
    },[])

    const location = useLocation();
    const state = location.state

    return(
        <>
            <NavBar page_num = {1}/>
            <SearchBox location = {state}
            />
        </>
    )
}
