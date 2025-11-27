const mongoose = require("mongoose");
require("dotenv").config();

console.log("Loaded MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Not found");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
})();
