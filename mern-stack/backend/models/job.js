import mongoose from "mongoose";

    // job references user
const JobSchema = new mongoose.Schema({
    title:{ type: String, required: true, trim: true },
    description: { type: String, required: true },
    id: { type: String, }, //type string?
    posted_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    category: { type: String, required: true },
    hourly_rate: { type: Number }, //instead of budget
    city: { type: String }, //said location in filters
    attachments: [{
      url: { type: String, required: true },
      filename: String,
      mimeType: String
    }], 
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review"}],
}, { timestamps: true });
//When a job is created, push its _id into the user’s profile currentJobs array.
export default mongoose.model("job", JobSchema);