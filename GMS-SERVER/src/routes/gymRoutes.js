const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const {
  getAllGyms,
  getGymById,
  addGym,
  updateGym,
  deleteGym,
} = require('../controllers/GymControllers');

// Route to get all gyms
router.get('/', authenticateToken, getAllGyms);

// Route to get a specific gym by ID
router.get('/:id', authenticateToken, getGymById);

// Route to add a new gym
router.post('/', authenticateToken, addGym);

// Route to update an existing gym by ID
router.put('/:id', authenticateToken, updateGym);

// Route to delete a gym by ID
router.delete('/:id', authenticateToken, deleteGym);

module.exports = router;
