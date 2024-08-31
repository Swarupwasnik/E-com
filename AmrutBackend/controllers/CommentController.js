import moment from "moment";
import CommentModel from "../models/CommentModel.js";
// import { time } from "console";

// 're using Mongoose for your MongoDB interactions
export const createCommentController = async (req, res) => {
  console.log("req.body from review controller", req.body);

  try {
    // const { productId } = req.params; // Extract the product ID from the URL params
    const { name, content,rating, email,product } = req.body;

    // Validations
    if (!product|| !name 
       || !rating 
      || !content || !email) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Create review instance
    const review = new CommentModel({
      product, // Associate the comment with the specific product
      name,
       rating,
      email,
      content,
    });

    // Save review to the database
    await review.save();

    // Format review creation date
    const formattedDate = moment(review.createdAt).format("YYYY-MM-DD HH:mm");
    const formattedReview = { ...review.toObject(), createdAt: formattedDate };

    // Send success response
    res.status(201).send({
      success: true,
      message: "Review Created Successfully",
      review: formattedReview,
    });
  } catch (error) {
    console.error(error);
    // Send error response
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Create Review",
    });
  }
};



//get comment all controller
export const getAllCommentsController = async (req, res) => {
  try {
    // Query the database to fetch all comments
    const comments = await CommentModel.find({});

    // If no comments are found, return an appropriate message
    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: 'No comments found.' });
    }

    // Format the comments with date and send as response
    const formattedComments = comments.map(comment => {
      const formattedDate = moment(comment.createdAt).format("YYYY-MM-DD HH:mm");
      return { ...comment.toObject(), createdAt: formattedDate };
    });

    return res.status(200).json({ comments: formattedComments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// /get commnets related to products.

export const getProductCommentsController = async (req, res) => {
  try {
    const { productId } = req.params;

    // Query the database for comments related to the specified product ID
    const comments = await CommentModel.find({ product: productId });

    // If no comments are found, return an appropriate message
    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this product.' });
    }

    // If comments are found, return them as a response
    return res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
