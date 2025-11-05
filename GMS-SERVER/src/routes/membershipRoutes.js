const express = require("express");
const router = express.Router();
const {
  getAllMembershipPlans,
  addMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
} = require("../controllers/MembershipController");

// GET /api/memberships - Get all membership plans
router.get("/", getAllMembershipPlans);

// POST /api/memberships - Add a new membership plan
router.post("/", addMembershipPlan);

// PUT /api/memberships/:id - Update a membership plan
router.put("/:id", updateMembershipPlan);

// DELETE /api/memberships/:id - Delete a membership plan
router.delete("/:id", deleteMembershipPlan);

module.exports = router;
