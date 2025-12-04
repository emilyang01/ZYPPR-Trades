import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    user_id: { type: String },
    first_name: { type: String, required: true, trim: true},
    last_name: { type: String, required: true, trim: true},
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    //city: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    //category: { type: String, trim: true},
    //rating: { type: Decimal128 },
    //is_verified: { Boolean: false }, no camel case
    current_jobs: [{ //new
      url: { type: String, required: true },
      filename: String,
    }]
}, { timestamps: true });

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