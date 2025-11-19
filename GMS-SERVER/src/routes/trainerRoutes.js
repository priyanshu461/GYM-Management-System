const express = require('express');
const router = express.Router();
const {
  getTrainerSalary,
  getTrainerSchedules,
  getTrainerClients,
  createWorkout,
  assignWorkoutToClient,
  resetPassword,
} = require('../controllers/TrainersController');

// Trainer-specific routes
router.get('/salary', getTrainerSalary);
router.get('/schedules', getTrainerSchedules);
router.get('/clients', getTrainerClients);
router.post('/workouts/create', createWorkout);
router.post('/workouts/assign', assignWorkoutToClient);
router.put('/password/reset', resetPassword);

module.exports = router;
