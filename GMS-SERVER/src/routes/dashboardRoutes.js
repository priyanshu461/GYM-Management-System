const express = require('express');
const router = express.Router();
const {
  getStats,
  getTopProducts,
  getRecentOrders,
  getAllOrders,
  getSalesOverview
} = require('../controllers/DashboardController');
const { createProduct } = require('../controllers/ProductController');

// Dashboard routes
router.get('/stats', getStats);
router.get('/top-products', getTopProducts);
router.get('/recent-orders', getRecentOrders);
router.get('/all-orders', getAllOrders);
router.get('/sales-overview', getSalesOverview);

// Product creation route under dashboard
router.post('/product/create', createProduct);

module.exports = router;
