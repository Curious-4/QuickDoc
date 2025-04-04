import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"


//Api to register user
const registerUser = async (req, res) => {
    try {

        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.json({success: false, message: "Please fill all fields"});
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Password should be at least 8 characters long"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel({
            name,
            email,
            password: hashedPassword
        })

        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})

        
    } catch (error) {
        console.error(error.message);
        res.json({success:false, message:error.message})
    }
}

//API to login

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email ||!password) {
            return res.json({success: false, message: "Please fill all fields"});
        }
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success: false, message: "Incorrect password"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})
    } catch (err) {
        console.log("Error:",err.message)
        res.status(500).json({success: false, message: err.message})
    }
}

export { registerUser, loginUser}