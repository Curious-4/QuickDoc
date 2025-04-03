import validator from "validator"; // for validating stuff
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    // destructring the object recieved from form data
    const {
      name,
      email,
      password,
      specialty,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    // checking if file is uploaded or not
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
    const imageFile = req.file; // image file containing information about the uploaded file

    //checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !specialty ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    )
      return res.json({ success: false, message: "Missing Details" });

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter Valid Email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter Strong Password" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageURL = imageUpload.secure_url; // storing destination URL of image in cloudinary

    // storing data in database
    const doctorData = {
      name,
      email,
      image: imageURL, // destination location of the image
      password: hashedPassword,
      specialty,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // as storage form is object and data is string
      date: Date.now(),
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "Doctor added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Authenticating Admin so that only login admin can enter the addDoctor api
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET); // creating token
      res.json({ success: true, token }); 
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const allDoctors = async(req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");

    res.json({success: true, doctors});
    
  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
}

export { addDoctor, adminLogin, allDoctors };
