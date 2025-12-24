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

// Get all trainers for salary management (including inactive)
const getAllTrainersForSalary = async (req, res) => {
  try {
    const params = { user_type: "Trainer" }; // Remove isActive filter to include both active and inactive
    const gymId = req.user.gymId;
    if (gymId) {
      params.gymId = gymId;
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
          isActive: 1,
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
      isActive: trainer.isActive,
      salary: trainer.salary || 25000,
      joiningDate: trainer.joiningDate,
      status: trainer.isActive ? 'Active' : 'Inactive'
    }));

    res.status(200).json({ trainers: formattedTrainers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trainers for salary", error: error.message });
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



// Get trainer salary (legacy function for trainer dashboard)
const getTrainerSalary = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // Get trainer info
    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const trainerSalary = trainer.profile?.salary || 35000;
    const Transaction = require("../models/TransactionModel");

    // Get recent salary transactions
    const salaryTransactions = await Transaction.find({
      employeeId: trainerId,
      category: "Salary",
      type: "Expense"
    }).sort({ date: -1 }).limit(5);

    const salaryData = {
      monthlySalary: trainerSalary,
      hourlyRate: Math.round(trainerSalary / 160),
      currentMonthEarnings: Math.round(trainerSalary * 0.9),
      baseSalary: Math.round(trainerSalary * 0.8),
      performanceBonus: Math.round(trainerSalary * 0.15),
      clientCommissions: Math.round(trainerSalary * 0.05),
      paymentHistory: salaryTransactions.map(transaction => ({
        period: new Date(transaction.date).toLocaleString('default', { month: 'long', year: 'numeric' }),
        amount: transaction.amount,
        date: transaction.date.toISOString().split('T')[0],
        status: transaction.status === "Completed" ? "Paid" : transaction.status
      }))
    };

    res.status(200).json(salaryData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching salary", error: error.message });
  }
};

// Get trainer salary details by trainer ID (for management view)
const getTrainerSalaryDetails = async (req, res) => {
  try {
    const { trainerId } = req.params;

    // Get trainer info
    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const Transaction = require("../models/TransactionModel");

    // Get all salary transactions for this trainer using employeeId
    const salaryTransactions = await Transaction.find({
      employeeId: trainerId,
      category: "Salary",
      type: "Expense"
    }).sort({ date: -1 }).limit(12);

    // Calculate dynamic salary based on recent transactions
    let currentSalary = trainer.profile?.salary || 25000;

    // If we have recent transactions, use the most recent one as current salary
    if (salaryTransactions.length > 0) {
      const mostRecentTransaction = salaryTransactions[0];
      currentSalary = mostRecentTransaction.amount;

      // Update trainer's profile salary to match the transaction
      if (trainer.profile?.salary !== currentSalary) {
        await User.findByIdAndUpdate(trainerId, {
          'profile.salary': currentSalary
        });
      }
    }

    // Calculate salary breakdown from transaction data or use defaults
    let baseSalary = Math.round(currentSalary * 0.8);
    let performanceBonus = Math.round(currentSalary * 0.15);
    let clientCommissions = Math.round(currentSalary * 0.05);

    // If transaction has salary breakdown, use it
    if (salaryTransactions.length > 0 && salaryTransactions[0].salaryBreakdown) {
      const breakdown = salaryTransactions[0].salaryBreakdown;
      baseSalary = breakdown.baseSalary || baseSalary;
      performanceBonus = breakdown.performanceBonus || performanceBonus;
      clientCommissions = breakdown.clientCommissions || clientCommissions;
    }

    // Calculate current month earnings (assuming 80% of monthly salary)
    const currentMonthEarnings = Math.round(currentSalary * 0.8);

    const salaryData = {
      trainerId: trainer._id,
      trainerName: trainer.name,
      monthlySalary: currentSalary,
      hourlyRate: Math.round(currentSalary / 160),
      currentMonthEarnings: currentMonthEarnings,
      baseSalary: baseSalary,
      performanceBonus: performanceBonus,
      clientCommissions: clientCommissions,
      paymentHistory: salaryTransactions.map(transaction => ({
        period: new Date(transaction.date).toLocaleString('default', { month: 'long', year: 'numeric' }),
        amount: transaction.amount,
        date: transaction.date.toISOString().split('T')[0],
        status: transaction.status === "Completed" ? "Paid" : transaction.status,
        breakdown: transaction.salaryBreakdown || null
      }))
    };

    res.status(200).json(salaryData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching salary details", error: error.message });
  }
};

// Get trainer schedules
const getTrainerSchedules = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const Schedule = require("../models/ScheduleModel");

    const schedules = await Schedule.find({
      trainerId: trainerId,
      status: { $ne: 'Cancelled' }
    }).select('_id title date startTime endTime type notes status gymId');

    const formattedSchedules = schedules.map(schedule => ({
      _id: schedule._id,
      title: schedule.title,
      date: schedule.date.toISOString().split('T')[0],
      time: schedule.startTime,
      type: schedule.type,
      notes: schedule.notes,
      status: schedule.status,
      location: schedule.gymId?.name || 'N/A'
    }));

    res.status(200).json(formattedSchedules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error: error.message });
  }
};

