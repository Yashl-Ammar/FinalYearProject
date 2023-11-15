const mongoose= require("mongoose")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const freelancerSchema =new mongoose.Schema({
    fname:{
        type: String,
        require:true,
        minlength:5,
        maxlength:50
    },
    lname:{
        type: String,
        require:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type: String,
        require:true,
        unique:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type: String,
        require:true,
        minlength:5,
        maxlength:1024
    },
    country:{
        type: String,
        require:true
    }
})
freelancerSchema.methods.generateAuthtoken =function(){
    const token = jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:'24h'} )
    return token
}
const Freelancer= mongoose.model("Freelancer", freelancerSchema)

module.exports=Freelancer;