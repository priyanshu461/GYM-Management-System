import { BASE_API_URL, TOKEN } from "@/Utils/data";

const facilitiesService = {};

facilitiesService.getAllFacilities = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}management/facilities`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch facilities');
    }
    const facilities = await res.json();
    return { facilities };
  } catch (error) {
    console.error('Error fetching facilities:', error);
    // Return empty array if API fails
    return { facilities: [] };
  }
};

facilitiesService.addFacility = async (facilityData) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (TOKEN) {
      headers.Authorization = `Bearer ${TOKEN}`;
    }
    const res = await fetch(`${BASE_API_URL}management/facilities`, {
      method: 'POST',
      headers,
      body: JSON.stringify(facilityData),
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

facilitiesService.updateFacility = async (id, facilityData) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (TOKEN) {
      headers.Authorization = `Bearer ${TOKEN}`;
    }
    const res = await fetch(`${BASE_API_URL}management/facilities/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(facilityData),
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
      method: 'DELETE',
      headers: { Authorization: `Bearer ${TOKEN}` },
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
