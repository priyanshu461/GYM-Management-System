import { BASE_API_URL, getToken } from "../Utils/data";

const settingsService = {};

// Get user settings
settingsService.getSettings = async (userId) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch settings');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

// Update profile settings
settingsService.updateProfile = async (userId, profileData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    if (!res.ok) {
      throw new Error('Failed to update profile');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Update password
settingsService.updatePassword = async (userId, newPassword) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: newPassword }),
    });
    if (!res.ok) {
      throw new Error('Failed to update password');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

// Update security settings
settingsService.updateSecurity = async (userId, securityData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/security`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(securityData),
    });
    if (!res.ok) {
      throw new Error('Failed to update security settings');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating security settings:', error);
    throw error;
  }
};

// Update notification settings
settingsService.updateNotifications = async (userId, notificationData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/notifications`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(notificationData),
    });
    if (!res.ok) {
      throw new Error('Failed to update notifications');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating notifications:', error);
    throw error;
  }
};

// Update appearance settings
settingsService.updateAppearance = async (userId, appearanceData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/appearance`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appearanceData),
    });
    if (!res.ok) {
      throw new Error('Failed to update appearance');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating appearance:', error);
    throw error;
  }
};

// Update branches
settingsService.updateBranches = async (userId, branchesData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/branches`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ branches: branchesData }),
    });
    if (!res.ok) {
      throw new Error('Failed to update branches');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating branches:', error);
    throw error;
  }
};

// Update integrations
settingsService.updateIntegrations = async (userId, integrationsData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/integrations`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ integrations: integrationsData }),
    });
    if (!res.ok) {
      throw new Error('Failed to update integrations');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating integrations:', error);
    throw error;
  }
};

// Update billing settings
settingsService.updateBilling = async (userId, billingData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/billing`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(billingData),
    });
    if (!res.ok) {
      throw new Error('Failed to update billing');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating billing:', error);
    throw error;
  }
};

// Update advanced settings
settingsService.updateAdvanced = async (userId, advancedData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/advanced`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(advancedData),
    });
    if (!res.ok) {
      throw new Error('Failed to update advanced settings');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating advanced settings:', error);
    throw error;
  }
};

// Sign out session
settingsService.signOutSession = async (userId, sessionId) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to sign out session');
    }
    return await res.json();
  } catch (error) {
    console.error('Error signing out session:', error);
    throw error;
  }
};

// Delete account
settingsService.deleteAccount = async (userId) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}settings/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to delete account');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

export default settingsService;
