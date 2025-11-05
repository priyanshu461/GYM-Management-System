const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/CourseController");

// GET /api/courses - Get all courses
router.get("/", getAllCourses);

// POST /api/courses - Add a new course
router.post("/", addCourse);

// PUT /api/courses/:id - Update a course
router.put("/:id", updateCourse);

// DELETE /api/courses/:id - Delete a course
router.delete("/:id", deleteCourse);

module.exports = router;
