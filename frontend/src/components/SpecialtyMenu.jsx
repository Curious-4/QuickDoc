import { specialtyData } from '../assets_frontend/assets'
import {Link} from 'react-router-dom'

const SpecialtyMenu = () => {
  return (
    <div id="#specialty" className='flex flex-col items-center gap-4 py-16 text-gary-800'>
        <h1 className='text-3xl font-medium'>Explore Medical Specialties</h1>
        <p className='w-1/3 text-center text-sm'>
          Find the right specialist for your needs. Browse our range of medical fields and connect with qualified doctors for personalized care.
        </p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialtyData.map((item,index)=>
            {
                return (
                    <div key = {index}>
                        <Link className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-200' key={index} to={`/doctors/${item.specialty}`}>
                        <img src={item.image} alt=""
                        className='w-16 sm:w-24 mb-2 '
                        />
                        <p>{item.specialty}</p>
                        </Link>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default SpecialtyMenu