import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import { Plus, DollarSign, TrendingUp, TrendingDown, Calendar, FileText, Edit3, Trash2, X, Tag, Loader2, Eye } from "lucide-react";
import financeService from "../../services/financeService";
import { useLocation } from "react-router-dom";

const Finance = () => {
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({ date: "", type: "Income", category: "Other", amount: "", description: "", gym: "" });
  const [submitting, setSubmitting] = useState(false);

  // Format date to DD/MM/YY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  // Determine current view based on path
  const getCurrentView = () => {
    if (location.pathname === "/finance/salary") return "salary";
    if (location.pathname === "/finance/expense") return "expense";
    return "all";
  };

  const currentView = getCurrentView();

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {};
      if (currentView === "salary") {
        filters.category = "Salary";
        filters.type = "Expense";
      } else if (currentView === "expense") {
        filters.type = "Expense";
      }
      
      const response = await financeService.getAllTransactions(filters);
      setTransactions(response.transactions || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add / Update transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingTransaction) {
        await financeService.updateTransaction(editingTransaction._id, formData);
        await fetchTransactions(); // Refresh data
        setEditingTransaction(null);
      } else {
        await financeService.addTransaction(formData);
        await fetchTransactions(); // Refresh data
      }
      setFormData({ date: "", type: "Income", category: "Other", amount: "", description: "", gym: "" });
      setShowForm(false);
    } catch (err) {
      console.error('Error submitting transaction:', err);
      setError('Failed to save transaction. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Edit
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData(transaction);
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await financeService.deleteTransaction(id);
        await fetchTransactions(); // Refresh data
      } catch (err) {
        console.error('Error deleting transaction:', err);
        setError('Failed to delete transaction. Please try again.');
      }
    }
  };

  // Filter transactions based on current view
  const filteredTransactions = transactions.filter((t) => {
    if (currentView === "salary" || currentView === "expense") {
      return t.type === "Expense";
    }
    return true;
  });

  // Summary based on filtered transactions
  const totalIncome = filteredTransactions.filter((t) => t.type === "Income").reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = filteredTransactions.filter((t) => t.type === "Expense").reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  // Get title and description based on current view
  const getTitle = () => {
    switch (currentView) {
      case "salary":
        return "Salary Management";
      case "expense":
        return "Expense Management";
      default:
        return "Finance Management";
    }
  };

  const getDescription = () => {
    switch (currentView) {
      case "salary":
        return "Track and manage trainer salaries and related expenses";
      case "expense":
        return "Monitor and manage all gym expenses";
      default:
        return "Track your gym's financial transactions and performance";
    }
  };

  return (
   <Layout>
     <div className="min-h-screen bg-background text-foreground py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-extrabold mb-3 text-foreground tracking-tight">
              <DollarSign className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
              {getTitle().split(' ')[0]}<span className="text-teal-500 dark:text-teal-400"> {getTitle().split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-muted-foreground text-lg">{getDescription()}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </motion.button>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-900/10 to-green-800/5 dark:from-green-900/20 dark:to-green-800/10 border border-green-700/20 dark:border-green-600/30 p-6 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-green-500 dark:text-green-400" />
              <h2 className="text-lg font-semibold text-foreground">Total Income</h2>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{totalIncome.toLocaleString()}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-red-900/10 to-red-800/5 dark:from-red-900/20 dark:to-red-800/10 border border-red-700/20 dark:border-red-600/30 p-6 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-6 h-6 text-red-500 dark:text-red-400" />
              <h2 className="text-lg font-semibold text-foreground">Total Expense</h2>
            </div>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">₹{totalExpense.toLocaleString()}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-700/20 dark:border-blue-600/30' : 'from-orange-900/10 to-orange-800/5 dark:from-orange-900/20 dark:to-orange-800/10 border-orange-700/20 dark:border-orange-600/30'} p-6 rounded-2xl shadow-xl`}
          >
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className={`w-6 h-6 ${balance >= 0 ? 'text-blue-500 dark:text-blue-400' : 'text-orange-500 dark:text-orange-400'}`} />
              <h2 className="text-lg font-semibold text-foreground">Balance</h2>
            </div>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>₹{balance.toLocaleString()}</p>
          </motion.div>
        </motion.div>

        {/* Finance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="overflow-x-auto bg-background border border-border rounded-2xl shadow-xl "
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-teal-600 to-teal-500 w-full  ">
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold  items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold  items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Type
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold  items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold  items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </th>
                <th className="px-6 pl-40 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                      <span className="text-lg">Loading transactions...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-red-500">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg">{error}</span>
                      <button
                        onClick={fetchTransactions}
                        className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((t, index) => (
                  <motion.tr
                    key={t._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-b border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-foreground">{formatDate(t.date)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          t.type === "Income" ? "bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-600" : "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-600"
                        }`}
                      >
                        {t.type === "Income" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">₹{t.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-foreground">{t.description}</td>
                    <td className="px-6 py-4 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log('View transaction:', t)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <DollarSign className="w-8 h-8 text-muted-foreground/50" />
                      <span className="text-lg">No transactions found.</span>
                      <span className="text-sm">Add your first transaction to get started!</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 rounded-full px-4 py-2 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4 text-teal-500 dark:text-teal-400" />
          </div>
        </motion.div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background border border-border p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {editingTransaction ? <Edit3 className="w-5 h-5 text-teal-500 dark:text-teal-400" /> : <Plus className="w-5 h-5 text-teal-500 dark:text-teal-400" />}
                {editingTransaction ? "Edit Transaction" : "Add Transaction"}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowForm(false);
                  setEditingTransaction(null);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                >
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                >
                  <option value="Other">Other</option>
                  <option value="Salary">Salary</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Membership">Membership</option>
                  <option value="Training">Training</option>
                </select>
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTransaction(null);
                  }}
                  className="px-6 py-3 bg-muted text-muted-foreground rounded-xl hover:bg-muted/80 transition-all font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingTransaction ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                  {submitting ? "Saving..." : (editingTransaction ? "Update" : "Add")}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
   </Layout>
  );
};

export default Finance;
