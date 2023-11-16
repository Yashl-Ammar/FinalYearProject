const Freelancer=require("../Models/Freelancer")
const _=require("lodash")
const cloudinary=require("../utils/cloudinary")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri");
const freelancerSignup= async(req,res)=>{
    const{fname,lname,email,password,country}=req.body

    let freelancer= await Freelancer.findOne({email})
    if(freelancer) return res.status(400).send("Account Already Exists")

    freelancer = new Freelancer({
        fname,
        lname,
        email,
        password,
        country
    }) 
    const salt= await bcrypt.genSalt(10)
    freelancer.password=await bcrypt.hash(freelancer.password,salt)
    await freelancer.save()
    res.send(_.pick(freelancer,["_id","fname","lname","email","country"]))
}
const freelancerSignin=async (req,res)=>{
    const {email,password,rememberMe}=req.body
    let freelancer= await Freelancer.findOne({email})
    if(!freelancer) return res.status(400).send("Invalid Email or Password")

    let validPassword=await bcrypt.compare(password,freelancer.password)
    if(!validPassword)  return res.status(400).send("Invalid Email or Password")
    const token= freelancer.generateAuthtoken(rememberMe)
    res.send(token)
}
const editProfile=async(req,res)=>{
    let token = req.headers["token"];
    if(!token) return res.status(401).send("Access denied. No token provided.")
  
      const decoded=jwt.verify(token,process.env.SECRET_KEY)
      req.user=decoded
      id =req.user._id
      const{username,tagline,description,languages,skills,education}=req.body
      const profilepic=req.file;
      let freelancer= await Freelancer.findById(id)
      if(!freelancer) return res.status(404).send("Freelancer Not found")
      const fileUri=getDataUri(profilepic)
      const mycloud= await cloudinary.uploader.upload(fileUri.content)  
        
      freelancer.username=username
      freelancer.languages=languages
      freelancer.tagline=tagline
      freelancer.description=description
      freelancer.skills=skills
      freelancer.education=education
      freelancer.profilepic=mycloud.secure_url

      freelancer.save()

      res.send(freelancer)

    
}
module.exports={freelancerSignup,freelancerSignin,editProfile};