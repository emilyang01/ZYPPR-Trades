// models/Payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job" },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    paypalOrderId: { type: String, required: true },
    status: {
      type: String,
      enum: ["CREATED", "COMPLETED", "CANCELLED", "FAILED"],
      default: "CREATED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("payment", PaymentSchema);
