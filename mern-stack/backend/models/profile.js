import mongoose from "mongoose";

    // profile references user
const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    profilePicture: { type: String, trim: true },        // <-- stores path or URL
    bio: { type: string, required: false, trim: true},
    skills: { type: string, required: false},
    resume: { type: String, trim: true },
    currentJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],                     //array of jobs ([that's what the square brackets mean])
    jobs_completed: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
    total_earnings: { type: Number, default: 0 },        //TODO: there should be a function that returns daily earnings and weekly earnings.
    received_reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review"}],               //array of reviews
    settings_profile:{},
    list_of_followers: {},
    list_of_following:{},
    count_of_followers: {},
    count_of_following: {},
    //zipcode?
    
}, { timestamps: true });

export default mongoose.model("profile", ProfileSchema);