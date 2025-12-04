import mongoose from "mongoose";

// application referrences user and job

const ApplicationSchema = new mongoose.Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "job", required: true },
  coverLetter: { type: String, trim: true },
  resumeUrl: { type: String },
  status: { 
    type: String, 
    enum: ["pending", "reviewed", "accepted", "rejected"], 
    default: "pending" 
  },
  submittedAt: { type: Date, default: Date.now }
});