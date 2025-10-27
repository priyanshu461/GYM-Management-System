const MembershipPlan = require("../../models/MembershipPlanModel");

// Get all membership plans
const getAllMembershipPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching membership plans", error: error.message });
  }
};

// Add a new membership plan
const addMembershipPlan = async (req, res) => {
  try {
    const newPlan = new MembershipPlan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: "Error adding membership plan", error: error.message });
  }
};

// Update a membership plan
const updateMembershipPlan = async (req, res) => {
  try {
    const updatedPlan = await MembershipPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlan) {
      return res.status(404).json({ message: "Membership plan not found" });
    }
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: "Error updating membership plan", error: error.message });
  }
};

// Delete a membership plan
const deleteMembershipPlan = async (req, res) => {
  try {
    const deletedPlan = await MembershipPlan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Membership plan not found" });
    }
    res.status(200).json({ message: "Membership plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting membership plan", error: error.message });
  }
};

module.exports = {
  getAllMembershipPlans,
  addMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
};
