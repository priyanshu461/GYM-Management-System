const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getFinancialSummary,
} = require('../controllers/FinanceController');

// Transaction routes
router.get('/', getAllTransactions);
router.post('/', addTransaction);
router.get('/summary', getFinancialSummary);
router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
