const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.warn("⚠️  Warning: MONGODB_URI not found in environment variables.");
      console.warn("   Please create a .env file with MONGODB_URI=your_connection_string");
      console.warn("   Server will continue but database operations will fail.");
      return;
    }

    await mongoose.connect(mongoURI, {
      // Modern mongoose versions handle these automatically
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

