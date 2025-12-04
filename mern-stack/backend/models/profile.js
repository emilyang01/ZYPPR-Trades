import mongoose from "mongoose";

    // profile references user
const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    profilePicture: { url: { type: String, required: true } },        // <-- stores path or URL
    bio: { type: String, required: false, trim: true},
    is_verified: { Boolean: false }, //note: no camel case
    skills: [{ type: String, required: false}],
    experience_level: { type: String },
    resume: { url: { type: String, required: true } },
    currentJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
    jobs_completed: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
    total_earnings: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review"}],
    settings_profile:{ type: mongoose.Schema.Types.ObjectId, ref: "settings_profile", required: true },
    list_of_followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    list_of_following:[{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    count_of_followers: { type: Number, default: 0 },
    count_of_following: { type: Number, default: 0 },
    category: { type: String, trim: true},
}, { timestamps: true });

export default mongoose.model("profile", ProfileSchema);