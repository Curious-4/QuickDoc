import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast} from 'react-toastify'



const MyAppointments = () => 
  {
  const { backendUrl , token ,getDoctorData} = useContext(AppContext)

  const [appointments , setMyAppointments] = useState([])

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments = async () => {
    try{
      const response = await axios.get(backendUrl+'/api/user/appointments', {headers:{token}})
      const { data } = response;
      if(data.success){
        setMyAppointments(data.appointments.reverse())
      }
    }
    catch(error){
    console.log(error);
    toast.error(error.message)

    }
  }
  const cancelAppointment = async (appointmentId) =>{
    try{
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorData()
      } else {
        toast.error(data.message)
      }

    } catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }
  /// payment abhi complete karna hai

  // const initPay = (order) =>{
  //   const options = {
      
  //   }
  // }

  // const appointmentRazorpay = async (appointmentId) =>{
  //   try {
  //     const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})

  //     if(data.success){
  //       initPay(data.order)
  //     }
      
  //   } catch (error) {
      
  //   }

  // }

  useEffect(()=>{
    if(token){
      getUserAppointments()
     }
  },[token])

  return (
    <div>
      <p className="pb-3 mt-12 fonyt-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className="grid gird-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b " key={index}>
          <div>
            <img className="w-32 bg-indigo-50 " src={item.docData.image} alt="" />
          </div>
          <div className="flex-1 text-sm text-zinc-600">
          <p className="text-neutral-800 font-semibold " >{item.docData.name}</p>
          <p>{item.docData.specialty}</p>
          <p className="text-zinc-700 font-medium mt-1">Address :</p>
          <p className="text-xsl">{item.docData.address.line1}</p>
          <p className="text-xsl">{item.docData.address.line2}</p>
          <p className="text-xs mt-1"> <span  className="text-xs text-neutral-700 font-medium">Date & Time :</span>{item.slotDate} | {item.slotTime}</p>
        </div>
        <div></div>
        <div className="flex flex-col gap-2 jutify-end">
          {!item.cancelled && <button/* onClick={()=>appointmentRazorpay(item._id)}*/ className="text-sm text-stone-500 cursor-pointer  text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-300" >Pay Online</button>}
          {!item.cancelled &&<button onClick= {()=>cancelAppointment(item._id)} className="text-sm text-stone-500 cursor-pointer text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300">Cancel Appointments</button> }
          {item.cancelled && <button className="sm:min-w-48 py-2  border border-red-500 rounded text-red-500">Appointment cancelled</button>}
        </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
