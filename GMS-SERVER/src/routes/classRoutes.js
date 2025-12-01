const express = require("express");
const router = express.Router();
const {
  getAllClasses,
  getClassesByGym,
  getClassesByTrainer,
  addClass,
  updateClass,
  deleteClass,
} = require("../controllers/ClassController");

// GET /api/classes - Get all classes
router.get("/", getAllClasses);

// GET /api/classes/gym/:gymId - Get classes by gym ID
router.get("/gym/:gymId", getClassesByGym);

// GET /api/classes/trainer/:trainerId - Get classes by trainer ID
router.get("/trainer/:trainerId", getClassesByTrainer);

// POST /api/classes - Add a new class
router.post("/", addClass);

// PUT /api/classes/:id - Update a class
router.put("/:id", updateClass);

// DELETE /api/classes/:id - Delete a class
router.delete("/:id", deleteClass);

module.exports = router;
