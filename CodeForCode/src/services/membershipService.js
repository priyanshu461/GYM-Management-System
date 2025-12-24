import { BASE_API_URL, getToken } from "../utils/data";

const membershipService = {};

// Get all membership plans
membershipService.getAllMembershipPlans = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}memberships`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch membership plans');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching membership plans:', error);
    throw error;
  }
};

// Create new membership plan
membershipService.createMembershipPlan = async (planData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}memberships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(planData),
    });
    if (!res.ok) {
      throw new Error('Failed to create membership plan');
    }
    return await res.json();
  } catch (error) {
    console.error('Error creating membership plan:', error);
    throw error;
  }
};

// Update membership plan
membershipService.updateMembershipPlan = async (id, planData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}memberships/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(planData),
    });
    if (!res.ok) {
      throw new Error('Failed to update membership plan');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating membership plan:', error);
    throw error;
  }
};

// Delete membership plan
membershipService.deleteMembershipPlan = async (id) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}memberships/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to delete membership plan');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting membership plan:', error);
    throw error;
  }
};

export default membershipService;
