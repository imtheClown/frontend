import React, { useState } from 'react'
import './navbar.css'
import logo from '../Assets/tugonlogo.png'
import {IoIosCloseCircleOutline} from "react-icons/io";
import {FiSearch} from 'react-icons/fi'
import {HiDotsHorizontal} from "react-icons/hi";
import Button from '../Button/Button';
import Notifications from '../Notifications/Notification'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
const Navbar = (props) => {
  const [active, setActive] = useState('navBar')
  const [isAuth, setIsAuth] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [allAgency, setAllAgency] = useState(null)
  const [filteredAgency, setFilteredAgency] = useState(null)
  const [value, setValue] = useState("")
  const [id, setId] = useState("")
  const [show, setShow] = useState(false)

  const showNav = ()=>{
    setActive('navBar activeNavbar')
  }
  useEffect(() =>{
    if(sessionStorage.getItem("user_id") !== null){
      setIsAuth(true)
    }
  }, [])

  const removeNavbar = ()=>{
    setActive('navBar')
  }
  return (
    <section className='navBarSection'>
      <header className='header flex'>
      <div className=' left-container d-flex flex-row' >
        <div className='logoDiv d-flex flex-column justify-content-center'>
          <a href="/#" className='logoImg flex'>
          <img src={logo} className="logoImg" alt="logo"/>
          </a>
        </div>
      </div>

        <div className={active}>
          <ul className='navLists flex'>
            {
              isAuth?<> <li className='navItem'>
              <Link className='navLink' to={'/'}>Home</Link>
            </li>

            <li className='navItem'>
              <a className='navLink' onClick={()=>{
                setShowNotif(!showNotif)
              }}>Notifications</a>
              {showNotif? <Notifications user_id = {sessionStorage.getItem("user_id")}/>:<></>}
            </li>

            <li className='navItem'>
              <Link to={"/profile"} className='navLink'>Profile</Link>
            </li>

            <li className='navItem'>
              <Link to={"/aboutus"} className='navLink'>About Us</Link>
            </li>
            </>:  <li><Button/></li>
            }   
          </ul>

          <div onClick={removeNavbar} className='closeNavbar'>
            <IoIosCloseCircleOutline className='icon'/>
          </div>
        </div>

        <div onClick={showNav}
         className='toggleNavbar'>
          <HiDotsHorizontal className='icon'/>
        </div>
      </header>
    </section>
  )
}

export default Navbar