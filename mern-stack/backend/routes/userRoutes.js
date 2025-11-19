import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { firstName, lastName } = req.body;
  const newUser = await User.create({ firstName, lastName });

  res.status(201).json(newUser);
});

export default router;
