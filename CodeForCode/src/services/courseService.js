import { BASE_API_URL, getToken } from "@/Utils/data";

const courseService = {};

courseService.getAllCourses = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}courses`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
};

courseService.getCoursesByGym = async (gymId) => {
  try {
    const res = await fetch(`${BASE_API_URL}courses/gym/${gymId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching courses by gym:', error);
    throw error;
  }
};

courseService.getCoursesByTrainer = async (trainerId) => {
  try {
    const res = await fetch(`${BASE_API_URL}courses/trainer/${trainerId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching courses by trainer:', error);
    throw error;
  }
};

courseService.getCourseById = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}courses/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw error;
  }
};

courseService.createCourse = async (courseData) => {
  try {
    const res = await fetch(`${BASE_API_URL}courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(courseData),
    });
    return await res.json();
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

courseService.updateCourse = async (id, courseData) => {
  try {
    const res = await fetch(`${BASE_API_URL}courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(courseData),
    });
    return await res.json();
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

courseService.deleteCourse = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}courses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

courseService.enrollInCourse = async (courseId, memberId) => {
  try {
    const res = await fetch(`${BASE_API_URL}courses/${courseId}/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ memberId }),
    });
    return await res.json();
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

courseService.unenrollFromCourse = async (courseId, memberId) => {
  try {
    const res = await fetch(`${BASE_API_URL}courses/${courseId}/unenroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ memberId }),
    });
    return await res.json();
  } catch (error) {
    console.error('Error unenrolling from course:', error);
    throw error;
  }
};

courseService.getCourseEnrollments = async (courseId) => {
  try {
    const res = await fetch(`${BASE_API_URL}courses/${courseId}/enrollments`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching course enrollments:', error);
    throw error;
  }
};

courseService.getUserEnrollments = async (userId) => {
  try {
    const res = await fetch(`${BASE_API_URL}users/${userId}/enrollments`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  } catch (error) {
    console.error('Error fetching user enrollments:', error);
    throw error;
  }
};

export default courseService;
