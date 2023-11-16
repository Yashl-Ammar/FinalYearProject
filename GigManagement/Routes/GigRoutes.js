const express=require("express")
const gigRouter=express.Router()
const auth=require("../Middleware/authentication")
const isfreelancer=require("../Middleware/isFreelancer")
const upload = require("../Middleware/multer");
const { createGig,getAllGigs,getGigById,updateGigById,deleteGigById,}=require("../Controller/GigController")
gigRouter.post('/create',auth,isfreelancer,upload,createGig)
gigRouter.post('/update/:id',auth,isfreelancer,updateGigById)
gigRouter.delete('/delete/:id',auth,isfreelancer,deleteGigById)
gigRouter.get('/all',auth,getAllGigs)
gigRouter.get('/:id',auth,getGigById)


module.exports=gigRouter