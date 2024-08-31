import mongoose from "mongoose";

// Define the schema for the job posting
const CarrerSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'fulfilled'],
        default: 'open'
    },
    appliedOn: {
        type: Date, // Assuming appliedOn should be a Date type
        default: null // Assuming initially it's not applied
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    education: {
        type: String, // You can customize this based on your needs
        required: true
    },
    experience: {
        type: String, // You can customize this based on your needs
        required: true
    },
    jobNature: {
        type: String, // You can customize this based on your needs
        required: true
    },
    salary: {
        type: String, // You can customize this based on your needs
        required: true
    },
    requiredKnowledge: {
        type: String, // You can customize this based on your needs
        required: true
    }
});

// Create the Mongoose model based on the schema
const CarrerModel = mongoose.model('Job', CarrerSchema);

export default CarrerModel;
