import mongoose from "mongoose";

// application referrences user and job

const WebsiteTraffic = new mongoose.Schema({
  // Optional: link to a user if they are logged in
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user" 
  },

  // What action was taken (e.g., page_view, click, scroll)
  action: { 
    type: String, 
    enum: [ "posted job", "created account", "completed job" ],
  },
  // Timestamp
  timestamp: { 
    type: Date, 
    default: Date.now 
  }

}, { timestamps: true });

//You can count activities or otherwise summarize them right from MongoDB