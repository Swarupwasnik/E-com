// import { message } from "antd";
// import { message } from "antd";
import MarketModel from "../models/MarketModel.js";
import mongoose from "mongoose";
//create market
export const createMarketController = async (req, res) => {
  try {
    const { title, available, contact, address } = req.body;
    if (!title || !available || !contact || !address) {
      return res.status(400).send({ error: "All field is Required" });
    }
    const market = new MarketModel({
      title,
      address,
      available,
      contact,
    });
    await market.save();
    res.status(201).send({
      success: true,
      message: "Product Created Sucessfully",
      market,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Create Product",
    });
  }
};

//delete market
export const deleteMarketController = async (req, res) => {
  try {
    const deletedMarket = await MarketModel.findByIdAndDelete(
      req.params._id
    ).select("_id");

    // Check if product exists and is deleted
    if (!deletedMarket) {
      return res.status(404).send({
        success: false,
        message: "Market not found or already deleted",
      });
    }

    res.status(200).send({
      success: true,
      message: "Market deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error while deleting market",
      error: err.message,
    });
  }
};

//update-market

export const updateMarketController = async (req, res) => {
  try {
    const { title, available, contact, address } = req.body;
    const { _id } = req.params;

    // Check if all required fields are provided
    if (!title || !available || !contact || !address) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Find the market to update
    const market = await MarketModel.findById(_id);

    // If market is not found, return 404
    if (!market) {
      return res.status(404).json({ error: "Market not found" });
    }

    // Update market details
    market.title = title;
    market.available = available;
    market.contact = contact;
    market.address = address;

    // Save the updated market
    await market.save();

    // Respond with the updated market details
    res.status(200).json({
      success: true,
      message: "Market updated successfully",
      market: market,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in updating market",
    });
  }
};
//get market controller
export const getAllMarketController = async (req, res) => {
  try {
    // Fetch all markets from the database
    const markets = await MarketModel.find();

    // Respond with the list of markets
    res.status(200).json({
      success: true,
      message: "All markets retrieved successfully",
      markets: markets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while fetching markets",
    });
  }
};

