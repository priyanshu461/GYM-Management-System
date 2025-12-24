import { BASE_API_URL, getToken } from "@/utils/data";

const facilitiesService = {};

facilitiesService.getAllFacilities = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}management/facilities`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch facilities');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching facilities:', error);
    throw error;
  }
};

facilitiesService.addFacility = async (data = {}) => {
  try {
    const res = await fetch(`${BASE_API_URL}management/facilities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Failed to add facility');
    }
    return await res.json();
  } catch (error) {
    console.error('Error adding facility:', error);
    throw error;
  }
};

facilitiesService.updateFacility = async (id, data = {}) => {
  try {
    const res = await fetch(`${BASE_API_URL}management/facilities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Failed to update facility');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating facility:', error);
    throw error;
  }
};

facilitiesService.deleteFacility = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}management/facilities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to delete facility');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting facility:', error);
    throw error;
  }
};

export default facilitiesService;
