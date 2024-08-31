
// MarketModel.js
import mongoose from "mongoose";

const MarketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    available: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MarketModel = mongoose.model("market", MarketSchema);

export default MarketModel; // Ensure MarketModel is exported as default
