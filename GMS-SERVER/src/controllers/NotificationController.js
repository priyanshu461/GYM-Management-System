const Notification = require("../models/NotificationModel");
const User = require("../models/UserModel");
const Customer = require("../models/CustomerModel");

// Get all notifications for a user
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v");

    const total = await Notification.countDocuments({ user: userId });

    res.status(200).json({
      notifications,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

// Get unread notifications count
const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await Notification.countDocuments({ user: userId, read: false });
    res.status(200).json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching unread count", error: error.message });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { user, title, message, type, priority, link, channels, segment, schedule, template, campaign } = req.body;

    if (!user || !title || !message) {
      return res.status(400).json({ message: "User, title, and message are required" });
    }

    const notification = new Notification({
      user,
      title,
      message,
      type: type || "Info",
      priority: priority || "normal",
      link: link || "",
      channels: channels || [],
      segment: segment || "all",
      schedule: schedule ? new Date(schedule) : null,
      template: template || "",
      campaign: campaign || "",
      sentAt: schedule ? null : new Date()
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error creating notification", error: error.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true, readAt: new Date(), openedAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error marking notification as read", error: error.message });
  }
};

// Mark all notifications as read for a user
const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    await Notification.updateMany(
      { user: userId, read: false },
      { read: true, readAt: new Date(), openedAt: new Date() }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error marking all notifications as read", error: error.message });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error: error.message });
  }
};

