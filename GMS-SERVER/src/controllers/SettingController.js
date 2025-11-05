const Setting = require("../models/SettingModel");

// Get user settings
const getSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const settings = await Setting.findOne({ userId });

    if (!settings) {
      // Create default settings if not exist
      const defaultSettings = new Setting({
        userId,
        profile: {
          name: "",
          email: "",
          phone: "",
          role: "Admin",
          bio: ""
        },
        security: {
          otpEnabled: false,
          sessions: []
        },
        notifications: {
          memberUpdates: {
            classReminders: true,
            newSignups: true,
            ptBookingAlerts: true,
            lowAttendance: true,
            missedPayments: true,
            weeklySummary: true
          },
          channels: {
            email: true,
            sms: true,
            push: true,
            inApp: true
          }
        },
        appearance: {
          theme: "emerald",
          density: "comfortable"
        },
        branches: [],
        integrations: {
          razorpay: false,
          whatsapp: false,
          mailgun: false,
          twilio: false
        },
        billing: {
          plan: "Pro",
          invoices: []
        },
        advanced: {
          automation: {
            dailyBackup: true,
            cleanupSessions: true,
            rebuildAnalytics: true,
            syncEmailLists: true
          }
        }
      });

      await defaultSettings.save();
      return res.status(200).json(defaultSettings);
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings", error: error.message });
  }
};

// Update profile settings
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, role, bio } = req.body;

    const updatedSettings = await Setting.findOneAndUpdate(
      { userId },
      {
        $set: {
          "profile.name": name,
          "profile.email": email,
          "profile.phone": phone,
          "profile.role": role,
          "profile.bio": bio
        }
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

// Update security settings
const updateSecurity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { otpEnabled, sessions } = req.body;

    const updatedSettings = await Setting.findOneAndUpdate(
      { userId },
      {
        $set: {
          "security.otpEnabled": otpEnabled,
          "security.sessions": sessions
        }
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Error updating security settings", error: error.message });
  }
};

// Update notification settings
const updateNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const { memberUpdates, channels } = req.body;

    const updatedSettings = await Setting.findOneAndUpdate(
      { userId },
      {
        $set: {
          "notifications.memberUpdates": memberUpdates,
          "notifications.channels": channels
        }
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Error updating notifications", error: error.message });
  }
};

// Update appearance settings
const updateAppearance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { theme, density } = req.body;

    const updatedSettings = await Setting.findOneAndUpdate(
      { userId },
      {
        $set: {
          "appearance.theme": theme,
          "appearance.density": density
        }
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Error updating appearance", error: error.message });
  }
};

// Update branches
const updateBranches = async (req, res) => {
  try {
    const { userId } = req.params;
    const { branches } = req.body;

    const updatedSettings = await Setting.findOneAndUpdate(
      { userId },
      { $set: { branches } },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Error updating branches", error: error.message });
  }
};

// Update integrations
const updateIntegrations = async (req, res) => {
  try {
    const { userId } = req.params;
    const { integrations } = req.body;

    const updatedSettings = await Setting.findOneAndUpdate(
      { userId },
      { $set: { integrations } },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Error updating integrations", error: error.message });
  }
};

// Update billing settings
const updateBilling = async (req, res) => {
  try {
    const { userId } = req.params;
    const { plan, invoices } = req.body;

    const updatedSettings = await Setting.findOneAndUpdate(
      { userId },
      {
        $set: {
          "billing.plan": plan,
          "billing.invoices": invoices
        }
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Error updating billing", error: error.message });
  }
};

// Update advanced settings
const updateAdvanced = async (req, res) => {
  try {
    const { userId } = req.params;
    const { automation } = req.body;

    const updatedSettings = await Setting.findOneAndUpdate(
      { userId },
      { $set: { "advanced.automation": automation } },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Error updating advanced settings", error: error.message });
  }
};

// Delete user account (danger zone)
const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.params;

    // In a real app, this would require additional confirmation
    await Setting.findOneAndDelete({ userId });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account", error: error.message });
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
