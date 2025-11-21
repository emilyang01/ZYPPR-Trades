import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    first_name: { type: string, required: true, trim: true},
    last_name: { type: string, required: true, trim: true},
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    zip_code: { type: string, required: true},
    username: { type: string, required: true, unique: true},
}, { timestamps: true });

/*Example usage of resume field: (holds a URL)
// When saving a user
const user = new User({
  first_name: "Alice",
  last_name: "Smith",
  email: "alice@example.com",
  resume: "/uploads/resumes/alice_resume.pdf"
  ...
});
await user.save();*/

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Check if correct password was entered by user
UserSchema.methods.matchPassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("user", UserSchema);