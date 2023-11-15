const express=require("express")
const clientRouter= express.Router()
const {clientSignup,clientSignIn}=require("../Controller/ClientController")
clientRouter.post("/signup",clientSignup)
clientRouter.post("/signin",clientSignIn)

module.exports=clientRouter;