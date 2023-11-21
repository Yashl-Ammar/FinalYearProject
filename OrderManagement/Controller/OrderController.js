// OrderController.js
const Client = require("../Models/Client");
const Freelancer = require("../Models/Freelancer");
const Order = require("../Models/order");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

const placeOrder = async (req, res) => {
    console.log(req.body);

    const { type, orderStatus, paymentMethod, paymentStatus, price, revisions, activities } = req.body;
    const files = req.files;

    const clientId = req.params.clientId;
    const freelancerId = req.params.freelancerId;
    const client = await Client.findById(clientId);

    if (!client) return res.status(400).send("Client Doesn't Exist Anymore");
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) return res.status(400).send("Freelancer Doesn't Exist Anymore");

    try {
        // Upload files to Cloudinary
        const fileUris = await Promise.all(
            files.map(async (file) => {
                try {
                    const fileUri = getDataUri(file);
                    console.log(file.originalname);

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
            files: fileUris,
        });

        const orderSaved = await order.save();
        res.send(orderSaved);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = placeOrder;
