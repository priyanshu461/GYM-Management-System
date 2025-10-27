const DietPlan = require("../../models/DietPlanModel");

// Get all diet plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find().populate("createdBy", "name");
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans", error: error.message });
  }
};

// Add new diet plan
const addPlan = async (req, res) => {
  try {
    const { name, goal, meals } = req.body;
    const plan = new DietPlan({
      name,
      goal,
      meals,
      createdBy: req.body.createdBy || null,
    });
    await plan.save();
    res.status(201).json({ message: "Plan added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding plan", error: error.message });
  }
};

// Update diet plan
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, goal, meals } = req.body;
    await DietPlan.findByIdAndUpdate(id, {
      name,
      goal,
      meals,
    });
    res.status(200).json({ message: "Plan updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating plan", error: error.message });
  }
};

// Delete diet plan
const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await DietPlan.findByIdAndDelete(id);
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plan", error: error.message });
  }
};

module.exports = {
  getAllPlans,
  addPlan,
  updatePlan,
  deletePlan,
};
