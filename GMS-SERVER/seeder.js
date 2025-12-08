 // seeder.js - Production-ready database seeder
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./src/models/UserModel');
const Role = require('./src/models/RoleModel');
const Gym = require('./src/models/GymModel');
const Transaction = require('./src/models/TransactionModel');
const Course = require('./src/models/CourseModel');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/gym_management_system';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    console.log('🚀 Starting database seeding...\n');

    // Clear existing data (be careful in production!)
    const shouldClearData = process.env.CLEAR_EXISTING_DATA === 'true';
    
    if (shouldClearData) {
      console.log('⚠️  Clearing existing data...');
      await User.deleteMany({});
      await Role.deleteMany({});
      await Gym.deleteMany({});
      await Transaction.deleteMany({});
      await Course.deleteMany({});
      console.log('✅ Existing data cleared\n');
    }

    // Create roles
    console.log('📝 Creating roles...');
    const roles = [
      { 
        name: 'Admin', 
        permissions: ['all'],
        description: 'System administrator with full access',
        isActive: true
      },
      { 
        name: 'Gym', 
        permissions: ['gym_management', 'member_management', 'trainer_management', 'finance_management'],
        description: 'Gym owner/manager with gym-specific access',
        isActive: true
      },
      { 
        name: 'Trainer', 
        permissions: ['client_management', 'workout_management', 'schedule_management'],
        description: 'Personal trainer with client management access',
        isActive: true
      },
      { 
        name: 'Staff', 
        permissions: ['member_management', 'basic_operations'],
        description: 'Gym staff with limited access',
        isActive: true
      },
      { 
        name: 'Member', 
        permissions: ['profile_management', 'workout_view', 'class_booking'],
        description: 'Gym member with personal access',
        isActive: true
      },
    ];

    const createdRoles = [];
    for (const roleData of roles) {
      const role = await Role.findOneAndUpdate(
        { name: roleData.name },
        roleData,
        { upsert: true, new: true }
      );
      createdRoles.push(role);
    }
    console.log(`✅ ${createdRoles.length} roles created/updated\n`);

    // Create sample gyms
    console.log('🏢 Creating sample gyms...');
    const gyms = [
      {
        name: 'FitZone Main Branch',
        location: 'Downtown',
        address: '123 Main Street, Downtown, City 12345',
        phone: '+1-555-0123',
        email: 'main@fitzone.com',
        capacity: 200,
        facilities: ['Cardio Equipment', 'Weight Training', 'Group Classes', 'Swimming Pool', 'Sauna', 'Personal Training'],
        operatingHours: {
          monday: '5:00 AM - 11:00 PM',
          tuesday: '5:00 AM - 11:00 PM',
          wednesday: '5:00 AM - 11:00 PM',
          thursday: '5:00 AM - 11:00 PM',
          friday: '5:00 AM - 11:00 PM',
          saturday: '6:00 AM - 10:00 PM',
          sunday: '7:00 AM - 9:00 PM',
        },
        isActive: true,
      },
      {
        name: 'FitZone North Branch',
        location: 'North District',
        address: '456 North Avenue, North District, City 12346',
        phone: '+1-555-0124',
        email: 'north@fitzone.com',
        capacity: 150,
        facilities: ['Cardio Equipment', 'Weight Training', 'Group Classes', 'Yoga Studio'],
        operatingHours: {
          monday: '6:00 AM - 10:00 PM',
          tuesday: '6:00 AM - 10:00 PM',
          wednesday: '6:00 AM - 10:00 PM',
          thursday: '6:00 AM - 10:00 PM',
          friday: '6:00 AM - 10:00 PM',
          saturday: '7:00 AM - 9:00 PM',
          sunday: '8:00 AM - 8:00 PM',
        },
        isActive: true,
      }
    ];

    const createdGyms = [];
    for (const gymData of gyms) {
      const gym = await Gym.findOneAndUpdate(
        { name: gymData.name },
        gymData,
        { upsert: true, new: true }
      );
      createdGyms.push(gym);
    }
    console.log(`✅ ${createdGyms.length} gyms created/updated\n`);

    // Create users
    console.log('👥 Creating users...');
    const adminRole = createdRoles.find(role => role.name === 'Admin');
    const gymRole = createdRoles.find(role => role.name === 'Gym');
    const trainerRole = createdRoles.find(role => role.name === 'Trainer');
    const memberRole = createdRoles.find(role => role.name === 'Member');
    const staffRole = createdRoles.find(role => role.name === 'Staff');

    const users = [
      // Admin user
      {
        name: 'System Administrator',
        email: 'admin@gymmanagement.com',
        password: bcrypt.hashSync('admin123', 12),
        user_type: 'Admin',
        roleId: adminRole._id,
        isActive: true,
      },
      // Gym owners
      {
        name: 'John Smith',
        email: 'gym@gymmanagement.com',
        password: bcrypt.hashSync('gym123', 12),
        user_type: 'Gym',
        roleId: gymRole._id,
        gymId: createdGyms[0]._id,
        mobile: '1234567890',
        isActive: true,
      },
      {
        name: 'Emma Davis',
        email: 'gym.north@gymmanagement.com',
        password: bcrypt.hashSync('gym123', 12),
        user_type: 'Gym',
        roleId: gymRole._id,
        gymId: createdGyms[1]._id,
        mobile: '1234567891',
        isActive: true,
      },
      // Trainers
      {
        name: 'Sarah Johnson',
        email: 'trainer@gymmanagement.com',
        mobile: '2345678901',
        password: bcrypt.hashSync('trainer123', 12),
        user_type: 'Trainer',
        roleId: trainerRole._id,
        gymId: createdGyms[0]._id,
        certifications: ['Certified Personal Trainer', 'Nutrition Specialist', 'Yoga Instructor'],
        specializations: ['Weight Training', 'Cardio', 'Nutrition', 'Yoga'],
        employeeId: 'EMP001',
        profile: {
          exp: '5 years',
          spacialization: 'Weight Training & Nutrition',
          salary: 35000
        },
        isActive: true,
      },
      {
        name: 'Michael Brown',
        email: 'trainer2@gymmanagement.com',
        mobile: '2345678902',
        password: bcrypt.hashSync('trainer123', 12),
        user_type: 'Trainer',
        roleId: trainerRole._id,
        gymId: createdGyms[1]._id,
        certifications: ['Certified Personal Trainer', 'Strength & Conditioning'],
        specializations: ['Strength Training', 'Athletic Performance'],
        employeeId: 'EMP002',
        profile: {
          exp: '3 years',
          spacialization: 'Strength Training',
          salary: 30000
        },
        isActive: true,
      },
      // Staff
      {
        name: 'Lisa Wilson',
        email: 'staff@gymmanagement.com',
        mobile: '3456789012',
        password: bcrypt.hashSync('staff123', 12),
        user_type: 'Staff',
        roleId: staffRole._id,
        gymId: createdGyms[0]._id,
        employeeId: 'EMP003',
        isActive: true,
      },
      // Members
      {
        name: 'Mike Wilson',
        email: 'member@gymmanagement.com',
        mobile: '4567890123',
        password: bcrypt.hashSync('member123', 12),
        user_type: 'Member',
        roleId: memberRole._id,
        gymId: createdGyms[0]._id,
        profile: {
          dob: new Date('1990-01-15'),
          gender: 'Male',
          occupation: 'Software Engineer',
        },
        isActive: true,
      },
      {
        name: 'Jennifer Lee',
        email: 'member2@gymmanagement.com',
        mobile: '4567890124',
        password: bcrypt.hashSync('member123', 12),
        user_type: 'Member',
        roleId: memberRole._id,
        gymId: createdGyms[0]._id,
        profile: {
          dob: new Date('1985-05-20'),
          gender: 'Female',
          occupation: 'Marketing Manager',
        },
        isActive: true,
      }
    ];

    const createdUsers = [];
    for (const userData of users) {
      const user = await User.findOneAndUpdate(
        { email: userData.email },
        userData,
        { upsert: true, new: true }
      );
      createdUsers.push(user);
    }
    console.log(`✅ ${createdUsers.length} users created/updated\n`);

    // Assign trainers to members
    const trainer1 = createdUsers.find(u => u.email === 'trainer@gymmanagement.com');
    const member1 = createdUsers.find(u => u.email === 'member@gymmanagement.com');
    const member2 = createdUsers.find(u => u.email === 'member2@gymmanagement.com');

    if (trainer1 && member1) {
      await User.findByIdAndUpdate(member1._id, { assignedTrainer: trainer1._id });
    }
    if (trainer1 && member2) {
      await User.findByIdAndUpdate(member2._id, { assignedTrainer: trainer1._id });
    }

    // Create sample financial transactions
    console.log('💰 Creating sample financial transactions...');
    const admin = createdUsers.find(u => u.user_type === 'Admin');
    
    if (admin && createdGyms.length > 0 && trainer1) {
      const transactions = [
        // Income transactions
        {
          date: new Date('2025-01-01'),
          type: 'Income',
          category: 'Membership',
          amount: 15000,
          description: 'Monthly membership fees - January',
          gym: createdGyms[0].name,
          gymId: createdGyms[0]._id,
          createdBy: admin._id,
          status: 'Completed',
        },
        {
          date: new Date('2025-01-15'),
          type: 'Income',
          category: 'Training',
          amount: 5000,
          description: 'Personal training sessions',
          gym: createdGyms[0].name,
          gymId: createdGyms[0]._id,
          createdBy: admin._id,
          status: 'Completed',
        },
        // Expense transactions - distributed across both gyms
        {
          date: new Date('2025-01-05'),
          type: 'Expense',
          category: 'Salary',
          amount: 25000,
          description: 'Trainer salary - Sarah Johnson',
          gym: createdGyms[0].name,
          gymId: createdGyms[0]._id,
          employeeId: trainer1._id,
          createdBy: admin._id,
          status: 'Completed',
        },
        {
          date: new Date('2025-01-10'),
          type: 'Expense',
          category: 'Equipment',
          amount: 50000,
          description: 'New treadmill purchase',
          gym: createdGyms[0].name,
          gymId: createdGyms[0]._id,
          createdBy: admin._id,
          status: 'Completed',
        },
        {
          date: new Date('2025-01-12'),
          type: 'Expense',
          category: 'Utilities',
          amount: 8000,
          description: 'Electricity bill - January',
          gym: createdGyms[0].name,
          gymId: createdGyms[0]._id,
          createdBy: admin._id,
          status: 'Completed',
        },
        {
          date: new Date('2025-01-20'),
          type: 'Expense',
          category: 'Maintenance',
          amount: 3000,
          description: 'Equipment maintenance',
          gym: createdGyms[0].name,
          gymId: createdGyms[0]._id,
          createdBy: admin._id,
          status: 'Completed',
        },
        // Expense transactions for North Branch
        {
          date: new Date('2025-01-08'),
          type: 'Expense',
          category: 'Salary',
          amount: 22000,
          description: 'Trainer salary - Mike Wilson',
          gym: createdGyms[1].name,
          gymId: createdGyms[1]._id,
          employeeId: trainer2._id,
          createdBy: admin._id,
          status: 'Completed',
        },
        {
          date: new Date('2025-01-15'),
          type: 'Expense',
          category: 'Equipment',
          amount: 35000,
          description: 'Yoga equipment purchase',
          gym: createdGyms[1].name,
          gymId: createdGyms[1]._id,
          createdBy: admin._id,
          status: 'Completed',
        },
        {
          date: new Date('2025-01-18'),
          type: 'Expense',
          category: 'Utilities',
          amount: 6500,
          description: 'Water and electricity bill',
          gym: createdGyms[1].name,
          gymId: createdGyms[1]._id,
          createdBy: admin._id,
          status: 'Completed',
        },
        {
          date: new Date('2025-01-22'),
          type: 'Expense',
          category: 'Maintenance',
          amount: 2500,
          description: 'HVAC system maintenance',
          gym: createdGyms[1].name,
          gymId: createdGyms[1]._id,
          createdBy: admin._id,
          status: 'Completed',
        }
      ];

      const createdTransactions = [];
      for (const transactionData of transactions) {
        const transaction = new Transaction(transactionData);
        await transaction.save();
        createdTransactions.push(transaction);
      }
      console.log(`✅ ${createdTransactions.length} financial transactions created\n`);
    }

    console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!\n');
    console.log('='.repeat(50));
    console.log('DEFAULT LOGIN CREDENTIALS:');
    console.log('='.repeat(50));
    console.log('🔑 Admin: admin@gymmanagement.com / admin123');
    console.log('🏢 Gym Owner (Main): gym@gymmanagement.com / gym123');
    console.log('🏢 Gym Owner (North): gym.north@gymmanagement.com / gym123');
    console.log('💪 Trainer 1: trainer@gymmanagement.com / trainer123');
    console.log('💪 Trainer 2: trainer2@gymmanagement.com / trainer123');
    console.log('👥 Staff: staff@gymmanagement.com / staff123');
    console.log('🏃 Member 1: member@gymmanagement.com / member123');
    console.log('🏃 Member 2: member2@gymmanagement.com / member123');
    console.log('='.repeat(50));
    console.log('\n📊 SAMPLE DATA CREATED:');
    console.log(`• ${createdRoles.length} user roles`);
    console.log(`• ${createdGyms.length} gym locations`);
    console.log(`• ${createdCourses.length} courses`);
    console.log(`• ${createdUsers.length} users`);
    console.log('• Sample financial transactions');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
};

// Run seeder
const runSeeder = async () => {
  try {
    await connectDB();
    await seedData();
    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeder failed:', error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🌱 GYM Management System Database Seeder

Usage: node seeder.js [options]

Options:
  --help, -h          Show this help message
  --clear-data        Clear existing data before seeding (use with caution!)

Environment Variables:
  MONGODB_URI         MongoDB connection string
  CLEAR_EXISTING_DATA Set to 'true' to clear existing data

Examples:
  node seeder.js                    # Seed with existing data
  CLEAR_EXISTING_DATA=true node seeder.js  # Clear and seed
  `);
  process.exit(0);
}

if (args.includes('--clear-data')) {
  process.env.CLEAR_EXISTING_DATA = 'true';
}

runSeeder();
