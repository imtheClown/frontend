import React, {useEffect, useState} from 'react';
import CreateProfile from "../ProfileEdit/CreateProfile";
import Aos from 'aos'
import 'aos/dist/aos.css'


export default function EditProfile(){

    useEffect(()=>{
        Aos.init({duration:2000})
    },[])

    return(
        <>
            <CreateProfile/>
        </>
    )
}