import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import { Plus, DollarSign, TrendingDown, TrendingUp, Calendar, FileText, Edit3, Trash2, X, Tag, Loader2, Eye, Settings, Users } from "lucide-react";
import financeService from "../../services/financeService";
import gymServices from "../../services/gymServices";
import { useAuth } from "../../contexts/AuthContext";

const SalaryManagement = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainersLoading, setTrainersLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSalaryForm, setShowSalaryForm] = useState(false);
  const [showSalaryDetails, setShowSalaryDetails] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [selectedTrainerDetails, setSelectedTrainerDetails] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    type: "Expense",
    category: "Salary",
    amount: "",
    description: "",
    gym: user?.user_type === 'Gym' ? (user?.gymName || 'My Gym') : "",
    trainerId: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [selectedGym, setSelectedGym] = useState(user?.user_type === 'Gym' ? user?.gymName || 'My Gym' : 'All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [gyms, setGyms] = useState([]);
  
  const isAdmin = user?.user_type === 'Admin';
  const isGymOwner = user?.user_type === 'Gym';

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
    if (isAdmin) {
      fetchGyms();
    } else if (isGymOwner) {
      // For gym owners, automatically load their trainers
      fetchTrainersByGym();
    }
  }, []);

  // Fetch all trainers when gyms are loaded and "All" is selected
  useEffect(() => {
    if (isAdmin && selectedGym === 'All' && gyms.length > 0) {
      fetchAllTrainers();
    }
  }, [gyms, isAdmin, selectedGym]);

  // Refetch transactions when gym filter changes
  useEffect(() => {
    fetchTransactions();
    if (selectedGym && selectedGym !== 'All') {
      fetchTrainersByGym();
    } else if (isAdmin && selectedGym === 'All' && gyms.length > 0) {
      fetchAllTrainers();
    }
  }, [selectedGym, gyms]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {
        type: "Expense",
        category: "Salary"
      };
      if (selectedGym && selectedGym !== 'All') {
        filters.gym = selectedGym;
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

  const fetchGyms = async () => {
    try {
      const response = await gymServices.getAllGyms();
      setGyms(response.gyms || []);
    } catch (err) {
      console.error('Error fetching gyms:', err);
    }
  };

  const fetchAllTrainers = async () => {
    try {
      setTrainersLoading(true);
      // Fetch trainers from all gyms
      const allTrainers = [];
      
      for (const gym of gyms) {
        try {
          const response = await gymServices.getTrainersByGym(gym._id);
          const trainersWithGym = (response.trainers || []).map(trainer => ({
            ...trainer,
            gymName: gym.name
          }));
          allTrainers.push(...trainersWithGym);
        } catch (err) {
          console.error(`Error fetching trainers for gym ${gym.name}:`, err);
        }
      }
      
      setTrainers(allTrainers);
    } catch (err) {
      console.error('Error fetching all trainers:', err);
      setTrainers([]);
    } finally {
      setTrainersLoading(false);
    }
  };

  const fetchTrainersByGym = async () => {
    try {
      setTrainersLoading(true);
      let gymId = null;
      
      if (isGymOwner) {
        // For gym owners, use their gym ID
        gymId = user?.gymId || 'default-gym-id';
      } else if (isAdmin) {
        // For admin, find the selected gym
        const selectedGymData = gyms.find(gym => gym.name === selectedGym);
        gymId = selectedGymData?._id;
      }
      
      if (gymId) {
        const response = await gymServices.getTrainersByGym(gymId);
        setTrainers(response.trainers || []);
      }
    } catch (err) {
      console.error('Error fetching trainers by gym:', err);
      setTrainers([]);
    } finally {
      setTrainersLoading(false);
    }
  };

  // Get detailed salary information for a trainer
  const getTrainerSalaryDetails = async (trainer) => {
    try {
      // Mock detailed salary data - in real implementation, this would fetch from API
      const salaryDetails = {
        trainerId: trainer.id,
        trainerName: trainer.name,
        monthlySalary: trainer.salary || 25000,
        hourlyRate: Math.round((trainer.salary || 25000) / 160), // Assuming 160 hours per month
        currentMonthEarnings: Math.round((trainer.salary || 25000) * 0.9), // 90% of monthly salary
        baseSalary: Math.round((trainer.salary || 25000) * 0.8), // 80% base
        performanceBonus: Math.round((trainer.salary || 25000) * 0.15), // 15% bonus
        clientCommissions: Math.round((trainer.salary || 25000) * 0.05), // 5% commission
        paymentHistory: [
          {
            period: "November 2024",
            amount: trainer.salary || 25000,
            date: "2024-11-30",
            status: "Pending"
          },
          {
            period: "October 2024",
            amount: trainer.salary || 25000,
            date: "2024-10-31",
            status: "Paid"
          },
          {
            period: "September 2024",
            amount: (trainer.salary || 25000) - 1000,
            date: "2024-09-30",
            status: "Paid"
          }
        ]
      };
      setSelectedTrainerDetails(salaryDetails);
      setShowSalaryDetails(true);
    } catch (error) {
      console.error('Error fetching trainer salary details:', error);
    }
  };

  // Handle salary setting for trainers (Gym owner functionality)
  const handleSetSalary = async (trainerId, newSalary) => {
    try {
      setSubmitting(true);
      // Update trainer salary in backend - salary is nested in profile
      await gymServices.updateTrainer(trainerId, {
        profile: { salary: newSalary }
      });
      // Refresh trainers list
      await fetchTrainersByGym();
    } catch (err) {
      console.error('Error setting salary:', err);
      setError('Failed to set salary. Please try again.');
    } finally {
      setSubmitting(false);
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
      setFormData({
        date: "",
        type: "Expense",
        category: "Salary",
        amount: "",
        description: "",
        gym: user?.user_type === 'Gym' ? (user?.gymName || 'My Gym') : "",
        trainerId: ""
      });
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

  // Compute last payment date from transactions for each trainer
  const lastPaymentDates = useMemo(() => {
    const dateMap = {};
    // Sort transactions by date descending to get the most recent first
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    sortedTransactions.forEach(transaction => {
      if (transaction.trainerId && !dateMap[transaction.trainerId]) {
        dateMap[transaction.trainerId] = transaction.date;
      }
    });
    return dateMap;
  }, [transactions]);

  // Filter trainers based on month and year (using computed lastPaymentDate or createdAt)
  const filteredTrainers = trainers.filter((trainer) => {
    let dateMatch = true;

    // Use computed lastPaymentDate if available, otherwise use createdAt (joining date)
    const trainerDate = lastPaymentDates[trainer.id] ? new Date(lastPaymentDates[trainer.id]) : new Date(trainer.createdAt);

    // Month filter
    if (selectedMonth !== 'All') {
      dateMatch = dateMatch && trainerDate.getMonth() === parseInt(selectedMonth);
    }

    // Year filter
    if (selectedYear !== 'All') {
      dateMatch = dateMatch && trainerDate.getFullYear() === parseInt(selectedYear);
    }

    return dateMatch;
  });

  // Summary calculations
  const totalExpense = filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  // Calculate trainer-based totals when showing trainers (use filtered trainers)
  const totalTrainerSalaries = filteredTrainers.reduce((acc, trainer) => acc + (trainer.salary || 25000), 0);
  const trainerCount = filteredTrainers.length;

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
            Add Salary
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
            {isAdmin && (
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
            )}
            {isGymOwner && (
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold text-foreground">Your Gym:</label>
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2 rounded-xl font-medium">
                  {user?.gymName || 'My Gym'}
                </div>
              </div>
            )}
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
              <h2 className="text-lg font-semibold text-foreground">
                Total Monthly Salaries
              </h2>
            </div>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              ₹{((selectedGym !== 'All' || isGymOwner) ? totalTrainerSalaries : totalExpense).toLocaleString()}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-700/20 dark:border-blue-600/30 p-6 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <Tag className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-foreground">
                Total Trainers
              </h2>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {trainerCount}
            </p>
          </motion.div>
        </motion.div>

        {/* Trainers/Salary Table */}
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
                  S.No.
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold  items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Employee ID
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold  items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Payment Date
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold  items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Salary
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainersLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                      <span className="text-lg">Loading trainers...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredTrainers.length > 0 ? (
                filteredTrainers.map((trainer, index) => (
                  <motion.tr
                    key={trainer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-b border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-foreground">{index + 1}</td>
                    <td className="px-6 py-4 text-foreground">{trainer.employeeId}</td>
                    <td className="px-6 py-4 text-foreground font-medium">
                      {trainer.name}
                      {selectedGym === 'All' && trainer.gymName && (
                        <div className="text-xs text-muted-foreground">({trainer.gymName})</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground">{lastPaymentDates[trainer.id] ? formatDate(lastPaymentDates[trainer.id]) : 'Not Paid'}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">₹{trainer.salary?.toLocaleString() || '25,000'}</td>
                    <td className="px-6 py-4 text-foreground">{trainer.mobile || 'N/A'}</td>
                    <td className="px-6 py-4 flex gap-2">
                      {isGymOwner && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setEditingTrainer(trainer);
                            setShowSalaryForm(true);
                          }}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm font-medium"
                        >
                          <Settings className="w-4 h-4" />
                          Set Salary
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            gym: isGymOwner ? (user?.gymName || 'My Gym') : selectedGym,
                            trainerId: trainer.id,
                            description: `Salary for ${trainer.name} - ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`,
                            amount: trainer.salary || 25000
                          });
                          setShowForm(true);
                        }}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm font-medium"
                      >
                        <DollarSign className="w-4 h-4" />
                        Pay Salary
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => getTrainerSalaryDetails(trainer)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <DollarSign className="w-8 h-8 text-muted-foreground/50" />
                      <span className="text-lg">No trainers found.</span>
                      <span className="text-sm">
                        {(selectedMonth !== 'All' || selectedYear !== 'All')
                          ? 'No trainers found for the selected time period. Try adjusting the month/year filters.'
                          : selectedGym === 'All'
                            ? 'No trainers found across all gyms.'
                            : 'Select a different gym or add trainers to this gym.'
                        }
                      </span>
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
            <span className="font-medium">
              {selectedGym === 'All'
                ? `${filteredTrainers.length} trainers across all gyms`
                : `${filteredTrainers.length} trainers in ${selectedGym}`
              }
            </span>
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
                {editingTransaction ? "Edit Salary " : "Add Salary "}
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
              {/* Gym field - only show for Admin users */}
              {isAdmin && (
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
              )}
              
              {/* Hidden gym field for Gym owners - automatically populated */}
              {isGymOwner && (
                <input
                  type="hidden"
                  name="gym"
                  value={formData.gym}
                />
              )}
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

      {/* Salary Setting Form Modal for Gym Owners */}
      {showSalaryForm && editingTrainer && (
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
                <Settings className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                Set Salary for {editingTrainer.name}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowSalaryForm(false);
                  setEditingTrainer(null);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newSalary = parseInt(formData.get('salary'));
              await handleSetSalary(editingTrainer.id, newSalary);
              setShowSalaryForm(false);
              setEditingTrainer(null);
            }} className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Salary: ₹{editingTrainer.salary?.toLocaleString() || '25,000'}
                </label>
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  name="salary"
                  placeholder="Enter new salary amount"
                  defaultValue={editingTrainer.salary || 25000}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                  min="1000"
                  step="1000"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setShowSalaryForm(false);
                    setEditingTrainer(null);
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
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
                  {submitting ? "Setting..." : "Set Salary"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Salary Details Modal */}
      {showSalaryDetails && selectedTrainerDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-teal-500 dark:text-teal-400" />
                  Salary Details - {selectedTrainerDetails.trainerName}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowSalaryDetails(false);
                    setSelectedTrainerDetails(null);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* Current Salary Overview */}
                <div className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Current Salary Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Monthly Salary</p>
                      <p className="text-3xl font-bold text-teal-500">₹{selectedTrainerDetails.monthlySalary.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                      <p className="text-3xl font-bold text-teal-500">₹{selectedTrainerDetails.hourlyRate}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">This Month Earnings</p>
                      <p className="text-3xl font-bold text-teal-500">₹{selectedTrainerDetails.currentMonthEarnings.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Salary Breakdown */}
                <div className=" bg-background border border-border p-6 rounded-2xl ">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Salary Breakdown</h3>
                  <div className="space-y-4 flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch ">
                    <div className=" justify-between items-center p-4 rounded-lg bg-gradient-to-r from-green-900/10 to-green-800/5 dark:from-green-900/20 dark:to-green-800/10 border border-green-700/20">
                      <div className="items-center gap-3">
                        <Calendar className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Base Salary</span>
                      </div>
                      <span className="font-bold text-green-600">₹{selectedTrainerDetails.baseSalary.toLocaleString()}</span>
                    </div>
                    <div className="justify-between items-center p-4 rounded-lg bg-gradient-to-r from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-700/20">
                      <div className="items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">Performance Bonus</span>
                      </div>
                      <span className="font-bold text-blue-600">₹{selectedTrainerDetails.performanceBonus.toLocaleString()}</span>
                    </div>
                    <div className="justify-between items-center p-4 rounded-lg bg-gradient-to-r from-purple-900/10 to-purple-800/5 dark:from-purple-900/20 dark:to-purple-800/10 border border-purple-700/20">
                      <div className="items-center gap-3">
                        <Users className="h-5 w-5 text-purple-500" />
                        <span className="font-medium">Client Commissions</span>
                      </div>
                      <span className="font-bold text-purple-600">₹{selectedTrainerDetails.clientCommissions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment History */}
                <div className="bg-background border border-border p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Payment History</h3>
                  <div className="space-y-3">
                    {selectedTrainerDetails.paymentHistory.map((payment, index) => (
                      <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-gray-900/5 to-gray-800/5 dark:from-gray-900/10 dark:to-gray-800/10 border border-gray-700/20">
                        <div>
                          <p className="font-medium text-foreground">{payment.period}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(payment.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">₹{payment.amount.toLocaleString()}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === "Paid"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
   </Layout>
  );
};

export default SalaryManagement;
