import express from "express";
import { isAdmin,requireSignIn } from '../middlewares/authmiddleware.js';

import {createotp ,verifyotp} from "../controllers/otpController.js";

const router = express.Router();

router.post("/send-otp",requireSignIn,(req,res)=>{
    createotp(req,res)
})

router.post("/verify-otp",requireSignIn,(req,res)=>{
    verifyotp(req,res)
})
export default router;