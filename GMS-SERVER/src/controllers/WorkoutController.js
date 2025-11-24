const WorkoutRoutine = require("../models/WorkoutRoutineModel");
const User = require("../models/UserModel");
const WorkoutCompletion = require("../models/WorkoutCompletionModel");

// Create a new workout routine
const createWorkout = async (req, res) => {
  try {
    const { title, description, difficulty, duration, exercises } = req.body;

    // Validate required fields
    if (!title || !difficulty || !duration || !exercises || exercises.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the workout routine with trainer ID from authenticated user
    const workout = new WorkoutRoutine({
      title,
      description: description || "",
      difficulty,
      duration: parseInt(duration, 10), // Ensure duration is a number
      exercises: exercises.map(ex => ({
        name: ex.name,
        sets: parseInt(ex.sets, 10), // Ensure sets is a number
        reps: ex.reps, // Keep as string for flexibility (e.g., "10-12" or "max")
        rest: parseInt(ex.rest, 10) || 0, // Default to 0 if not provided or invalid
      })),
      trainer: req.user.id, // Associate with the trainer creating it
    });

    await workout.save();

    res.status(201).json({ message: "Workout created successfully", workout });
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all workouts for a trainer (or all if admin, but for now trainer-specific)
const getWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutRoutine.find({ trainer: req.user.id, isActive: true }).populate("trainer", "name email");
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific workout by ID
const getWorkoutById = async (req, res) => {
  try {
    const workout = await WorkoutRoutine.findById(req.params.id).populate("trainer", "name email");
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error("Error fetching workout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a workout routine (only by the trainer who created it or admin)
const updateWorkout = async (req, res) => {
  try {
    const { title, description, difficulty, duration, exercises } = req.body;

    const workout = await WorkoutRoutine.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Check if the user is the trainer who created it or an admin (assuming role check later if needed)
    if (workout.trainer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this workout" });
    }

    // Update fields if provided
    if (title) workout.title = title;
    if (description !== undefined) workout.description = description; // Allow empty description
    if (difficulty) workout.difficulty = difficulty;
    if (duration) workout.duration = parseInt(duration, 10);
    if (exercises) {
      workout.exercises = exercises.map(ex => ({
        name: ex.name,
        sets: parseInt(ex.sets, 10), // Ensure sets is a number
        reps: ex.reps, // Keep as string for flexibility (e.g., "10-12" or "max")
        rest: parseInt(ex.rest, 10) || 0, // Default to 0 if not provided or invalid
      }));
    }

    await workout.save();

    res.status(200).json({ message: "Workout updated successfully", workout });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a workout routine (only by the trainer who created it or admin)
const deleteWorkout = async (req, res) => {
  try {
    const workout = await WorkoutRoutine.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // Check if the user is the trainer who created it or an admin (assuming role check later if needed)
    if (workout.trainer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this workout" });
    }

    await WorkoutRoutine.findByIdAndUpdate(req.params.id, { isActive: false }); // Soft delete

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Assign a workout to a member (trainer assigns to their clients or admin assigns to any member)
const assignWorkoutToMember = async (req, res) => {
  try {
    const { memberId, workoutId } = req.body;

    // Validate required fields
    if (!memberId || !workoutId) {
      return res.status(400).json({ message: "Member ID and Workout ID are required" });
    }

    // Check if the workout exists and belongs to the trainer (or admin can assign any, but for now trainer-specific)
    const workout = await WorkoutRoutine.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // For trainers, ensure they can only assign their own workouts (admins can assign any later if needed)
    if (workout.trainer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to assign this workout" });
    }

    // Check if the member exists and is a client of the trainer (or admin can assign to any member later if needed)
    const member = await User.findById(memberId).populate("role");
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Assuming members have a role, and we check if they are members (not trainers/admins). For now, allow assignment if user exists.

    // Check if the workout is already assigned to the member (optional, but good to prevent duplicates if needed later)
    // For now, allow multiple assignments or handle in frontend if needed.

    // Create a workout assignment record (assuming a separate model for assignments if needed, but for now, perhaps update member or use a relation)
    // Since WorkoutRoutine has a trainer, and assignment is to member, perhaps we need an assignment model or update member with assigned workouts.

    // For simplicity, let's assume we add assignedWorkouts to User model or create a separate Assignment model. But since the task is to assign, and frontend fetches workouts, perhaps we need to track assignments separately.

    // Looking at the frontend, it assigns and shows in dropdowns, but for persistence, we need to save the assignment somewhere. Perhaps add to User model an array of assignedWorkouts.

    // But to follow the task, the main issue is that workouts are created and saved (which seems to be working), and when assigning, the dropdowns should show available workouts and clients.

    // So, the issue might be that getTrainerClients() is not implemented or not returning clients properly.

    // Let's check trainerServices.js to see the methods.

    // Also, check if assignWorkoutToClient is implemented in trainerServices.

    // From AssignWorkout.jsx, it calls trainerServices.assignWorkoutToClient({clientId, workoutId}), so we need to ensure that method exists and calls the backend assignWorkoutToMember.

    // In WorkoutController, there's assignWorkoutToMember, but it's not exported in the module.exports, so we need to add it.

    // Let's check the routes to see if it's routed.

    // First, let's read trainerServices.js to see what methods are implemented.

  } catch (error) {
    console.error("Error assigning workout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  assignWorkoutToMember,
};
