import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";
import { Plus, DollarSign, TrendingDown, TrendingUp, Calendar, FileText, Edit3, Trash2, X, Tag, Loader2, Eye, Settings, Users } from "lucide-react";
import financeService from "../../services/financeService";
import gymServices from "../../services/gymServices";
import trainerServices from "../../services/trainerServices";
import { useAuth } from "../../contexts/AuthContext";


const SalaryManagement = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [trainersLoading, setTrainersLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSalaryForm, setShowSalaryForm] = useState(false);
  const [showSalaryDetails, setShowSalaryDetails] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [selectedTrainerDetails, setSelectedTrainerDetails] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    date: "",
    amount: "",
    description: "",
    status: "Completed",
    salaryBreakdown: {
      baseSalary: 0,
      performanceBonus: 0,
      clientCommissions: 0
    }
  });
  const [formData, setFormData] = useState({
    date: "",
    type: "Expense",
    category: "Salary",
    amount: "",
    description: "",
    gym: user?.user_type === 'Gym' ? (user?.gymName || 'My Gym') : "",
    trainerId: "",
    salaryBreakdown: {
      baseSalary: 0,
      performanceBonus: 0,
      clientCommissions: 0
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const [selectedGym, setSelectedGym] = useState(user?.user_type === 'Gym' ? user?.gymName || 'My Gym' : 'All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [gyms, setGyms] = useState([]);
  const [formTrainers, setFormTrainers] = useState([]);
  const [paymentDatesFromSalary, setPaymentDatesFromSalary] = useState({});
  const [trainerSalaries, setTrainerSalaries] = useState({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

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
    fetchGyms(); // Fetch gyms for both admin and gym owners
    if (isAdmin) {
      fetchAllTrainersForSalary();
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
    setCurrentPage(1); // Reset to first page when filters change
    fetchTransactions(1);
    if (selectedGym && selectedGym !== 'All') {
      fetchTrainersByGym();
    } else if (isAdmin && selectedGym === 'All' && gyms.length > 0) {
      fetchAllTrainers();
    }
  }, [selectedGym, gyms]);

  // Refetch transactions when month/year filters change
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
    fetchTransactions(1);
  }, [selectedMonth, selectedYear]);

  // Fetch form trainers when gym changes in form
  useEffect(() => {
    if (showForm && formData.gym) {
      fetchFormTrainers(formData.gym);
    }
  }, [formData.gym, showForm]);

  const fetchTransactions = async (page = currentPage) => {
    try {
      const filters = {
        type: "Expense",
        category: "Salary",
        page: page,
        limit: pageSize
      };
      if (selectedGym && selectedGym !== 'All') {
        filters.gym = selectedGym;
      }
      if (selectedMonth !== 'All') {
        filters.month = selectedMonth;
      }
      if (selectedYear !== 'All') {
        filters.year = selectedYear;
      }

      const response = await financeService.getAllTransactions(filters);
      setTransactions(response.transactions || []);
      setTotalPages(response.pagination?.total || 1);
      setTotalRecords(response.pagination?.totalRecords || 0);
      setHasNextPage(response.pagination?.current < response.pagination?.total);
      setHasPrevPage(response.pagination?.current > 1);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const fetchAllTrainers = async () => {
    try {
      setTrainersLoading(true);
      // Use the optimized getAllTrainers API instead of looping through gyms
      const response = await trainerServices.getAllTrainers();
      setTrainers(response || []);

      // Fetch salary details for each trainer to get payment dates and salaries
      const paymentDates = {};
      const salaries = {};
      for (const trainer of response || []) {
        try {
          const salaryDetails = await trainerServices.getTrainerSalaryDetails(trainer.id);
          if (salaryDetails.paymentHistory && salaryDetails.paymentHistory.length > 0) {
            // Get the most recent payment date
            const latestPayment = salaryDetails.paymentHistory.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
            paymentDates[trainer.id] = latestPayment.date;
          }
          // Store the monthly salary from salary details API
          salaries[trainer.id] = salaryDetails.monthlySalary;
        } catch (salaryErr) {
          console.error(`Error fetching salary details for trainer ${trainer.id}:`, salaryErr);
          // Continue with other trainers
        }
      }
      setPaymentDatesFromSalary(paymentDates);
      setTrainerSalaries(salaries);
    } catch (err) {
      console.error('Error fetching all trainers:', err);
      setTrainers([]);
    } finally {
      setTrainersLoading(false);
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

        // Fetch salary details for each trainer to get payment dates
        const paymentDates = {};
        for (const trainer of response.trainers || []) {
          try {
            const salaryDetails = await trainerServices.getTrainerSalaryDetails(trainer.id);
            if (salaryDetails.paymentHistory && salaryDetails.paymentHistory.length > 0) {
              // Get the most recent payment date
              const latestPayment = salaryDetails.paymentHistory.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
              paymentDates[trainer.id] = latestPayment.date;
            }
          } catch (salaryErr) {
            console.error(`Error fetching salary details for trainer ${trainer.id}:`, salaryErr);
            // Continue with other trainers
          }
        }
        setPaymentDatesFromSalary(paymentDates);
      }
    } catch (err) {
      console.error('Error fetching trainers by gym:', err);
      setTrainers([]);
    } finally {
      setTrainersLoading(false);
    }
  };

  const fetchAllTrainersForSalary = async () => {
    try {
      setTrainersLoading(true);
      const response = await trainerServices.getAllTrainersForSalary();
      setTrainers(response.trainers || []);
    } catch (err) {
      console.error('Error fetching all trainers for salary:', err);
      setTrainers([]);
    } finally {
      setTrainersLoading(false);
    }
  };

  const fetchFormTrainers = async (gymName) => {
    try {
      if (!gymName || gymName === '') return;

      if (isGymOwner) {
        // For gym owners, use their own trainers
        setFormTrainers(trainers);
      } else if (isAdmin) {
        // For admin, fetch trainers for the selected gym
        const selectedGymData = gyms.find(gym => gym.name === gymName);
        if (selectedGymData) {
          const response = await gymServices.getTrainersByGym(selectedGymData._id);
          setFormTrainers(response.trainers || []);
        }
      }
    } catch (err) {
      console.error('Error fetching form trainers:', err);
      setFormTrainers([]);
    }
  };

  // Get detailed salary information for a trainer
  const getTrainerSalaryDetails = async (trainer) => {
    try {
      const response = await trainerServices.getTrainerSalaryDetails(trainer.id);
      setSelectedTrainerDetails(response);
      setShowSalaryDetails(true);
    } catch (err) {
      console.error('Error fetching trainer salary details:', err);
    }
  };

  // Handle salary setting for trainers (Gym owner functionality)
  const handleSetSalary = async (trainerId, newSalary) => {
    try {
      setSubmitting(true);
      // Update trainer salary in backend - salary is nested in profile
      await gymServices.updateTrainer(trainerId, {
        salary: newSalary
      });
      // Refresh trainers list
      await fetchTrainersByGym();
    } catch (err) {
      console.error('Error setting salary:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add / Update transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Map trainerId to employeeId for database
      const submitData = { ...formData };
      if (submitData.trainerId) {
        submitData.employeeId = submitData.trainerId;
        delete submitData.trainerId;
      }

      if (editingTransaction) {
        // Update existing transaction
        await financeService.updateTransaction(editingTransaction._id, submitData);
        await fetchTransactions(); // Refresh data

        // Update trainer's salary if amount changed
        if (formData.trainerId && formData.amount && formData.amount !== editingTransaction.amount) {
          try {
            await gymServices.updateTrainer(formData.trainerId, {
              profile: { salary: parseInt(formData.amount) }
            });
          } catch (updateErr) {
            console.error('Error updating trainer salary:', updateErr);
            // Don't fail the whole operation if salary update fails
          }
        }

        setEditingTransaction(null);
      } else {
        // Add new transaction
        await financeService.addTransaction(submitData);
        await fetchTransactions(); // Refresh data

        // Update trainer's salary in profile if adding a new salary transaction
        if (formData.trainerId && formData.amount) {
          try {
            await gymServices.updateTrainer(formData.trainerId, {
              profile: { salary: parseInt(formData.amount) }
            });
          } catch (updateErr) {
            console.error('Error updating trainer salary:', updateErr);
            // Don't fail the whole operation if salary update fails
          }
        }
      }

      // Refresh trainers data to update salaries from database
      if (isAdmin) {
        await fetchAllTrainersForSalary();
      } else if (isGymOwner) {
        await fetchTrainersByGym();
      }

      setFormData({
        date: "",
        type: "Expense",
        category: "Salary",
        amount: "",
        description: "",
        gym: user?.user_type === 'Gym' ? (user?.gymName || 'My Gym') : "",
        trainerId: "",
        salaryBreakdown: {
          baseSalary: 0,
          performanceBonus: 0,
          clientCommissions: 0
        }
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error submitting transaction:', err);
    } finally {
      setSubmitting(false);
    }
  };



  // Delete payment from salary details
  const handleDeletePayment = async (payment) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        // Find the transaction by fetching all salary transactions and matching
        const filters = {
          type: "Expense",
          category: "Salary",
          limit: 10000 // Fetch all transactions to ensure we find the one to delete
        };
        const response = await financeService.getAllTransactions(filters);
        const transaction = response.transactions.find(t =>
          t.employeeId === selectedTrainerDetails.trainerId &&
          new Date(t.date).toDateString() === new Date(payment.date).toDateString() &&
          t.amount === payment.amount
        );
        if (transaction) {
          await financeService.deleteTransaction(transaction._id);
          // Refresh the trainer details
          if (selectedTrainerDetails) {
            const updatedResponse = await trainerServices.getTrainerSalaryDetails(selectedTrainerDetails.trainerId);
            setSelectedTrainerDetails(updatedResponse);
          }
          // Also refresh the transactions list to update summary
          await fetchTransactions();
        }
      } catch (err) {
        console.error('Error deleting payment:', err);
        setError('Failed to delete payment. Please try again.');
      }
    }
  };

  // Handle payment form change
  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPaymentFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setPaymentFormData({ ...paymentFormData, [name]: value });
    }
  };

  // Submit payment edit
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const submitData = { ...paymentFormData };
      if (editingPayment && editingPayment._id) {
        await financeService.updateTransaction(editingPayment._id, submitData);
        // Refresh the trainer details
        if (selectedTrainerDetails) {
          const response = await trainerServices.getTrainerSalaryDetails(selectedTrainerDetails.trainerId);
          setSelectedTrainerDetails(response);
        }
        setShowAddPaymentForm(false);
        setEditingPayment(null);
      }
    } catch (err) {
      console.error('Error updating payment:', err);
      setError('Failed to update payment. Please try again.');
    } finally {
      setSubmitting(false);
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



  // Filter trainers based on month and year (using payment date from salary details or createdAt)
  const filteredTrainers = trainers.filter((trainer) => {
    let dateMatch = true;

    // Use payment date from salary details if available, otherwise use createdAt (joining date)
    const trainerDate = paymentDatesFromSalary[trainer.id] ? new Date(paymentDatesFromSalary[trainer.id]) : new Date(trainer.createdAt);

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

  // Summary calculations - total monthly salaries should reflect the filtered data
  const totalMonthlySalaries = filteredTransactions
    .filter((t) => t.type === "Expense" && t.category === "Salary")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Calculate trainer-based totals when showing trainers (use filtered trainers for count)
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
              ₹{totalMonthlySalaries.toLocaleString()}
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
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainersLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-muted-foreground">
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
                    <td className="px-6 py-4 text-foreground">{(currentPage - 1) * pageSize + index + 1}</td>
                    <td className="px-6 py-4 text-foreground">{trainer.employeeId}</td>
                    <td className="px-6 py-4 text-foreground font-medium">
                      {trainer.name}
                      {selectedGym === 'All' && trainer.gymName && (
                        <div className="text-xs text-muted-foreground">({trainer.gymName})</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground">{paymentDatesFromSalary[trainer.id] ? formatDate(paymentDatesFromSalary[trainer.id]) : 'Not Paid'}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">₹{trainerSalaries[trainer.id]?.toLocaleString() || trainer.salary?.toLocaleString() || '25,000'}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => getTrainerSalaryDetails(trainer)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Salary
                      </motion.button>
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

                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-muted-foreground">
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex justify-center items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newPage = currentPage - 1;
                setCurrentPage(newPage);
                fetchTransactions(newPage);
              }}
              disabled={!hasPrevPage}
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              Previous
            </motion.button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <span className="text-sm text-muted-foreground">
                ({totalRecords} total records)
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newPage = currentPage + 1;
                setCurrentPage(newPage);
                fetchTransactions(newPage);
              }}
              disabled={!hasNextPage}
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              Next
            </motion.button>
          </motion.div>
        )}

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
              {/* Gym field - show for both Admin and Gym owners */}
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

              {/* Trainer field - show for both Admin and Gym owners */}
              <div className="relative">
                <select
                  name="trainerId"
                  value={formData.trainerId}
                  onChange={handleChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                  required
                >
                  <option value="">Select Trainer</option>
                  {formTrainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name} - {trainer.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary Breakdown Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Salary Breakdown</h3>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="salaryBreakdown.baseSalary"
                    placeholder="Base Salary"
                    value={formData.salaryBreakdown.baseSalary}
                    onChange={handleChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    min="0"
                  />
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="salaryBreakdown.performanceBonus"
                    placeholder="Performance Bonus"
                    value={formData.salaryBreakdown.performanceBonus}
                    onChange={handleChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    min="0"
                  />
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="salaryBreakdown.clientCommissions"
                    placeholder="Client Commissions"
                    value={formData.salaryBreakdown.clientCommissions}
                    onChange={handleChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    min="0"
                  />
                </div>
              </div>

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

      {/* Edit Payment Modal */}
      {showAddPaymentForm && editingPayment && (
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
                <Edit3 className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                Edit Payment
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowAddPaymentForm(false);
                  setEditingPayment(null);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={paymentFormData.date}
                  onChange={handlePaymentFormChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  name="amount"
                  placeholder="Payment Amount"
                  value={paymentFormData.amount}
                  onChange={handlePaymentFormChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="description"
                  placeholder="Payment Description"
                  value={paymentFormData.description}
                  onChange={handlePaymentFormChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <select
                  name="status"
                  value={paymentFormData.status}
                  onChange={handlePaymentFormChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                  required
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              {/* Salary Breakdown Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Salary Breakdown</h3>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="salaryBreakdown.baseSalary"
                    placeholder="Base Salary"
                    value={paymentFormData.salaryBreakdown.baseSalary}
                    onChange={handlePaymentFormChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    min="0"
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="salaryBreakdown.performanceBonus"
                    placeholder="Performance Bonus"
                    value={paymentFormData.salaryBreakdown.performanceBonus}
                    onChange={handlePaymentFormChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    min="0"
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="salaryBreakdown.clientCommissions"
                    placeholder="Client Commissions"
                    value={paymentFormData.salaryBreakdown.clientCommissions}
                    onChange={handlePaymentFormChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setShowAddPaymentForm(false);
                    setEditingPayment(null);
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
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit3 className="w-4 h-4" />}
                  {submitting ? "Updating..." : "Update Payment"}
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
                {/* Trainer Details Section */}
                <div className="bg-gradient-to-br from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-700/20 dark:border-blue-600/30 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                    Trainer Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold text-foreground">{selectedTrainerDetails.trainerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Tag className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Employee ID</p>
                        <p className="font-semibold text-foreground">{selectedTrainerDetails.employeeId || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">{selectedTrainerDetails.email || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Settings className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-semibold text-foreground">{selectedTrainerDetails.phone || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Joining Date</p>
                        <p className="font-semibold text-foreground">{selectedTrainerDetails.joiningDate ? formatDate(selectedTrainerDetails.joiningDate) : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gym</p>
                        <p className="font-semibold text-foreground">{selectedTrainerDetails.gymName || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

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
                        <div className="text-right flex items-center gap-3">
                          <div>
                            <p className="font-bold text-foreground">₹{payment.amount.toLocaleString()}</p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === "Paid"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            }`}>
                              {payment.status}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setEditingPayment(payment);
                                setPaymentFormData({
                                  date: payment.date.split('T')[0],
                                  amount: payment.amount,
                                  description: payment.description || '',
                                  status: payment.status,
                                  salaryBreakdown: payment.salaryBreakdown || {
                                    baseSalary: 0,
                                    performanceBonus: 0,
                                    clientCommissions: 0
                                  }
                                });
                                setShowAddPaymentForm(true);
                              }}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg transition-all shadow-md flex items-center gap-1 text-sm font-medium"
                            >
                              <Edit3 className="w-3 h-3" />
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeletePayment(payment)}
                              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg transition-all shadow-md flex items-center gap-1 text-sm font-medium"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </motion.button>
                          </div>
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

      {/* Edit Payment Modal */}
      {showAddPaymentForm && editingPayment && (
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
                <Edit3 className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                Edit Payment
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowAddPaymentForm(false);
                  setEditingPayment(null);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={paymentFormData.date}
                  onChange={handlePaymentFormChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  name="amount"
                  placeholder="Payment Amount"
                  value={paymentFormData.amount}
                  onChange={handlePaymentFormChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="description"
                  placeholder="Payment Description"
                  value={paymentFormData.description}
                  onChange={handlePaymentFormChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <select
                  name="status"
                  value={paymentFormData.status}
                  onChange={handlePaymentFormChange}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                  required
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              {/* Salary Breakdown Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Salary Breakdown</h3>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="salaryBreakdown.baseSalary"
                    placeholder="Base Salary"
                    value={paymentFormData.salaryBreakdown.baseSalary}
                    onChange={handlePaymentFormChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    min="0"
                  />
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="salaryBreakdown.performanceBonus"
                    placeholder="Performance Bonus"
                    value={paymentFormData.salaryBreakdown.performanceBonus}
                    onChange={handlePaymentFormChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    min="0"
                  />
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="salaryBreakdown.clientCommissions"
                    placeholder="Client Commissions"
                    value={paymentFormData.salaryBreakdown.clientCommissions}
                    onChange={handlePaymentFormChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setShowAddPaymentForm(false);
                    setEditingPayment(null);
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
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit3 className="w-4 h-4" />}
                  {submitting ? "Updating..." : "Update Payment"}
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
