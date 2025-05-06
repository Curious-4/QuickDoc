
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
import { ToastContainer } from 'react-toastify';
import Appointment from './pages/Appointment'
import AIChatBot from './pages/AIChatBot'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <NavBar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/doctors' element={<Doctors/>} />
          <Route path='/doctors/:specialty' element={<Doctors/>} />
          <Route path="/my-appointments" element={<MyAppointments/>} />
          <Route path="/my-appointments/:docId" element={<Appointment/>} />
      </Routes>
      <AIChatBot />
      <Footer/>
    </div>
  )
}

export default App