import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Assuming "User" is the correct model name
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    paymentMethod: {
        type: String,
        enum: ["Online Payment", "Cash on Delivery"], // Adding the payment options
        default: "Online Payment" // Setting default to online payment
    }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

