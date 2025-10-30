const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/UserModel");
const Role = require("./models/RoleModel");
require("dotenv").config();
require("./lib/db"); // Ensure database connection

async function seedDatabase() {
  try {
    // Wait for database connection
    if (mongoose.connection.readyState !== 1) {
      console.log("Waiting for database connection...");
      await new Promise(resolve => {
        mongoose.connection.once('open', resolve);
      });
    }
    console.log("Connected to database");

    // Create roles if they don't exist
    const adminRole = await Role.findOneAndUpdate(
      { name: "Admin" },
      { name: "Admin", isActive: true },
      { upsert: true, new: true }
    );

    const memberRole = await Role.findOneAndUpdate(
      { name: "Member" },
      { name: "Member", isActive: true },
      { upsert: true, new: true }
    );

    const trainerRole = await Role.findOneAndUpdate(
      { name: "Trainer" },
      { name: "Trainer", isActive: true },
      { upsert: true, new: true }
    );

    console.log("Roles created/updated");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.findOneAndUpdate(
      { email: "admin@gym.com" },
      {
        name: "Admin User",
        email: "admin@gym.com",
        password: adminPassword,
        roleId: adminRole._id,
      },
      { upsert: true, new: true }
    );

    // Create test member
    const memberPassword = await bcrypt.hash("member123", 10);
    const memberUser = await User.findOneAndUpdate(
      { email: "member@gym.com" },
      {
        name: "Test Member",
        email: "member@gym.com",
        password: memberPassword,
        roleId: memberRole._id,
      },
      { upsert: true, new: true }
    );

    // Create test trainer
    const trainerPassword = await bcrypt.hash("trainer123", 10);
    const trainerUser = await User.findOneAndUpdate(
      { email: "trainer@gym.com" },
      {
        name: "Test Trainer",
        email: "trainer@gym.com",
        password: trainerPassword,
        roleId: trainerRole._id,
      },
      { upsert: true, new: true }
    );

    console.log("Users created/updated:");
    console.log("- Admin: admin@gym.com / admin123");
    console.log("- Member: member@gym.com / member123");
    console.log("- Trainer: trainer@gym.com / trainer123");

    console.log("Database seeded successfully!");
    console.log("In-memory database is running. Press Ctrl+C to stop.");

    // Exit after seeding
    process.exit(0);

  } catch (error) {
    console.error("Error seeding database:", error);
    if (mongoServer) {
      await mongoServer.stop();
    }
    process.exit(1);
  }
}

seedDatabase();
