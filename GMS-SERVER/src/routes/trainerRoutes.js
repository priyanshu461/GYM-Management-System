const express = require("express");
const router = express.Router();
const {
  getAllTrainers,
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerSalary,
  getTrainerSchedules,
  createSchedule,
  getTrainerClients,
  getAssignedMembers,
  assignWorkoutToClient,
  resetPassword,
  getTrainerDashboard,
  getTrainerStats,
  getTrainerActivities,
  getTrainerClasses,
  assignMemberToTrainer,
  getAvailableMembers,
  removeMemberFromTrainer,
} = require("../controllers/TrainersController");
const {
  createWorkout,
  getWorkouts,
} = require("../controllers/WorkoutController");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

// Management routes (for admin/management roles) - these are already defined in management routes, but keeping for reference
// router.get("/all", authenticateToken, authorizeRoles(["Admin", "Management"]), getAllTrainers);
// router.post("/add", authenticateToken, authorizeRoles(["Admin", "Management"]), addTrainer);
// router.put("/:id", authenticateToken, authorizeRoles(["Admin", "Management"]), updateTrainer);
// router.delete("/:id", authenticateToken, authorizeRoles(["Admin", "Management"]), deleteTrainer);
// router.get("/:id", authenticateToken, authorizeRoles(["Admin", "Management"]), getTrainerById);

// Trainer-specific routes (accessible by Trainer role only, or Admin for viewing trainer data)
router.get("/salary", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getTrainerSalary);
router.get("/schedules", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getTrainerSchedules);
router.post("/schedules/create", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), createSchedule);
router.get("/clients", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getTrainerClients);
router.post("/workouts/create", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), createWorkout);
router.post("/workouts/assign", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), assignWorkoutToClient);
router.put("/password/reset", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), resetPassword);
router.get("/workouts", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getWorkouts);
router.get("/dashboard", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getTrainerDashboard);
router.get("/stats", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getTrainerStats);
router.get("/assigned-members", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getAssignedMembers);
router.get("/activities", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getTrainerActivities);
router.get("/classes", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getTrainerClasses);

// Member management routes for trainers
router.post("/assign-member", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), assignMemberToTrainer);
router.get("/available-members", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), getAvailableMembers);
router.delete("/remove-member/:memberId", authenticateToken, authorizeRoles(["Trainer", "Gym", "Admin"]), removeMemberFromTrainer);

module.exports = router;
