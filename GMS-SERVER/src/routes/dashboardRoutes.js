const express = require('express');
const router = express.Router();
const {
  getStats,
  getTopProducts,
  getRecentOrders,
  getAllOrders,
  getSalesOverview
} = require('../controllers/DashboardController');

// Dashboard routes
router.get('/stats', getStats);
router.get('/top-products', getTopProducts);
router.get('/recent-orders', getRecentOrders);
router.get('/all-orders', getAllOrders);
router.get('/sales-overview', getSalesOverview);

module.exports = router;
