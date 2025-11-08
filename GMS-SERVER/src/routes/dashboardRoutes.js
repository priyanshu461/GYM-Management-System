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
const {
  getNotifications,
  getUnreadCount,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  sendBulkNotifications,
  getNotificationStats,
  getActivityFeed,
  getTemplates,
  getSegments,
  getSystemHealth,
  getGlobalStats,
  sendToSegment
} = require('../controllers/NotificationController');

// Dashboard routes
router.get('/stats', getStats);
router.get('/top-products', getTopProducts);
router.get('/recent-orders', getRecentOrders);
router.get('/all-orders', getAllOrders);
router.get('/sales-overview', getSalesOverview);

// Product creation route under dashboard
router.post('/product/create', createProduct);

// Notification routes
router.get('/notifications/:userId', getNotifications);
router.get('/notifications/:userId/unread-count', getUnreadCount);
router.post('/notifications', createNotification);
router.put('/notifications/:id/read', markAsRead);
router.put('/notifications/:userId/read-all', markAllAsRead);
router.delete('/notifications/:id', deleteNotification);
router.post('/notifications/bulk', sendBulkNotifications);
router.get('/notifications/:userId/stats', getNotificationStats);
router.get('/activity-feed', getActivityFeed);
router.get('/templates', getTemplates);
router.get('/segments', getSegments);
router.get('/system-health', getSystemHealth);
router.get('/global-stats', getGlobalStats);
router.post('/send-to-segment', sendToSegment);

module.exports = router;
