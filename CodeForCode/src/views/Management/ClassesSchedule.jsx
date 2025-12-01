import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import {
  Plus,
  Calendar,
  Clock,
  Users,
  Edit3,
  Trash2,
  X,
  Filter,
  Search,
  MapPin,
  Dumbbell,
  Loader2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import gymServices from "../../services/gymServices";
import classService from "../../services/classService";
import trainerServices from "../../services/trainerServices";
import { useAuth } from "../../contexts/AuthContext";

const ClassesSchedule = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGym, setSelectedGym] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    trainerId: "",
    gymId: "",
    date: "",
    startTime: "",
    endTime: "",
    capacity: "",
    difficulty: "Beginner",
    category: "Fitness",
    status: "Active"
  });
  const [submitting, setSubmitting] = useState(false);

  const isAdmin = user?.user_type === 'Admin';
  const isGymOwner = user?.user_type === 'Gym';

  // Format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    if (user) {
      if (isGymOwner && user.gymId) {
        fetchClasses();
        fetchTrainers(user.gymId);
      } else if (isAdmin) {
        fetchClasses();
        fetchGyms();
        // For admins, don't fetch trainers initially, set empty
        setFilteredTrainers([]);
      }
    }
  }, [user]);

  // Refetch classes when gym filter changes
  useEffect(() => {
    fetchClasses();
  }, [selectedGym]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      let response;

      if (isAdmin && selectedGym !== 'All') {
        // Fetch classes for specific gym
        const gym = gyms.find(g => g.name === selectedGym);
        if (gym && gym._id) {
          response = await classService.getClassesByGym(gym._id);
        } else {
          response = await classService.getAllClasses();
        }
      } else if (isGymOwner && user.gymId) {
        // Fetch classes for current gym owner
        response = await classService.getClassesByGym(user.gymId);
      } else {
        // Fetch all classes for admin
        response = await classService.getAllClasses();
      }

      let filteredClasses = Array.isArray(response) ? response : [];

      // Apply status filter
      if (selectedStatus !== 'All') {
        filteredClasses = filteredClasses.filter(cls => cls.status === selectedStatus);
      }

      setClasses(filteredClasses);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setClasses([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainers = async (gymId = null) => {
    try {
      let response;
      if (isGymOwner) {
        // For gym owners, always fetch trainers for their gym
        response = await trainerServices.getTrainersByGym(user.gymId);
      } else if (gymId && isAdmin) {
        // For admins, fetch trainers for specific gym
        response = await trainerServices.getTrainersByGym(gymId);
      } else {
        // Fetch all trainers for admin
        response = await trainerServices.getAllTrainers();
      }

      const trainersData = response.trainers || [];
      setTrainers(trainersData);
      setFilteredTrainers(trainersData);
    } catch (err) {
      console.error('Error fetching trainers:', err);

      setTrainers([]);
      setFilteredTrainers([]);
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If gym selection changes, fetch trainers for that gym and clear trainer selection
    if (name === 'gymId' && value && isAdmin) {
      fetchTrainers(value);
      setFormData(prev => ({ ...prev, trainerId: "" })); // Clear trainer selection
    }
  };

  // Add / Update class
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const submitData = { ...formData };

      // For gym owners, ensure gymId is set
      if (isGymOwner && !submitData.gymId) {
        submitData.gymId = user.gymId;
      }

      if (editingClass) {
        // Update existing class
        await classService.updateClass(editingClass._id, submitData);
      } else {
        // Add new class
        await classService.addClass(submitData);
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        trainerId: "",
        gymId: "",
        date: "",
        startTime: "",
        endTime: "",
        capacity: "",
        difficulty: "Beginner",
        category: "Fitness",
        status: "Active"
      });
      setShowForm(false);
      setEditingClass(null);
      fetchClasses(); // Refresh data
    } catch (err) {
      console.error('Error submitting class:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Edit class
  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setFormData({
      name: classItem.name,
      description: classItem.description,
      trainerId: classItem.trainerId._id || classItem.trainerId,
      gymId: classItem.gymId._id || classItem.gymId,
      date: classItem.date,
      startTime: classItem.startTime,
      endTime: classItem.endTime,
      capacity: classItem.capacity,
      difficulty: classItem.difficulty,
      category: classItem.category,
      status: classItem.status
    });

    // For admins, fetch trainers for the class's gym
    if (isAdmin && classItem.gymId) {
      fetchTrainers(classItem.gymId._id || classItem.gymId);
    }

    setShowForm(true);
  };

  // Delete class
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await classService.deleteClass(id);
        fetchClasses(); // Refresh data
      } catch (err) {
        console.error('Error deleting class:', err);
      }
    }
  };

  // Filter classes based on search term
  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cls.trainerId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'Completed': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
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
                <Dumbbell className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
                Classes & <span className="text-teal-500 dark:text-teal-400">Schedules</span>
              </h1>
              <p className="text-muted-foreground text-lg">Manage gym classes and training schedules</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Class
            </motion.button>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all w-64"
                />
              </div>

              {/* Gym Filter */}
              {isAdmin && (
                <select
                  value={selectedGym}
                  onChange={(e) => setSelectedGym(e.target.value)}
                  className="bg-background border border-input text-foreground rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                >
                  <option value="All">All Gyms</option>
                  {gyms.map((gym) => (
                    <option key={gym._id} value={gym.name}>
                      {gym.name}
                    </option>
                  ))}
                </select>
              )}

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-background border border-input text-foreground rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </motion.div>

          {/* Classes Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                <span className="ml-2 text-lg">Loading classes...</span>
              </div>
            ) : filteredClasses.length > 0 ? (
              filteredClasses.map((classItem, index) => (
                <motion.div
                  key={classItem._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-background border border-border rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{classItem.name}</h3>
                      <p className="text-sm text-muted-foreground">{classItem.category} • {classItem.difficulty}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.status)}`}>
                      {classItem.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-teal-500" />
                      <span>{formatDate(classItem.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-teal-500" />
                      <span>{formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-teal-500" />
                      <span>{classItem.enrolled}/{classItem.capacity} enrolled</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-teal-500" />
                      <span>{classItem.gymId?.name || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Trainer */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground">Trainer: {classItem.trainerId?.name || 'N/A'}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(classItem)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(classItem._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Dumbbell className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No classes found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or add a new class.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Add/Edit Class Modal */}
        {showForm && (
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
              className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    {editingClass ? <Edit3 className="w-6 h-6 text-teal-500 dark:text-teal-400" /> : <Plus className="w-6 h-6 text-teal-500 dark:text-teal-400" />}
                    {editingClass ? "Edit Class" : "Add New Class"}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowForm(false);
                      setEditingClass(null);
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Class Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Class Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                        required
                      >
                        <option value="Fitness">Fitness</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Strength">Strength</option>
                        <option value="Dance">Dance</option>
                        <option value="Martial Arts">Martial Arts</option>
                      </select>
                    </div>

                    {/* Trainer */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Trainer *
                      </label>
                      <select
                        name="trainerId"
                        value={formData.trainerId}
                        onChange={handleChange}
                        className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                        required
                      >
                        <option value="">Select Trainer</option>
                        {(isAdmin ? filteredTrainers : trainers).map((trainer) => (
                          <option key={trainer._id} value={trainer._id}>
                            {trainer.name} - {trainer.specialization || trainer.expertise}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Gym */}
                    {isAdmin && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Gym *
                        </label>
                        <select
                          name="gymId"
                          value={formData.gymId}
                          onChange={handleChange}
                          className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                          required
                        >
                          <option value="">Select Gym</option>
                          {gyms.map((gym) => (
                            <option key={gym._id} value={gym._id}>
                              {gym.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Start Time */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Start Time *
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                        required
                      />
                    </div>

                    {/* End Time */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        End Time *
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Capacity */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Capacity *
                      </label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        min="1"
                        className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Difficulty */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Difficulty *
                      </label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                        required
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Describe the class..."
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingClass(null);
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
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingClass ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                      {submitting ? "Saving..." : (editingClass ? "Update Class" : "Add Class")}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default ClassesSchedule;
