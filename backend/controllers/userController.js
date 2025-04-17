import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

//Api to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to login

const loginUser = async (req, res) => {
  try {
    const { email, password } =req.user;

    if (!email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

//Api to get user details
const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await userModel.findById(userId).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { phone, address, dob, gender, name, email } = req.body ;
    const imageFile = req.file;

    const userId = req.user.userId;

    if (!name || !email || !dob || !gender) {
      return res.json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address).phone,
      gender,
    });

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => 
  {

  try {
    const { docId, slotDate, slotTime } = req.body;
    const { userId } = req.user;
    const docData = await doctorModel.findById(docId).select("-password");
    // console.log(docId);
    if (!docData?.available) {
      return res.json({ success: false, messege: "Doctor not available" });
    }

    
    let slots_booked = docData.slots_booked;
    
    // cheaking for the slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, messege: "Doctor not available" });
        // console.log(2);
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    

    const userData = await userModel.findById(userId).select("-password");
    // console.log(userData)
    
    // console.log(4);
    delete docData.slots_booked;

    const newAppointmentData = await appointmentModel.create({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    });

    const apt = await appointmentModel.findById(newAppointmentData._id);
    
    // let newAppointment = new appointmentModel(appointmentData);
    // await newAppointment.save();
    
    // save new data in the docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, messege: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
const listApponitment = async (req, res) => {
  try {
    const { userId } = req.user;
    const appointments = await appointmentModel.find({ userId });


    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to cancel appointment
const cancelAppointment = async (req, res) => {
  try{
    const {userId} = req.user;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId)

    // varify appointment user
    if(appointmentData.userId !==userId) {
      return res.json({success:false,message:'Unauthorized action'})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    // releasing doctor slot
    const {docId, slotDate, slotTime} = appointmentData
    const doctorData = await doctorModel.findById(docId)
    
    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, {slots_booked})
    res.json({success:true, message:'Appointment Cancelled'})

  }catch(error){
    console.log(error)
    res.json({success:false, message: error.message})
  }
}

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listApponitment,
  cancelAppointment
};
