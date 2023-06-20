import React from 'react'
import '../Agency/agency.css'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import About from '../Sidebar/About'
import AddReview from '../Feedbacks/AddReview'
import Reviews from '../Feedbacks/Reviews'



const AgencyMain = () => {
  return (
    <>
    <Navbar/>
    <Header/>
    <About/>
    <AddReview/>
    <Reviews/>
  {/*<Home/>
    <Main/>
  <Footer/> */}
    </>
  )
}

export default AgencyMain