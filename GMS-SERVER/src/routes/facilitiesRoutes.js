const express = require('express');
const router = express.Router();
const {
  getAllFacilities,
  addFacility,
  updateFacility,
  deleteFacility,
} = require('../controllers/FacilitiesController');

router.get('/', getAllFacilities);
router.post('/', addFacility);
router.put('/:id', updateFacility);
router.delete('/:id', deleteFacility);

module.exports = router;
