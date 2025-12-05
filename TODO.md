# TODO: Fix Course Fetching Error

## Issue
- Error: HTTP error! status: 500 when fetching courses from `/api/courses`
- Error originates from courseService.js getAllCourses method

## Root Cause Analysis
- Server-side 500 error indicates database connection or model issues
- MongoDB URI in db.js was missing database name (/gym_management_system)
- CourseModel not imported in index.js, potentially causing model registration issues

## Changes Made
- [ ] Updated MongoDB URI in `GMS-SERVER/src/config/db.js` to include database name
- [ ] Added CourseModel import in `GMS-SERVER/index.js` to ensure model registration

## Testing Steps
- [ ] Restart the GMS-SERVER
- [ ] Test the `/api/courses` endpoint
- [ ] Verify courses are fetched successfully in the frontend

## Next Steps
- If error persists, check MongoDB Atlas cluster connectivity
- Ensure database credentials are correct
- Consider seeding sample course data if collection is empty
