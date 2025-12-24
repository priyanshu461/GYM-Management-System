import { BASE_API_URL, getToken } from "../utils/data";

const franchiseService = {};

// Get all franchises
franchiseService.getAllFranchises = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}franchises`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch franchises');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching franchises:', error);
    throw error;
  }
};

// Create new franchise
franchiseService.addFranchise = async (franchiseData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}franchises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(franchiseData),
    });
    if (!res.ok) {
      throw new Error('Failed to add franchise');
    }
    return await res.json();
  } catch (error) {
    console.error('Error adding franchise:', error);
    throw error;
  }
};

// Update franchise
franchiseService.updateFranchise = async (id, franchiseData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}franchises/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(franchiseData),
    });
    if (!res.ok) {
      throw new Error('Failed to update franchise');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating franchise:', error);
    throw error;
  }
};

// Delete franchise
franchiseService.deleteFranchise = async (id) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}franchises/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to delete franchise');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting franchise:', error);
    throw error;
  }
};

export default franchiseService;
