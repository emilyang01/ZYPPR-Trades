// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import meRoutes from "./routes/me.js";
import jobRoutes from "./routes/jobs.js";
import paymentRoutes from "./routes/payments.js";
import botRoutes from "./routes/bot.js"; // 👈 chatbot

dotenv.config({ path: ".env", override: true });

console.log(
  "Loaded MONGO_URI:",
  process.env.MONGO_URI ? "✅ Found" : "❌ Missing"
);

// 👇 create app BEFORE using app.use(...)
const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/me", meRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/bot", botRoutes); // 👈 only once

const PORT = process.env.PORT || 5000;

try {
  await connectDB(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");

  app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ DB connect error:", err.message);
  process.exit(1);
}
