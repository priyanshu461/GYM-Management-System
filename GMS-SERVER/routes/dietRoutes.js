const express = require('express');
const router = express.Router();
const {
  getAllPlans,
  addPlan,
  updatePlan,
  deletePlan,
} = require('../http/controllers/DietController');

// Diet routes
router.get('/', getAllPlans);
router.post('/', addPlan);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

module.exports = router;
