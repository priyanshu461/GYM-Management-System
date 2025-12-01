const express = require('express');
const router = express.Router();
const {
  getAllTrainers,
  getAllTrainersForSalary,
  getTrainersByGym,
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerSalaryDetails,
  createOrUpdateTrainerSalary,
  updateTrainerSalary,
  getSalaryAnalytics,
  addPaymentRecord,
  updatePaymentRecord,
  deletePaymentRecord,
} = require('../controllers/TrainersController');

router.get('/all', getAllTrainers);
router.get('/all-for-salary', getAllTrainersForSalary);
router.get('/gym/:gymId', getTrainersByGym); // Get trainers by gym ID
router.get('/:id', getTrainerById); // Add route to get single trainer by ID
router.get('/salary/:trainerId', getTrainerSalaryDetails); // Add route to get trainer salary details
router.get('/salary/analytics', getSalaryAnalytics); // Get salary analytics for all trainers
router.post('/add', addTrainer);
router.post('/salary/create-or-update', createOrUpdateTrainerSalary); // Create or update trainer salary transaction
router.put('/salary/:trainerId', updateTrainerSalary); // Update trainer salary dynamically
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

// Payment record routes
router.post('/:trainerId/payment', addPaymentRecord); // Add payment record
router.put('/:trainerId/payment/:paymentId', updatePaymentRecord); // Update payment record
router.delete('/:trainerId/payment/:paymentId', deletePaymentRecord); // Delete payment record

module.exports = router;
