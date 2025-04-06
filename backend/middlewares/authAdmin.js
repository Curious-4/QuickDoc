import jwt from 'jsonwebtoken'

// middleware to validate the authorized admin
const authAdmin = async (req,res,next) => {
    try {
        const {atoken} = req.headers // collecting token from header
        if(!atoken) return res.json({success:false,message:"Not Authorized Login Again"})
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET); // decoding token from the secret key
        if(token_decode != process.env.ADMIN_EMAIL+process.env.ADMIN_PASS)
            return res.json({success:false,message:"Not Authorized Login Again"}); // verifying the decoded token
       
        next(); // next ensures that the control is passed to the next middleware or routeHandler

    } catch (error) {
        console.log(error);
        
        res.json({success:false,message:error.message})
    }
}

export default authAdmin