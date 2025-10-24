const express = require("express");
const app = express();
require("dotenv").config();
console.log(process.env.PORT);
const port = process.env.PORT || 8080;
require("./lib/db"); // Database connection

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
