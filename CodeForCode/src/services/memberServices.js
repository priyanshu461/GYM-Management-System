import { BASE_API_URL, getToken } from "../Utils/data";

const memberServices = {};

// Get member profile (for authenticated member)
memberServices.getMemberProfile = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/members/profile/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch member profile');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching member profile:', error);
    throw error;
  }
};

// Update member profile (for authenticated member)
memberServices.updateMemberProfile = async (profileData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/members/profile/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    if (!res.ok) {
      throw new Error('Failed to update member profile');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating member profile:', error);
    throw error;
  }
};

// Get member stats
memberServices.getMemberStats = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/members/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch member stats');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching member stats:', error);
    throw error;
  }
};

// Get recent activities
memberServices.getRecentActivities = async (limit = 10) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/members/activities?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch recent activities');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    throw error;
  }
};

// Get upcoming classes
memberServices.getUpcomingClasses = async (limit = 5) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/members/upcoming-classes?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch upcoming classes');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching upcoming classes:', error);
    throw error;
  }
};

// Get all members (for admin)
memberServices.getAllMembers = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}management/members`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch members');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

export default memberServices;
