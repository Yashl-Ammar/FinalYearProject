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
  
      res.json({
        clientCount,
        freelancerCount,
        orderCount,
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

module.exports={
    dashboardInformation,
    topfreelancer,
    reportInformation

}