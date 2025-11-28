const express = require('express');
const router = express.Router();
const {
  getAllTrainers,
  getTrainersByGym,
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer,
} = require('../controllers/TrainersController');

router.get('/all', getAllTrainers);
router.get('/gym/:gymId', getTrainersByGym); // Get trainers by gym ID
router.get('/:id', getTrainerById); // Add route to get single trainer by ID
router.post('/add', addTrainer);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

module.exports = router;
