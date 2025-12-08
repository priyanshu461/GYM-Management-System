const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getCourseEnrollments,
  getUserEnrollments,
} = require("../controllers/CourseController");

// GET /api/courses - Get all courses
router.get("/", authenticateToken, getAllCourses);

// GET /api/courses/:id - Get course by ID
router.get("/:id", authenticateToken, getCourseById);

// POST /api/courses - Add a new course
router.post("/", authenticateToken, authorizeRoles(['Admin', 'Gym']), addCourse);

// PUT /api/courses/:id - Update a course
router.put("/:id", authenticateToken, authorizeRoles(['Admin', 'Gym']), updateCourse);

// DELETE /api/courses/:id - Delete a course
router.delete("/:id", authenticateToken, authorizeRoles(['Admin', 'Gym']), deleteCourse);

// POST /api/courses/:id/enroll - Enroll in course
router.post("/:id/enroll", authenticateToken, authorizeRoles(['Member']), enrollInCourse);

// GET /api/courses/:id/enrollments - Get course enrollments
router.get("/:id/enrollments", authenticateToken, getCourseEnrollments);

// GET /api/users/:userId/enrollments - Get user enrollments
router.get("/users/:userId/enrollments", authenticateToken, getUserEnrollments);

module.exports = router;
