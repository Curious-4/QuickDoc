import express from 'express'

import { addDoctor,adminLogin, allDoctors, appointmentCancel, appointmentsAdmin ,adminDashboard} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

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
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)


export default adminRouter