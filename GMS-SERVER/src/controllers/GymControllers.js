const bcryptjs = require("bcryptjs");
const Gym = require("../models/GymModel");
const User = require("../models/UserModel");

// Get all gyms
const getAllGyms = async (req, res) => {
  try {
    const gyms = await Gym.find({ status: "Active" });
    res.status(200).json({ gyms });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching gyms", error: error.message });
  }
};

// Get gym by ID
const getGymById = async (req, res) => {
  try {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym || gym.status !== "Active") {
      return res.status(404).json({ message: "Gym not found" });
    }
    res.status(200).json(gym);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching gym", error: error.message });
  }
};

// Add gym
const addGym = async (req, res) => {
  try {
    const { name, password, mobile, image, address, email } = req.body;
    const HashPassword = bcryptjs.hashSync(password, 10);

    const gym = new Gym({
      name,
      mobile,
      image,
      address,
      email,
      status: "Active",
    });
    await gym.save();
    const user = new User({
      name,
      password:HashPassword,
      mobile,
      image,
      address,
      email,
      status: "Active",
      gymId: gym._id,
      user_type: "Gym",
    });
    await user.save();
    res.status(201).json({ message: "Gym added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding gym", error: error.message });
  }
};

// Update gym
const updateGym = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, mobile, image, address, email } = req.body;
    await Gym.findByIdAndUpdate(id, {
      name,
      mobile,
      image,
      address,
      email,
    });
    const userData = {
      name,
      mobile,
      image,
      address,
      email,
    };
    if (password) {
      const HashPassword = bcryptjs.hashSync(password, 10);
      userData.HashPassword = HashPassword;
    }
    await User.findOne({ gymId: id }).updateOne(userData);

    res.status(200).json({ message: "Gym updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating gym", error: error.message });
  }
};

// Delete gym (soft delete)
const deleteGym = async (req, res) => {
  try {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }
    await Gym.findByIdAndUpdate(id, { status: "Inactive" });
    res.status(200).json({ message: "Gym deleted successfully" });
  } catch (error) {
    console.error("Delete gym error:", error);
    res
      .status(500)
      .json({ message: "Error deleting gym", error: error.message });
  }
};

module.exports = {
  getAllGyms,
  getGymById,
  addGym,
  updateGym,
  deleteGym,
};
