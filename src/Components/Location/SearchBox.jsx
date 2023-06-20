import React, {useEffect, useState} from 'react'
import './home.css'
import video from '../Assets/waves.mp4'
import {FiSearch} from 'react-icons/fi'
import Main from '../Main/Main'
import axios from 'axios'
import { useRef } from 'react'
import 'aos/dist/aos.css'

const SearchBox = (props) => {
  const [value, setValue] = useState("");//value for the searchbox
  const location = props.location;//gets the parameter location
  const [show, setShow] = useState(false)

  const contentSection = useRef(null);

  const [agencies, setAgencies] = useState(null);
  const [shownAgency, setShownAgency] = useState(null);

  function clickHandler(event){
    agencyFilter();
    event.preventDefault();
  }

  function agencyFilter(){
    if(agencies){
      var myArray = [];
      agencies.forEach(element => {
        if(element.agency_name.toLowerCase().indexOf(value.toLowerCase()) > -1){
          myArray.push(element);
        }
        
      });
      if(myArray.length > 0){
        setShownAgency(myArray);
        window.scrollTo({top: contentSection.current.offsetTop, behavior: 'smooth'});
      }else{
        setShownAgency(agencies);
        alert("Agency does not exist");
      }
    }
    
  }

  useEffect(()=>{
    getAgency();
  }, [])

  async function getAgency(){//retrieves values from database
    await axios({
      method: "GET",
      url: `http://localhost:8000/api/agency/${location}/`
    }).catch((err) => {
      console.log(err);
    }).then((resp) =>{
      setAgencies(resp.data);
      setShownAgency(resp.data);
    })
  }

  function changeHandler(event){
    setValue(event.target.value);
    setShow(true)
  }
  return (
    <>
    <section className='home'>
      <div className="overlay"></div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>
      <div className="homeContent container">
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText">
            Your Location:
          </span>
          <h1 data-aos="fade-up" className="homeTitle">
            {location}
          </h1>
        </div>

        <div data-aos="fade-up" className="cardDiv grid">
          <div className="descriptionInput">
          <div class="input-group">
              <input onBlurOut ={()=> setShow(false)} onFocus={()=>{setShow(true)}} value={value} onChange={changeHandler} type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
              <button onClick={clickHandler} type="button" class="btn btn-outline-primary">search</button>
          </div>
          {show?  <ul className='search-list2'>
          {agencies.map(item  => {
              if(item["agency_name"].toLowerCase().indexOf(value.toLowerCase()) >-1 | item["agency_acronym"].toLowerCase().indexOf(value.toLowerCase()) > -1){
                return(
                  <li onClick={() =>{setValue(item["agency_name"])
                  setShow(false)}
                  } className='search-items2'>{item["agency_name"]}
                  </li>
                )
              }
            })}
          </ul>: <></>}
        </div>
        </div>
      </div>
    </section>
    <section ref={contentSection}>
    <Main
    location = {location}
    agencies = {shownAgency}
    />
    </section>

    </>
  )
}

export default SearchBox