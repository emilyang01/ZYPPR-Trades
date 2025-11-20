import mongoose from "mongoose";

// earnings references user
const EarningsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true }, // amount earned
  date: { type: Date, required: true, default: Date.now } // timestamp of the earning
  //...
}, { timestamps: true });

export default mongoose.model("earnings", EarningsSchema);