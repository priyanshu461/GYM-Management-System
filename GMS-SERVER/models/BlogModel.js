const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [200, "Title can't exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    image: {
      type: String,
      default: "",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Blog", blogSchema);
