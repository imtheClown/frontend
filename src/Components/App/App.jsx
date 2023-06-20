import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Location from '../Location/Location'
import Login from '../Login/Login'//for the Login
import Register from '../Register/Register'
import Home from '../Home/Home'
import Review from '../Agency/Review'
import UserProfile from '../UserProfile/UserProfile'
import AdminMain from '../Admin/AdminMain'
import AgencyMain from  '../Agency/AgencyMain'
import Profile from '../ProfileEdit/CreateProfile'
const App = () => {

    return ( 
        <BrowserRouter>
            <Routes>
                <Route path='/location' element = {<Location/>}></Route>
                <Route path='/' element = {<Home/>}></Route>
                <Route path='/register' element = {<Register/>}></Route>
                <Route path='/login' element = {<Login/>}></Route>
                <Route path='/review' element= {<Review/>}></Route>
                <Route path='/profile' element={<UserProfile/>}></Route>
                <Route path= '/agency' element = {<AgencyMain/>}></Route>
                <Route path='/admin' element={<AdminMain/>}></Route>
                <Route path='/edit' element ={<Profile/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App