const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freelancer", // Reference to the freelancer providing the service
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Reference to the client who placed the order
      required: true,
    },
    type: {
      type: String,
      enum:["Custom Order","Job Order"],
      default: "Custom Order",
      required: true // Reference to the gig (service) being ordered
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderStatus: {
      type: String,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    price: {
      type: Number, // Total order amount
      required: true,
    },
    revisions:{
        type:Number,
        required:true
    },
    activities:{
        type:[String]
    },
    files:{
        type:[String]
    },
    deliveredfiles:{
      type:[String]
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
