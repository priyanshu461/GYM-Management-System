// backend/controllers/AuthController.js
const User = require("../models/UserModel");
const Customer = require("../models/CustomerModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ------------------ ADMIN LOGIN ------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user;

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      user = await User.findOne({ email: email });
    } else {
      user = await User.findOne({ mobile: email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
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
    console.error("Admin login error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------ MEMBER SIGNUP ------------------
const memberSignup = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    // Validation
    if (!name?.trim() || !mobile || !password) {
      return res
        .status(400)
        .json({ message: "Name, mobile, and password are required" });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ message: "Mobile must be a valid 10-digit number" });
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check if mobile exists
    const existingMobileCustomer = await Customer.findOne({ mobile });
    if (existingMobileCustomer) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    // Check if email exists (only if provided)
    if (email) {
      const existingEmailCustomer = await Customer.findOne({
        email: email.toLowerCase().trim(),
      });
      if (existingEmailCustomer) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newCustomer = new Customer({
      name: name.trim(),
      mobile,
      email: email ? email.toLowerCase().trim() : "", // ✅ changed from null to ""
      password: hashedPassword,
    });

    await newCustomer.save();

    const token = jwt.sign(
      { id: newCustomer._id, user_type: "member" },
      process.env.JWT_SECRET || "7c892230e8994de8b59b604e",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Member signup successful",
      token,
      user: {
        id: newCustomer._id,
        name: newCustomer.name,
        mobile: newCustomer.mobile,
        email: newCustomer.email,
        user_type: "member",
      },
    });
  } catch (error) {
    console.error("Member signup error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ------------------ TOKEN VERIFY ------------------
const verify = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "7c892230e8994de8b59b604e"
    );

    let user = await User.findById(decoded.id);
    console.log(user);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "Token valid",
      user: {
        id: user._id,
        name: user.name,
        email: user.email || user.mobile,
        roleId: user.roleId || null,
        user_type: user.user_type || "",
      },
    });
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
// ------------------ ADMIN SIGNUP ------------------

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const adminRole = await Role.findOne({ name: "Admin" });
    if (!adminRole)
      return res.status(500).json({ message: "Admin role not found" });

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
        user_type: "admin",
      },
    });
  } catch (error) {
    console.error("Admin signup error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, memberSignup, signup, verify };
