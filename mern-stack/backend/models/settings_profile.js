import mongoose from "mongoose";

// references profile

const Settings_ProfileSchema = new mongoose.Schema({
// notifications on (type boolean)
// ...
});

export default mongoose.model("settings_profile", Settings_ProfileSchema);