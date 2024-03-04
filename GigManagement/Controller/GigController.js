const Gig = require("../Models/Gig");
const Freelancer=require("../Models/Freelancer")
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");
const bodyParser = require("body-parser");
const Client = require("../Models/Client");
const freelancerName=async(req,res)=>{
  try{
    const id=req.user._id
    const freelancer=await Freelancer.find({id})
    res.json({freelancer})

  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const namegetter = async (req, res) => {
  try {
    const clientId = req.user._id;
    const { freelancerId } = req.params;

    const client = await Client.findById(clientId);
    const freelancer = await Freelancer.findById(freelancerId);

    if (!client || !freelancer) {
      res.status(404).json({ error: 'Client or freelancer not found' });
      return;
    }

    // Assuming 'fname' and 'lname' are properties of both client and freelancer
    const response = {
      clientId: client._id,
      freelancerId:freelancer._id,
      client_fname: client.fname,
      client_lname: client.lname,
      freelancer_fname: freelancer.fname,
      freelancer_lname: freelancer.lname,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchGig = async (req, res) => {
  try {
    const search = req.body.search;
    const gigs = await Gig.find({
      $or: [
        { title: { $regex: new RegExp(search, 'i') } },
        { skills: { $in: search } }
      ]
    }).populate('freelancer','fname lname rating completedOrder profilepic');

    res.json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const createGig = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const { title, skills, description, basic, standard, premium } = data;
    const files = req.files; // Use req.files to get an array of files
    const fileUris = await Promise.all(
      files.map(async (file) => {
        const fileUri = getDataUri(file);
        const mycloud = await cloudinary.uploader.upload(fileUri.content);
        return mycloud.secure_url;
      })
    );

    // Create a new Gig with the uploaded file details
    const gig = new Gig({
      freelancer:req.user._id,
      title,
      skills,
      description,
      basic,
      standard,
      premium,
      file: fileUris, // Use the array of secure_urls from Cloudinary
    });

    // Save the Gig to the database
    gig.save().then((savedGig) => {
      res.status(201).json(savedGig);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to post the Gig' });
  }
};
const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({}).populate('freelancer','fname lname rating completedOrder profilepic');
    res.status(200).json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve gigs' });
  }
};

const viewGigsByFreelancer = async (req, res) => {
  try {
    const gigs = await Gig.find({ freelancer: req.user._id }).populate('freelancer','fname lname rating completedOrder profilepic');
      
    console.log(gigs);

    if (!gigs || gigs.length === 0) {
      return res.status(404).json({ error: 'Gigs not found for this freelancer' });
    }

    res.status(200).json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve gigs for the freelancer' });
  }
};

const updateGigById = async (req, res) => {
  const { id } = req.params;
  const updateFields = JSON.parse(req.body.data);
  const { title, skills, description, basic, standard, premium }=updateFields
  const files = req.files; // Use req.files to get an array of files

  try {
    const fileUris = await Promise.all(
      files.map(async (file) => {
        const fileUri = getDataUri(file);
        const mycloud = await cloudinary.uploader.upload(fileUri.content);
        return mycloud.secure_url;
      })
    );

    // Update Gig fields along with the new pictures
    const updatedGig = await Gig.findByIdAndUpdate(
      id,
      {
        title,
        skills,
        description,
        basic,
        premium,
        standard,
        file: fileUris, // Use the array of secure_urls from Cloudinary
      },
      { new: true }
    );

    if (!updatedGig) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    res.status(200).json(updatedGig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the gig' });
  }
};
const deleteGigById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGig = await Gig.findByIdAndDelete(id);
    if (!deletedGig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.status(200).json(deletedGig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the gig' });
  }
};
const viewSpecificGigByClient=async(req,res)=>{
  const { gigId } = req.params;

  try {
    const specificGig = await Gig.findById(gigId).populate('freelancer','fname lname rating completedOrder languages education skills profilepic');
    if (!specificGig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.status(200).json(specificGig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the gig' });
  }
}
const viewSpecificGigByFreelancer=async(req,res)=>{
  const { gigId } = req.params;

  try {
    const specificGig = await Gig.findById(gigId).populate('freelancer','fname lname rating completedOrder languages education skills profilepic');
    if (!specificGig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.status(200).json(specificGig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the gig' });
  }
}
module.exports = {
  createGig,
  getAllGigs,
  updateGigById,
  deleteGigById,
  viewGigsByFreelancer,
  viewSpecificGigByClient,
  viewSpecificGigByFreelancer,
  searchGig,
  freelancerName,
  namegetter
};

