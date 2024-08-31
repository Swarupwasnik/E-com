import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  otp: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, index: { expires: 300 } }, // OTP expires in 5 minutes
});
const OtpModel = mongoose.model("Otp", otpSchema);
export default OtpModel;
