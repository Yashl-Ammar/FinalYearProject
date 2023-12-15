const mongoose= require("mongoose")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const adminSchema=new mongoose.Schema({
    fname:{
        type: String,
        require:true,
    },
    lname:{
        type: String,
        require:true,

    },
    email:{
        type: String,
        require:true,
        unique:true,
 
    },
    password:{
        type: String,
        require:true,
    },
    country:{
        type: String,
        require:true
    },
    isBanned:{
        type: Boolean,
        default:false,
    }
},
{ timestamps: true })
adminSchema.methods.generateAuthtoken =function(){
    const token = jwt.sign({_id:this._id,role:"admin"},process.env.SECRET_KEY ,{expiresIn:'24h'} )
    return token
}
const Admin= mongoose.model("Admin",adminSchema )
module.exports=Admin;