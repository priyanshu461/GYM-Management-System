// models/Category.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Category Schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      minlength: [2, "Category name must be at least 2 characters long"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    versionKey: false, // removes "__v"
  }
);

// Optional: index for faster search by name
categorySchema.index({ name: 1 });

// Optional: virtual to display name + status
categorySchema.virtual("info").get(function () {
  return `${this.name} (${this.isActive ? "Active" : "Inactive"})`;
});

// Export model
module.exports = mongoose.model("Category", categorySchema);
