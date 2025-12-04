
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  message: { type: String, trim: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "job" },
  messageRef: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
  review: { type: mongoose.Schema.Types.ObjectId, ref: "review" },
  read: { type: Boolean, default: false },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);
