const Gig = require("../Models/Gig");
const Freelancer=require("../Models/Freelancer")
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");
const bodyParser = require("body-parser");
const searchGig = async (req, res) => {
  try {
    const search = req.body.search;
    // Assuming skills are provided in the request body
    // Using the $regex operator to perform a case-insensitive search on the title
    const gigs = await Gig.find({
      $or: [
        { title: { $regex: new RegExp(search, 'i') } },
        { skills: { $in: search } }
      ]
    });

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
  const { id } = req.params;
  try {
    const gig = await Gig.findById({freelancer:req.user._id}).populate('freelancer','fname lname rating completedOrder profilepic');
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.status(200).json(gig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve the gig' });
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
  searchGig
};

