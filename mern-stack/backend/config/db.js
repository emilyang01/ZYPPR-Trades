<<<<<<< HEAD
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(' Database connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
=======
// backend/config/db.js
import mongoose from "mongoose";

/**
 * Connect to MongoDB using Mongoose
 * @param {string} uri - Mongo connection string (defaults to process.env.MONGO_URI)
 */
export async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) {
    throw new Error("Missing MONGO_URI in env");
  }

  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(uri);
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
}
>>>>>>> origin/ansarzaki
