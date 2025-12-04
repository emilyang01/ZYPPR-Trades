import mongoose from "mongoose";

// admin_profile referrences user

const AdminProfileSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user", 
    required: true, 
    unique: true 
  },
  profilePicture: { url: { type: String, required: true } },
  settings_profile:{ type: mongoose.Schema.Types.ObjectId, ref: "settings_profile", required: true },

  activityCount: { type: Number, default: 0 }
}, { timestamps: true });
