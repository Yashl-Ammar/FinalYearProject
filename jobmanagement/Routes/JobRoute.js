const express = require('express');
const jobrouter = express.Router();
const {postjob,deleteJob,updateJob,getAllJobs,getJobs} = require("../Controller/JobController");
const verifyuserloggedIn= require("../Middleware/authentication")
const isClient =require("../Middleware/isClient")
// Define the route for creating a job (POST request)
jobrouter.post("/create",verifyuserloggedIn,isClient,postjob);
jobrouter.delete("/delete/:id",verifyuserloggedIn,isClient, deleteJob);
jobrouter.put("/update/:id",verifyuserloggedIn,isClient, updateJob);
jobrouter.get("/all",verifyuserloggedIn, getAllJobs);
jobrouter.get("/get/:id",verifyuserloggedIn, getJobs);

module.exports = jobrouter;