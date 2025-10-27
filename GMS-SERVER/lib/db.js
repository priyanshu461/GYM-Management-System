const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

async function connectDB() {
  let mongoServer;

  try {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log("In-memory MongoDB started at:", mongoUri);

    // Connect to the in-memory database
    await mongoose.connect(mongoUri);
    console.log("Connected to in-memory MongoDB");

    // Keep the server running
    process.on('SIGINT', async () => {
      console.log("Shutting down...");
      await mongoose.connection.close();
      await mongoServer.stop();
      process.exit(0);
    });

  } catch (error) {
    console.error("Error starting in-memory MongoDB:", error);
    process.exit(1);
  }
}

connectDB();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
