import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './context/AdminContext';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Routes,Route } from 'react-router-dom';
import DashBoard from './pages/Admin/DashBoard';
import AllApointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import { DoctorContext } from './context/DoctorContext';

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)
  console.log(dToken, aToken)
  // if aToken exists then user is loggedin therefore show dashboard 
  // if not then show login page
  // Same goes with dToken 
  return aToken || dToken?(
    <div className='bg-[#F8F9FD'>
      {/*  react-toastify is used for displaying notifications ( Toast Container to be used in parent component to use it in later component)*/}
     <ToastContainer/>
     <NavBar/>
     <div className='flex items-start'>
      <SideBar/>
      <Routes>
        {/* Admin Routes */}
        <Route path='/' element={<></>} />
        <Route path='/admin-dashboard' element={<DashBoard/>} />
        <Route path='/all-apointments' element={<AllApointments/>} />
        <Route path='/add-doctor' element={<AddDoctor/>} />
        <Route path='/doctors-list' element={<DoctorsList/>} />
        <Route path='/doctors-list' element={<DoctorsList/>} />
        {/* Doctor Routes */}


        <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
        <Route path='/doctor-appointments' element={<DoctorAppointment/>} />
        <Route path='/doctor-profile' element={<DoctorProfile/>} />
      </Routes>
     </div>
    </div>
  )
  : (
    <div >
     <Login/>
      <ToastContainer autoClose='3000'/> 
    </div>
  )
}

export default App
