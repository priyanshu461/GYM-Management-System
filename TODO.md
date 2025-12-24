# Implement Schedule Saving in Database

## Task Overview
Implement the missing backend functionality to save schedule data in the database. The frontend has a `createSchedule` function that calls an API endpoint, but the backend route and controller are not implemented.

## Current Status
- Frontend `createSchedule` function exists in `trainerServices.js`
- Route `/trainers/schedules/create` not defined in `trainerRoutes.js`
- Controller function `createSchedule` missing in `TrainersController.js`
- `getTrainerSchedules` uses incorrect field name (`instructor` instead of `trainerId`)

## Implementation Plan

### Phase 1: Add Route and Controller
- [x] Add `createSchedule` route in `trainerRoutes.js` (already existed)
- [x] Implement `createSchedule` function in `TrainersController.js` to create a new class (updated to use ClassModel)
- [x] Fix `getTrainerSchedules` to use correct field name `trainerId` (updated to use ClassModel)

### Phase 2: Testing and Verification
- [ ] Test the API endpoint
- [ ] Verify data is saved correctly in database
- [ ] Ensure proper error handling

## Files to Modify
- `GMS-SERVER/src/routes/trainerRoutes.js`
- `GMS-SERVER/src/controllers/TrainersController.js`

## Dependencies
- Existing `ClassModel` for storing schedule data
- Authentication middleware
- Trainer role authorization
