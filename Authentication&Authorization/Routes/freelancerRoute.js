const express =require("express")
const freelancerRouter=express.Router()
const {freelancerSignup,freelancerSignin}=require("../Controller/FreelancerController")
freelancerRouter.post("/signup",freelancerSignup)
freelancerRouter.post("/signin",freelancerSignin)
module.exports=freelancerRouter;