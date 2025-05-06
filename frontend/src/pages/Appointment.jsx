import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets_frontend/assets';

import RelatedDoctors from '../components/RelatedDoctors';
// import RelatdDoctor

const Appointment = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const {doctors , backendUrl,token,getDoctorData,currencySymbol} = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];


  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  // console.log(slotIndex);
  
  const fetchDocInfo = async () => {
    const doc = doctors.find(doc => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;

    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const slotDate = `${currentDate.getDate()} ${currentDate.getMonth() + 1} ${currentDate.getFullYear()}`;
        const isSlotAvailable = !docInfo.slots_booked[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
    // setDocSlots(prev => ({...prev, allSlots}));
  };

  const bookAppointment = async () => {
  
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      const response = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );


      const { data } = response;

      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while booking.");
    }
  };


  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
    // console.log(docInfo);
  }, [docInfo]);

  // console.log(slotIndex);

return docInfo && (
  <div>
    {/* doc-info */}
    <div className='flex flex-col sm:flex-row gap-4'>
      {/* Doctor Image */}
      <div>
        <img className='bg-blue-600 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
      </div>

      {/* Doctor Details */}
      <div className='flex-1 border-gray-400 border rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
        {/* Name + Verified */}
        <div className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
          <p>{docInfo.name}</p>
          <img className="w-5" src={assets.verified_icon} alt="verified" />
        </div>

        {/* Degree + Specialty + Experience */}
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree} - {docInfo.specialty}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
        </div>

        {/* About Doctor */}
        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
          About <img src={assets.info_icon} alt="info" />
        </p>
        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
      </div>
    </div>

    {/* Appointment Fee */}
    <p className='mt-4 text-gray-800'>
      Appointment fee: <span className='font-semibold'>{currencySymbol}{docInfo.fees}</span>
    </p>

    {/* Booking Slots */}
    <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
      <p>Booking slots</p>
      <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
      {
        docSlots.length > 0 && docSlots.map((item, index) => {
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + index);

          return (
            <div 
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-200'}`} 
              key={index}
            >
              <p>{item[0] ? daysOfWeek[item[0].datetime.getDay()] : daysOfWeek[currentDate.getDay()]}</p>
              <p>{item[0] ? item[0].datetime.getDate() : currentDate.getDate()}</p>
            </div>
          );
        })
      }
      </div>

     <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
      {docSlots.length && docSlots[slotIndex].map((item,index)=>(
        <p onClick = {()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-gray-400 border border-gray-300'}`} key = {index}>
            {item.time.toLowerCase()}
        </p>
      ))}
     </div>
      
     <button
  className='bg-blue-600 text-white text-sm font-light cursor-pointer px-14 py-3 rounded-full my-6'
  onClick={bookAppointment}
>
  Book Appointment
</button>

    </div>
    {/* Listing related Doctor */}
    <RelatedDoctors docId = {docId} specialty = {docInfo.specialty} />
  </div>
)}
export default Appointment;
