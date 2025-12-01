const Class = require("../models/ClassModel");
const mongoose = require("mongoose");

// Get all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('trainerId', 'name specialization')
      .populate('gymId', 'name');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes", error: error.message });
  }
};

// Get classes by gym ID
const getClassesByGym = async (req, res) => {
  try {
    const { gymId } = req.params;

    // Validate gym ID
    if (!mongoose.Types.ObjectId.isValid(gymId)) {
      return res.status(400).json({ message: "Invalid gym ID" });
    }

    const classes = await Class.find({ gymId })
      .populate('trainerId', 'name specialization')
      .populate('gymId', 'name');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes by gym", error: error.message });
  }
};

// Get classes by trainer ID
const getClassesByTrainer = async (req, res) => {
  try {
    const { trainerId } = req.params;

    // Validate trainer ID
    if (!mongoose.Types.ObjectId.isValid(trainerId)) {
      return res.status(400).json({ message: "Invalid trainer ID" });
    }

    const classes = await Class.find({ trainerId })
      .populate('trainerId', 'name specialization')
      .populate('gymId', 'name');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes by trainer", error: error.message });
  }
};

// Add a new class
const addClass = async (req, res) => {
  try {
    const { trainerId, gymId } = req.body;

    // Validate required ObjectIds
    if (!mongoose.Types.ObjectId.isValid(trainerId)) {
      return res.status(400).json({ message: "Invalid trainer ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(gymId)) {
      return res.status(400).json({ message: "Invalid gym ID" });
    }

    const newClass = new Class(req.body);
    const savedClass = await newClass.save();

    // Populate the saved class for response
    const populatedClass = await Class.findById(savedClass._id)
      .populate('trainerId', 'name specialization')
      .populate('gymId', 'name');

    res.status(201).json(populatedClass);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: "Validation error", error: error.message });
    } else {
      res.status(500).json({ message: "Error adding class", error: error.message });
    }
  }
};

// Update a class
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate class ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    const updatedClass = await Class.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
      .populate('trainerId', 'name specialization')
      .populate('gymId', 'name');

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(updatedClass);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: "Validation error", error: error.message });
    } else {
      res.status(500).json({ message: "Error updating class", error: error.message });
    }
  }
};

// Delete a class
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate class ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error: error.message });
  }
};

module.exports = {
  getAllClasses,
  getClassesByGym,
  getClassesByTrainer,
  addClass,
  updateClass,
  deleteClass,
};
