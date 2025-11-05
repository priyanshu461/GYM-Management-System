const express = require("express");
const router = express.Router();
const {
  getAllFranchises,
  addFranchise,
  updateFranchise,
  deleteFranchise,
} = require("../controllers/FranchiseController");

// GET /api/franchises - Get all franchises
router.get("/", getAllFranchises);

// POST /api/franchises - Add a new franchise
router.post("/", addFranchise);

// PUT /api/franchises/:id - Update a franchise
router.put("/:id", updateFranchise);

// DELETE /api/franchises/:id - Delete a franchise
router.delete("/:id", deleteFranchise);

module.exports = router;
