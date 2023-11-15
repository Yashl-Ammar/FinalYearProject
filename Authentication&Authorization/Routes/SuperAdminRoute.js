const express=require("express")
const superadminRouter= express.Router()
const {createAdmin,superadminSignIn}=require("../Controller/SuperAdminController")
superadminRouter.post("/createadmin",createAdmin)
superadminRouter.post("/signin",superadminSignIn)

module.exports=superadminRouter;