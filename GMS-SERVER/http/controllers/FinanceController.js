const Transaction = require("../../models/TransactionModel");

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error: error.message });
  }
};

// Add transaction
const addTransaction = async (req, res) => {
  try {
    const { date, type, amount, description } = req.body;
    const transaction = new Transaction({ date, type, amount, description });
    await transaction.save();
    res.status(201).json({ message: "Transaction added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error: error.message });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, type, amount, description } = req.body;
    await Transaction.findByIdAndUpdate(id, { date, type, amount, description });
    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error: error.message });
  }
};

module.exports = {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
