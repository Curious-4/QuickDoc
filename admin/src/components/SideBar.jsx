import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const SideBar = () => {
  // taking token from context to use it as a parameter for loading content for Admin or Doctor
  const {aToken} = useContext(AdminContext) 
  return (
    <div className='min-h-screen  bg-white border-r'>
     { aToken && <ul className='text-[#515151] mt-5'>
      {/*  NavLink is used to load content without refreshing page and isActive is used to change the css of active router links */}
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`} to={'/admin-dashboard'}>
          <img src={assets.home_icon} alt='DashBoard'/>
          <p>DashBoard</p>
        </NavLink >
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`}  to={'/all-apointments'}>
          <img src={assets.appointment_icon} alt='Apointments'/>
          <p>Appointments</p>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`} to={'/add-doctor'}>
          <img src={assets.add_icon} alt='Doctor'/>
          <p>Add Doctor</p>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`} to={'/doctors-list'}>
          <img src={assets.people_icon} alt='Lists'/>
          <p>Doctor Lists</p>
        </NavLink>
      </ul>}
     
    </div>
  )
}

export default SideBar
