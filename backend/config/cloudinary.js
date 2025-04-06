// importing Cloudinary v2 ( version 2 )
import {v2 as cloudinary} from 'cloudinary'

// to connect and configure Cloudinary
const connectCloudinary = async () =>{
    try{
        // Setting up Cloudinary configuration keys are defined
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_NAME,
            api_key : process.env.CLOUDINARY_KEY,
            api_secret:process.env.CLOUDINARY_SECRET_KEY,
            secure:true
        })
        console.log("Cloudinary connected successfully");        
    } catch(error){
        console.log("Error in configuring Cloudinary",error);
        
    }
}

export default connectCloudinary