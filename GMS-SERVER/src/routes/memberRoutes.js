const express = require('express');
const router = express.Router();
const {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
} = require('../controllers/MemberController');

router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.post('/', addMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
