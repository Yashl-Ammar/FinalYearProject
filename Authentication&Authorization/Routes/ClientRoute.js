const express=require("express")
const clientRouter= express.Router()
const {clientSignup,clientSignin}=require("../Controller/ClientController")
clientRouter.post("/signup",clientSignup)
clientRouter.post("/signin",clientSignin)

module.exports=clientRouter;