# TODO: Update courseService.js to match classService.js structure and add course management features

- [x] Update imports in courseService.js to use BASE_API_URL and getToken from "@/Utils/data"
- [x] Change courseService from a class to an object structure like classService
- [x] Add authorization headers to all fetch methods
- [x] Add new methods: getCoursesByGym and getCoursesByTrainer
- [x] Update existing methods (getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, enrollInCourse, getCourseEnrollments, getUserEnrollments) to match classService structure and include auth
- [x] Ensure error handling is consistent with classService
- [x] Add unenrollFromCourse method for consistency with classService
- [x] Fix Courses.jsx to properly handle API response and always display fallback courses if no data from API
- [ ] Verify the updated service works with the backend
