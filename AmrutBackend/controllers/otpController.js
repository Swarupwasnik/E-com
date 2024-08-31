import OtpModel from "../models/OtpModel.js";
import twilio from 'twilio';
import dotenv from "dotenv"

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid,authToken)


//createotp

export const createotp = async(req,res)=>{
    const { mobile } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await client.messages.create({
          body: `Your OTP code is ${otp}`,
          from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
          to: mobile,
        });
        await OtpModel.findOneAndUpdate(
            { mobile },
            { otp, createdAt: Date.now() },
            { upsert: true, new: true }
          );
          res.status(200).send({ success: true, message: 'OTP sent successfully' });
        } catch (error) {
          res.status(500).send({ success: false, message: error.message });
        }
      
    }
    //verify otp
export const  verifyotp = async(req,res)=>{
    const {mobile,otp} = req.body;
    try{
        const record = await otp.findOne({mobile});
        if(record && record.otp === otp){
            await otp.deleteOne({mobile});
            res.status(200).send({ success: true, message: 'OTP verified successfully' });

        }else{
            res.status(400).send({ success: false, message: 'Invalid OTP' });

        }
    }catch(err){
        res.status(500).send({ success: false, message: error.message });

    }
}
