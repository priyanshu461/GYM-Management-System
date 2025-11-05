// models/DietPlan.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define DietPlan Schema
const dietPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
    },
    goal: {
      type: String,
      enum: ["Weight Loss", "Muscle Gain", "Maintenance"],
      default: "Maintenance",
    },
    meals: [
      {
        meal: {
          type: String,
          required: true,
        },
        items: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          default: "",
        },
        icon: {
          type: String,
          default: "",
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("DietPlan", dietPlanSchema);
