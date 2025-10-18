# TODO: Update Modals in GMS-SERVER and CodeForCode

- [ ] Update CodeForCode/src/views/Login.jsx: Replace custom div-based modals (demo, signup, forgot password) with Dialog component.
- [ ] Update CodeForCode/src/views/SupportTickets.jsx: Replace ComposeModal and TicketDrawer with Dialog component.
- [ ] Update GMS-SERVER/http/controllers/AuthController.js: Implement proper login, add signup and forgot password functions with bcrypt, jwt, and email simulation.
- [ ] Update GMS-SERVER/routes/userRoutes.js: Add routes for /login, /signup, /forgot-password.
- [ ] Update GMS-SERVER/index.js: Mount user routes.
- [ ] Update GMS-SERVER/package.json: Add dependencies (bcrypt, jsonwebtoken, nodemailer).
- [ ] Install new dependencies in GMS-SERVER.
- [ ] Test frontend modals and backend API endpoints.
