# TODO: Fix Course API 404 Error

## Tasks
- [ ] Edit CodeForCode/src/services/courseService.js: Remove leading slashes from all paths to make them consistent (e.g., change `${BASE_API_URL}/courses` to `${BASE_API_URL}courses`).
- [ ] Edit GMS-SERVER/index.js: Add authenticateToken middleware to the course routes.
- [ ] Test the API calls to ensure they work.
