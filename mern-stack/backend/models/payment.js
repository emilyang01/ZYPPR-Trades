import mongoose from "mongoose";

// payment referrences user and job

const PaymentSchema = new mongoose.Schema({
  payer: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "job" },
  amount: { type: Number, required: true },
  transactionDate: { type: Date, default: Date.now }
});