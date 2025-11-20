import mongoose from "mongoose";

    // job references user
const JobSchema = new mongoose.Schema({
//posted by (type user id)
//title
//description
//date posted
//date of job (optional)
//applicatants (type user id)
//pay amount
//array of attached pictures
//...
}, { timestamps: true });
//When a job is created, push its _id into the user’s profile currentJobs array.
export default mongoose.model("job", JobSchema);