const express = require('express');
const jobrouter = express.Router();
const {postjob,deleteJob,updateJob,getAllJobs,getJob,getSpecifiJobs} = require("../Controller/JobController");
const verifyuserloggedIn= require("../Middleware/authentication")
const isClient =require("../Middleware/isClient")
const isfreelancer=require("../Middleware/isFreelancer")

jobrouter.post("/create",verifyuserloggedIn,isClient,postjob);
jobrouter.delete("/delete/:id",verifyuserloggedIn,isClient, deleteJob);
jobrouter.put("/update/:id",verifyuserloggedIn,isClient, updateJob);
jobrouter.get("/getPostedJobsByClient",verifyuserloggedIn,isClient,getSpecifiJobs)
jobrouter.get("/all",verifyuserloggedIn,isfreelancer, getAllJobs);
jobrouter.get("/getSpecificJob/:jobId",verifyuserloggedIn, getJob);

module.exports = jobrouter;