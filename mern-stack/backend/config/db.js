// backend/config/db.js
import mongoose from "mongoose";

export async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) throw new Error("Missing MONGO_URI in env");
  mongoose.set("strictQuery", true);

  // Optional: set a db name if your Atlas URI doesn't include one
  // const opts = { dbName: "zyppr_trades" };
  // await mongoose.connect(uri, opts);

  const conn = await mongoose.connect(uri);
  console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  return conn;
}
