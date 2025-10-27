const Facility = require("../../models/FacilitiesModel");

// Get all facilities
const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching facilities", error: error.message });
  }
};

// Add facility
const addFacility = async (req, res) => {
  try {
    const { name, type, status, usage } = req.body;
    const facility = new Facility({ name, type, status, usage });
    await facility.save();
    res.status(201).json({ message: "Facility added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding facility", error: error.message });
  }
};

// Update facility
const updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status, usage } = req.body;
    await Facility.findByIdAndUpdate(id, { name, type, status, usage });
    res.status(200).json({ message: "Facility updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating facility", error: error.message });
  }
};

// Delete facility
const deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;
    await Facility.findByIdAndDelete(id);
    res.status(200).json({ message: "Facility deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting facility", error: error.message });
  }
};

module.exports = {
  getAllFacilities,
  addFacility,
  updateFacility,
  deleteFacility,
};
