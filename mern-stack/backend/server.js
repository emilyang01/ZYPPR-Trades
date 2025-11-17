import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";



dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debug
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
