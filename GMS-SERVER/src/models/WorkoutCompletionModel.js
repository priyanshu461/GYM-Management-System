// models/WorkoutCompletion.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define WorkoutCompletion Schema
const workoutCompletionSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    workoutRoutine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutRoutine",
      required: true,
    },
    completedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    duration: {
      type: Number, // in minutes
      required: true,
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

module.exports = mongoose.model("WorkoutCompletion", workoutCompletionSchema);
