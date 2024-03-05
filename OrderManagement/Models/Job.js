const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Reference to the client who placed the order
      required: true,
    },
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
        type: Number,
        required: true,
    },
    budgetType:{
      type: String,
      required: true,
    },
    jobStatus:{
      type:String,
      default:"Active"
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
    },
    dislikeCount: { 
      type: Number,
      default: 0, 
    },
    projectStatus: { 
      type: String,
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
