import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const changeAvailability = async (req, res) => {
    try {

        const {docId} = req;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available});
        res.json({success: true, message: 'Available Changed'})
        
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

const doctorList = async (req, res)=> {
    try {
        const doctors = await doctorModel.find({available: true}).select('-password');
        res.json({success: true, doctors})
        
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}
// API for doctor Login
const loginDoctor = async (req , res) =>{
    try{
        const {email , password} = req.body
        // console.log(req)
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:'Invalid credentials'})
        }
        const isMatch = await bcrypt.compare(password , doctor.password)

        if(isMatch){
            
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid credentials'})
        }
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

// Api to get Doctor Appointment for Doctor panel

const appointmentsDoctor = async(req , res) =>{
    try{
         const{ docId } = req
         const appointments = await appointmentModel.find({docId} )
         res.json({success:true,appointments})
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}
// api to  mark that the apointment for the specific doctor has been completed
const appointmentComplete=async (req,res)=>
{
    try {
        const {appointmentId}=req.body
        const {docId}=req
        const appointmentData=await  appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId===docId)
        {
            await appointmentModel.findByIdAndUpdate(appointmentId,{iscompletd:true});
            return res.json({success:true,message:'Appointment completed'})

        }
        else{
            return res.json({success:false,message:'Mark failde'})
        }
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

// api to  mark that the appointment for the specific doctor has been completed // logic for cancel the appoiuntment regarding the doctor 
const appointmentCancel=async (req,res)=>
    {
        try {
            const {appointmentId}=req.body
            const {docId}=req
            const appointmentData=await  appointmentModel.findById(appointmentId);
            if(appointmentData && appointmentData.docId===docId)
            {
                await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
                return res.json({success:true,message:'Appointment cancelled'})
    
            }
            else{
                return res.json({success:false,message:'cancellation failed '})
            }
        } catch (error) {
            console.log(error.message)
            res.json({success: false, message: error.message})
        }
    }
    const doctorDashBoard=async (req,res)=>
    {
       try {
        console.log(req)
            const {docId}=req;
            const appointments=await appointmentModel.find({docId}) // appointment for the particular doctor 
            let earnings=0;
            appointments.map((item,index)=>
            {
                if(item.isCompleted || item.payment)
                {
                    earnings+=item.amount; // to count the total earning og the dcotor from appointments
                }
            })
            let patients=[]
            appointments.map((item)=>
            {
                if(!patients.includes(item.userId))
                {
                    patients.push(item.userId)
                }
            })
            const dashData={
                earnings,
                appointments:appointments.length,
                patients:patients.length,
                latestAppointments:appointments.reverse().slice(0,5)
            }
            res.json({success:true,dashData})

       } catch (error) {
        console.log(error.message)
            res.json({success: false, message: error.message})
       }
    }
export { changeAvailability, doctorList, loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashBoard} 