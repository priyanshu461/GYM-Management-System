const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["training", "nutrition", "recovery", "mindset", "news"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      default: "",
    },
    stat: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
