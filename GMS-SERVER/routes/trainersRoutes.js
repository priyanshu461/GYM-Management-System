const express = require('express');
const router = express.Router();
const {
  getAllTrainers,
  addTrainer,
  updateTrainer,
  deleteTrainer,
} = require('../http/controllers/TrainersController');

router.get('/all', getAllTrainers);
router.post('/add', addTrainer);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

module.exports = router;
