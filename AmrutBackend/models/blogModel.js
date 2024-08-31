// import mongoose from "mongoose";

// const BlogSchema = new mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true,
//     },
//     photo:{
//         type:Array,
//     },
//     // Define the category field
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category' // Assuming the reference model is named 'Category'
//     }
// },{timestamps:true});

// const BlogModel = mongoose.model("Blog",BlogSchema);
// export default BlogModel;
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    photo:{
        type:Array,
    },
    // Define the category field
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' // Assuming the reference model is named 'Category'
    },
    // Add the name field
    name: {
        type: String,
        required: true
    },
    // Add fields for date, day, and time
    date: {
        type: Date,
        default: Date.now // Set default value to current date and time
    },
    day: {
        type: String,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // Set enum to restrict day values
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const BlogModel = mongoose.model("Blog", BlogSchema);
export default BlogModel;
