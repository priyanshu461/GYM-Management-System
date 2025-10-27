const express = require("express");
const router = express.Router();
const {
  getAllBlogPosts,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  updateBlogPostStats,
  getFilteredBlogPosts,
  getFeaturedBlogPosts,
  getCategories,
  getTags,
  generatePlan,
} = require("../http/controllers/BlogController");

// GET /api/blog - Get all blog posts
router.get("/", getAllBlogPosts);

// POST /api/blog - Add a new blog post
router.post("/", addBlogPost);

// PUT /api/blog/:id - Update a blog post
router.put("/:id", updateBlogPost);

// DELETE /api/blog/:id - Delete a blog post
router.delete("/:id", deleteBlogPost);

// PATCH /api/blog/:id/stats - Update blog post stats
router.patch("/:id/stats", updateBlogPostStats);

// GET /api/blog/filtered - Get filtered blog posts with pagination
router.get("/filtered", getFilteredBlogPosts);

// GET /api/blog/featured - Get featured blog posts
router.get("/featured", getFeaturedBlogPosts);

// GET /api/blog/categories - Get unique categories
router.get("/categories", getCategories);

// GET /api/blog/tags - Get unique tags
router.get("/tags", getTags);

// POST /api/blog/generate-plan - Generate AI fitness plan
router.post("/generate-plan", generatePlan);

module.exports = router;
