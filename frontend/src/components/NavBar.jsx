import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from "../assets_frontend/assets"
import { useLocation } from 'react-router-dom'
const NavBar = () => {
    let location=useLocation().pathname;
    const navigate=useNavigate();
<<<<<<< HEAD
    const [showMenu,setShowMenu]=useState(false);
=======
    const [state,Setstate]=useState(true);
>>>>>>> cb07e35155e6a5ff10b57ac3ff326ccf8dfc4a1f
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
        { !showMenu?
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
            :<button className={` ${showMenu ? 'block':'hidden'} bg-blue-400 w-[100px] h-[40px] text-white cursor-pointer rounded-sm`}
            onClick={()=>{navigate('/login')}}
            >Create Account</button>
        }
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt ="" />
        <div className={`${showMenu ? 'fixed w-full' :'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
               <div className='flex items-center justify-between px-5 py-6'>
                <img className='w-36' src={assets.logo} alt="" />
                <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
               </div>
               <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
               </ul>
           </div>
        </div>
    </div>
  )
}

export default NavBar