const express = require('express');
const jobrouter = express.Router();
const {postjob,deleteJob,updateJob,getAllJobs,getJobs} = require("../Controller/JobController");

// Define the route for creating a job (POST request)
jobrouter.post("/create", postjob);
jobrouter.delete("/delete/:id", deleteJob);
jobrouter.put("/update/:id", updateJob);
jobrouter.get("/all", getAllJobs);
jobrouter.get("/get/:id", getJobs);

module.exports = jobrouter;