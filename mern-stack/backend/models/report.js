import mongoose from "mongoose";

// report referrences user and job

const ReportSchema = new mongoose.Schema({
  // The user who filed the report
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  // The user being reported (if any)
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  // The job being reported (if any)
  reportedJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job"
  },

  // What type of thing is being reported (helps validation and querying)
  type: {
    type: String,
    enum: ["user", "job"],
    required: true
  },

  // Text explanation of the report
  reason: {
    type: String,
    required: true,
    trim: true
  },

  // Optional additional details
  description: {
    type: String,
    trim: true
  },

  // Attachments or screenshots related to the report
  attachments: [{
    url: { type: String },
    filename: String
  }],

  // Admin handling
  status: {
    type: String,
    enum: ["pending", "reviewed", "resolved", "rejected"],
    default: "pending"
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user" // will be an admin
  },

  // Auto timestamps
}, { timestamps: true });
