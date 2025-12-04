// services/searchService.js
import User from "../models/User.js";
import Job from "../models/job.js";

/**
 * Admin user search (used in routes/admin.js)
 */
export async function adminSearchUsers(filters) {
  const {
    q = "",
    email = "",
    role = "",
    isVerified = "", // not in schema yet
    minRating = "",  // not in schema yet
    location = "",
    page = 1,
    limit = 20,
  } = filters;

  const query = {};

  // exact/partial email
  if (email) {
    query.email = { $regex: email, $options: "i" };
  }

  // role: "user" | "admin"
  if (role) {
    query.role = role;
  }

  // location -> city
  if (location) {
    query.city = { $regex: location, $options: "i" };
  }

  // generic q search on name/email/city
  if (q) {
    query.$or = [
      { first_name: { $regex: q, $options: "i" } },
      { last_name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { city: { $regex: q, $options: "i" } },
    ];
  }

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 20;
  const skip = (pageNum - 1) * limitNum;

  const [users, total] = await Promise.all([
    User.find(query).skip(skip).limit(limitNum).lean(),
    User.countDocuments(query),
  ]);

  return {
    data: users,
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  };
}

/**
 * Job search + filters (used in routes/jobs.js)
 */
export async function searchJobs(filters) {
  const {
    q = "",
    category = "",
    city = "",
    minRate = "",
    maxRate = "",
    postedBy = "",
  } = filters;

  const query = {};

  if (category) query.category = category;
  if (city) query.city = { $regex: city, $options: "i" };
  if (postedBy) query.posted_by = postedBy;

  if (minRate || maxRate) {
    query.hourly_rate = {};
    if (minRate) query.hourly_rate.$gte = Number(minRate);
    if (maxRate) query.hourly_rate.$lte = Number(maxRate);
  }

  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ];
  }

  return Job.find(query)
    .populate("posted_by", "first_name last_name city")
    .sort({ createdAt: -1 })
    .lean();
}
