const Freelancer=require('../Models/Freelancer')
const getDataUri = require("../utils/dataUri");
const cloudinary=require("../utils/cloudinary")
const freelancerEditProfile=async(req,res)=>{
    const id=req.user._id
    const{username,tagline,description,country,languages,skills,education}=req.body
    const profilepic=req.file;
    let freelancer= await Freelancer.findById(id)
    if(!freelancer) return res.status(404).send("Freelancer Not found")
    const fileUri=getDataUri(profilepic)
    const mycloud= await cloudinary.uploader.upload(fileUri.content)  

    freelancer.username=username
    freelancer.tagline=tagline
    freelancer.description=description
    freelancer.languages=languages
    freelancer.country=country
    freelancer.skills=skills
    freelancer.education=education
    freelancer.profilepic=mycloud.secure_url

    freelancer.save()
    res.send(freelancer)
}

module.exports=freelancerEditProfile