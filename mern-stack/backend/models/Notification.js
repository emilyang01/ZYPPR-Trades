// backend/models/Notification.js
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // usually model name is "User"
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "message",
        "job_application",
        "job_accepted",
        "job_rejected",
        "review_received",
        "follower",
        "system",
      ],
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    messageRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    read: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;