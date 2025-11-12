const User = require("../models/UserModel");
const Role = require("../models/RoleModel");

// Get all trainers (filter by Trainer role)
const getAllTrainers = async (req, res) => {
  try {
    const params = { user_type: "Trainer" };
    const gymId = req?.user?.gymId;
    if (gymId) {
      params.gymId = gymId;
    }

    const trainers = await User.find(params).populate("roleId", "name").select("name email profile image certifications specializations rating");
    const formattedTrainers = (trainers || []).map(trainer => ({
      id: trainer._id,
      name: trainer.name,
      expertise: trainer.profile.spacialization || "General",
      experience: trainer.profile.exp || "N/A",
      image: trainer.image || "",
      rating: trainer.rating || 0,
      certifications: trainer.certifications || [],
      specializations: trainer.specializations || [],
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

    // Get the Trainer role ID
    const trainerRole = await Role.findOne({ name: "Trainer" });
    if (!trainerRole) {
      return res.status(500).json({ message: "Trainer role not found" });
    }

    const trainer = new User({
      name,
      email: req.body.email || `${name.toLowerCase().replace(" ", "")}@gym.com`, // Placeholder
      password: "default", // Placeholder
      profile: {
        exp: experience,
        spacialization: expertise,
      },
      image,
      certifications: certifications || [],
      specializations: specializations || [],
      rating: rating || 0,
      roleId: trainerRole._id,
      user_type: "Trainer",
      gymId: req.user.gymId || req.body.gymId || null
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
    const { name, expertise, experience, image, rating, certifications, specializations } = req.body;
    await User.findByIdAndUpdate(id, {
      name,
      profile: { exp: experience, spacialization: expertise },
      image,
      rating: rating || 0,
      certifications: certifications || [],
      specializations: specializations || [],
      gymId: req.user.gymId || req.body.gymId || null,
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
