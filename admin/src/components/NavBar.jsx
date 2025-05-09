import {React,useContext} from 'react'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
const NavBar = () => {
    const {aToken,setAToken} = useContext(AdminContext) // taking token from context
    const navigate = useNavigate() // used to navigate back to other pages when event is triggered
    
    // logout mechanism
    const logout = ()=>{
       
        if(aToken){ // if aToken exist ( user is loggedin ) then delete token from localSorage unset it and navigate back to home which is login for admin/doctor
            navigate('/')
            setAToken('')
            localStorage.removeItem('aToken')
        }
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 cursor-pointer sm:w-40' src={assets.logo} alt=""/>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin':'Doctor' }</p>
      </div>
      <button onClick ={logout} className='bg-primary text-white text-sm  px-10 py-2 rounded-full cursor-pointer'>Logout</button> 
    </div>
  )
}

export default NavBar
