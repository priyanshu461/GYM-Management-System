// models/Progress.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Progress Schema
const progressSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    weight: {
      type: Number,
      required: true,
    },
    goalWeight: {
      type: Number,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Progress", progressSchema);
