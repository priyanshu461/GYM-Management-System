# Fix Add Class and Salary Fully

## Issues Identified
- SalaryModel references non-existent "Employee" model instead of "User"
- FinanceController getSalariesByGym has incorrect logic (Salary model doesn't have gymId field)
- Class adding form may have validation or submission issues
- Salary management filtering not properly respecting user roles (Admin, Gym, Trainer)

## Tasks to Complete

### 1. Update SalaryModel
- [ ] Change `employeeId: { type: Schema.Types.ObjectId, ref: "Employee" }` to `employeeId: { type: Schema.Types.ObjectId, ref: "User" }`

### 2. Fix FinanceController getSalariesByGym
- [ ] Update getSalariesByGym to properly filter salaries by gym using populated employeeId.gymId
- [ ] Remove incorrect gymId field reference in Salary model

### 3. Fix Class Adding Functionality
- [ ] Verify ClassesSchedule.jsx form data mapping for trainerId and gymId
- [ ] Check ClassController addClass validation and error handling
- [ ] Ensure proper role-based gymId assignment (gym owners auto-assign their gymId)

### 4. Update SalaryManagement.jsx Role-Based Access
- [ ] Admin: Can see all gyms and trainers
- [ ] Gym Owner: Can only see their gym's trainers and salaries
- [ ] Trainer: Can only see their own salary details
- [ ] Fix trainer fetching and filtering logic

### 5. Testing
- [ ] Test class creation for all user roles
- [ ] Test salary management viewing for all user roles
- [ ] Verify salary transactions are properly linked to trainers
>>>>>>> Stashed changes
=======
# Fix Add Class and Salary Fully

## Issues Identified
- SalaryModel references non-existent "Employee" model instead of "User"
- FinanceController getSalariesByGym has incorrect logic (Salary model doesn't have gymId field)
- Class adding form may have validation or submission issues
- Salary management filtering not properly respecting user roles (Admin, Gym, Trainer)

## Tasks to Complete

### 1. Update SalaryModel
- [ ] Change `employeeId: { type: Schema.Types.ObjectId, ref: "Employee" }` to `employeeId: { type: Schema.Types.ObjectId, ref: "User" }`

### 2. Fix FinanceController getSalariesByGym
- [ ] Update getSalariesByGym to properly filter salaries by gym using populated employeeId.gymId
- [ ] Remove incorrect gymId field reference in Salary model

### 3. Fix Class Adding Functionality
- [ ] Verify ClassesSchedule.jsx form data mapping for trainerId and gymId
- [ ] Check ClassController addClass validation and error handling
- [ ] Ensure proper role-based gymId assignment (gym owners auto-assign their gymId)

### 4. Update SalaryManagement.jsx Role-Based Access
- [ ] Admin: Can see all gyms and trainers
- [ ] Gym Owner: Can only see their gym's trainers and salaries
- [ ] Trainer: Can only see their own salary details
- [ ] Fix trainer fetching and filtering logic

### 5. Testing
- [ ] Test class creation for all user roles
- [ ] Test salary management viewing for all user roles
- [ ] Verify salary transactions are properly linked to trainers
=======
# Fix Add Class and Salary Fully

## Issues Identified
- SalaryModel references non-existent "Employee" model instead of "User"
- FinanceController getSalariesByGym has incorrect logic (Salary model doesn't have gymId field)
- Class adding form may have validation or submission issues
- Salary management filtering not properly respecting user roles (Admin, Gym, Trainer)

## Tasks to Complete

### 1. Update SalaryModel
- [ ] Change `employeeId: { type: Schema.Types.ObjectId, ref: "Employee" }` to `employeeId: { type: Schema.Types.ObjectId, ref: "User" }`

### 2. Fix FinanceController getSalariesByGym
- [ ] Update getSalariesByGym to properly filter salaries by gym using populated employeeId.gymId
- [ ] Remove incorrect gymId field reference in Salary model

### 3. Fix Class Adding Functionality
- [ ] Verify ClassesSchedule.jsx form data mapping for trainerId and gymId
- [ ] Check ClassController addClass validation and error handling
- [ ] Ensure proper role-based gymId assignment (gym owners auto-assign their gymId)

### 4. Update SalaryManagement.jsx Role-Based Access
- [ ] Admin: Can see all gyms and trainers
- [ ] Gym Owner: Can only see their gym's trainers and salaries
- [ ] Trainer: Can only see their own salary details
- [ ] Fix trainer fetching and filtering logic

### 5. Testing
- [ ] Test class creation for all user roles
- [ ] Test salary management viewing for all user roles
- [ ] Verify salary transactions are properly linked to trainers
>>>>>>> Stashed changes
