const Trainer = require("../models/TrainerModel");
const Role = require("../models/RoleModel");
const bcryptjs = require("bcryptjs");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

// Get all trainers (filter by active trainers)
const getAllTrainers = async (req, res) => {
  try {
    const params = { user_type: "Trainer", isActive: true };
    const gymId = req.user.gymId;
    if (gymId) {
      params.gymId = gymId;
    }
    // Removed gymId filter to show all trainers

    const trainers = await User.aggregate([
      { $match: params },
      {
        $lookup: {
          from: 'gyms',
          localField: 'gymId',
          foreignField: '_id',
          as: 'gym'
        }
      },
      {
        $unwind: {
          path: '$gym',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          employeeId: 1,
          name: 1,
          email: 1,
          profile: 1,
          image: 1,
          certifications: 1,
          specializations: 1,
          rating: 1,
          gymId: 1,
          gymName: '$gym.name'
        }
      }
    ]);
    const formattedTrainers = (trainers || []).map((trainer) => ({
      id: trainer._id,
      employeeId: trainer.employeeId || "",
      name: trainer.name,
      expertise: trainer.profile.spacialization || "General",
      experience: trainer.profile.exp || "N/A",
      image: trainer.image || "",
      rating: trainer.rating || 0,
      certifications: trainer.certifications || [],
      specializations: trainer.specializations || [],
      gymName: trainer.gymName,
    }));
    res.status(200).json(formattedTrainers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trainers", error: error.message });
  }
};

// Get trainers by gym ID
const getTrainersByGym = async (req, res) => {
  try {
    const { gymId } = req.params;
    const params = { user_type: "Trainer", isActive: true };

    // Add gym filter if gymId is provided and valid
    if (gymId && gymId !== 'all' && mongoose.Types.ObjectId.isValid(gymId)) {
      params.gymId = new mongoose.Types.ObjectId(gymId);
    }

    const trainers = await User.aggregate([
      { $match: params },
      {
        $lookup: {
          from: 'gyms',
          localField: 'gymId',
          foreignField: '_id',
          as: 'gym'
        }
      },
      {
        $unwind: {
          path: '$gym',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          employeeId: 1,
          name: 1,
          email: 1,
          mobile: 1,
          profile: 1,
          image: 1,
          certifications: 1,
          specializations: 1,
          rating: 1,
          gymId: 1,
          gymName: '$gym.name',
          salary: '$profile.salary',
          joiningDate: '$createdAt'
        }
      }
    ]);

    const formattedTrainers = (trainers || []).map((trainer) => ({
      id: trainer._id,
      employeeId: trainer.employeeId || `EMP${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      name: trainer.name,
      email: trainer.email,
      mobile: trainer.mobile || 'N/A',
      expertise: trainer.profile?.spacialization || "General",
      experience: trainer.profile?.exp || "N/A",
      image: trainer.image || "",
      rating: trainer.rating || 0,
      certifications: trainer.certifications || [],
      specializations: trainer.specializations || [],
      gymName: trainer.gymName || 'N/A',
      salary: trainer.salary || 25000,
      joiningDate: trainer.joiningDate
    }));

    res.status(200).json({ trainers: formattedTrainers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trainers by gym", error: error.message });
  }
};

// Add trainer
const addTrainer = async (req, res) => {
  try {
    const {
      name,
      expertise,
      experience,
      image,
      rating,
      certifications,
      specializations,
      employeeId,
    } = req.body;

    // Get the Trainer role ID
    const trainerRole = await Role.findOne({ name: "Trainer" });
    if (!trainerRole) {
      return res.status(500).json({ message: "Trainer role not found" });
    }

    const trainer = new User({
      employeeId,
      name,
      email:
        req.body.email ||
        `${employeeId.toLowerCase().replace(" ", "")}@gym.com`, // Placeholder
      password: req.body.password
        ? bcryptjs.hashSync(req.body.password, 10)
        : bcryptjs.hashSync(employeeId, 10),
      profile: {
        exp: experience,
        spacialization: expertise,
      },
      image,
      rating: rating || 0,
      certifications: certifications || [],
      specializations: specializations || [],
      user_type: "Trainer",
      roleId: trainerRole._id,
      gymId: req.user.gymId || req.body.gymId || null,
    });
    await trainer.save();
    res.status(201).json({ message: "Trainer added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding trainer", error: error.message });
  }
};

// Update trainer
const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      expertise,
      experience,
      image,
      rating,
      certifications,
      specializations,
      employeeId,
      password,
    } = req.body;
    const updateData = {
      name,
      image,
      rating: rating || 0,
      certifications: certifications || [],
      specializations: specializations || [],
      gymId: req.user.gymId || req.body.gymId || null,
    };
    if (employeeId) updateData.employeeId = employeeId;
    if (password) updateData.password = bcryptjs.hashSync(password, 10);

    // Update profile fields using $set to avoid overwriting the entire profile
    const profileUpdates = {};
    if (experience !== undefined) profileUpdates['profile.exp'] = experience;
    if (expertise !== undefined) profileUpdates['profile.spacialization'] = expertise;

    if (Object.keys(profileUpdates).length > 0) {
      updateData.$set = profileUpdates;
    }

    await User.findByIdAndUpdate(id, updateData);
    res.status(200).json({ message: "Trainer updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating trainer", error: error.message });
  }
};

// Delete trainer (soft delete by setting isActive to false)
const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isActive: false });
    res.status(200).json({ message: "Trainer deactivated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating trainer", error: error.message });
  }
};

// Get trainer by ID
const getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await User.findOne({ _id: id, isActive: true });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    const formattedTrainer = {
      id: trainer._id,
      employeeId: trainer.employeeId || "",
      name: trainer.name,
      email: trainer.email,
      mobile: trainer.mobile || "",
      expertise: trainer.profile.spacialization || "General",
      experience: trainer.profile.exp || "N/A",
      image: trainer.image || "",
      rating: trainer.rating || 0,
      certifications: trainer.certifications || [],
      specializations: trainer.specializations || [],
    };
    res.status(200).json(formattedTrainer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trainer", error: error.message });
  }
};

// Get trainer salary
const getTrainerSalary = async (req, res) => {
  try {
    // For now, return mock data. In future, integrate with SalaryModel or calculate from database.
    const salaryData = {
      monthlySalary: 3000,
      hourlyRate: 25,
      currentMonthEarnings: 2800,
      baseSalary: 2500,
      performanceBonus: 300,
      clientCommissions: 200,
      paymentHistory: [
        {
          period: "October 2023",
          amount: 3000,
          date: "2023-10-31",
          status: "Paid"
        },
        {
          period: "September 2023",
          amount: 2900,
          date: "2023-09-30",
          status: "Paid"
        }
      ]
    };
    res.status(200).json(salaryData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching salary", error: error.message });
  }
};

// Get trainer schedules
const getTrainerSchedules = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const Class = require("../models/ClassModel");

    const schedules = await Class.find({
      instructor: trainerId,
      isActive: true
    }).select('_id title date time location capacity enrolled category difficulty');

    const formattedSchedules = schedules.map(schedule => ({
      _id: schedule._id,
      title: schedule.title,
      date: schedule.date.toISOString().split('T')[0],
      time: schedule.time,
      location: schedule.location,
      enrolled: schedule.enrolled,
      capacity: schedule.capacity,
      category: schedule.category,
      difficulty: schedule.difficulty
    }));

    res.status(200).json(formattedSchedules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error: error.message });
  }
};

// Get trainer clients
const getTrainerClients = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const clients = await User.find({
      assignedTrainer: trainerId,
      user_type: "Member",
      isActive: true
    }).select('_id name email mobile profile goal');

    const formattedClients = clients.map(client => ({
      _id: client._id,
      name: client.name,
      email: client.email,
      phone: client.mobile || "N/A",
      goal: client.profile?.goal || "Not specified",
      createdAt: client.createdAt
    }));

    res.status(200).json(formattedClients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error: error.message });
  }
};

// Get assigned members for trainer dashboard
const getAssignedMembers = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const members = await User.find({
      assignedTrainer: trainerId,
      user_type: "Member",
      isActive: true
    }).select('_id name email mobile profile createdAt');

    const formattedMembers = members.map(member => ({
      _id: member._id,
      name: member.name,
      progress: 85, // Mock progress, integrate with ProgressModel later
      lastWorkout: member.createdAt.toISOString().split('T')[0], // Mock last workout date
      membershipStatus: "Active"
    }));

    res.status(200).json(formattedMembers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assigned members", error: error.message });
  }
};

// Create workout
const createWorkout = async (req, res) => {
  try {
    const { title, description, difficulty, duration, exercises } = req.body;
    const trainerId = req.user.id;
    const WorkoutRoutine = require("../models/WorkoutRoutineModel");

    const workout = new WorkoutRoutine({
      name: title,
      goal: "General", // Default, can be updated
      difficulty: difficulty || "Beginner",
      days: [
        {
          day: "Day 1",
          exercises: exercises.map(ex => ({
            name: ex.name,
            sets: parseInt(ex.sets),
            reps: ex.reps,
            rest: ex.rest
          }))
        }
      ],
      createdBy: trainerId
    });

    await workout.save();
    res.status(201).json({ message: "Workout created successfully", workoutId: workout._id });
  } catch (error) {
    res.status(500).json({ message: "Error creating workout", error: error.message });
  }
};

// Assign workout to client
const assignWorkoutToClient = async (req, res) => {
  try {
    const { clientId, workoutId } = req.body;
    const trainerId = req.user.id;
    const WorkoutCompletion = require("../models/WorkoutCompletionModel");

    const assignment = new WorkoutCompletion({
      userId: clientId,
      workoutId: workoutId,
      assignedBy: trainerId,
      completionDate: new Date(),
      duration: 0, // Will be updated when completed
      exercisesCompleted: [], // Will be updated when completed
      overallNotes: "Assigned by trainer"
    });

    await assignment.save();
    res.status(200).json({ message: "Workout assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error assigning workout", error: error.message });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    // Mock response
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

// Get workouts created by trainer
const getWorkouts = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const WorkoutRoutine = require("../models/WorkoutRoutineModel");

    const workouts = await WorkoutRoutine.find({
      createdBy: trainerId,
      isActive: true
    }).select('_id name difficulty goal days');

    const formattedWorkouts = workouts.map(workout => ({
      _id: workout._id,
      title: workout.name,
      difficulty: workout.difficulty,
      exercises: workout.days[0]?.exercises || []
    }));

    res.status(200).json(formattedWorkouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workouts", error: error.message });
  }
};

// Get trainer dashboard data
const getTrainerDashboard = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // Get total clients
    const totalClients = await User.countDocuments({
      assignedTrainer: trainerId,
      user_type: "Member",
      isActive: true
    });

    // Get total schedules (classes)
    const Class = require("../models/ClassModel");
    const totalSchedules = await Class.countDocuments({
      instructor: trainerId,
      isActive: true
    });

    // Get total workouts created
    const WorkoutRoutine = require("../models/WorkoutRoutineModel");
    const totalWorkouts = await WorkoutRoutine.countDocuments({
      createdBy: trainerId,
      isActive: true
    });

    // Mock monthly earnings (integrate with SalaryModel later)
    const monthlyEarnings = 2800;

    // Get recent activities (mock for now)
    const recentActivities = [
      {
        type: "workout",
        title: "Created Upper Body Workout",
        description: "New workout routine for strength training",
        date: new Date().toISOString().split('T')[0],
        time: "10:00 AM"
      },
      {
        type: "schedule",
        title: "Yoga Class Scheduled",
        description: "Morning yoga session for beginners",
        date: new Date().toISOString().split('T')[0],
        time: "8:00 AM"
      }
    ];

    res.status(200).json({
      totalClients,
      totalSchedules,
      totalWorkouts,
      monthlyEarnings,
      recentActivities
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
};

module.exports = {
  getAllTrainers,
  getTrainersByGym,
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerSalary,
  getTrainerSchedules,
  getTrainerClients,
  getAssignedMembers,
  createWorkout,
  assignWorkoutToClient,
  resetPassword,
  getWorkouts,
  getTrainerDashboard,
};
