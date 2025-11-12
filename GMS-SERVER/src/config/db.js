const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb+srv://rathorenisha397_db_user:FyD450e9i4dRHZyD@userdata.x6f1kdi.mongodb.net";

    if (!mongoURI) {
      console.warn("⚠️  Warning: MONGODB_URI not found in environment variables.");
      console.warn("   Please create a .env file with MONGODB_URI=your_connection_string");
      console.warn("   Server will continue but database operations will fail.");
      return;
    }

    await mongoose.connect(mongoURI, {
      // Modern mongoose versions handle these automatically
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("   Please check your MONGODB_URI in .env file");
    // Don't exit in development - allow server to start for testing other parts
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
}

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = connectDB;

