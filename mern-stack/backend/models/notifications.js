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
}, { timestamps: true });