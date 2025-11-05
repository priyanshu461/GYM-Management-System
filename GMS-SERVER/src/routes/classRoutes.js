const express = require("express");
const router = express.Router();
const {
  getAllClasses,
  addClass,
  updateClass,
  deleteClass,
} = require("../controllers/ClassController");

// GET /api/classes - Get all classes
router.get("/", getAllClasses);

// POST /api/classes - Add a new class
router.post("/", addClass);

// PUT /api/classes/:id - Update a class
router.put("/:id", updateClass);

// DELETE /api/classes/:id - Delete a class
router.delete("/:id", deleteClass);

module.exports = router;
