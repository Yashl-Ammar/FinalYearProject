const mongoose= require("mongoose")

const reportSchema=new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client", // Reference to the client who placed the order
    },
    freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    details:{
        type:String,
        required:true
    },
    links:{
        type:[String],
        required:true
    },
    type:{
        type:String,
    },
    reportStatus:{
        type:String,
        default:"Initiated"
    }
},
{ timestamps: true }
)

const Report= mongoose.model("Report",reportSchema )
module.exports=Report;