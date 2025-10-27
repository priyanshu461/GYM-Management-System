const BlogPost = require("../../models/BlogPostModel");

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog posts", error: error.message });
  }
};

// Add a new blog post
const addBlogPost = async (req, res) => {
  try {
    const newPost = new BlogPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error adding blog post", error: error.message });
  }
};

// Update a blog post
const updateBlogPost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog post", error: error.message });
  }
};

// Delete a blog post
const deleteBlogPost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog post", error: error.message });
  }
};

// Update blog post stats (views, likes, comments)
const updateBlogPostStats = async (req, res) => {
  try {
    const { statType } = req.body;
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { [`stat.${statType}`]: 1 } },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog post stats", error: error.message });
  }
};

// Get filtered blog posts with pagination
const getFilteredBlogPosts = async (req, res) => {
  try {
    const { category, tag, search, page = 1, limit = 6 } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    if (tag && tag !== "all") {
      filter.tags = { $in: [tag] };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }

    const posts = await BlogPost.find(filter)
      .sort({ featured: -1, date: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v");

    const total = await BlogPost.countDocuments(filter);

    res.status(200).json({
      posts,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching filtered blog posts", error: error.message });
  }
};

// Get featured blog posts
const getFeaturedBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ featured: true })
      .sort({ date: -1 })
      .limit(6)
      .select("-__v");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching featured blog posts", error: error.message });
  }
};

// Get unique categories
const getCategories = async (req, res) => {
  try {
    const categories = await BlogPost.distinct("category");
    const categoryList = [
      { key: "all", label: "All" },
      ...categories.map(cat => ({ key: cat, label: cat }))
    ];

    res.status(200).json(categoryList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};

// Get unique tags
const getTags = async (req, res) => {
  try {
    const tags = await BlogPost.distinct("tags");
    const flattenedTags = tags.flat().filter(tag => tag); // Remove empty tags
    const uniqueTags = [...new Set(flattenedTags)];

    res.status(200).json(uniqueTags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tags", error: error.message });
  }
};

module.exports = {
  getAllBlogPosts,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  updateBlogPostStats,
  getFilteredBlogPosts,
  getFeaturedBlogPosts,
  getCategories,
  getTags,
};
