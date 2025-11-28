import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import { Plus, DollarSign, TrendingDown, Calendar, FileText, Edit3, Trash2, X, Tag, Loader2, Eye } from "lucide-react";
import financeService from "../../services/financeService";
import gymServices from "../../services/gymServices";

const SalaryManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({ date: "", type: "Expense", amount: "", description: "", gym: "" });
  const [submitting, setSubmitting] = useState(false);
  const [selectedGym, setSelectedGym] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [gyms, setGyms] = useState([]);

  // Format date to DD/MM/YY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  // Fetch transactions and gyms on component mount
  useEffect(() => {
    fetchTransactions();
    fetchGyms();
  }, []);

  // Refetch transactions when gym filter changes
  useEffect(() => {
    fetchTransactions();
  }, [selectedGym]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await financeService.getAllTransactions(selectedGym);
      // Filter to show only expense transactions (salaries are expenses)
      setTransactions(response.transactions?.filter(t => t.type === "Expense") || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGyms = async () => {
    try {
      const response = await gymServices.getAllGyms();
      setGyms(response.gyms || []);
    } catch (err) {
      console.error('Error fetching gyms:', err);
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
      setFormData({ date: "", type: "Expense", amount: "", description: "" });
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

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter((t) => {
    // Gym filter
    const gymMatch = selectedGym === 'All' || t.gym === selectedGym;

    // Date filter
    let dateMatch = true;
    const transactionDate = new Date(t.date);

    // Month filter
    if (selectedMonth !== 'All') {
      dateMatch = dateMatch && transactionDate.getMonth() === parseInt(selectedMonth);
    }

    // Year filter
    if (selectedYear !== 'All') {
      dateMatch = dateMatch && transactionDate.getFullYear() === parseInt(selectedYear);
    }



    return gymMatch && dateMatch;
  });

  // Summary calculations
  const totalExpense = filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);

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
              Salary<span className="text-teal-500 dark:text-teal-400"> Management</span>
            </h1>
            <p className="text-muted-foreground text-lg">Track and manage trainer salaries and related expenses</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Salary Expense
          </motion.button>
        </motion.div>

        {/* Gym and Date Selection Dropdowns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <label htmlFor="gym-select" className="text-lg font-semibold text-foreground">Select Gym:</label>
              <select
                id="gym-select"
                value={selectedGym}
                onChange={(e) => setSelectedGym(e.target.value)}
                className="bg-background border border-input text-foreground rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              >
                <option value="All">All Gyms</option>
                {gyms.map((gym) => (
                  <option key={gym._id} value={gym.name}>{gym.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold text-foreground">Filter by Month:</label>
              <select
                id="month-filter"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-background border border-input text-foreground rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              >
                <option value="All">All Months</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold text-foreground">Filter by Year:</label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-background border border-input text-foreground rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              >
                <option value="All">All Years</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year.toString()}>{year}</option>;
                })}
              </select>
            </div>


          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-red-900/10 to-red-800/5 dark:from-red-900/20 dark:to-red-800/10 border border-red-700/20 dark:border-red-600/30 p-6 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-6 h-6 text-red-500 dark:text-red-400" />
              <h2 className="text-lg font-semibold text-foreground">Total Salary Expenses</h2>
            </div>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">₹{totalExpense.toLocaleString()}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-700/20 dark:border-blue-600/30 p-6 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <Tag className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-foreground">Salary Transactions</h2>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{filteredTransactions.length}</p>
          </motion.div>
        </motion.div>

        {/* Salary Table */}
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
                  <Tag className="w-4 h-4" />
                  Employee No.
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold  items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Employee Id
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-white font-semibold  items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Salary
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
                      <span className="text-lg">Loading salary transactions...</span>
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
                    <td className="px-6 py-4 text-foreground">{index + 1}</td>
                    <td className="px-6 py-4 text-foreground">EMP{String(index + 1).padStart(3, '0')}</td>
                    <td className="px-6 py-4 text-foreground">{formatDate(t.date)}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">₹{t.amount.toLocaleString()}</td>
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
                      <span className="text-lg">No salary transactions found.</span>
                      <span className="text-sm">Add your first salary expense to get started!</span>
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
            <span className="font-medium">{filteredTransactions.length} salary transactions</span>
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
                {editingTransaction ? "Edit Salary Expense" : "Add Salary Expense"}
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
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                  disabled
                >
                  <option>Expense</option>
                </select>
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  name="amount"
                  placeholder="Salary Amount"
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
                  placeholder="Salary Description (e.g., Trainer Name - Month)"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <select
                  name="gym"
                  value={formData.gym}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                  required
                >
                  <option value="">Select Gym</option>
                  {gyms.map((gym) => (
                    <option key={gym._id} value={gym.name}>{gym.name}</option>
                  ))}
                </select>
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

export default SalaryManagement;
