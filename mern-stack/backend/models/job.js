import mongoose from "mongoose";

// Job references user
const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    id: { type: String }, // optional external id
    posted_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    category: { type: String, required: true },
    hourly_rate: { type: Number },      // hourly rate for the job
    city: { type: String },             // used as "location" in filters
    attachments: [
      {
        url: { type: String, required: true },
        filename: String,
        mimeType: String,
      },
    ],
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  },
  { timestamps: true }
);

export default mongoose.model("job", JobSchema);
