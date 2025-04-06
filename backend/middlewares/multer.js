import multer from 'multer'

// configuring how files should be stored 
/*
multer is a middleware used to store the form data containing files enctype = multipart/form-data
*/
const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    } // filename determines the filename after uploading
    // callback ensures the uploaded file retains its original name
})

const upload = multer({storage}) // initialize middleare with specified configuration

export default upload