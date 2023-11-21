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
      enum:["Custom","Job Order"],
      default: "Custom",
      required: true // Reference to the gig (service) being ordered
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    price: {
      type: mongoose.Decimal128, // Total order amount
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
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;