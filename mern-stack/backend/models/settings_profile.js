import mongoose from "mongoose";

// settings_profile references profile

const Settings_ProfileSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
    unique: true 
  },

  // VISIBILITY & PRIVACY
  visibility: {
    showEmail: { type: Boolean, default: false },
    showLocation: { type: Boolean, default: true },
    showSkills: { type: Boolean, default: true },
    showFollowers: { type: Boolean, default: true },
    profileVisibility: { type: String, enum: ["public", "private"], default: "public" }
  },

  // NOTIFICATION PREFERENCES
  notifications: {
    emailNotifications: { type: Boolean, default: true },
    messageNotifications: { type: Boolean, default: true },
    jobAlerts: { type: Boolean, default: true },
    reviewAlerts: { type: Boolean, default: true },
    followerAlerts: { type: Boolean, default: true }
  },
});

export default mongoose.model("settings_profile", Settings_ProfileSchema);