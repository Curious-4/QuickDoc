import React from 'react'
import {assets} from '../assets_frontend/assets'
const Header = () => {
  return (
    <div  className='flex flex-col md:flex-row flex-wrap bg-blue-400 rounded-lg lg:px-20  '>
        {/* leftt side of the header */}
        <div>
            <p>Book Appointment
                <br />With Trusted Doctors
                </p> 
                <div>
                    <img src={assets.group_profiles} alt="" />
                    <p>Lorem ipsum dolor sit amet Lorem, ipsum.
                        <br /> Lorem ipsum dolor sit amet.
                    </p>
                </div>
                <a href="">Book Appointment <img src={assets.arrow_icon } alt="" /></a>
            

        </div>
        {/* right side of the header */}
        <div>
            <img src={assets.header_img} alt="" />

        </div>
    </div>
  )
}

export default Header