const Proposal=require('../Models/Proposal')
const getDataUri=require("../utils/dataUri")
const cloudinary=require("../utils/cloudinary")
const Job=require('../Models/Job')
const Freelancer=require('../Models/Freelancer')
const postProposal=async(req,res)=>{
    const{job,bid,requiredTime,revisions,coverLetter,}=req.body

    //const files=req.files

    try{
        // const fileUris = await Promise.all(
        //     files.map(async (file) => {
        //         try {
        //             const fileUri = getDataUri(file);
        //             // Use a folder name based on the file type (e.g., "Order_Documents")
        //             const folderName = "Proposal_Documents";
        //             const uploadOptions = {
        //                 folder: folderName,
        //                 public_id: file.originalname, // Use the original filename for Cloudinary
        //                 resource_type: "raw", // Automatically determine the file type
        //                 use_filename: true, // Use the original filename
        //             };

        //             const result = await cloudinary.uploader.upload(fileUri.content, uploadOptions);

        //             return result.secure_url;
        //         } catch (uploadError) {
        //             console.error("Error uploading file to Cloudinary:", uploadError.message);
        //             throw uploadError; // Rethrow the error to be caught in the catch block below
        //         }
        //     })
        // );
        const proposal=new Proposal({
            job,
            freelancer:req.user._id,
            bid,
            requiredTime,
            revisions,
            coverLetter,
          //  files:fileUris
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
const viewProposalsOnSpecificJob=async(req,res)=>{
    try {
        // Retrieve all proposals
        const proposals = await Proposal.find({job:req.params.jobId}).populate('freelancer',"profilepic fname lname country rating");
        const clientCheck=await Job.findById(req.params.jobId).populate('client','_id')
        if(!proposals)
        {
            res.status(404).send("Proposal Not Found")
        }
        else{
            if(clientCheck.client._id==req.user._id)
            {
                res.status(200).send(proposals)
            }
            else{ 
                res.status(500).send("Client Not verified")
            }
            
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
const allproposalByFreelancer=async(req,res)=>{
    try {
        // Retrieve all proposals
        const proposals = await Proposal.find({freelancer:req.user._id}).populate('freelancer','profilepic fname lname country rating');
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
const viewSpecificProposal=async(req,res)=>{
    try {
        // Retrieve all proposals
        const proposals = await Proposal.findById(req.params.proposalId).populate('freelancer',"profilepic fname lname country rating skills languages");
        const clientCheck=await Job.findById(proposals.job).populate('client','_id')
        if(!proposals)
        {
            res.status(404).send("Proposal Not Found")
        }
        else{
            if(clientCheck.client._id==req.user._id || proposal.freelancer==req.user._id )
            {
                res.status(200).send(proposals)
            }
            else{ 
                res.status(500).send("Client Not verified")
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
module.exports={postProposal,editProposal,viewSpecificProposal,getAllProposals,viewProposalsOnSpecificJob,allproposalByFreelancer,deleteProposal}