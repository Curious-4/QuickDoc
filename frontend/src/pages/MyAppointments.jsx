// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";

// const MyAppointments = () => {

//   const { backendUrl , token} = useContext(AppContext)

//   const [appointemnts , setMyAppointments] = useState([])

//   const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split('_')
//     return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
//   }

//   const getUserAppointments = async () => {
//     try{
//       const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})

//       if(data.success){
//         setMyAppointments(data.appointemnts.reverse())
//         console.log(data.spp)
//       }
//     }
//     catch(error){
//     console.log(error);
//     toast.error(error.message)

//     }
//   }

//   useEffect(()=>{
//     if(token){
//       getUserAppointments()
//     }
//   },[token])
// }

// const Appointment = () => {
//   return docInfo && <div></div>;
// };
import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const MyAppointments = () => {

	const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className="pb-3 mt-12 fonyt-medium text-zinc-700 border-b   ">My Appointments</p>
      <div>
        {doctors.slice(0, 3).map((item, index) => (
          <div className="grid gird-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b " key={index}>
            <div>
              <img className="w-32 bg-indigo-50 " src={item.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
				<p className="text-neutral-800 font-semibold " >{item.name}</p>
				<p>{item.speciality}</p>
				<p className="text-zinc-700 font-medium mt-1">Address :</p>
				<p className="text-xsl">{item.address.lin1}</p>
				<p className="text-xsl">{item.address.lin2}</p>
				<p className="text-xs mt-1"> <span  className="text-xs text-neutral-700 font-medium">Date & Time :</span> 11 April 2025</p>
			</div>
			<div></div>
			<div className="flex flex-col gap-2 jutify-end">
				<button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-300" >Pay Online</button>
				<button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300">Cancel Appointments</button>
			</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
