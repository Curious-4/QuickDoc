import express from 'express';
import { doctorList ,loginDoctor,appointmentsDoctor, appointmentCancel,appointmentComplete,doctorDashBoard} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();
// api end pointments
doctorRouter.get('/list', doctorList);
doctorRouter.get('/appointments', authDoctor,appointmentsDoctor);
doctorRouter.post('/complete-appointment', authDoctor,appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor,appointmentCancel);
// doctorRouter.post('/cancel-appointment', authDoctor,appointmentCancel);
doctorRouter.get('/dashboard', authDoctor,doctorDashBoard); 
//doctorRouter.get('/doctor', authDoctor,doctorDashboard); 



doctorRouter.post('/login' , loginDoctor)

export default doctorRouter;