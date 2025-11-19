const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/UserModel");
const Role = require("./src/models/RoleModel");
require("dotenv").config();

async function seedDatabase() {
  try {
    // Connect to the database using environment variable
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb+srv://rathorenisha397_db_user:FyD450e9i4dRHZyD@userdata.x6f1kdi.mongodb.net/";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

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
        employeeId: "TR001",
        name: "Test Trainer",
        email: "trainer@gym.com",
        password: trainerPassword,
        profile: {
          exp: "5 years",
          spacialization: "Fitness Training",
        },
        rating: 4.5,
        certifications: ["CPT"],
        specializations: ["Weight Loss", "Muscle Building"],
        user_type: "Trainer",
        roleId: trainerRole._id,
      },
      { upsert: true, new: true }
    );

    // Update existing trainers to have user_type: "Trainer"
    await User.updateMany(
      { roleId: trainerRole._id, user_type: { $ne: "Trainer" } },
      { $set: { user_type: "Trainer", isActive: true } }
    );

    console.log("Users created/updated:");
    console.log("- Admin: admin@gym.com / admin123");
    console.log("- Member: member@gym.com / member123");
    console.log("- Trainer: trainer@gym.com / trainer123");

    console.log("Database seeded successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

// Run the seed function
seedDatabase();
