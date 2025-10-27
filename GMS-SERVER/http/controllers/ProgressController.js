const Progress = require("../../models/ProgressModel");

// Get progress for a customer
const getProgress = async (req, res) => {
  try {
    const { customerId } = req.params;
    const progress = await Progress.find({ customer: customerId }).sort({ date: 1 });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress", error: error.message });
  }
};

// Add new progress entry
const addProgress = async (req, res) => {
  try {
    const { customer, date, weight, goalWeight, notes } = req.body;
    const progress = new Progress({
      customer,
      date,
      weight,
      goalWeight,
      notes,
    });
    await progress.save();
    res.status(201).json({ message: "Progress added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding progress", error: error.message });
  }
};

// Update progress entry
const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, weight, goalWeight, notes } = req.body;
    await Progress.findByIdAndUpdate(id, {
      date,
      weight,
      goalWeight,
      notes,
    });
    res.status(200).json({ message: "Progress updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating progress", error: error.message });
  }
};

// Delete progress entry
const deleteProgress = async (req, res) => {
  try {
    const { id } = req.params;
    await Progress.findByIdAndDelete(id);
    res.status(200).json({ message: "Progress deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting progress", error: error.message });
  }
};

module.exports = {
  getProgress,
  addProgress,
  updateProgress,
  deleteProgress,
};
