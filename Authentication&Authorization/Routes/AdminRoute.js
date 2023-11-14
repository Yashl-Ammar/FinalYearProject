const express=require("express")
const adminRouter= express.Router()
const adminSignIn=require("../Controller/AdminController")
adminRouter.post("/signin",adminSignIn)

module.exports=adminRouter;