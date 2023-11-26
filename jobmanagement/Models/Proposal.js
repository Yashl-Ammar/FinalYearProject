const mongoose = require("mongoose");

const proposalSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs", // Reference to the Job 
      required: true,
    },
    freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer", // Reference to the freelancer 
        required:true,
    },
    bid:{
        type:Number,
        required:true
    },
    requiredTime:{
        type:String,
        require:true
    },
    revisions:{
        type:Number,
        required:true,
    },
    coverLetter:{
        type:String,
        required:true
    },
    files:{
        type:[String]
    },
    pinned:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
