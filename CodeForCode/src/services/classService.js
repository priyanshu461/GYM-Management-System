import { BASE_API_URL, getToken } from "@/Utils/data";

const classService = {};

classService.getAllClasses = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}classes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch classes');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching classes:', error);
    // Return mock data if API fails
    return {
      classes: [
        {
          _id: "1",
          name: "Morning Yoga",
          description: "Start your day with energizing yoga poses",
          trainerId: "trainer1",
          trainerName: "Sarah Johnson",
          gymId: "gym1",
          gymName: "Downtown Fitness Center",
          date: "2024-12-15",
          startTime: "07:00",
          endTime: "08:00",
          capacity: 20,
          enrolled: 15,
          difficulty: "Beginner",
          category: "Yoga",
          status: "Active"
        },
        {
          _id: "2",
          name: "HIIT Workout",
          description: "High-intensity interval training for maximum results",
          trainerId: "trainer2",
          trainerName: "Mike Chen",
          gymId: "gym1",
          gymName: "Downtown Fitness Center",
          date: "2024-12-15",
          startTime: "18:00",
          endTime: "19:00",
          capacity: 15,
          enrolled: 12,
          difficulty: "Advanced",
          category: "Cardio",
          status: "Active"
        },
        {
          _id: "3",
          name: "Strength Training",
          description: "Build muscle and strength with compound exercises",
          trainerId: "trainer3",
          trainerName: "Emma Davis",
          gymId: "gym2",
          gymName: "Westside Gym",
          date: "2024-12-16",
          startTime: "10:00",
          endTime: "11:30",
          capacity: 12,
          enrolled: 8,
          difficulty: "Intermediate",
          category: "Strength",
          status: "Active"
        }
      ]
    };
  }
};

classService.getClassById = async (id) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}classes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch class');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching class:', error);
    throw error;
  }
};

classService.addClass = async (classData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(classData),
    });
    if (!res.ok) {
      throw new Error('Failed to add class');
    }
    return await res.json();
  } catch (error) {
    console.error('Error adding class:', error);
    throw error;
  }
};

classService.updateClass = async (id, classData) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}classes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(classData),
    });
    if (!res.ok) {
      throw new Error('Failed to update class');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

classService.deleteClass = async (id) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}classes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to delete class');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

classService.getClassesByGym = async (gymId) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}classes/gym/${gymId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch classes by gym');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching classes by gym:', error);
    throw error;
  }
};

classService.getClassesByTrainer = async (trainerId) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}classes/trainer/${trainerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch classes by trainer');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching classes by trainer:', error);
    throw error;
  }
};

classService.enrollInClass = async (classId, memberId) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}classes/${classId}/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ memberId }),
    });
    if (!res.ok) {
      throw new Error('Failed to enroll in class');
    }
    return await res.json();
  } catch (error) {
    console.error('Error enrolling in class:', error);
    throw error;
  }
};

classService.unenrollFromClass = async (classId, memberId) => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_API_URL}classes/${classId}/unenroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ memberId }),
    });
    if (!res.ok) {
      throw new Error('Failed to unenroll from class');
    }
    return await res.json();
  } catch (error) {
    console.error('Error unenrolling from class:', error);
    throw error;
  }
};

export default classService;
