// import { error } from "console";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import { error } from "console";
import twilio from 'twilio';
import dotenv from 'dotenv';

// Adjust the import path as necessary
// const Client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer, privacyPolicyAccepted } = req.body;

    // Validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    if (!privacyPolicyAccepted) {
      return res.send({ message: "You must agree to the Privacy Policy" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered. Please log in.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Save the new user
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
      privacyPolicyAccepted
    });

    await user.save();
    // await Client.messages.create({
    //   body: 'Thank you for registering with us!',
    //   from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
    //   to: phone // User's phone number
    // });


    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      err,
    });
  }
};

//LOGIn

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // Generate token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//forgotpassword

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body; // Corrected variable name: newPassword -> newpassword
    if (!email) {
      return res.status(400).send({ message: "Email is Required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Question is Required" });
    }
    if (!newpassword) {
      return res.status(400).send({ message: "New Password is Required" }); // Corrected message: new Password -> New Password
    }
    // Check user
    const user = await userModel.findOne({ email, answer }); // Corrected variable name: Answer -> answer
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or Answer",
      });
    }
    const hashed = await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

//TEST Controller

export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
//updateProfile
// export const updateProfileController = async (re, res) => {
//   try {
//     const [name, email, password, address, phone] = req.body;
//     const user = await userModel.findById(req.user._id);
//     if (password && password.length < 6) {
//       return res.json({ error: "Password is Required and 6 Character Long" });
//     }
//     const hashedPassword = password
//       ? await hashedPassword(password)
//       : undefined;
//     const updatedUser = await userModel.findByIdAndUpdate(
//       req.user._id,
//       {
//         name: name || user.name,
//         password: hashedPassword || user.password,
//         phone: phone || user.phone,
//         address: address || user.address,
//       },
//       { new: true }
//     )
//     res.status(200).send({
//       success:true,
//       message:"Profile Updated Succesfully",
//       updatedUser
//     })
//   } catch (err) {
//     res.status(400).send({
//       success: false,
//       message: "Error While updatating Profile",
//       err,
//     });
//   }
// };

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    const updatedFields = {
      name: name || user.name,
      password: hashedPassword || user.password,
      phone: phone || user.phone,
      address: address || user.address,
    };

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      _id,
      name: updatedName,
      email: updatedEmail,
      phone: updatedPhone,
      address: updatedAddress,
    } = updatedUser;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id,
        name: updatedName,
        email: updatedEmail,
        phone: updatedPhone,
        address: updatedAddress,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error while updating profile" });
  }
};




export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name"); // Correct field name to "buyer"
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};
 //get all admin orders

 export const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer") // Corrected field name to "buyer"
      .sort({ createdAt: -1 }); // Corrected sorting format
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

//order Status

export const orderStatusController = async(req,res)=>{
  try{
const {orderId} = req.params
const {status} = req.body
const orders = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
res.json(orders)
  }catch(err){
    console.log(err)
    res.status(500).send({
      success:false,
      message:"Error While Updating Order",
      error
    })
  }
}