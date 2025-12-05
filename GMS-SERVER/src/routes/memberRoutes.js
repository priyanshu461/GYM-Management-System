const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  getMemberProfile,
  updateMemberProfile,
  getMemberStats,
  getRecentActivities,
  getUpcomingClasses,
} = require('../controllers/MemberController');

// Public route for member registration (no authentication required)
router.post('/register', addMember);

// Admin routes (require admin authentication)
router.get('/', authenticateToken, getAllMembers);
router.get('/:id', authenticateToken, getMemberById);
router.post('/', authenticateToken, addMember);
router.put('/:id', authenticateToken, updateMember);
router.delete('/:id', authenticateToken, deleteMember);

// Member routes (require member authentication)
router.get('/profile/me', authenticateToken, getMemberProfile);
router.put('/profile/me', authenticateToken, updateMemberProfile);
router.get('/stats', authenticateToken, getMemberStats);
router.get('/activities', authenticateToken, getRecentActivities);
router.get('/upcoming-classes', authenticateToken, getUpcomingClasses);

module.exports = router;
