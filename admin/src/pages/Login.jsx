import React,{useContext, useState} from 'react'
import {assets} from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'
function Login() {
  
  const [state,setState] = useState('Admin') // setting default state as Admin Login
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {setAToken,backendUrl} = useContext(AdminContext) // destructuring setAToken and backendURL from AdminContext for storing token in state and backenUrL for backend request

  const {setDToken} = useContext(DoctorContext)
    console.log(state)
  const onSubmitHandler = async (event)=>{
    event.preventDefault(); // prevent refreshing of page when the form is submitted

    // checking if Admin is logging in or Doctor
    try{
      if(state === 'Admin') {
        const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('aToken',data.token); // storing token in localStorage Client side
          setAToken(data.token);   // stroing the token in state
        }else{
          toast.error(data.message)        
        }
      }
      // Logic for Doctor Login - Authentication
      else{
          const {data} = await axios.post(backendUrl +'/api/doctor/login',{email,password})
          console.log(data)
          if(data.success){
            localStorage.setItem('dToken',data.token); // storing token in localStorage Client side
            setDToken(data.token);  
            console.log(data.token);
             // stroing the token in state
          }else{
            toast.error(data.message)        
          }
      }
    }catch(err){ 
      toast.error(err.message);
      console.log(err.message);
      
    }
  }


  return (
   <form action="" className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
      <p className='text-2xl font-semibold m-auto'>
        <span className='text-primary'>{state}</span> Login
      </p>
      <div className='w-full'>
        <p>Email</p>
        <input onChange = {(e)=>setEmail(e.target.value)} value = {email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required name="" id="email" />
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input onChange = {(e)=>setPassword(e.target.value)} value = {password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required name="" id="password" />
      </div>
      <button className='bg-primary text-white w-full py-2 rounded-md text-base   cursor-pointer'>Login</button>
      {
        state == 'Admin' ? <p>Doctor Login <span className='text-primary underline cursor-pointer' onClick={()=>{
          setState('Doctor')
        }}>Click Here</span></p> :  <p>Admin Login <span className='text-primary underline cursor-pointer'  onClick={()=>{
          setState('Admin')
        }}>Click Here</span></p>
      }
    </div>
   </form>
  )
}

export default Login
