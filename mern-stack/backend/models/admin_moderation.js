import mongoose from "mongoose";

// admin_moderation referrences user and review

const AdminLogSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  action: { type: String, required: true, enum: [ "ban user", "send warning message" ] },
  target_user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  target_review: { type: mongoose.Schema.Types.ObjectId, ref: "review" },
  warning_message: { type: String, trim: true },
  timestamp: { type: Date, default: Date.now }
});