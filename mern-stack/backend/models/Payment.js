import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobId: { type: String },
    providerId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    paypalOrderId: { type: String },
    status: { type: String, default: "CREATED" }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
