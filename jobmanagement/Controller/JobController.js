const Job=require("../Models/Job")
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
  const getJobs = async (req, res) => {
    try {
      const jobs = await Job.find(); // Retrieve all jobs
      res.status(200).json(jobs);
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
      await Job.findByIdAndRemove(jobId);
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
     getJobs,
     getSpecifiJobs
   }