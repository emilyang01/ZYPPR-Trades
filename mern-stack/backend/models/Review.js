// backend/models/Review.js
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    // number of stars: 1–5
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    // short title, like "Expected better..."
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // optional body text, like "Arrived late"
    text: {
      type: String,
      trim: true,
    },

    // name of the reviewer: "Martin"
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // date as a string (e.g. "10/19") or ISO
    date: {
      type: String,
      required: true,
      trim: true,
    },

    // optional: later you can link to a user / job
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      default: null,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;