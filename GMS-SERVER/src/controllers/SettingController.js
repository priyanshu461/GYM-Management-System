const User = require("../models/UserModel");

// Get user settings
const getSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return default settings if no settings exist
    const settings = user.settings || {
      profile: {},
      security: {},
      notifications: {},
      appearance: {},
      branches: [],
      integrations: [],
      billing: {},
      advanced: { automation: { dailyBackup: true, cleanupSessions: true, rebuildAnalytics: true, syncEmails: true } }
    };
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

// Update profile settings
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;
    const user = await User.findByIdAndUpdate(userId, { "settings.profile": profileData }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.settings.profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Update security settings
const updateSecurity = async (req, res) => {
  try {
    const { userId } = req.params;
    const securityData = req.body;
    const user = await User.findByIdAndUpdate(userId, { "settings.security": securityData }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.settings.security);
  } catch (error) {
    console.error("Error updating security:", error);
    res.status(500).json({ message: "Failed to update security settings" });
  }
};

// Update notification settings
const updateNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notificationData = req.body;
    const user = await User.findByIdAndUpdate(userId, { "settings.notifications": notificationData }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.settings.notifications);
  } catch (error) {
    console.error("Error updating notifications:", error);
    res.status(500).json({ message: "Failed to update notifications" });
  }
};

// Update appearance settings
const updateAppearance = async (req, res) => {
  try {
    const { userId } = req.params;
    const appearanceData = req.body;
    const user = await User.findByIdAndUpdate(userId, { "settings.appearance": appearanceData }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.settings.appearance);
  } catch (error) {
    console.error("Error updating appearance:", error);
    res.status(500).json({ message: "Failed to update appearance" });
  }
};

// Update branches
const updateBranches = async (req, res) => {
  try {
    const { userId } = req.params;
    const branchesData = req.body.branches;
    const user = await User.findByIdAndUpdate(userId, { "settings.branches": branchesData }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.settings.branches);
  } catch (error) {
    console.error("Error updating branches:", error);
    res.status(500).json({ message: "Failed to update branches" });
  }
};

// Update integrations
const updateIntegrations = async (req, res) => {
  try {
    const { userId } = req.params;
    const integrationsData = req.body.integrations;
    const user = await User.findByIdAndUpdate(userId, { "settings.integrations": integrationsData }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.settings.integrations);
  } catch (error) {
    console.error("Error updating integrations:", error);
    res.status(500).json({ message: "Failed to update integrations" });
  }
};

// Update billing settings
const updateBilling = async (req, res) => {
  try {
    const { userId } = req.params;
    const billingData = req.body;
    const user = await User.findByIdAndUpdate(userId, { "settings.billing": billingData }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.settings.billing);
  } catch (error) {
    console.error("Error updating billing:", error);
    res.status(500).json({ message: "Failed to update billing" });
  }
};

// Update advanced settings
const updateAdvanced = async (req, res) => {
  try {
    const { userId } = req.params;
    const advancedData = req.body;
    const user = await User.findByIdAndUpdate(userId, { "settings.advanced": advancedData }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.settings.advanced);
  } catch (error) {
    console.error("Error updating advanced settings:", error);
    res.status(500).json({ message: "Failed to update advanced settings" });
  }
};

// Delete account
const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};

module.exports = {
  getSettings,
  updateProfile,
  updateSecurity,
  updateNotifications,
  updateAppearance,
  updateBranches,
  updateIntegrations,
  updateBilling,
  updateAdvanced,
  deleteAccount
};
