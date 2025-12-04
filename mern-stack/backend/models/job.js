import mongoose from "mongoose";

    // job references user
const JobSchema = new mongoose.Schema({
    title:{ type: String, required: true, trim: true },
    description: { type: String, required: true },
    id: { type: String, }, //type string?
    posted_by: { type: user_id},
    category: { type: String, required: true },
    pay: { type: integer}, //instead of budget
    city: { type: String }, //said location in filters
    attachments: { type: Array}, 
    applicants: (type: user_id),
}, { timestamps: true });
//When a job is created, push its _id into the user’s profile currentJobs array.
export default mongoose.model("job", JobSchema);