// Create trainer schedule
const createSchedule = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      type,
      notes,
      gymId
    } = req.body;

    // Validate required fields
    if (!title || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate trainer exists and is active
    const trainer = await User.findOne({ _id: trainerId, user_type: "Trainer", isActive: true });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found or inactive" });
    }

    // Validate gym exists if provided
    if (gymId) {
      const Gym = require("../models/GymModel");
      const gym = await Gym.findById(gymId);
      if (!gym) {
        return res.status(404).json({ message: "Gym not found" });
      }
    }

    const Schedule = require("../models/ScheduleModel");

    // Create new schedule
    const newSchedule = new Schedule({
      title,
      description: description || "",
      trainerId,
      gymId: gymId || trainer.gymId,
      date: new Date(date),
      startTime,
      endTime,
      type: type || "Availability",
      notes: notes || "",
      status: "Scheduled"
    });

    await newSchedule.save();

    res.status(201).json({
      message: "Schedule created successfully",
      schedule: {
        _id: newSchedule._id,
        title: newSchedule.title,
        date: newSchedule.date.toISOString().split('T')[0],
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        type: newSchedule.type,
        status: newSchedule.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating schedule", error: error.message });
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

// Create or update trainer salary transaction
const createOrUpdateTrainerSalary = async (req, res) => {
  try {
    const { trainerId, amount, description, salaryBreakdown, date, status } = req.body;

    // Validate trainer exists
    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const Transaction = require("../models/TransactionModel");

    // Check if there's already a salary transaction for this month
    const transactionDate = date ? new Date(date) : new Date();
    const startOfMonth = new Date(transactionDate.getFullYear(), transactionDate.getMonth(), 1);
    const endOfMonth = new Date(transactionDate.getFullYear(), transactionDate.getMonth() + 1, 0);

    const existingTransaction = await Transaction.findOne({
      employeeId: trainerId,
      category: "Salary",
      type: "Expense",
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });

    let transaction;
    if (existingTransaction) {
      // Update existing transaction
      transaction = await Transaction.findByIdAndUpdate(
        existingTransaction._id,
        {
          amount,
          description: description || `Salary payment for ${trainer.name}`,
          salaryBreakdown: salaryBreakdown || {
            baseSalary: Math.round(amount * 0.8),
            performanceBonus: Math.round(amount * 0.15),
            clientCommissions: Math.round(amount * 0.05)
          },
          date: transactionDate,
          status: status || "Completed"
        },
        { new: true }
      );
    } else {
      // Create new transaction
      transaction = new Transaction({
        date: transactionDate,
        type: "Expense",
        category: "Salary",
        amount,
        description: description || `Salary payment for ${trainer.name}`,
        salaryBreakdown: salaryBreakdown || {
          baseSalary: Math.round(amount * 0.8),
          performanceBonus: Math.round(amount * 0.15),
          clientCommissions: Math.round(amount * 0.05)
        },
        employeeId: trainerId,
        gymId: trainer.gymId,
        createdBy: req.user.id,
        status: status || "Completed"
      });
      await transaction.save();
    }

    // Update trainer's profile salary
    await User.findByIdAndUpdate(trainerId, {
      'profile.salary': amount
    });

    res.status(200).json({
      message: existingTransaction ? "Salary updated successfully" : "Salary created successfully",
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating/updating salary", error: error.message });
  }
};

// Update trainer salary dynamically
const updateTrainerSalary = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { newSalary, effectiveDate, reason } = req.body;

    // Validate trainer exists
    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const Transaction = require("../models/TransactionModel");

    // Create a salary adjustment transaction
    const transaction = new Transaction({
      date: effectiveDate ? new Date(effectiveDate) : new Date(),
      type: "Expense",
      category: "Salary",
      amount: newSalary,
      description: reason || `Salary adjustment for ${trainer.name}`,
      salaryBreakdown: {
        baseSalary: Math.round(newSalary * 0.8),
        performanceBonus: Math.round(newSalary * 0.15),
        clientCommissions: Math.round(newSalary * 0.05)
      },
      employeeId: trainerId,
      gymId: trainer.gymId,
      createdBy: req.user.id,
      status: "Completed"
    });

    await transaction.save();

    // Update trainer's profile salary
    await User.findByIdAndUpdate(trainerId, {
      'profile.salary': newSalary
    });

    res.status(200).json({
      message: "Trainer salary updated successfully",
      newSalary,
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating trainer salary", error: error.message });
  }
};

// Get salary analytics for all trainers
const getSalaryAnalytics = async (req, res) => {
  try {
    const { gymId, month, year } = req.query;
    const Transaction = require("../models/TransactionModel");

    // Build match conditions
    const matchConditions = {
      category: "Salary",
      type: "Expense"
    };

    if (gymId && gymId !== 'all') {
      matchConditions.gymId = new mongoose.Types.ObjectId(gymId);
    }

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      matchConditions.date = { $gte: startDate, $lte: endDate };
    }

    const salaryAnalytics = await Transaction.aggregate([
      { $match: matchConditions },
      {
        $lookup: {
          from: 'users',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'trainer'
        }
      },
      {
        $unwind: {
          path: '$trainer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$employeeId',
          trainerName: { $first: '$trainer.name' },
          totalSalary: { $sum: '$amount' },
          transactionCount: { $sum: 1 },
          averageSalary: { $avg: '$amount' },
          lastPaymentDate: { $max: '$date' },
          salaryBreakdown: { $last: '$salaryBreakdown' }
        }
      },
      {
        $project: {
          trainerId: '$_id',
          trainerName: 1,
          totalSalary: 1,
          transactionCount: 1,
          averageSalary: { $round: ['$averageSalary', 2] },
          lastPaymentDate: 1,
          salaryBreakdown: 1
        }
      },
      { $sort: { totalSalary: -1 } }
    ]);

    // Calculate totals
    const totalSalaryPaid = salaryAnalytics.reduce((sum, item) => sum + item.totalSalary, 0);
    const totalTrainers = salaryAnalytics.length;

    res.status(200).json({
      analytics: salaryAnalytics,
      summary: {
        totalSalaryPaid,
        totalTrainers,
        averageSalaryPerTrainer: totalTrainers > 0 ? Math.round(totalSalaryPaid / totalTrainers) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching salary analytics", error: error.message });
  }
};

// Add payment record for trainer
const addPaymentRecord = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { date, amount, description, status, salaryBreakdown } = req.body;

    // Validate trainer exists
    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const Transaction = require("../models/TransactionModel");

    // Create new payment transaction
    const transaction = new Transaction({
      date: date ? new Date(date) : new Date(),
      type: "Expense",
      category: "Salary",
      amount: parseFloat(amount),
      description: description || `Salary payment for ${trainer.name}`,
      salaryBreakdown: salaryBreakdown || {
        baseSalary: Math.round(amount * 0.8),
        performanceBonus: Math.round(amount * 0.15),
        clientCommissions: Math.round(amount * 0.05)
      },
      employeeId: trainerId,
      gymId: trainer.gymId,
      createdBy: req.user.id,
      status: status || "Completed"
    });

    await transaction.save();

    // Update trainer's profile salary if this is the most recent payment
    const recentTransaction = await Transaction.findOne({
      employeeId: trainerId,
      category: "Salary",
      type: "Expense"
    }).sort({ date: -1 });

    if (recentTransaction && recentTransaction._id.toString() === transaction._id.toString()) {
      await User.findByIdAndUpdate(trainerId, {
        'profile.salary': amount
      });
    }

    res.status(201).json({
      message: "Payment record added successfully",
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding payment record", error: error.message });
  }
};

// Update payment record for trainer
const updatePaymentRecord = async (req, res) => {
  try {
    const { trainerId, paymentId } = req.params;
    const { date, amount, description, status, salaryBreakdown } = req.body;

    const Transaction = require("../models/TransactionModel");

    // Find and update the transaction
    const transaction = await Transaction.findOneAndUpdate(
      { _id: paymentId, employeeId: trainerId, category: "Salary", type: "Expense" },
      {
        date: date ? new Date(date) : undefined,
        amount: amount ? parseFloat(amount) : undefined,
        description,
        status,
        salaryBreakdown
      },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    // Update trainer's profile salary if this is the most recent payment
    const recentTransaction = await Transaction.findOne({
      employeeId: trainerId,
      category: "Salary",
      type: "Expense"
    }).sort({ date: -1 });

    if (recentTransaction && recentTransaction._id.toString() === transaction._id.toString()) {
      await User.findByIdAndUpdate(trainerId, {
        'profile.salary': transaction.amount
      });
    }

    res.status(200).json({
      message: "Payment record updated successfully",
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment record", error: error.message });
  }
};

// Delete payment record for trainer
const deletePaymentRecord = async (req, res) => {
  try {
    const { trainerId, paymentId } = req.params;

    const Transaction = require("../models/TransactionModel");

    // Find and delete the transaction
    const transaction = await Transaction.findOneAndDelete({
      _id: paymentId,
      employeeId: trainerId,
      category: "Salary",
      type: "Expense"
    });

    if (!transaction) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    // Update trainer's profile salary to the most recent remaining payment
    const recentTransaction = await Transaction.findOne({
      employeeId: trainerId,
      category: "Salary",
      type: "Expense"
    }).sort({ date: -1 });

    if (recentTransaction) {
      await User.findByIdAndUpdate(trainerId, {
        'profile.salary': recentTransaction.amount
      });
    } else {
      // If no payments left, set to default
      await User.findByIdAndUpdate(trainerId, {
        'profile.salary': 25000
      });
    }

    res.status(200).json({
      message: "Payment record deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment record", error: error.message });
  }
};

// Get all trainer payment dates for salary management
const getAllTrainerPaymentDates = async (req, res) => {
  try {
    const Transaction = require("../models/TransactionModel");

    // Get the most recent payment date for each trainer
    const paymentDates = await Transaction.aggregate([
      {
        $match: {
          category: "Salary",
          type: "Expense",
          status: "Completed"
        }
      },
      {
        $sort: { date: -1 }
      },
      {
        $group: {
          _id: "$employeeId",
          lastPaymentDate: { $first: "$date" },
          totalPayments: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'trainer'
        }
      },
      {
        $unwind: {
          path: '$trainer',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          trainerId: '$_id',
          trainerName: '$trainer.name',
          lastPaymentDate: 1,
          totalPayments: 1
        }
      }
    ]);

    // Convert to a map for easy lookup
    const paymentDateMap = {};
    paymentDates.forEach(item => {
      paymentDateMap[item.trainerId] = {
        date: item.lastPaymentDate,
        totalPayments: item.totalPayments
      };
    });

    res.status(200).json({
      paymentDates: paymentDateMap,
      totalTrainers: paymentDates.length
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainer payment dates", error: error.message });
  }
};

// Get trainer stats for dashboard
const getTrainerStats = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // Get assigned members count
    const assignedMembers = await User.countDocuments({
      assignedTrainer: trainerId,
      user_type: "Member",
      isActive: true
    });

    // Get classes taught count
    const Class = require("../models/ClassModel");
    const classesTaught = await Class.countDocuments({
      instructor: trainerId,
      isActive: true
    });

    // Calculate average member progress based on workout completions
    let memberProgress = 0;
    if (assignedMembers > 0) {
      const members = await User.find({
        assignedTrainer: trainerId,
        user_type: "Member",
        isActive: true
      }).select('_id');

      const WorkoutCompletion = require("../models/WorkoutCompletionModel");
      const progressPromises = members.map(async (member) => {
        const workoutCompletions = await WorkoutCompletion.find({
          userId: member._id,
          completionDate: { $exists: true }
        });

        const totalWorkouts = workoutCompletions.length;
        const completedWorkouts = workoutCompletions.filter(w => w.status === 'completed').length;
        return totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0;
      });

      const progressValues = await Promise.all(progressPromises);
      memberProgress = progressValues.length > 0
        ? Math.round(progressValues.reduce((sum, val) => sum + val, 0) / progressValues.length)
        : 0;
    }

    // Get upcoming sessions count
    const upcomingSessions = await Class.countDocuments({
      instructor: trainerId,
      isActive: true,
      date: { $gte: new Date() }
    });

    res.status(200).json({
      assignedMembers,
      classesTaught,
      memberProgress,
      upcomingSessions
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainer stats", error: error.message });
  }
};

// Get trainer activities for dashboard
const getTrainerActivities = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // Get recent class activities
    const Class = require("../models/ClassModel");
    const recentClasses = await Class.find({
      instructor: trainerId,
      isActive: true
    })
    .sort({ createdAt: -1 })
    .limit(3)
    .select('title date time enrolled capacity createdAt');

    // Get recent workout activities
    const WorkoutRoutine = require("../models/WorkoutRoutineModel");
    const recentWorkouts = await WorkoutRoutine.find({
      createdBy: trainerId,
      isActive: true
    })
    .sort({ createdAt: -1 })
    .limit(2)
    .select('name createdAt');

    // Combine and format activities
    const activities = [];

    // Add class activities
    recentClasses.forEach(cls => {
      activities.push({
        id: cls._id,
        type: "class",
        title: `${cls.title} Completed`,
        date: cls.createdAt.toISOString().split('T')[0],
        details: `${cls.enrolled}/${cls.capacity} members attended`
      });
    });

    // Add workout activities
    recentWorkouts.forEach(workout => {
      activities.push({
        id: workout._id,
        type: "workout",
        title: `${workout.name} Created`,
        date: workout.createdAt.toISOString().split('T')[0],
        details: "New workout routine"
      });
    });

    // Sort by date and limit to 5
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    const limitedActivities = activities.slice(0, 5);

    res.status(200).json(limitedActivities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainer activities", error: error.message });
  }
};

// Get trainer classes for dashboard
const getTrainerClasses = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const Class = require("../models/ClassModel");

    const upcomingClasses = await Class.find({
      instructor: trainerId,
      isActive: true,
      date: { $gte: new Date() }
    })
    .sort({ date: 1 })
    .limit(5)
    .select('_id title date time duration capacity enrolled category difficulty location');

    const formattedClasses = upcomingClasses.map(cls => ({
      _id: cls._id,
      title: cls.title,
      date: cls.date.toISOString().split('T')[0],
      time: cls.time,
      duration: cls.duration || "60 min",
      capacity: cls.capacity,
      enrolled: cls.enrolled,
      category: cls.category,
      difficulty: cls.difficulty,
      location: cls.location
    }));

    res.status(200).json(formattedClasses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainer classes", error: error.message });
  }
};

// Assign member to trainer
const assignMemberToTrainer = async (req, res) => {
  try {
    const { memberId } = req.body;
    const trainerId = req.user.id;

    // Validate member exists and is active
    const member = await User.findOne({
      _id: memberId,
      user_type: "Member",
      isActive: true
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found or inactive" });
    }

    // Check if member is already assigned to another trainer
    if (member.assignedTrainer && member.assignedTrainer.toString() !== trainerId) {
      return res.status(400).json({ message: "Member is already assigned to another trainer" });
    }

    // Assign member to trainer
    await User.findByIdAndUpdate(memberId, {
      assignedTrainer: trainerId
    });

    res.status(200).json({ message: "Member assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error assigning member", error: error.message });
  }
};

// Get available members (not assigned to any trainer)
const getAvailableMembers = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // Get members who are not assigned to any trainer or assigned to this trainer
    const members = await User.find({
      user_type: "Member",
      isActive: true,
      $or: [
        { assignedTrainer: { $exists: false } },
        { assignedTrainer: null },
        { assignedTrainer: trainerId }
      ]
    }).select('_id name email mobile profile createdAt');

    const formattedMembers = members.map(member => ({
      _id: member._id,
      name: member.name,
      email: member.email,
      phone: member.mobile || "N/A",
      goal: member.profile?.goal || "Not specified",
      createdAt: member.createdAt,
      isAssigned: member.assignedTrainer?.toString() === trainerId
    }));

    res.status(200).json(formattedMembers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching available members", error: error.message });
  }
};

// Remove member from trainer
const removeMemberFromTrainer = async (req, res) => {
  try {
    const { memberId } = req.params;
    const trainerId = req.user.id;

    // Check if member is assigned to this trainer
    const member = await User.findOne({
      _id: memberId,
      assignedTrainer: trainerId,
      user_type: "Member",
      isActive: true
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found or not assigned to this trainer" });
    }

    // Remove trainer assignment
    await User.findByIdAndUpdate(memberId, {
      $unset: { assignedTrainer: 1 }
    });

    res.status(200).json({ message: "Member removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing member", error: error.message });
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

    // Get actual monthly earnings from transactions
    const Transaction = require("../models/TransactionModel");
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

    const monthlyTransactions = await Transaction.find({
      employeeId: trainerId,
      category: "Salary",
      type: "Expense",
      date: { $gte: startOfMonth },
      status: "Completed"
    });

    const monthlyEarnings = monthlyTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    res.status(200).json({
      totalClients,
      totalSchedules,
      totalWorkouts,
      monthlyEarnings
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainer dashboard", error: error.message });
  }
};

module.exports = {
  getAllTrainers,
  getAllTrainersForSalary,
  getTrainersByGym,
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerSalary,
  getTrainerSalaryDetails,
  createOrUpdateTrainerSalary,
  updateTrainerSalary,
  getSalaryAnalytics,
  addPaymentRecord,
  updatePaymentRecord,
  deletePaymentRecord,
  getAllTrainerPaymentDates,
  getTrainerSchedules,
  createSchedule,
  getTrainerClients,
  getAssignedMembers,
  createWorkout,
  assignWorkoutToClient,
  resetPassword,
  getWorkouts,
  getTrainerDashboard,
  getTrainerStats,
  getTrainerActivities,
  getTrainerClasses,
  assignMemberToTrainer,
  getAvailableMembers,
  removeMemberFromTrainer,
};
