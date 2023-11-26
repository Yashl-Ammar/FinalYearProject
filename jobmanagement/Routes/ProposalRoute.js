const express=require("express")
const proposalRouter=express.Router()
const verifyuserloggedIn=require("../Middleware/authentication")
const isfreelancer=require("../Middleware/isFreelancer")
const {postProposal,editProposal,getAllProposals,viewProposalsOnSpecificJob,allproposalByFreelancer,deleteProposal}=require("../Controller/ProposalController")
const arrayUpload = require("../Middleware/multer")
const isClient = require("../Middleware/isClient")
proposalRouter.post('/post',verifyuserloggedIn,isfreelancer,arrayUpload,postProposal)
proposalRouter.get('/allproposal',verifyuserloggedIn,isClient,getAllProposals)
proposalRouter.get('/allproposalByFreelancer',verifyuserloggedIn,isfreelancer,allproposalByFreelancer)
proposalRouter.get('/viewProposalsOnSpecificJob/:jobId',verifyuserloggedIn,isClient,viewProposalsOnSpecificJob)
proposalRouter.put("/edit/:proposalId",verifyuserloggedIn,isfreelancer,arrayUpload,editProposal)
proposalRouter.delete("/delete/:proposalId",verifyuserloggedIn,isfreelancer,deleteProposal)
module.exports=proposalRouter