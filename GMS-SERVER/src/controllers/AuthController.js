const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      console.log(`Invalid credentials for email: ${email}`); // Debug log
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, roleId: user.roleId },
      process.env.JWT_SECRET || "7c892230e8994de8b59b604e",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        user_type: user.user_type,
        gymId: user.gymId,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verify = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "7c892230e8994de8b59b604e"
    );
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Token valid",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Get the Admin role ID for signup
    const adminRole = await Role.findOne({ name: "Admin" });
    if (!adminRole) {
      return res.status(500).json({ message: "Admin role not found" });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      roleId: adminRole._id,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, roleId: newUser.roleId },
      process.env.JWT_SECRET || "7c892230e8994de8b59b604e",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        roleId: newUser.roleId,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, signup, verify };
