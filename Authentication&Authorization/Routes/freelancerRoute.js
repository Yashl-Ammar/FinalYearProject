const express =require("express")
const freelancerRouter=express.Router()
const {freelancerSignup,freelancerSignin,editProfile}=require("../Controller/FreelancerController")
const singleupload=require("../Middleware/multer")
freelancerRouter.post("/signup",freelancerSignup)
freelancerRouter.post("/signin",freelancerSignin)
freelancerRouter.post("/editprofile",singleupload,editProfile)
module.exports=freelancerRouter;