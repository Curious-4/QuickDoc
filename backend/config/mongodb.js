import mongoose from "mongoose";

const connectDB = async ()=>{
    // creates a event listener on mongoose.connection object, when the connection is established (on) it triggers the connected event which then triggers the callback function
    mongoose.connection.on('connected', ()=>{
        // The /quickdoc part indicates that the function is trying to connect to a specific database named "quickdoc".
        console.log("Database Connected");
        
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/quickdoc`)
}

export default connectDB