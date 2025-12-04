import mongoose from "mongoose";

    // review references user and job
const ReviewSchema = new mongoose.Schema({
    review: { type: String },
    rating: { type: Number, required: true}, //inclusive: (max limit 5) (min limit 1)
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    target_user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    target_job: { type: mongoose.Schema.Types.ObjectId, ref: "job" },
    //NOTE to make this polymorphic. When creating a review object: if ((!target_user && !target_job) || (target_user && target_job)) {
        //throw error("Review must target either a user OR a job");}
}, { timestamps: true });