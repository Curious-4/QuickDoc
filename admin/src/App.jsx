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

const App = () => {

  const {aToken} = useContext(AdminContext)
  // if aToken exists then user is loggedin therefore show dashboard 
  // if not then show login page
  
  return aToken ?(
    <div className='bg-[#F8F9FD'>
      {/*  react-toastify is used for displaying notifications ( Toast Container to be used in parent component to use it in later component)*/}
     <ToastContainer/>
     <NavBar/>
     <div className='flex items-start'>
      <SideBar/>
      <Routes>
        {/* Add your routes here */}
        <Route path='/' element={<></>} />
        <Route path='/admin-dashboard' element={<DashBoard/>} />
        <Route path='/all-apointments' element={<AllApointments/>} />
        <Route path='/add-doctor' element={<AddDoctor/>} />
        <Route path='/doctors-list' element={<DoctorsList/>} />
        {/* Add more routes here */}
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
