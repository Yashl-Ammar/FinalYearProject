// OrderController.js
const Client = require("../Models/Client");
const Freelancer = require("../Models/Freelancer");
const Order = require("../Models/order");
const cloudinary = require("../utils/cloudinary");
const Job=require("../Models/Job")
const getDataUri = require("../utils/dataUri");

const placeOrder = async (req, res) => {
    let { title,description,type,jobId,orderStatus, paymentMethod, paymentStatus, price, revisions, activities } = req.body;
    // const files = req.files;
    if(type=="Job Order"){
        const job =await Job.findOneAndDelete({_id:jobId})
        // const job =await Job.findById(jobId)
        title=job.title
        description=job.description
    }
    const clientId = req.user._id;
    const freelancerId = req.params.freelancerId;
    const client = await Client.findById(clientId);

    if (!client) return res.status(400).send("Client Doesn't Exist Anymore");
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) return res.status(400).send("Freelancer Doesn't Exist Anymore");

    try {
        // Upload files to Cloudinary
        // const fileUris = await Promise.all(
        //     files.map(async (file) => {
        //         try {
        //             const fileUri = getDataUri(file);
        //             console.log(file.originalname);

        //             // Use a folder name based on the file type (e.g., "Order_Documents")
        //             const folderName = "Order_Documents";
        //             const uploadOptions = {
        //                 folder: folderName,
        //                 public_id: file.originalname, // Use the original filename for Cloudinary
        //                 resource_type: "raw", // Automatically determine the file type
        //                 use_filename: true, // Use the original filename
        //             };

        //             const result = await cloudinary.uploader.upload(fileUri.content, uploadOptions);

        //             return result.secure_url;
        //         } catch (uploadError) {
        //             console.error("Error uploading file to Cloudinary:", uploadError.message);
        //             throw uploadError; // Rethrow the error to be caught in the catch block below
        //         }
        //     })
        // );

        const order = new Order({
            freelancer: freelancer._id,
            client: client._id,
            title,
            description,
            type,
            orderStatus,
            paymentMethod,
            paymentStatus,
            price,
            revisions,
            activities,
            // files: fileUris,
        });

        const orderSaved = await order.save();
        res.send(orderSaved);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
};
const deliverOrder= async(req,res)=>{
    const orderId=req.params.id
    const deliveredfiles=req.files
    
    const order =await Order.findById(orderId)
    if(!order) return res.status(400).send("Order with this id doesn't exist anymore");
    try{
        const fileUris = await Promise.all(
            deliveredfiles.map(async (file) => {
                try {
                    const fileUri = getDataUri(file);
                    // Use a folder name based on the file type (e.g., "Order_Documents")
                    const folderName = "Order_Documents";
                    const uploadOptions = {
                        folder: folderName,
                        public_id: file.originalname, // Use the original filename for Cloudinary
                        resource_type: "raw", // Automatically determine the file type
                        use_filename: true, // Use the original filename
                    };

                    const result = await cloudinary.uploader.upload(fileUri.content, uploadOptions);

                    return result.secure_url;
                } catch (uploadError) {
                    console.error("Error uploading file to Cloudinary:", uploadError.message);
                    throw uploadError; // Rethrow the error to be caught in the catch block below
                }
            })
        );
        order.orderStatus="Delivered"
        order.paymentStatus="Paid"
        order.deliveredfiles=fileUris
        const savedOrder=await order.save()
        res.send(savedOrder)

    }catch(error){
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }

}
const viewOrdersByClient=async(req,res)=>{
    const clientId=req.user._id
    const orders=await Order.find({client:clientId}).populate('client','fname lname')
    if(!orders) return res.status(400).send("Order with this id doesn't exist anymore");
    res.send(orders)
}
const viewSpecificOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findById(orderId)
            .populate('freelancer', 'fname lname')
            .populate('client', 'fname lname');

        if (!order) {
            return res.status(400).send("Order with this id doesn't exist anymore");
        }

        res.send(order);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
};
const viewOrdersByFreelancer=async(req,res)=>{
    const freelancerId=req.user._id
    const orders=await Order.find({freelancer:freelancerId}).populate('client','fname lname')
    if(!orders) return res.status(400).send("Order with this id doesn't exist anymore");
    res.send(orders)
}
const sendForRevisions=async(req,res)=>{
    const orderId=req.params.orderId
    const order=await Order.findById(orderId)
    if(!order) return res.status(400).send("Order with this id doesn't exist anymore");
    if(order.revisions==0)
    {
        return res.status(304).send("You don't have any revisions left")
    }
    order.revisions--
    order.orderStatus="Active"
    order.save()
    res.send(order)
}
const acceptOrder=async(req,res)=>{
    const orderId=req.params.orderId
    const order=await Order.findById(orderId)
    if(!order) return res.status(400).send("Order with this id doesn't exist anymore");
    order.orderStatus="Completed"
    order.revisions=0
    const savedOrder=await order.save()
    res.send(savedOrder)
}
const acceptAndRejectOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        const request=req.body.request

        if (request == "Accept") {
            order.orderStatus = "Active";
            order.save();
            console.log(order);
            res.send("Order Status Updated");
        } else {
            order.orderStatus = "Cancelled";
            order.save();
            res.send("Order Cancelled");
        }

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
};
module.exports = {
    placeOrder,
    deliverOrder,
    viewOrdersByClient,
    viewOrdersByFreelancer,
    viewSpecificOrder,
    sendForRevisions,
    acceptOrder,
    acceptAndRejectOrder
};
