const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
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

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      roleId: user.roleId,
      email: user.email,
      name: user.name,
      user_type: user.user_type,
      gymId: user.gymId,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res
      .status(500)
      .json({ message: "Authentication error", error: error.message });
  }
};

// Optional: Role-based authorization middleware
const authorizeRole = (...roles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // You can extend this to check roles from RoleModel
    // For now, it's a placeholder that can be extended
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole,
};
