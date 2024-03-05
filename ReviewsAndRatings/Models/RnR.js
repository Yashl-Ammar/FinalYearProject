const mongoose=require("mongoose")

const rnrSchema= new mongoose.Schema({
    freelancer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Freelancer", // Reference to the freelancer providing the service
        required: true,
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Client",
        require:true
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true
    },
    isclient:{
        type:Boolean,
        default:false
    },
    isfreelancer:{
        type:Boolean,
        default:false
    }

},
{ timestamps: true }
)

const RnR= mongoose.model("RnR",rnrSchema)

module.exports=RnR