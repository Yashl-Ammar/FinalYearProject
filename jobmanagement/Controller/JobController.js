const Job=require("../Models/Job")
const Client=require('../Models/Client')
const postjob = async (req, res) => {
    try {
      // Assuming these fields come from a request body
      const { title, description, skills, amount,budgetType, difficulty, location,category } = req.body;
      
      // Create a new job posting
      const newJob = new Job({
        client:req.user._id,
        title,
        description,
        skills,
        amount,
        budgetType,
        difficulty,
        location,
        category
        // Set other fields as needed
      });
      // Save the job to the database and await the result
      const savedJob = await newJob.save();
      //Respond with the saved job
     res.status(201).json(savedJob);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to post the job' });
    }
  };
  const getJob= async (req, res) => {
    try {
      const job = await await Job.findById(req.params.jobId).populate('client',"paymentStatus noOfJobPosted totalSpending rating country"); // Retrieve all jobs
      if(!job)
      {
        res.status(404).send("Job Not Found")
      }
      else{
        if(job.jobStatus==="Removed" && job.client!=req.user._id)
        {
          res.send(404).send("Job Removed")
        }else{
          res.status(200).send(job)
        }
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get jobs' });
    }
  };
  const updateJob = async (req, res) => {
    const jobId = req.params.id; // Assuming the job ID is part of the URL
    try {
      const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
      res.status(200).json(updatedJob);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update the job' });
    }
  };
  
  const deleteJob = async (req, res) => {
    const jobId = req.params.id; // Assuming the job ID is part of the URL
    try {
      const job=await Job.findByIdAndUpdate(jobId);
      if(!job){
        res.staus(200).send("Job Not found")
      }else{
        
        job.jobStatus="Removed"

        const JobUpdated=await job.save()
        res.send(JobUpdated)
      }
      res.status(204).end(); // No content to send in response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete the job' });
    }
  };
  const getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find(); // Retrieve all jobs
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get all jobs' });
    }
  };
  const getSpecifiJobs=async(req,res)=>{
    try{
      const jobs = await Job.find({client:req.user._id}) // Retrieve all jobs
      res.status(200).json(jobs);
    }catch(err){
      console.log(err)
      res.status(500).json({err:"Failed to get all jobs of Specific Client"})  
    }
  }
  module.exports = {
     postjob,
     deleteJob,
     updateJob,
     getAllJobs,
     getJob,
     getSpecifiJobs
   }