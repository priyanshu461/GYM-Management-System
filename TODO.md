# Fix 500 Internal Server Error for Adding Member

## Tasks
- [ ] Update UserModel to make email optional (remove required from email field)
- [ ] Fix MemberController.js:
  - [ ] Replace 'Customer' with 'User' in getMemberById function
  - [ ] Replace 'Customer' with 'User' in updateMemberProfile function
  - [ ] Correct updateMember function to use dot notation for profile fields (aadharNo, address, emergencyContact, dob, gender, occupation)
  - [ ] Fix getMemberById to use Membership.findOne for membership query instead of User.findOne
- [ ] Test adding a member to ensure no 500 error occurs