// Send bulk notifications (for campaigns)
const sendBulkNotifications = async (req, res) => {
  try {
    const { users, title, message, type, priority, link, channels, segment, schedule, template, campaign } = req.body;

    if (!users || !Array.isArray(users) || users.length === 0 || !title || !message) {
      return res.status(400).json({ message: "Users array, title, and message are required" });
    }

    const notifications = users.map(userId => ({
      user: userId,
      title,
      message,
      type: type || "Info",
      priority: priority || "normal",
      link: link || "",
      channels: channels || [],
      segment: segment || "all",
      schedule: schedule ? new Date(schedule) : null,
      template: template || "",
      campaign: campaign || "",
      sentAt: schedule ? null : new Date()
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      message: `Notifications sent to ${users.length} users`,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({ message: "Error sending bulk notifications", error: error.message });
  }
};

// Get notification stats
const getNotificationStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const total = await Notification.countDocuments({ user: userId });
    const unread = await Notification.countDocuments({ user: userId, read: false });
    const read = total - unread;
    const opened = await Notification.countDocuments({ user: userId, openedAt: { $ne: null } });
    const clicked = await Notification.countDocuments({ user: userId, clickedAt: { $ne: null } });
    const unsubscribed = await Notification.countDocuments({ user: userId, unsubscribedAt: { $ne: null } });

    const typeStats = await Notification.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);

    const channelStats = await Notification.aggregate([
      { $match: { user: userId } },
      { $unwind: "$channels" },
      { $group: { _id: "$channels", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      total,
      unread,
      read,
      opened,
      clicked,
      unsubscribed,
      typeStats,
      channelStats
    });
  } catch (error) {
    console.error("Error in getNotificationStats:", error);
    res.status(500).json({ message: "Error fetching notification stats", error: error.message });
  }
};

// Get live activity feed
const getActivityFeed = async (req, res) => {
  try {
    const activities = await Notification.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(20)
      .select("user title type read createdAt");

    const formattedActivities = activities.map(activity => ({
      id: activity._id,
      who: activity.user ? activity.user.name : "Unknown",
      what: activity.read ? "Opened" : "Sent",
      detail: activity.title,
      time: activity.createdAt.toISOString().split('T')[0] // Simple date for now
    }));

    res.status(200).json(formattedActivities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activity feed", error: error.message });
  }
};

// Get templates
const getTemplates = async (req, res) => {
  try {
    // For now, return static templates as per frontend
    const templates = [
      { id: "welcome", name: "Welcome pack", text: "Welcome to IronBase. Your plan is ready. Start with the Day 1 warmup and record your set PRs." },
      { id: "winback", name: "7‑day winback", text: "We miss you in the gym. Here is a 3‑move quick routine to get back on track. Tap to book a slot." },
      { id: "milestone", name: "Milestone unlocked", text: "You just crossed 10 sessions this month. Claim your badge and try the advanced push pull plan." },
      { id: "renewal", name: "Membership renewal", text: "Your membership ends soon. Renew now to keep access to classes, trainers, and priority slots." },
    ];

    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching templates", error: error.message });
  }
};

// Get segments
const getSegments = async (req, res) => {
  try {
    // Calculate segments based on users/customers
    const allUsers = await User.countDocuments();
    const newUsers = await User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
    const inactiveUsers = await Customer.countDocuments({ status: "Inactive" });
    const trialUsers = await Customer.countDocuments(); // Placeholder
    const vipUsers = await Customer.countDocuments(); // Placeholder

    const segments = [
      { id: "all", name: "All members", count: allUsers },
      { id: "new", name: "New joiners (30d)", count: newUsers },
      { id: "inactive", name: "Inactive 7d", count: inactiveUsers },
      { id: "trial", name: "Trial users", count: trialUsers },
      { id: "vip", name: "PT clients", count: vipUsers },
    ];

    res.status(200).json(segments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching segments", error: error.message });
  }
};

// Get system health
const getSystemHealth = async (req, res) => {
  try {
    // Placeholder for system health
    const health = [
      { service: "Email API", status: "OK" },
      { service: "SMS gateway", status: "OK" },
      { service: "Push service", status: "Degraded" },
    ];

    res.status(200).json(health);
  } catch (error) {
    res.status(500).json({ message: "Error fetching system health", error: error.message });
  }
};

// Get global notification stats (for dashboard)
const getGlobalStats = async (req, res) => {
  try {
    const totalSent = await Notification.countDocuments();
    const totalOpened = await Notification.countDocuments({ openedAt: { $ne: null } });
    const totalClicked = await Notification.countDocuments({ clickedAt: { $ne: null } });
    const totalUnsubscribed = await Notification.countDocuments({ unsubscribedAt: { $ne: null } });

    const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : 0;
    const clickRate = totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : 0;
    const unsubRate = totalSent > 0 ? ((totalUnsubscribed / totalSent) * 100).toFixed(1) : 0;

    // Mock data for sent (since sentAt is set on creation)
    const sent = totalSent; // In real app, might filter by date range

    res.status(200).json({
      sent: sent,
      openRate: `${openRate}%`,
      clicks: totalClicked,
      unsubs: `${unsubRate}%`
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching global stats", error: error.message });
  }
};

// Send notification to a segment
const sendToSegment = async (req, res) => {
  try {
    const { segment, title, message, type, priority, link, channels, schedule, template, campaign } = req.body;

    if (!segment || !title || !message) {
      return res.status(400).json({ message: "Segment, title, and message are required" });
    }

    let users = [];

    if (segment === "all") {
      users = await User.find({}, "_id");
    } else if (segment === "new") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      users = await User.find({ createdAt: { $gte: thirtyDaysAgo } }, "_id");
    } else if (segment === "inactive") {
      users = await Customer.find({ status: "Inactive" }, "_id");
    } else if (segment === "trial") {
      // Assuming trial users have a specific status or plan
      users = await Customer.find({ status: "Trial" }, "_id");
    } else if (segment === "vip") {
      // Assuming VIP are PT clients, perhaps linked to trainers
      users = await Customer.find({ trainer: { $ne: null } }, "_id");
    } else {
      return res.status(400).json({ message: "Invalid segment" });
    }

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found in this segment" });
    }

    const userIds = users.map(u => u._id);

    const notifications = userIds.map(userId => ({
      user: userId,
      title,
      message,
      type: type || "Info",
      priority: priority || "normal",
      link: link || "",
      channels: channels || [],
      segment,
      schedule: schedule ? new Date(schedule) : null,
      template: template || "",
      campaign: campaign || "",
      sentAt: schedule ? null : new Date()
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      message: `Notifications sent to ${userIds.length} users in segment '${segment}'`,
      count: userIds.length,
      segment
    });
  } catch (error) {
    res.status(500).json({ message: "Error sending to segment", error: error.message });
  }
};

module.exports = {
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
};
