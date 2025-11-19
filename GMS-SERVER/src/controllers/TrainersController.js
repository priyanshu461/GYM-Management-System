const Trainer = require("../models/TrainerModel");
const Role = require("../models/RoleModel");
const bcryptjs = require("bcryptjs");
const User = require("../models/UserModel");

// Get all trainers (filter by active trainers)
const getAllTrainers = async (req, res) => {
  try {
    const params = { user_type: "Trainer", isActive: true };
    // Removed gymId filter to show all trainers

    const trainers = await User.find(params)
      .select(
        "employeeId name email profile image certifications specializations rating"
      );
    const formattedTrainers = (trainers || []).map((trainer) => ({
      id: trainer._id,
      employeeId: trainer.employeeId || "",
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
    res
      .status(500)
      .json({ message: "Error fetching trainers", error: error.message });
  }
};

// Add trainer
const addTrainer = async (req, res) => {
  try {
    const {
      name,
      expertise,
      experience,
      image,
      rating,
      certifications,
      specializations,
      employeeId,
    } = req.body;

    // Get the Trainer role ID
    const trainerRole = await Role.findOne({ name: "Trainer" });
    if (!trainerRole) {
      return res.status(500).json({ message: "Trainer role not found" });
    }

    const trainer = new User({
      employeeId,
      name,
      email:
        req.body.email ||
        `${employeeId.toLowerCase().replace(" ", "")}@gym.com`, // Placeholder
      password: req.body.password
        ? bcryptjs.hashSync(req.body.password, 10)
        : bcryptjs.hashSync(employeeId, 10),
      profile: {
        exp: experience,
        spacialization: expertise,
      },
      image,
      rating: rating || 0,
      certifications: certifications || [],
      specializations: specializations || [],
      user_type: "Trainer",
      roleId: trainerRole._id,
      gymId: req.user.gymId || req.body.gymId || null,
    });
    await trainer.save();
    res.status(201).json({ message: "Trainer added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding trainer", error: error.message });
  }
};

// Update trainer
const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      expertise,
      experience,
      image,
      rating,
      certifications,
      specializations,
      employeeId,
      password,
    } = req.body;
    const updateData = {
      name,
      image,
      rating: rating || 0,
      certifications: certifications || [],
      specializations: specializations || [],
      gymId: req.user.gymId || req.body.gymId || null,
    };
    if (employeeId) updateData.employeeId = employeeId;
    if (password) updateData.password = bcryptjs.hashSync(password, 10);

    // Update profile fields using $set to avoid overwriting the entire profile
    const profileUpdates = {};
    if (experience !== undefined) profileUpdates['profile.exp'] = experience;
    if (expertise !== undefined) profileUpdates['profile.spacialization'] = expertise;

    if (Object.keys(profileUpdates).length > 0) {
      updateData.$set = profileUpdates;
    }

    await User.findByIdAndUpdate(id, updateData);
    res.status(200).json({ message: "Trainer updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating trainer", error: error.message });
  }
};

// Delete trainer (soft delete by setting isActive to false)
const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isActive: false });
    res.status(200).json({ message: "Trainer deactivated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating trainer", error: error.message });
  }
};

// Get trainer by ID
const getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await User.findOne({ _id: id, isActive: true });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    const formattedTrainer = {
      id: trainer._id,
      employeeId: trainer.employeeId || "",
      name: trainer.name,
      email: trainer.email,
      mobile: trainer.mobile || "",
      expertise: trainer.profile.spacialization || "General",
      experience: trainer.profile.exp || "N/A",
      image: trainer.image || "",
      rating: trainer.rating || 0,
      certifications: trainer.certifications || [],
      specializations: trainer.specializations || [],
    };
    res.status(200).json(formattedTrainer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trainer", error: error.message });
  }
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer, 
};
