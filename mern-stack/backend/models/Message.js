// backend/models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    // optional: mark if the message has been read
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
