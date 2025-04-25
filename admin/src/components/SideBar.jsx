import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const SideBar = () => {
  // taking token from context to use it as a parameter for loading content for Admin or Doctor
  const {aToken} = useContext(AdminContext) 
  const {dToken} = useContext(DoctorContext) 
  return (
    <div className='min-h-screen  bg-white border-r'>
     { aToken && <ul className='text-[#515151] mt-5'>
      {/*  NavLink is used to load content without refreshing page and isActive is used to change the css of active router links */}
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`} to={'/admin-dashboard'}>
          <img src={assets.home_icon} alt='DashBoard'/>
          <p className='hiddden md:block '>DashBoard</p>
        </NavLink >
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`}  to={'/all-apointments'}>
          <img src={assets.appointment_icon} alt='Apointments'/>
          <p className='hiddden md:block '>Appointments</p>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`} to={'/add-doctor'}>
          <img src={assets.add_icon} alt='Doctor'/>
          <p className='hiddden md:block '>Add Doctor</p>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`} to={'/doctors-list'}>
          <img src={assets.people_icon} alt='Lists'/>
          <p className='hiddden md:block '>Doctor Lists</p>
        </NavLink>
      </ul>}
     
      { dToken && <ul className='text-[#515151] mt-5'>
      {/*  NavLink is used to load content without refreshing page and isActive is used to change the css of active router links */}
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`} to={'/doctor-dashboard'}>
          <img src={assets.home_icon} alt='DashBoard'/>
          <p className='hiddden md:block '>DashBoard</p>
        </NavLink >
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`}  to={'/doctor-appointments'}>
          <img src={assets.appointment_icon} alt='Apointments'/>
          <p className='hiddden md:block '>Appointments</p>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF border-r-4 border-primary':''}`} to={'/doctors-profile'}>
          <img src={assets.people_icon} alt='Lists'/>
          <p className='hiddden md:block '>Profile</p>
        </NavLink>
      </ul>}
     
    </div>
  )
}

export default SideBar
