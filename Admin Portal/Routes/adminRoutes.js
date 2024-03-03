const express=require("express")
const adminRouter=express.Router()
const auth=require("../Middleware/authentication")
const isAdmin=require("../Middleware/isAdmin")
const {dashboardInformation,topfreelancer,reportInformation,getAllReports}=require("../Controller/adminController")

adminRouter.get('/dashboard',auth,isAdmin,dashboardInformation)
adminRouter.get('/topFreelancers',auth,isAdmin,topfreelancer)
adminRouter.get('/reportsInformation',auth,isAdmin,reportInformation)
adminRouter.get('/getReports',auth,isAdmin,getAllReports)

module.exports= adminRouter