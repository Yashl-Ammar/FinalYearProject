const mongoose= require("mongoose")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const superadminSchema=new mongoose.Schema({
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
    },
    isBanned:{
        type: Boolean,
        default:false,
    }
})
superadminSchema.methods.generateAuthtoken =function(){
    const token = jwt.sign({_id:this._id,role:"superAdmin"},process.env.SECRET_KEY ,{expiresIn:'24h'} )
    return token
}
const SuperAdmin= mongoose.model("SuperAdmin",superadminSchema )
module.exports=SuperAdmin;