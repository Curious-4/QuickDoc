import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from "../assets_frontend/assets"
import { useLocation } from 'react-router-dom'
const NavBar = () => {
    let location=useLocation().pathname;
    const navigate=useNavigate();
    const [state,setState]=useState(false);
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b-2 border-b-gray-800'>
        <img src={assets.logo} alt="" className='m-0 p-0 w-[50px] lg:w-[80px] cursor-pointer' />
        <ul className='hidden md:flex  items-start gap-5 font-medium'>
            <NavLink to="/">
                <li className={`py-1  ${location==='/'&& "border-b-2 border-b-primary"}`}>Home</li>
                
            </NavLink>
            <NavLink to='/about'>
                <li className={`py-1  ${location==='/about'&& "border-b-2 border-b-primary"}`}>About</li>
                
            </NavLink>
            <NavLink to='/contact'>
                <li className={`py-1  ${location==='/contact'&& "border-b-2 border-b-primary"}`}>Contact</li>
 
            </NavLink>
            <NavLink to='/doctors'>
                <li className={`py-1  ${location==='/doctors'&& "border-b-2 border-b-primary"}`}>Doctors</li>
            </NavLink>
            
        </ul>
        <div>
        { state?
            <div className='flex items-center gap-2 cursor-pointer group relative  '>
                <img src={assets.profile_pic} alt=""
                className='w-8 rounded-full' />
                <img src={assets.dropdown_icon} alt="" 
                className='W-2.5'/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600
                z-20 hidden group-hover:block 
                '>
                    <div className='min-w-40 bg-stone-100 
                    flex flex-col gap-4 p-4
                    '>
                        <p onClick={()=>{navigate("/profile")}} className='hover:text-black'>My profile</p>
                        <p onClick={()=>{navigate("/profile")}} className='hover:text-black'>Logout</p>
                        <p onClick={()=>{navigate("/my-appointments")}} className='hover:text-black'>My Appointments</p>

                    </div>
                </div>
            </div>
            :<button className='bg-blue-400   w-[100px] h-[40px] text-white cursor-pointer rounded-sm'
            onClick={()=>{navigate('/login')}}
            >Create Account</button>
        }
        </div>
        
    </div>
  )
}

export default NavBar