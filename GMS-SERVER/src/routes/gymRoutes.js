const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');
const {
  getAllGyms,
  getGymById,
  addGym,
  updateGym,
  deleteGym,
} = require('../controllers/GymControllers');

// Route to get all gyms - accessible to all authenticated users
router.get('/', authenticateToken, getAllGyms);

// Route to get a specific gym by ID - accessible to all authenticated users
router.get('/:id', authenticateToken, getGymById);

// Route to add a new gym - Admin only
router.post('/', authenticateToken, authorizeRoles(['Admin']), addGym);

// Route to update an existing gym by ID - Admin only
router.put('/:id', authenticateToken, authorizeRoles(['Admin']), updateGym);

// Route to delete a gym by ID - Admin only
router.delete('/:id', authenticateToken, authorizeRoles(['Admin']), deleteGym);

module.exports = router;
