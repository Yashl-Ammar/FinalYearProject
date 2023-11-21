const Gig = require("../Models/Gig");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

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
    const gigs = await Gig.find();
    res.status(200).json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve gigs' });
  }
};

const getGigById = async (req, res) => {
  const { id } = req.params;

  try {
    const gig = await Gig.findById(id);
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
  const updateFields = req.body;

  try {
    const updatedGig = await Gig.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
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

module.exports = {
  createGig,
  getAllGigs,
  getGigById,
  updateGigById,
  deleteGigById,
};

