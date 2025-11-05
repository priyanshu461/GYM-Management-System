const Supplement = require("../models/SupplementModel");

// Get all supplements
const getAllSupplements = async (req, res) => {
  try {
    const supplements = await Supplement.find();
    res.status(200).json(supplements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching supplements", error: error.message });
  }
};

// Add a new supplement
const addSupplement = async (req, res) => {
  try {
    const newSupplement = new Supplement(req.body);
    await newSupplement.save();
    res.status(201).json(newSupplement);
  } catch (error) {
    res.status(500).json({ message: "Error adding supplement", error: error.message });
  }
};

// Update a supplement
const updateSupplement = async (req, res) => {
  try {
    const updatedSupplement = await Supplement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSupplement) {
      return res.status(404).json({ message: "Supplement not found" });
    }
    res.status(200).json(updatedSupplement);
  } catch (error) {
    res.status(500).json({ message: "Error updating supplement", error: error.message });
  }
};

// Delete a supplement
const deleteSupplement = async (req, res) => {
  try {
    const deletedSupplement = await Supplement.findByIdAndDelete(req.params.id);
    if (!deletedSupplement) {
      return res.status(404).json({ message: "Supplement not found" });
    }
    res.status(200).json({ message: "Supplement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting supplement", error: error.message });
  }
};

module.exports = {
  getAllSupplements,
  addSupplement,
  updateSupplement,
  deleteSupplement,
};
