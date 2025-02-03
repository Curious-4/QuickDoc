import React from 'react'

const Profile = () => {
  const [userData , setUserData] = useState({
    name:"Ecentdward Vincent",
    image:assets.profile_pic,
    email:'quicldog@gmail.com',
    phone:'9444562723',
    address:{
      line1:"57th Cross, Richmond",
      line2:"Bangalore, Karnataka",
    },
    gender:'Male',
    dob:'1999-12-12'
  })
  return (
    <div>
     
    </div>
  )
}

export default Profile