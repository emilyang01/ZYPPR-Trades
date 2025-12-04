import mongoose from "mongoose";

// earnings references profile
const EarningsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true }, // amount earned
  date: { type: Date, required: true, default: Date.now } // timestamp of the earning
}, { timestamps: true });

//to get earnings for a specific week: add up all amounts associated with equal year and month values, and all day values between now and now - 7.
export default mongoose.model("earnings", EarningsSchema);