const Client = require("../Models/Client");
const Freelancer = require("../Models/Freelancer");
const Order=require("../Models/order")
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

const placeOrder = async (req, res) => {
    const { type, orderStatus, paymentMethod, paymentStatus, price, revisions, activities } = req.body;
   

    const clientId = req.params.clientId;
    const freelancerId = req.params.freelancerId;
    const client = await Client.findById(clientId);
    // Get the uploaded files
    const files = req.files;

    if (!client) return res.status(400).send("Client Doesn't Exist Anymore");
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) return res.status(400).send("Freelancer Doesn't Exist Anymore");

    const fileUris = await Promise.all(
        files.map(async (file) => {
          const fileUri = getDataUri(file);
          const mycloud = await cloudinary.uploader.upload(fileUri.content);
          return mycloud.secure_url;
        })
      );

    const order = new Order({
        freelancer: freelancer._id,
        client: client._id,
        type,
        orderStatus,
        paymentMethod,
        paymentStatus,
        price,
        revisions,
        activities,
        files: fileUris, // Store the Cloudinary URLs in the 'files' field
    });

    const orderSaved = await order.save();

    res.send(orderSaved);
};

module.exports = placeOrder;
