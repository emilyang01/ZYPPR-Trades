import mongoose from "mongoose";

// messages references user and conversation

const MessagesSchema = new mongoose.Schema({
  conversation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "conversation", 
    required: true 
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  // TEXT CONTENT
  text: {
    type: String,
    trim: true
  },

  // ATTACHMENTS (images, files, etc.)
  attachments: [{
    url: { type: String, required: true },
    filename: String,
    mimeType: String,
    uploaded_at: { type: Date, default: Date.now }
  }],

  // JOB SHARED INSIDE MESSAGE
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  },
}, { timestamps: true });
export default mongoose.model("messages", MessagesSchema);