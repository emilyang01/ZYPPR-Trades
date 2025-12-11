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

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    city: { type: String },

    // === OPTIONAL FIELDS (add later if you want) ===
    // phone: String,
    // bio: String,
    // avatarUrl: String,
    // skills: [String],
    // languages: [String],
    // availability: {
    //   monday: Boolean,
    //   tuesday: Boolean,
    //   wednesday: Boolean,
    //   thursday: Boolean,
    //   friday: Boolean,
    //   saturday: Boolean,
    //   sunday: Boolean,
    // },

  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
UserSchema.methods.matchPassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// IMPORTANT: you chose to make everything lowercase "user"
export default mongoose.model("user", UserSchema);
