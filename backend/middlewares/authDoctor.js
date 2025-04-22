  import jwt from 'jsonwebtoken'
  
  // middleware to validate the authorized Doctor
  const authUser = async (req,res,next) => {
      try {
          const {dtoken} = req.headers // collecting token from header
          if(!dtoken) return res.json({success:false,message:"Not Authorized Login Again"})
          const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET); // decoding token from the secret key

          req.body.docId =  token_decode.id;
         
          next(); // next ensures that the control is passed to the next middleware or routeHandler
  
      } catch (error) {
          console.log(error);
          
          res.json({success:false,message:error.message})
      }
  }
  
  export default authDoctor