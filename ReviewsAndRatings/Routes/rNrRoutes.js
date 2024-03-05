const express=require("express")
const rNrRouter=express.Router()
const auth=require("../Middleware/authentication")
const isClient=require("../Middleware/isClient")
const isFreelancer=require("../Middleware/isFreelancer")
const {tofreelancer,toclient}=require("../Controller/rNrController")
rNrRouter.post("/tofreelancer/:freelancerId",auth,isClient,tofreelancer)
rNrRouter.post("/toclient/:clientId",auth,isFreelancer,toclient)
module.exports=rNrRouter