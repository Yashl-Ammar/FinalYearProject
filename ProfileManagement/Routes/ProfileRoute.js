const express=require('express')
const profileRouter=express.Router()
const singleupload=require("../Middleware/multer")
const {adminEditProfile,getAdminData}=require('../Controller/ProfileAdminController')
const {SuperAdminEditProfile,getSuperAdminData}=require('../Controller/ProfileSuperAdminController')
const {clientEditProfile,getClientData}=require('../Controller/ProfileClientController')
const {freelancerEditProfile,getFreelanceData}=require('../Controller/ProfileFreelancerController')
const verifyuserloggedIn=require("../Middleware/authentication")
const isAdmin=require("../Middleware/isAdmin")
const isClient=require('../Middleware/isClient')
const isSuperAdmin=require('../Middleware/isSuperAdmin')
const isFreelancer=require('../Middleware/isFreelancer')
const singleUpload = require('../Middleware/multer')

profileRouter.get('/getSuperAdminData',verifyuserloggedIn,isSuperAdmin,getSuperAdminData)
profileRouter.get('/getAdminData',verifyuserloggedIn,isAdmin,getAdminData)
profileRouter.get('/getFreelancerData',verifyuserloggedIn,isFreelancer,getFreelanceData)
profileRouter.get('/getClientData',verifyuserloggedIn,isClient,getClientData)
profileRouter.put('/adminEditProfile',verifyuserloggedIn,isAdmin,adminEditProfile)
profileRouter.put('/superAdminEditProfile',verifyuserloggedIn,isSuperAdmin,SuperAdminEditProfile)
profileRouter.put('/clientEditprofile',verifyuserloggedIn,isClient,singleupload,clientEditProfile)
profileRouter.put('/freelancerEditProfile',verifyuserloggedIn,isFreelancer,singleUpload,freelancerEditProfile)

module.exports=profileRouter