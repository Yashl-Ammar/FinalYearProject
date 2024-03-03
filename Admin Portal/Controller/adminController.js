const Gig =require("../Models/Gig")
const Freelancer=require("../Models/Freelancer")
const Client=require("../Models/Client")
const Admin=require("../Models/Admin")
const Order=require("../Models/order")
const Reports=require("../Models/Report")
const dashboardInformation = async (req, res) => {
    try {
      const clientCount = await Client.countDocuments();
      const freelancerCount = await Freelancer.countDocuments();
      const orderCount = await Order.countDocuments();
      const admins=await Admin.countDocuments()
      const totalusers=clientCount+freelancerCount
      res.json({
        clientCount,
        freelancerCount,
        orderCount,
        totalusers,
        admin
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const topfreelancer = async (req, res) => {
    try {
      const freelancers = await Freelancer.find({
        $or: [
          { rating: { $gte: 4.5 } },
          { completedOrder: { $gt: 5 } }
        ]
      });
  
      res.status(200).json(freelancers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve top freelancers' });
    }
  };
const reportInformation=async(req,res)=>{
    try {
        const reports = await Reports.countDocuments();
        res.json({
        reports
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
const getAllReports=async(req,res)=>{
    try{
        const reports= await Reports.find()
        res.json({reports})
        
    }catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getAllUsers = async (req, res) => {
    try {
      const clients = await Client.find();
      const freelancers = await Freelancer.find();
  
      // Combine clients and freelancers into a single array
      const allUsers = [...clients, ...freelancers];
  
      // Sort the combined array by creation time in ascending order
      allUsers.sort((a, b) => a.createdAt - b.createdAt);
  
      res.json({ allUsers });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const getAllAdmins=async(req,res)=>{
    try {
        const admins = await Admin.find().sort();
        res.json(admins)
       
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
  
module.exports={
    dashboardInformation,
    topfreelancer,
    reportInformation,
    getAllReports,
    getAllUsers,
    getAllAdmins
}