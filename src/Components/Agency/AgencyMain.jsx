import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import AgencyHeader from "./AgencyHeader";
import Review from "./Review";
import AgencyAbout from "./AgencyAbout";
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import About from '../Sidebar/About'
import AddReview from '../Feedbacks/AddReview'
import Reviews from '../Feedbacks/Reviews'
import FeedbackMain from "../Feedbacks/FeedbackMain";

const AgencyMain = (props) => {
    const location = useLocation(null)
    const agency_id = location.state
    return(
        <>
            <main>
            <Navbar
                agency_id={agency_id}/>
            <Header agency_id ={agency_id}/>
            <About/>
            <FeedbackMain agency_id = {agency_id}/>
            </main>
        </>
    )

}

export default AgencyMain;