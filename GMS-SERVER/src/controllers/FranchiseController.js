const Franchise = require("../models/FranchiseModel");

// Get all franchises
const getAllFranchises = async (req, res) => {
  try {
    const franchises = await Franchise.find();
    res.status(200).json(franchises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching franchises", error: error.message });
  }
};

// Add a new franchise
const addFranchise = async (req, res) => {
  try {
    const newFranchise = new Franchise(req.body);
    await newFranchise.save();
    res.status(201).json(newFranchise);
  } catch (error) {
    res.status(500).json({ message: "Error adding franchise", error: error.message });
  }
};

// Update a franchise
const updateFranchise = async (req, res) => {
  try {
    const updatedFranchise = await Franchise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFranchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }
    res.status(200).json(updatedFranchise);
  } catch (error) {
    res.status(500).json({ message: "Error updating franchise", error: error.message });
  }
};

// Delete a franchise
const deleteFranchise = async (req, res) => {
  try {
    const deletedFranchise = await Franchise.findByIdAndDelete(req.params.id);
    if (!deletedFranchise) {
      return res.status(404).json({ message: "Franchise not found" });
    }
    res.status(200).json({ message: "Franchise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting franchise", error: error.message });
  }
};

module.exports = {
  getAllFranchises,
  addFranchise,
  updateFranchise,
  deleteFranchise,
};
