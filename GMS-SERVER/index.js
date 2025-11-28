const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8080;
const {authenticateToken, authorizeRoles} = require("./src/middlewares/auth");
// Database connection
const connectDB = require("./src/config/db");
connectDB();

// Import models to register them
require("./src/models/RoleModel");  
require("./src/models/UserModel");

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
// Authentication routes
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

// Dashboard routes
const dashboardRoutes = require("./src/routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// Product routes
const productRoutes = require("./src/routes/productRoutes");
app.use("/api/products", productRoutes);

// Member management routes
const memberRoutes = require("./src/routes/memberRoutes");
app.use("/api/management/members", authenticateToken , memberRoutes);

// Facilities routes
const facilitiesRoutes = require("./src/routes/facilitiesRoutes");
app.use("/api/management/facilities", facilitiesRoutes);

// Trainers routes
const trainersRoutes = require("./src/routes/trainersRoutes");
app.use("/api/management/trainers",authenticateToken, trainersRoutes);

// Trainer-specific routes
const trainerRoutes = require("./src/routes/trainerRoutes");
app.use("/api/trainers", authenticateToken, trainerRoutes);

// Finance routes
const financeRoutes = require("./src/routes/financeRoutes");
app.use("/api/management/finance", authenticateToken, authorizeRoles(['Admin', 'Gym']), financeRoutes);

// Workout routes
const workoutRoutes = require("./src/routes/workoutRoutes");
app.use("/api/workout", workoutRoutes);

// Diet routes
const dietRoutes = require("./src/routes/dietRoutes");
app.use("/api/diet", dietRoutes);

// Progress routes
const progressRoutes = require("./src/routes/progressRoutes");
app.use("/api/progress", progressRoutes);

// Class routes
const classRoutes = require("./src/routes/classRoutes");
app.use("/api/classes", classRoutes);

// Course routes
const courseRoutes = require("./src/routes/courseRoutes");
app.use("/api/courses", courseRoutes);

// Franchise routes
const franchiseRoutes = require("./src/routes/franchiseRoutes");
app.use("/api/franchises", franchiseRoutes);

// Membership routes
const membershipRoutes = require("./src/routes/membershipRoutes");
app.use("/api/memberships", membershipRoutes);

// Supplement routes
const supplementRoutes = require("./src/routes/supplementRoutes");
app.use("/api/supplements", supplementRoutes);

// Blog routes
const blogRoutes = require("./src/routes/blogRoutes");
app.use("/api/blog", blogRoutes);

// AI routes
const aiRoutes = require("./src/routes/aiRoutes");
app.use("/api/ai", aiRoutes);

// Notification routes
const notificationRoutes = require("./src/routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

// Settings routes
const settingRoutes = require("./src/routes/settingRoutes");
app.use("/api/settings", settingRoutes);

// Support routes
const supportRoutes = require("./src/routes/supportRoutes");
app.use("/api/support", supportRoutes);

// Gym routes
const gymRoutes = require("./src/routes/gymRoutes");
app.use("/api/gyms", gymRoutes);

// Health check and sample routes
app.get("/", (req, res) => {
  res.json({
    message: "Gym Management System API",
    version: "1.0.0",
    status: "running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
