const { google } = require("googleapis");
const fs = require("fs");
const Client = require("../Models/Client");
const Order = require('../Models/order');
const Freelancer = require('../Models/Freelancer');

// Load your credentials from a file (client_secret.json)
const credentials = require("../utils/apiKey.json");
const SCOPE = ['https://www.googleapis.com/auth/drive'];

// A Function that can provide access to the Google Drive API
async function authorize() {
    const jwtClient = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
}

async function uploadFile(authClient, filePath, folderId) {
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth: authClient });
        const fileMetadata = {
            parents: folderId ? [folderId] : [], // A folder ID to which the file will get uploaded if provided
            name: '', // Let it be an empty string for using the original file name
        };

        const media = {
            mimeType: 'text/plain', // Adjust the MIME type as needed
            body: fs.createReadStream(filePath), // Provide the correct file path
        };

        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webViewLink, name',
        }, (error, file) => {
            if (error) {
                return reject(error);
            }
            resolve(file);
        });
    });
}

const placeOrder = async (req, res) => {
    console.log(req.body);

    const { type, orderStatus, paymentMethod, paymentStatus, price, revisions, activities } = req.body;
    const file = req.files && req.files.length > 0 ? req.files[0] : null; // Assuming the file parameter is named 'file'

    const clientId = req.params.clientId;
    const freelancerId = req.params.freelancerId;
    const client = await Client.findById(clientId);

    if (!client) return res.status(400).send("Client Doesn't Exist Anymore");
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) return res.status(400).send("Freelancer Doesn't Exist Anymore");

    try {
        // Authorize Google Drive API
        const authClient = await authorize();

        // Upload the file to Google Drive
        const fileUri = await uploadFile(authClient, file.path, "1kmmDCOikc73U9Vbn7JKRwRHFz2ph-tNj");

        // You can now use the fileUri to save it in your Order model or handle as needed

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
            files: [fileUri.webViewLink],
        });

        const orderSaved = await order.save();
        res.send(orderSaved);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = placeOrder;
