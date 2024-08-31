// import mongoose  from "mongoose";
// // import { type } from "os";
// // import { type } from "os";

// const userSchema = new mongoose.Schema({

//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     phone:{
//         type:String,
//         required:true
//     },
//     address:{
//         type:String,
//         required:true
//     },
//     answer:{
// type:String,
// required:true,
//     },
//     role:{
//        type:Number,
//        default:0 
//     }

// },{timestamps:true})
// export default mongoose.model("user",userSchema)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    privacyPolicyAccepted: {
        type: Boolean,
        required: true,
    }
}, {timestamps: true});

export default mongoose.model("user", userSchema);
