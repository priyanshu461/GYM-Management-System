const WorkoutRoutine = require("../../models/WorkoutRoutineModel");

// Get all workout routines
const getAllRoutines = async (req, res) => {
  try {
    const routines = await WorkoutRoutine.find().populate("createdBy", "name");
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routines", error: error.message });
  }
};

// Add new workout routine
const addRoutine = async (req, res) => {
  try {
    const { name, goal, difficulty, days } = req.body;
    const routine = new WorkoutRoutine({
      name,
      goal,
      difficulty,
      days,
      createdBy: req.body.createdBy || null,
    });
    await routine.save();
    res.status(201).json({ message: "Routine added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding routine", error: error.message });
  }
};

// Update workout routine
const updateRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, goal, difficulty, days } = req.body;
    await WorkoutRoutine.findByIdAndUpdate(id, {
      name,
      goal,
      difficulty,
      days,
    });
    res.status(200).json({ message: "Routine updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating routine", error: error.message });
  }
};

// Delete workout routine
const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    await WorkoutRoutine.findByIdAndDelete(id);
    res.status(200).json({ message: "Routine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting routine", error: error.message });
  }
};

module.exports = {
  getAllRoutines,
  addRoutine,
  updateRoutine,
  deleteRoutine,
};
