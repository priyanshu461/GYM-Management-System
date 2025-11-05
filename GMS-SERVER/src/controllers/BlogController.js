const BlogPost = require("../models/BlogPostModel");

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

// Generate AI fitness plan
const generatePlan = async (req, res) => {
  try {
    const { age, gender, weight, height, fitnessLevel, goal, equipment } = req.body;

    // Validate required fields
    if (!age || !gender || !weight || !height || !fitnessLevel || !goal || !equipment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Simple AI logic for plan generation (can be replaced with actual AI API)
    let workoutPlan = "";
    let dietTips = "";

    if (goal === "weightloss") {
      workoutPlan = "Focus on cardio and HIIT: 3-4 sessions/week, 45-60 min each. Include running, cycling, and bodyweight exercises.";
      dietTips = "Calorie deficit: Aim for 500 calories less than maintenance. High protein, veggies, whole grains. Hydrate well.";
    } else if (goal === "muscle") {
      workoutPlan = "Strength training: 4-5 days/week, compound lifts like squats, deadlifts, bench press. Progressive overload.";
      dietTips = "Surplus calories: 250-500 above maintenance. Protein-rich foods, carbs for energy, healthy fats.";
    } else if (goal === "endurance") {
      workoutPlan = "Endurance training: Long runs, cycling, swimming. 4-5 sessions/week, building distance gradually.";
      dietTips = "Balanced carbs and proteins. Focus on complex carbs for sustained energy. Recovery snacks post-workout.";
    } else {
      workoutPlan = "General fitness: Mix of cardio, strength, and flexibility. 3-4 days/week.";
      dietTips = "Balanced diet with variety. Listen to your body and adjust as needed.";
    }

    // Adjust based on fitness level
    if (fitnessLevel === "beginner") {
      workoutPlan += " Start slow, focus on form. Rest days are important.";
    } else if (fitnessLevel === "intermediate") {
      workoutPlan += " Increase intensity and volume.";
    } else {
      workoutPlan += " Advanced techniques: drop sets, supersets.";
    }

    // Adjust based on equipment
    if (equipment === "none") {
      workoutPlan += " Bodyweight exercises: push-ups, squats, planks.";
    } else if (equipment === "basic") {
      workoutPlan += " Use dumbbells, resistance bands.";
    } else {
      workoutPlan += " Full gym access: machines, free weights.";
    }

    res.status(200).json({ workoutPlan, dietTips });
  } catch (error) {
    res.status(500).json({ message: "Error generating plan", error: error.message });
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
  generatePlan,
};
