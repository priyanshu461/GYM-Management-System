// models/WorkoutRoutine.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define WorkoutRoutine Schema
const workoutRoutineSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Workout title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        sets: {
          type: Number,
          required: true,
        },
        reps: {
          type: String,
          required: true,
        },
        rest: {
          type: Number,
          default: 0,
        },
      },
    ],
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("WorkoutRoutine", workoutRoutineSchema);
