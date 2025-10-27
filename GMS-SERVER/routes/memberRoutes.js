const express = require('express');
const router = express.Router();
const {
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
} = require('../http/controllers/MemberController');

router.get('/', getAllMembers);
router.post('/', addMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
