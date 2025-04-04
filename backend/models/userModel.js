
import mongoose from 'mongoose'

// creating user Schema
const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    image:{
        type:String,
        default:'data:image/webp;base64,UklGRpAEAABXRUJQVlA4WAoAAAAIAAAAZwEAZwEAVlA4ILADAACwQQCdASpoAWgBPnU6l0mko6IhIxzI2JAOiWlu4XPU/mNwsRQkfifdGTN6aTIEAvqwva5d/861BfVhe1y7/51qC+rC9rl3/zrUF9WF7XLv/nVdXtyMOID69iQB3FfjxCAjPmJo4v/nWoL6oreYgZLIWeAoXqZAX3TmoL2uXf97rsjLRuXDOtQTwN1P3S5861BeKUESJX6C75crtL2Ap87SvQGISuwxsXnCETydM61BOpduerjxGNGbQOhd/CZoCO2NfeeNg1hCHFmy5pGzJQZ9tNvXGoE3YBHrHRDN0N2hfVFi2tpnXujVHbfKiGphW2Rve7eVNFIF9UgpbZwwfXO0+nczehaFkvFEvAvFEu/iLWkHtvg4a3EjN+xbwKvDHfKqf9BK2ztgAhHJuUREDS//bWfizYSzOxfAvDhashlEBPD9pyYOrEP/+3H9f03hCNheIToCyRxZsomrVr1U7iDG2AD39VVsw4vnshpFbvhWs5vAvaxKFx3Hm5JsZlUFeBeCpcojgwy3W0YicQLQagvD/8o9U9+HGbz+F3y9tkIT958CInn2c2q/OtQXiYApcgq5733DwP/nVclYd2U3BAn37XLv/nEhVBvyc6KYpUKB/4QX/e/SaMW2TrOtQX1YXfSWYj5PwevORg7+uFfBu4kD82dagvqwva5d/861BfVhe1y7/51qC+rC9rl3/zrUF9WF7XLv1AAA/v9W0AAKdyPsYLHm4d795edrZprVFlWLKUfd2AhxQgb52HluCaHAJIxDenTLfmMHpDdX87YnDBNZfHAafiVDYM8JhlzK3iDfmdxLEpF4KSEh3UjAjsnf65Exa1oMUEXK9pV8L5dyDKXzmb2eKQGj4FvWiBECQoxI4Ri0iOD8a0BA26/wB9H1tLiRTZRh0nh4Uwgpti5pTcTvJaZJ1+3sIciIyT+rqC78moOZGdfL1lNTcx7VgW29DjFvHN0HSDNBWqgAOUwCzHDRsIkTKndAnCUZMd9dLonb03V32b/z+XHhB9AV87rKnhDR6tzTz7ONsO08f9hib8YQ0GhIvEZRoE16w2BABk7Dl791hOqhAUWcgKkfUD5hmyBP6SqznrAgkwofjR+QOlCLJKJhujtuXnmeUoeuwWQ5TFz4OeuC3CJr0v6ZgK/JP9gtryQeXIAKD0YbRjh0onInElibPOPD/vl4n7m+qLQA39l/5Ds6eL6MMBm1w/d+YcVlt81W4RUWZd0PPHpDySJajTd66ed4QI5iDAAAAAAAAEVYSUa6AAAARXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAGgBAAADoAQAAQAAAGgBAAAAAAAA'
    },
    address:{type:Object,default:{line1:'',line2:''}},
    gender:{type:String,default:"Not Selected"},
    dob:{type:String, default:"Not Selected"},
    phone:{type:String,default:'0000000000'}
})

// creating model using schema with cluster name user which will be used here as userModel
const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel