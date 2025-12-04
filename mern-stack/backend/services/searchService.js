// backend/services/searchService.js

//
// TEMP IMPLEMENTATION – NO REAL DATABASE YET
//
// This file returns mock data so the frontend can call:
//   GET /api/search/users
//   GET /api/search/jobs
//   GET /api/admin/search/users
//
// LATER: the DB engineer should replace the in-memory arrays + filters
// with real MongoDB queries using the User and Job models.
//

// ---------- MOCK DATA (can be deleted later) ----------
const mockUsers = [
  {
    id: "u1",
    name: "Martha Williams",
    role: "user",
    city: "Sacramento",
    category: "Painter",
    hourlyRate: 45,
    rating: 4.9,
    isVerified: true,
  },
  {
    id: "u2",
    name: "Kade Brown",
    role: "user",
    city: "Elk Grove",
    category: "Painter",
    hourlyRate: 40,
    rating: 4.8,
    isVerified: false,
  },
  {
    id: "u3",
    name: "Jack Maddocks",
    role: "user",
    city: "Sacramento",
    category: "Electrician",
    hourlyRate: 38,
    rating: 4.7,
    isVerified: true,
  },
  {
    id: "u4",
    name: "Mark Miller",
    role: "user",
    city: "Roseville",
    category: "Housekeeper",
    hourlyRate: 43,
    rating: 4.4,
    isVerified: false,
  },
];

const mockJobs = [
  {
    id: "j1",
    title: "Commission mural painting",
    category: "Painter",
    city: "Sacramento",
    budget: 500,
  },
  {
    id: "j2",
    title: "Electrician needed",
    category: "Electrician",
    city: "Elk Grove",
    budget: 300,
  },
  {
    id: "j3",
    title: "Garden work",
    category: "Gardener",
    city: "Roseville",
    budget: 200,
  },
  {
    id: "j4",
    title: "Housekeeping and co.",
    category: "Housekeeper",
    city: "Sacramento",
    budget: 250,
  },
];

// ---------- HELPER ----------
function paginate(array, page = 1, limit = 12) {
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = array.slice(start, end);
  return {
    items,
    total: array.length,
    page,
    totalPages: Math.ceil(array.length / limit) || 1,
  };
}

// ---------- PUBLIC SEARCH: USERS ----------
export async function searchUsers(filters) {
  const {
    q = "",
    location = "",
    minRate = "",
    maxRate = "",
    categories = [],
    page = 1,
    limit = 12,
  } = filters;

  let results = [...mockUsers];

  // Text search on name + category
  if (q) {
    const term = q.toLowerCase();
    results = results.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        (u.category && u.category.toLowerCase().includes(term))
    );
  }

  // Filter by city/location
  if (location) {
    const loc = location.toLowerCase();
    results = results.filter((u) => u.city.toLowerCase().includes(loc));
  }

  // Hourly rate range
  if (minRate !== "" && !Number.isNaN(Number(minRate))) {
    results = results.filter((u) => u.hourlyRate >= Number(minRate));
  }
  if (maxRate !== "" && !Number.isNaN(Number(maxRate))) {
    results = results.filter((u) => u.hourlyRate <= Number(maxRate));
  }

  // Category list (Painter, Electrician, etc.)
  if (categories && categories.length > 0) {
    const cats = categories.map((c) => c.toLowerCase());
    results = results.filter((u) =>
      cats.includes((u.category || "").toLowerCase())
    );
  }

  return paginate(results, page, limit);
}

// ---------- PUBLIC SEARCH: JOBS ----------
export async function searchJobs(filters) {
  const {
    q = "",
    location = "",
    minRate = "",
    maxRate = "",
    categories = [],
    page = 1,
    limit = 12,
  } = filters;

  let results = [...mockJobs];

  // Text search on title + category
  if (q) {
    const term = q.toLowerCase();
    results = results.filter(
      (j) =>
        j.title.toLowerCase().includes(term) ||
        (j.category && j.category.toLowerCase().includes(term))
    );
  }

  // Filter by city/location
  if (location) {
    const loc = location.toLowerCase();
    results = results.filter((j) => j.city.toLowerCase().includes(loc));
  }

  // Budget range (use same min/max fields as rate)
  if (minRate !== "" && !Number.isNaN(Number(minRate))) {
    results = results.filter((j) => j.budget >= Number(minRate));
  }
  if (maxRate !== "" && !Number.isNaN(Number(maxRate))) {
    results = results.filter((j) => j.budget <= Number(maxRate));
  }

  // Category filter
  if (categories && categories.length > 0) {
    const cats = categories.map((c) => c.toLowerCase());
    results = results.filter((j) =>
      cats.includes((j.category || "").toLowerCase())
    );
  }

  return paginate(results, page, limit);
}

// ---------- ADMIN SEARCH: USERS ----------
export async function adminSearchUsers(filters) {
  // For now, admin search is the same as public user search,
  // but we could add extra filters later (role, email, etc.)
  // keeping the signature so the route code stays stable.
  return searchUsers(filters);
}

/*
===========================================
 NOTES FOR DB ENGINEER (REPLACE LATER)
===========================================

Instead of mock arrays and filter() calls, you will:
  - Import User and Job mongoose models
  - Build dynamic MongoDB queries based on 'filters'
  - Use .find(), .sort(), .skip(), .limit()
  - Return the same shape:
      { items, total, page, totalPages }

Example idea (user search):

  import User from "../models/User.js";

  export async function searchUsers(filters) {
    const query = {};
    if (filters.q) {
      query.$or = [
        { name: new RegExp(filters.q, "i") },
        { category: new RegExp(filters.q, "i") }
      ];
    }
    ...

    const page = filters.page || 1;
    const limit = filters.limit || 12;

    const [items, total] = await Promise.all([
      User.find(query).skip((page - 1) * limit).limit(limit),
      User.countDocuments(query),
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

*/

