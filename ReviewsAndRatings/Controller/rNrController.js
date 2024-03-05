const Freelancer = require("../Models/Freelancer")
const RnR=require("../Models/RnR")
const Client=require("../Models/Client")
const tofreelancer = async (req, res) => {
    try {
      const freelancerId = req.params.freelancerId;
      const { rating, review } = req.body;
      const freelancer = await Freelancer.findById(freelancerId);
  
      if (freelancer.totalRatings < 1 ) { 
        freelancer.rating = ((Number(rating) + freelancer.rating) / (freelancer.totalRatings + 1));
      } else {
        freelancer.rating= ((Number(rating) + (freelancer.rating*freelancer.totalRatings)) / (freelancer.totalRatings + 1))
      }
  
      const rNr = new RnR({
        client: req.user._id,
        freelancer: freelancerId,
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
    const client = await Client.findById(clientId);

    if (client.totalRatings < 1 ) { 
      client.rating = ((Number(rating) + client.rating) / (client.totalRatings + 1));
    } else {
      client.rating= ((Number(rating) + (client.rating*client.totalRatings)) / (client.totalRatings + 1))
    }

    const rNr = new RnR({
      client: clientId,
      freelancer: req.user._id,
      rating,
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

module.exports={
    tofreelancer,
    toclient
}