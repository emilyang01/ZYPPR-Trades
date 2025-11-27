<<<<<<< HEAD
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', userSchema);
=======
import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // bcryptjs works well on Windows & Node

// Define the shape of a user document in MongoDB
const UserSchema = new mongoose.Schema(
  {
    //
    // --- BASIC AUTH FIELDS (SIGNUP / LOGIN) ---
    //

    // Required: email is used to log in
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Required: plain password comes from the client
    // We hash it before saving (see pre-save hook below)
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // do not return this field by default on queries
    },

    // Optional display name (like "John Smith" or "Pizza King")
    name: {
      type: String,
      trim: true,
    },

    // Role is used for permissions (user vs admin)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    //
    // --- OPTIONAL PROFILE FIELDS (CAN BE FILLED LATER) ---
    //

    // More detailed name fields; completely optional
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },

    // Username for profile / handle. Optional, but must be unique if set.
    username: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // allows many users with no username at all
    },

    // Zip / postal code for location-based features; optional
    zip_code: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // automatically adds createdAt + updatedAt
);

//
// --- PASSWORD HASHING LOGIC ---
//
// This runs automatically BEFORE a user is saved.
// If the password field was modified, we hash it.
//

UserSchema.pre("save", async function (next) {
  // If password wasn’t changed, don’t re-hash it
  if (!this.isModified("password")) return next();

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//
// --- PASSWORD CHECK METHOD ---
//
// This is called in your /login route:
//    const ok = await user.matchPassword(passwordFromLogin);
//

UserSchema.methods.matchPassword = function (candidatePassword) {
  // Compare plain text password with hashed password in DB
  return bcrypt.compare(candidatePassword, this.password);
};

//
// --- EXPORT MODEL ---
//
// "User" is the model name; Mongo will store these in the "users" collection.
//

export default mongoose.model("User", UserSchema);
>>>>>>> origin/ansarzaki
