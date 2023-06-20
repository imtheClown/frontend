import React, {useEffect, useState} from 'react';
import './main.css';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import SearchBox from '../Location/SearchBox';



import Aos from 'aos'
import 'aos/dist/aos.css'

const Main = (props) => {
  var shownAgency = props.agencies;
  const navigate = useNavigate()
  const user_id = localStorage.getItem("user_id")
  const location = props.location

  console.log(location)
  useEffect(()=>{
    Aos.init({duration:2000});
  }, [])

  //create a functionality that changes the agencies shown depending on the user input
  //specific search functionanlity
  return (
    <>
    <section className='main-loc container section'>
      <div className="secTitle-loc">
        <h3 className="title-loc">Offices near you</h3>
      </div>
      <div className="secContent-main grid">
      {
        shownAgency && shownAgency.map((item)=>{
          return(
            <div key={item.agency_id} data-aos="fade-up" className="offices-loc">
              {}
              <div className="imageDiv">
                <img src={`http://localhost:8000/${item.logo}`} alt={item.agency_name} className="" />
              </div>

              <div className="cardInfo-loc">
                <h4 className="officeTitle">{item.agency_name}</h4>
                <span className="location flex">
                  <HiOutlineLocationMarker className='icon'/>
                  <span className="location">{item.location}</span>
                </span>
            
              <div className="rating flex">
                <div className="titleRate">
                <span>Rating<small></small></span>
                </div>

                <span className="rate flex">
                  <AiFillStar className='icon'/>
                  <span className="rate">{item.numberRaters?(item.rating/item.numberRaters).toFixed(1):0}</span>
                </span>
              </div>


                <button onClick={()=>{
                  navigate('/agency', {state: item.agency_id})
                }} className="flex">
                  DETAILS <HiOutlineClipboardCheck className='icon'/>
                </button>
              </div>
            </div>
          )
        })
      }
      </div>
    </section>
    </>
  )
}

export default Main