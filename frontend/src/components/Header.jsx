import {assets} from '../assets_frontend/assets'
const Header = () => {
  return (
    <div  className='flex flex-col md:flex-row flex-wrap bg-blue-400 rounded-lg lg:px-20  '>
        {/* leftt side of the header */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text:5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment
                <br />With Trusted Doctors
                </p> 
                <div className='flex flex-col md:flex-row items-center text-white text-sm font-light'>
                    <img className="w-28" src={assets.group_profiles} alt="" />
                    <p>
                      Join thousands of patients who trust QuickDoc for their healthcare needs.
                      <br className='hidden sm:block' />
                      Book appointments, consult top doctors, and manage your health with ease.
                    </p>
                </div>
                <a className='flex item-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 ' href="#specialty">Book Appointment <img className='w-3'src={assets.arrow_icon } alt="" /></a>
            

        </div>
        {/* right side of the header */}
        <div className='md:w-1/2 relative '>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />

        </div>
    </div>
  )
}

export default Header