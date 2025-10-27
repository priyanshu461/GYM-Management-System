const express = require("express");
const router = express.Router();
const {
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
} = require("../http/controllers/SettingController");

// GET /api/settings/:userId - Get user settings
router.get("/:userId", getSettings);

// PUT /api/settings/:userId/profile - Update profile settings
router.put("/:userId/profile", updateProfile);

// PUT /api/settings/:userId/security - Update security settings
router.put("/:userId/security", updateSecurity);

// PUT /api/settings/:userId/notifications - Update notification settings
router.put("/:userId/notifications", updateNotifications);

// PUT /api/settings/:userId/appearance - Update appearance settings
router.put("/:userId/appearance", updateAppearance);

// PUT /api/settings/:userId/branches - Update branches
router.put("/:userId/branches", updateBranches);

// PUT /api/settings/:userId/integrations - Update integrations
router.put("/:userId/integrations", updateIntegrations);

// PUT /api/settings/:userId/billing - Update billing settings
router.put("/:userId/billing", updateBilling);

// PUT /api/settings/:userId/advanced - Update advanced settings
router.put("/:userId/advanced", updateAdvanced);

// DELETE /api/settings/:userId - Delete user account
router.delete("/:userId", deleteAccount);

module.exports = router;
