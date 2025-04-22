import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const changeAvailability = async (req, res) => {
    try {

        const {docId} = req.body;

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
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:'Invalid credentials'})
        }
        const isMatch = await bcrypt.compare(password , doctor.password)

        if(isMatch){
            
            const token = jwt.sign({id:doctor._id},ProcessingInstruction.env.JWT_SECRET)
            res.json({sucess:true,token})
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
         const{ docId } = req.body
         const appointments = await appointmentModel
    }
    catch(error){

    }
}
export { changeAvailability, doctorList, loginDoctor} 