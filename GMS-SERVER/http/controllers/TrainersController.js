const User = require("../../models/UserModel");

// Get all trainers (assuming role is trainer)
const getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find().populate("roleId", "name").select("name email profile image");
    const formattedTrainers = trainers.map(trainer => ({
      id: trainer._id,
      name: trainer.name,
      expertise: trainer.profile.spacialization || "General",
      experience: trainer.profile.exp || "N/A",
      image: trainer.image || "",
      rating: 4.5, // Placeholder, as not in model
      certifications: [], // Placeholder
      specializations: trainer.profile.spacialization ? [trainer.profile.spacialization] : [],
    }));
    res.status(200).json(formattedTrainers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainers", error: error.message });
  }
};

// Add trainer
const addTrainer = async (req, res) => {
  try {
    const { name, expertise, experience, image, rating, certifications, specializations } = req.body;
    const trainer = new User({
      name,
      email: req.body.email || `${name.toLowerCase().replace(" ", "")}@gym.com`, // Placeholder
      password: "default", // Placeholder
      profile: {
        exp: experience,
        spacialization: expertise,
      },
      image,
      roleId: null, // Placeholder, set to null for now
    });
    await trainer.save();
    res.status(201).json({ message: "Trainer added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding trainer", error: error.message });
  }
};

// Update trainer
const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, expertise, experience, image } = req.body;
    await User.findByIdAndUpdate(id, {
      name,
      profile: { exp: experience, spacialization: expertise },
      image,
    });
    res.status(200).json({ message: "Trainer updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating trainer", error: error.message });
  }
};

// Delete trainer
const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trainer", error: error.message });
  }
};

module.exports = {
  getAllTrainers,
  addTrainer,
  updateTrainer,
  deleteTrainer,
};
