import { BASE_API_URL, getToken } from "@/utils/data";

const classService = {};

classService.getAllClasses = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}classes`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching all classes:', error);
    throw error;
  }
};

classService.getClassesByGym = async (gymId) => {
  try {
    const res = await fetch(`${BASE_API_URL}classes/gym/${gymId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching classes by gym:', error);
    throw error;
  }
};

classService.getClassesByTrainer = async (trainerId) => {
  try {
    const res = await fetch(`${BASE_API_URL}classes/trainer/${trainerId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching classes by trainer:', error);
    throw error;
  }
};

classService.addClass = async (classData) => {
  try {
    const res = await fetch(`${BASE_API_URL}classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(classData),
    });
    return await res.json();
  } catch (error) {
    console.error('Error adding class:', error);
    throw error;
  }
};

classService.updateClass = async (id, classData) => {
  try {
    const res = await fetch(`${BASE_API_URL}classes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(classData),
    });
    return await res.json();
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

classService.deleteClass = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}classes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

classService.enrollInClass = async (classId, memberId) => {
  try {
    const res = await fetch(`${BASE_API_URL}classes/${classId}/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ memberId }),
    });
    return await res.json();
  } catch (error) {
    console.error('Error enrolling in class:', error);
    throw error;
  }
};

classService.unenrollFromClass = async (classId, memberId) => {
  try {
    const res = await fetch(`${BASE_API_URL}classes/${classId}/unenroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ memberId }),
    });
    return await res.json();
  } catch (error) {
    console.error('Error unenrolling from class:', error);
    throw error;
  }
};

export default classService;
