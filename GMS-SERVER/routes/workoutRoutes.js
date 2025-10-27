const express = require('express');
const router = express.Router();
const {
  getAllRoutines,
  addRoutine,
  updateRoutine,
  deleteRoutine,
} = require('../http/controllers/WorkoutController');

// Workout routes
router.get('/', getAllRoutines);
router.post('/', addRoutine);
router.put('/:id', updateRoutine);
router.delete('/:id', deleteRoutine);

module.exports = router;
