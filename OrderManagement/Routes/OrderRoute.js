const express=require("express")
const orderRouter=express.Router()
const verifyuserloggedIn= require("../Middleware/authentication")
const isClient =require("../Middleware/isClient")
//const isFreelancer=require("../Middleware/isFreelancer")
const arrayUpload=require("../Middleware/multer")
const placeOder=require("../Controller/OrderController")

orderRouter.post("/placeOrder/:freelancerId/:clientId",verifyuserloggedIn,isClient,arrayUpload,placeOder)
module.exports =orderRouter