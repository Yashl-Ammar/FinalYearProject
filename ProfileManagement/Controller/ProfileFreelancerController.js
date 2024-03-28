const Freelancer=require('../Models/Freelancer')
const getDataUri = require("../utils/dataUri");
const cloudinary=require("../utils/cloudinary")

const getFreelanceData=async(req,res)=>{
    const id=req.user._id
    let freelancer= await Freelancer.findById(id)
    if(!freelancer) return res.status(404).send("Freelancer Not found")
    res.send(freelancer)
}
const freelancerEditProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const { fname, lname, languages, skills, education } = req.body;
        const profilepic = req.file;
        console.log(profilepic);
        
        let freelancer = await Freelancer.findById(id);
        if (!freelancer) return res.status(404).send("Freelancer Not found");

        const fileUri = getDataUri(profilepic);
        const mycloud = await cloudinary.uploader.upload(fileUri.content);

        freelancer.fname = fname;
        freelancer.lname = lname;
        freelancer.languages = languages;
        freelancer.skills = skills;
        freelancer.education = education;
        freelancer.profilepic = mycloud.secure_url;

        await freelancer.save(); // Await the save operation

        res.send(freelancer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports={freelancerEditProfile,getFreelanceData}