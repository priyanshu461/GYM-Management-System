const express = require("express");
const app = express();
require("dotenv").config();
console.log(process.env.PORT);
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
require("./lib/db"); // Database connection

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

const memberRoutes = require('./routes/memberRoutes');
app.use('/api/management/members', memberRoutes);

const facilitiesRoutes = require('./routes/facilitiesRoutes');
app.use('/api/management/facilities', facilitiesRoutes);

const trainersRoutes = require('./routes/trainersRoutes');
app.use('/api/management/trainers', trainersRoutes);

const financeRoutes = require('./routes/financeRoutes');
app.use('/api/management/finance', financeRoutes);

const workoutRoutes = require('./routes/workoutRoutes');
app.use('/api/workout', workoutRoutes);

const dietRoutes = require('./routes/dietRoutes');
app.use('/api/diet', dietRoutes);

const progressRoutes = require('./routes/progressRoutes');
app.use('/api/progress', progressRoutes);

const classRoutes = require('./routes/classRoutes');
app.use('/api/classes', classRoutes);

const courseRoutes = require('./routes/courseRoutes');
app.use('/api/courses', courseRoutes);

const franchiseRoutes = require('./routes/franchiseRoutes');
app.use('/api/franchises', franchiseRoutes);

const membershipRoutes = require('./routes/membershipRoutes');
app.use('/api/memberships', membershipRoutes);

const supplementRoutes = require('./routes/supplementRoutes');
app.use('/api/supplements', supplementRoutes);

const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blog', blogRoutes);

const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

const settingRoutes = require('./routes/settingRoutes');
app.use('/api/settings', settingRoutes);

const supportRoutes = require('./routes/supportRoutes');
app.use('/api/support', supportRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/data", (req, res) => {
  res.json({ received: req.body });
});
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
