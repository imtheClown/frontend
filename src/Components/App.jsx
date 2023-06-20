import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Location from './Location/Location'
import Login from './Login/Login'//for the Login
import Register from './Register/Register'
import Home from './Home/Home'
import Agency from './Agency/Agency'

const App = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path='/location' element = {<Location/>}></Route>
                <Route path='/' element = {<Home/>}></Route>
                <Route path='/register' element = {<Register/>}></Route>
                <Route path='/login' element = {<Login/>}></Route>
                <Route path= '/agency' element = {<Agency/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App