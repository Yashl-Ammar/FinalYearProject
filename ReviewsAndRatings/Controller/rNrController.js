const Freelancer = require("../Models/Freelancer")
const RnR=require("../Models/RnR")
const Order=require("../Models/order")
const Client=require("../Models/Client")
const tofreelancer = async (req, res) => {
    try {
      const freelancerId = req.params.freelancerId;
      const orderId=req.params.orderId
      const { rating, review } = req.body;
      const freelancer = await Freelancer.findById(freelancerId);
      const order=await Order.findById(orderId)
      const checkRnR=await RnR.findOne({client:req.user._id,freelancer:freelancerId,order:order._id})
      if(checkRnR && checkRnR.isclient) return res.status(400).send("You have already gave Reviews and Rating to this Account")
      console.log(checkRnR)
      if (freelancer.totalRatings < 1 ) { 
        freelancer.rating = ((Number(rating) + freelancer.rating) / (freelancer.totalRatings + 1));
      } else {
        freelancer.rating= ((Number(rating) + (freelancer.rating*freelancer.totalRatings)) / (freelancer.totalRatings + 1))
      }
  
      const rNr = new RnR({
        client: req.user._id,
        freelancer: freelancerId,
        order:order._id,
        rating,
        review,
        isclient: true
      });
  
      freelancer.totalRatings++;
      
      // Save the RnR and Freelancer documents asynchronously
      const [savedRnR, savedFreelancer] = await Promise.all([rNr.save(), freelancer.save()]);
  
      // Respond with the saved RnR document
      res.status(201).json(savedRnR);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const toclient=async(req,res)=>{
  try {
    const clientId = req.params.clientId;
    const { rating, review } = req.body;
    const orderId=req.params.orderId
    
    const client = await Client.findById(clientId);
    const order=await Order.findById(orderId)
    const checkRnR=await RnR.findOne({client:clientId,freelancer:req.user._id,order:order._id})
    if(checkRnR && checkRnR.isfreelancer ) return res.status(400).send("You have already gave Reviews and Rating to this Account")
    if (client.totalRatings < 1 ) { 
      client.rating = ((Number(rating) + client.rating) / (client.totalRatings + 1));
    } else {
      client.rating= ((Number(rating) + (client.rating*client.totalRatings)) / (client.totalRatings + 1))
    }

    const rNr = new RnR({
      client: clientId,
      freelancer: req.user._id,
      rating,
      order:order._id,
      review,
      isfreelancer: true
    });

    client.totalRatings++;
    
    // Save the RnR and Freelancer documents asynchronously
    const [savedRnR] = await Promise.all([rNr.save(), client.save()]);

    // Respond with the saved RnR document
    res.status(201).json(savedRnR);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const CheckFreelancerToClient=async(req,res)=>{
  try {
    const clientId = req.params.clientId;
    const orderId=req.params.orderId
    const order=await Order.findById(orderId)
    const checkRnR=await RnR.findOne({$and:[{client:clientId},{freelancer:req.user._id},{order:order._id}]})
    if(checkRnR && checkRnR.isfreelancer) return res.status(400).send("You have already gave Reviews and Rating to this Account")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const viewFreelancerRnR = async (req, res) => {
  try {
    const freelancerId = req.user._id;
    const rnr = await RnR.find({ $and: [{ freelancer: freelancerId }, { isclient: true }] });
    res.send(rnr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const viewClientRnR=async(req,res)=>{
  try {
    const clientId = req.user._id;
    const rnr = await RnR.find({ $and: [{ client: clientId }, { isfreelancer: true }] });
    res.send(rnr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const viewFreelancerRnrByClient=async(req,res)=>{
  try {
    const freelancerId=req.params.freelancerId
    const rnr = await RnR.find({ $and: [{ freelancer: freelancerId }, { isclient: true }] }).populate('client',"fname lname");
    res.send(rnr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const viewClientRnrByFreelancer=async(req,res)=>{
  try {
    const clientId=req.params.clientId
    const rnr = await RnR.find({ $and: [{ client: clientId }, { isfreelancer: true }] }).populate('freelancer',"fname lname");
    res.send(rnr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports={
    tofreelancer,
    toclient,
    viewFreelancerRnR,
    viewClientRnR,
    viewFreelancerRnrByClient,
    viewClientRnrByFreelancer,
    CheckFreelancerToClient
}