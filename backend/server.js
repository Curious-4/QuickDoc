// external imports
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// internal imports
// .js is used in internal imports to as ECMScripts is not setted up
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
// app config
const app = express(); // creating var
const port = process.env.PORT || 4000 // initialising port
connectDB() // connecting database
connectCloudinary()
// middlewares
app.use(express.json()) // converting each request to json before reaching backend
app.use(cors()) // allowing backend and frontend to connect

// API endpoints

// serving the home
app.get('/',(req,res)=>{
    res.send("API WORKING Great wow hi world")
})

// start the server
app.listen(port, ()=>{
    console.log("Server Started ",port);
    
})