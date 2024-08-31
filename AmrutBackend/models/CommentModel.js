import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    // Reference to the product being reviewed
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    // Name of the reviewer
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // Rating given by the reviewer
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Assuming a rating scale of 1 to 5
    },
    // Review content
    content: {
        type: String,
        required: true
    },
    // Date and time of the review
    createdAt: {
        type: Date,
        default: Date.now
    },
    
});

const CommentModel = mongoose.model("Review", CommentSchema);
export default CommentModel;
