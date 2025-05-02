import React from 'react'
import {assets} from '../assets_frontend/assets'
const Footer = () => {
  return (
  <div className='md:mx-10'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
               <img className='mb-5 w-40' src={assets.logo} alt="Sorry for down internet" />
               <p className='w-full md:w-2/3 text-gray-600 leading-6 '>
                 QuickDoc is your trusted partner for convenient, secure, and efficient healthcare management. Book appointments, connect with experienced doctors, and take charge of your health—all in one place.
               </p>
            </div>

            <div>
              <p className='text-xl font-medium mb-5'>COMPANY</p>
               <ul className='flex flex-col gap-2 text-gray-600'>
                 <li>Home</li>
                 <li>About us</li>
                 <li>Contact us</li>
                 <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
              <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
              <ul className='flex flex-col gap-2 text-gray-600'>
                 <li>9444562723</li>
                 <li>quickdoc@gmail.com</li>
              </ul>
            </div>
    </div>
        <div>
          <hr />
          <p className='py-5 text-sm text-center'>2025 Quickdoc - All Rights Reserved</p>
        </div> 
  </div>
  )
}

export default Footer