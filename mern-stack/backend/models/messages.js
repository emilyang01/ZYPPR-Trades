import mongoose from "mongoose";

// references profile or user?

const ProfileSchema = new mongoose.Schema({
// message history (type array of messages?)
// message sender (type user id)
// message time stamp
// ...
}, { timestamps: true });
export default mongoose.model("messages", MessagesSchema);