const express = require("express");
const router = express.Router();
const {
  getAllSupplements,
  addSupplement,
  updateSupplement,
  deleteSupplement,
} = require("../controllers/SupplementController");

// GET /api/supplements - Get all supplements
router.get("/", getAllSupplements);

// POST /api/supplements - Add a new supplement
router.post("/", addSupplement);

// PUT /api/supplements/:id - Update a supplement
router.put("/:id", updateSupplement);

// DELETE /api/supplements/:id - Delete a supplement
router.delete("/:id", deleteSupplement);

module.exports = router;
