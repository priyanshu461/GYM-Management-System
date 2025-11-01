const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
console.log(process.env.PORT);
const port = process.env.PORT || 8080;
require("./lib/db"); // Database connection

// Import models to register them
require("./models/RoleModel");
require("./models/UserModel");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/dashboard/product', require('./routes/productRoutes'));

const memberRoutes = require('./routes/memberRoutes');
app.use('/api/management/members', memberRoutes);

const facilitiesRoutes = require('./routes/facilitiesRoutes');
app.use('/api/management/facilities', facilitiesRoutes);

const trainersRoutes = require('./routes/trainersRoutes');
app.use('/api/management/trainers', trainersRoutes);

const financeRoutes = require('./routes/financeRoutes');
app.use('/api/management/finance', financeRoutes);

const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blog', blogRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

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
