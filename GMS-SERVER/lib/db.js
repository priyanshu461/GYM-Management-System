const mongoose = require("mongoose");
<<<<<<< HEAD
const dbURI = "mongodb+srv://rathorenisha397_db_user:FyD450e9i4dRHZyD@userdata.x6f1kdi.mongodb.net/";
=======
require('dotenv').config();
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gym-management';
>>>>>>> 9b93bb17127aabad2391ceda382d2a6f872f823a
console.log(dbURI);

mongoose.connect(dbURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
