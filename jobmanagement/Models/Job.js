const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], 
    },
    amount: {
        type: mongoose.Decimal128,
        required: true,
    },
    budgetType:{
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    location:{
      type:String,
      required:true
    },
    paymentVerify: {
      type: String,
      required: true,
    },
    dislikeCount: { 
      type: Number,
      default: 0, 
    },
    projectStatus: { 
      type: String,
      required:true
    },
    category:{
      type:String,
      required:true
    },
    bookmarkCount: { 
      type: Number,
      default: 0, 
    },
    numberOfProposals: { 
      type: Number,
      default: 0, 
    },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", JobSchema);

module.exports = Jobs;
