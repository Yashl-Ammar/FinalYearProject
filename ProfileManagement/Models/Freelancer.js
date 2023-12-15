const mongoose= require("mongoose")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const freelancerSchema =new mongoose.Schema({
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
    },
    username:{
        type:String,
    },
    tagline:{
        type:String,
  
    },
    description:{
        type:String,
    
    },
    languages:{
        type:[String]
    },
    skills:{
        type:[String]
    },
    education:{
        type:[String]
    },
    profilepic:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    completedOrder:{
        type:Number,
        default:0
    }
},
    { timestamps: true }
)
freelancerSchema.methods.generateAuthtoken =function(rememberMe){
    if(rememberMe)
    {
        expiresIn="720h"
    }
    else
    {
        expiresIn='4h'
    }
    const token = jwt.sign({_id:this._id,role:"freelancer"},process.env.SECRET_KEY,{expiresIn:expiresIn} )
    return token
}
const Freelancer= mongoose.model("Freelancer", freelancerSchema)

module.exports=Freelancer;