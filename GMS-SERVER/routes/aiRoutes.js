const express = require("express");
const router = express.Router();
const { generatePlan } = require("../http/controllers/AIPlanController");

// POST /api/ai/generate-plan - Generate AI plan
router.post("/generate-plan", generatePlan);

module.exports = router;
