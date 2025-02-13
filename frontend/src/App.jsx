import React, { useState } from 'react'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Doctors from './pages/Doctors'
import MyAppointments from './pages/MyAppointments'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/doctors' element={<Doctors/>} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path="/my-appointments" element={<MyAppointments/>} />
          <Route path="/my-appointments/:doc-id" element={<MyAppointments/>} />
      </Routes>
      <Footer/>
      </div>
  )
}

export default App