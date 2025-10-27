const express = require("express");
const router = express.Router();
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
} = require("../http/controllers/NotificationController");

// GET /api/notifications/:userId - Get notifications for a user
router.get("/:userId", getNotifications);

// GET /api/notifications/:userId/unread-count - Get unread count
router.get("/:userId/unread-count", getUnreadCount);

// GET /api/notifications/:userId/stats - Get notification stats
router.get("/:userId/stats", getNotificationStats);

// GET /api/notifications/activity-feed - Get live activity feed
router.get("/activity-feed", getActivityFeed);

// GET /api/notifications/templates - Get notification templates
router.get("/templates", getTemplates);

// GET /api/notifications/segments - Get user segments
router.get("/segments", getSegments);

// GET /api/notifications/system-health - Get system health
router.get("/system-health", getSystemHealth);

// POST /api/notifications - Create a new notification
router.post("/", createNotification);

// POST /api/notifications/bulk - Send bulk notifications
router.post("/bulk", sendBulkNotifications);

// PUT /api/notifications/:id/read - Mark notification as read
router.put("/:id/read", markAsRead);

// PUT /api/notifications/:userId/read-all - Mark all as read
router.put("/:userId/read-all", markAllAsRead);

// DELETE /api/notifications/:id - Delete a notification
router.delete("/:id", deleteNotification);

// GET /api/notifications/global-stats - Get global notification stats
router.get("/global-stats", getGlobalStats);

// POST /api/notifications/send-to-segment - Send to segment
router.post("/send-to-segment", sendToSegment);

module.exports = router;
