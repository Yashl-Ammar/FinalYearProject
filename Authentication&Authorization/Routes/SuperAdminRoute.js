const express=require("express")
const superadminRouter= express.Router()
const {createAdmin,superadminSignIn,createSuperAdmin}=require("../Controller/SuperAdminController")
superadminRouter.post("/createadmin",createAdmin)
superadminRouter.post("/signin",superadminSignIn)
superadminRouter.post("/create",createSuperAdmin)

module.exports=superadminRouter;