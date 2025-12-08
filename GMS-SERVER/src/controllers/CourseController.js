const Course = require("../models/CourseModel");
const CourseEnrollment = require("../models/CourseEnrollmentModel");

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    console.log('Attempting to fetch courses...');
    let query = {};

    // Filter courses based on user role
    if (req.user.user_type === 'Gym') {
      query.gymId = req.user.gymId;
    }
    // Admin can see all courses, no filter needed

    const courses = await Course.find(query).populate('gymId', 'name');
    console.log('Courses fetched successfully:', courses.length);
    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error in getAllCourses:', error);
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

// Add a new course
const addCourse = async (req, res) => {
  try {
    const courseData = { ...req.body };

    // Set gymId based on user role
    if (req.user.user_type === 'Gym') {
      courseData.gymId = req.user.gymId;
    } else if (req.user.user_type === 'Admin') {
      // Admin must provide gymId
      if (!courseData.gymId) {
        return res.status(400).json({ message: "Gym ID is required for admin users" });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized to create courses" });
    }

    const newCourse = new Course(courseData);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error: error.message });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  try {
    // First check if course exists and user has permission
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check authorization
    if (req.user.user_type === 'Gym' && course.gymId.toString() !== req.user.gymId.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this course" });
    }

    const updateData = { ...req.body };

    // Prevent gym users from changing gymId
    if (req.user.user_type === 'Gym') {
      delete updateData.gymId;
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    // First check if course exists and user has permission
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check authorization
    if (req.user.user_type === 'Gym' && course.gymId.toString() !== req.user.gymId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this course" });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
};

// Enroll in course
const enrollInCourse = async (req, res) => {
  try {
    const { userId, courseId, plan, paymentMethod, paymentDetails, amount } = req.body;
    const enrollment = new CourseEnrollment({
      userId,
      courseId,
      plan,
      paymentMethod,
      paymentDetails,
      amount,
    });
    await enrollment.save();
    res.status(201).json({ message: "Enrollment successful", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling in course", error: error.message });
  }
};

// Get course enrollments
const getCourseEnrollments = async (req, res) => {
  try {
    const enrollments = await CourseEnrollment.find({ courseId: req.params.id }).populate('userId', 'name email');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments", error: error.message });
  }
};

// Get user enrollments
const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await CourseEnrollment.find({ userId: req.params.userId }).populate('courseId', 'name description');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user enrollments", error: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getCourseEnrollments,
  getUserEnrollments,
};
