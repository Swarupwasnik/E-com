

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category" // Corrected: use the name of the model
  },
  quantity: {
    type: Number,
    required: true
  },
  shipping: {
    type: String,
    required: true
  },
  photo: {
    type: Array,
  }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
