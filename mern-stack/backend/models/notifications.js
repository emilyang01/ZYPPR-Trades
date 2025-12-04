import mongoose from "mongoose";

// notifications referrences user

const NotificationSchema = new mongoose.Schema({
  // WHO the notification is *for*
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  // WHO triggered it (optional, like the sender)
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  // MESSAGE TEXT (optional — frontends often build from type + data)
  message: {
    type: String,
    trim: true
  },

  // TYPE OF NOTIFICATION
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
    required: true
  },

  // OPTIONAL REFERENCES (depending on notification type)
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job"
  },

  messageRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "messages"
  },

  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "review"
  },

  // READ STATUS
  read: {
    type: Boolean,
    default: false
  },

  // OPTIONAL extra data
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }

}, { timestamps: true });