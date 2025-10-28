const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://rathorenisha397_db_user:FyD450e9i4dRHZyD@userdata.x6f1kdi.mongodb.net/",
      {
        // Optional: Add options to prevent MongoDB warnings or configure connection
        // useNewUrlParser: true, // Often recommended for older versions
        // useUnifiedTopology: true, // Often recommended for older versions
      }
    );
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process on connection failure
  }
}

connectDB();
