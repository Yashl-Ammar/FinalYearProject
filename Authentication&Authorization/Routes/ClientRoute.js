const express=require("express")
const clientRouter= express.Router()
const {clientSignup,clientSignIn, editProfile}=require("../Controller/ClientController")
const singleupload=require("../Middleware/multer")
clientRouter.post("/signup",clientSignup)
clientRouter.post("/signin",clientSignIn)
clientRouter.post("/editprofile",singleupload,editProfile)
module.exports=clientRouter;