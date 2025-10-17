const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Workout",
        "Nutrition",
        "Lifestyle",
        "Motivation",
        "Bodybuilding",
        "Cardio",
      ],
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
