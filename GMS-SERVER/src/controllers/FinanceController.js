const Transaction = require("../models/TransactionModel");
const User = require("../models/UserModel");
const Gym = require("../models/GymModel");

// Get all transactions with filtering
const getAllTransactions = async (req, res) => {
  try {
    const { gym, type, category, startDate, endDate, page = 1, limit = 50 } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (gym && gym !== 'All') {
      filter.gym = gym;
    }
    
    if (type && type !== 'All') {
      filter.type = type;
    }
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get transactions with pagination
    const transactions = await Transaction.find(filter)
      .populate('employeeId', 'name email employeeId')
      .populate('gymId', 'name location')
      .populate('createdBy', 'name email')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Transaction.countDocuments(filter);
    
    // Calculate summary statistics
    const summary = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    const summaryData = {
      totalIncome: summary.find(s => s._id === 'Income')?.total || 0,
      totalExpense: summary.find(s => s._id === 'Expense')?.total || 0,
      incomeCount: summary.find(s => s._id === 'Income')?.count || 0,
      expenseCount: summary.find(s => s._id === 'Expense')?.count || 0,
    };
    
    summaryData.balance = summaryData.totalIncome - summaryData.totalExpense;
    
    res.status(200).json({
      transactions,
      summary: summaryData,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: transactions.length,
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: "Error fetching transactions", error: error.message });
  }
};

// Add transaction
const addTransaction = async (req, res) => {
  try {
    const { date, type, category, amount, description, gym, gymId, employeeId, salaryBreakdown } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "User authentication required" });
    }

    const transactionData = {
      date: date || new Date(),
      type,
      category: category || 'Other',
      amount: parseFloat(amount),
      description,
      createdBy: userId,
    };

    // Add optional fields if provided
    if (gym) transactionData.gym = gym;
    if (gymId) transactionData.gymId = gymId;
    if (employeeId) transactionData.employeeId = employeeId;
    if (salaryBreakdown) transactionData.salaryBreakdown = salaryBreakdown;

    const transaction = new Transaction(transactionData);
    await transaction.save();

    // Populate the created transaction for response
    await transaction.populate([
      { path: 'employeeId', select: 'name email employeeId' },
      { path: 'gymId', select: 'name location' },
      { path: 'createdBy', select: 'name email' }
    ]);

    res.status(201).json({
      message: "Transaction added successfully",
      transaction
    });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ message: "Error adding transaction", error: error.message });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, type, category, amount, description, gym, gymId, employeeId, status, salaryBreakdown } = req.body;

    const updateData = {};
    if (date) updateData.date = date;
    if (type) updateData.type = type;
    if (category) updateData.category = category;
    if (amount) updateData.amount = parseFloat(amount);
    if (description) updateData.description = description;
    if (gym) updateData.gym = gym;
    if (gymId) updateData.gymId = gymId;
    if (employeeId) updateData.employeeId = employeeId;
    if (status) updateData.status = status;
    if (salaryBreakdown) updateData.salaryBreakdown = salaryBreakdown;

    const transaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true })
      .populate('employeeId', 'name email employeeId')
      .populate('gymId', 'name location')
      .populate('createdBy', 'name email');

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: "Error updating transaction", error: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);
    
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: "Error deleting transaction", error: error.message });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id)
      .populate('employeeId', 'name email employeeId')
      .populate('gymId', 'name location')
      .populate('createdBy', 'name email');
    
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: "Error fetching transaction", error: error.message });
  }
};

// Get financial summary/dashboard data
const getFinancialSummary = async (req, res) => {
  try {
    const { gym, startDate, endDate } = req.query;
    
    // Build filter
    const filter = {};
    if (gym && gym !== 'All') filter.gym = gym;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    // Get summary by type
    const typeSummary = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get summary by category
    const categorySummary = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get monthly trends
    const monthlyTrends = await Transaction.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type'
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    const summary = {
      totalIncome: typeSummary.find(s => s._id === 'Income')?.total || 0,
      totalExpense: typeSummary.find(s => s._id === 'Expense')?.total || 0,
      incomeCount: typeSummary.find(s => s._id === 'Income')?.count || 0,
      expenseCount: typeSummary.find(s => s._id === 'Expense')?.count || 0,
    };
    
    summary.balance = summary.totalIncome - summary.totalExpense;
    
    res.status(200).json({
      summary,
      categorySummary,
      monthlyTrends
    });
  } catch (error) {
    console.error('Error fetching financial summary:', error);
    res.status(500).json({ message: "Error fetching financial summary", error: error.message });
  }
};

module.exports = {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getFinancialSummary,
};
