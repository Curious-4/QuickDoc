import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)
  console.log(doctors)
  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])


  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index) => (
            <div key={index} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'>
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="doctor image" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='to-zinc-600 text-sm'>{item.specialty}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  Available
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
