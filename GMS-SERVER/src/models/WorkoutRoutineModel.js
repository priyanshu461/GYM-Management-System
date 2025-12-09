// models/WorkoutRoutine.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define WorkoutRoutine Schema
const workoutRoutineSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Routine name is required"],
      trim: true,
    },
    goal: {
      type: String,
      enum: ["General", "Strength", "Muscle"],
      default: "General",
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    days: [
      {
        day: {
          type: String,
          required: true,
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
              type: String,
              default: "60s",
            },
          },
        ],
      },
    ],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
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
