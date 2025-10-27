const mongoose = require("mongoose");
require('dotenv').config();
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gym-management';
console.log(dbURI);

mongoose.connect(dbURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
