import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // NOTE: use "password" so it matches auth.js
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // hide by default, login will use .select("+password")
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    // If you don't send city yet on register, make this NOT required for now
    city: { type: String, required: false },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
UserSchema.methods.matchPassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("user", UserSchema);
