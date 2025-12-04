import mongoose from "mongoose";

// conversation references user and messages

const ConversationSchema = new mongoose.Schema({
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true 
    }],

  // helpful for inbox preview
  lastMessage: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "messages"
    },

// message history (type array of messages?)
}, { timestamps: true });
export default mongoose.model("messages", ConversationSchema);