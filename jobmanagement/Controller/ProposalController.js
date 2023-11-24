const Proposal=require('../Models/Proposal')
const getDataUri=require("../utils/dataUri")
const cloudinary=require("../utils/cloudinary")
const postProposal=async(req,res)=>{
    const{job,bid,requiredTime,revisions,coverLetter,}=req.body

    const files=req.files
    try{
        const fileUris = await Promise.all(
            files.map(async (file) => {
                try {
                    const fileUri = getDataUri(file);
                    // Use a folder name based on the file type (e.g., "Order_Documents")
                    const folderName = "Proposal_Documents";
                    const uploadOptions = {
                        folder: folderName,
                        public_id: file.originalname, // Use the original filename for Cloudinary
                        resource_type: "raw", // Automatically determine the file type
                        use_filename: true, // Use the original filename
                    };

                    const result = await cloudinary.uploader.upload(fileUri.content, uploadOptions);

                    return result.secure_url;
                } catch (uploadError) {
                    console.error("Error uploading file to Cloudinary:", uploadError.message);
                    throw uploadError; // Rethrow the error to be caught in the catch block below
                }
            })
        );
        const proposal=new Proposal({
            job,
            freelancer:req.user._id,
            bid,
            requiredTime,
            revisions,
            coverLetter,
            files:fileUris
        })

        const proposalSaved=await proposal.save()
        res.send(proposalSaved)
    }catch(err){
        console.error("Error:", err.message);
        res.status(500).send("Internal Server Error");
    }
  
}
const editProposal = async (req, res) => {

    const { bid, requiredTime, revisions, coverLetter } = req.body;
    const files = req.files;

    try {
        const fileUris = await Promise.all(
            files.map(async (file) => {
                try {
                    const fileUri = getDataUri(file);
                    const folderName = 'Proposal_Documents';
                    const uploadOptions = {
                        folder: folderName,
                        public_id: file.originalname,
                        resource_type: 'raw',
                        use_filename: true,
                    };

                    const result = await cloudinary.uploader.upload(fileUri.content, uploadOptions);
                    return result.secure_url;
                } catch (uploadError) {
                    console.error('Error uploading file to Cloudinary:', uploadError.message);
                    throw uploadError;
                }
            })
        );

        // Find the existing proposal by jobId and update its fields
        const existingProposal = await Proposal.findById(req.params.proposalId)
        console.log(existingProposal)
        if (!existingProposal) {
            return res.status(404).send('Proposal not found');
        }

        existingProposal.bid = bid;
        existingProposal.requiredTime = requiredTime;
        existingProposal.revisions = revisions;
        existingProposal.coverLetter = coverLetter;
        existingProposal.files = fileUris;

        const updatedProposal = await existingProposal.save();
        res.send(updatedProposal);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send('Internal Server Error');
    }
};

const getAllProposals = async (req, res) => {
    try {
        // Retrieve all proposals
        const proposals = await Proposal.find();
        res.send(proposals);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};
const viewSpecifcProposal=async(req,res)=>{
    try {
        // Retrieve all proposals
        const proposals = await Proposal.findById(req.params.jobId);
        res.send(proposals);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
const allproposalByFreelancer=async(req,res)=>{
    try {
        // Retrieve all proposals
        const proposals = await Proposal.findById(req.user._id);
        res.send(proposals);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    } 
}

const deleteProposal = async (req, res) => {
    const proposalId = req.params.id; // Assuming the ID is passed in the URL parameters

    try {
        // Find the proposal by ID and delete it
        const deletedProposal = await Proposal.findByIdAndDelete(proposalId);

        if (!deletedProposal) {
            return res.status(404).send('Proposal not found');
        }
        res.send(deletedProposal);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};
module.exports={postProposal,editProposal,getAllProposals,viewSpecifcProposal,allproposalByFreelancer,deleteProposal}