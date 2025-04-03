import express from 'express'

import { addDoctor,adminLogin, allDoctors } from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router() // var for defining routes for the admin
// Define a POST route to add a new doctor
adminRouter.post('/add-doctor', 
    // every request will be checked first for the token ( Authorized Admin can enter URL)
    authAdmin,
    // Middleware to handle file upload (single image with key "image")
    upload.single('image'),

    // Controller function to handle adding doctor details
    addDoctor
);

adminRouter.post('/login',adminLogin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)


export default adminRouter