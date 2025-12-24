import { BASE_API_URL, getToken } from "@/utils/data";

class CourseService {
  // Get all courses
  async getAllCourses() {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_API_URL}courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  // Get course by ID
  async getCourseById(id) {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_API_URL}courses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  }

  // Create new course
  async createCourse(courseData) {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_API_URL}courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

  // Update course
  async updateCourse(id, courseData) {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_API_URL}courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }

  // Delete course
  async deleteCourse(id) {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_API_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }

  // Enroll in course
  async enrollInCourse(courseId, enrollmentData) {
    try {
      const response = await fetch(`${BASE_API_URL}courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error;
    }
  }

  // Get course enrollments
  async getCourseEnrollments(courseId) {
    try {
      const response = await fetch(`${BASE_API_URL}courses/${courseId}/enrollments`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching course enrollments:', error);
      throw error;
    }
  }

  // Get user enrollments
  async getUserEnrollments(userId) {
    try {
      const response = await fetch(`${BASE_API_URL}users/${userId}/enrollments`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user enrollments:', error);
      throw error;
    }
  }

  // Unenroll from course
  async unenrollFromCourse(courseId, memberId) {
    try {
      const response = await fetch(`${BASE_API_URL}courses/${courseId}/unenroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ memberId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error unenrolling from course:', error);
      throw error;
    }
  }
}

const courseService = new CourseService();
export default courseService;
