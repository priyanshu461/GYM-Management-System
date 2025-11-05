const express = require('express');
const router = express.Router();
const {
  getProgress,
  addProgress,
  updateProgress,
  deleteProgress,
} = require('../controllers/ProgressController');

// Progress routes
router.get('/:customerId', getProgress);
router.post('/', addProgress);
router.put('/:id', updateProgress);
router.delete('/:id', deleteProgress);

module.exports = router;
