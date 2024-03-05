const mongoose= require("mongoose")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const clientSchema=new mongoose.Schema({
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
    languages:{
        type:[String]
    },
    profilepic:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    paymentStatus:{
        type:String,
        default:"Unverified"
    },
    noOfJobPosted:{
        type:Number,
        default:0
    },
    totalSpending:{
        type:Number,
        default:0
    },
    totalRatings:{
        type:Number,
        default:0
    }
},
{ timestamps: true }
)
clientSchema.methods.generateAuthtoken =function(rememberMe){
    
    if(rememberMe)
    {
        expiresIn="720h"
    }
    else
    {
        expiresIn='4h'
    }
    const token = jwt.sign({_id:this._id,role:'client'},process.env.SECRET_KEY ,{expiresIn:expiresIn} )
    return token
}
const Client= mongoose.model("Client",clientSchema )
module.exports=Client;