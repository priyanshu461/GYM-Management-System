import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import {
  Plus, Building2, CheckCircle, XCircle, BarChart3, PieChart, Edit3, Trash2, X,
  Dumbbell, Activity, Heart, Users, Loader2
} from "lucide-react";
import {
  PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import facilitiesService from "../../services/facilitiesService";

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [formData, setFormData] = useState({
    name: "", type: "", status: "Available", usage: 0
  });

  // Fetch facilities on component mount
  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const response = await facilitiesService.getAllFacilities();
      setFacilities(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch facilities');
      console.error('Error fetching facilities:', err);
    } finally {
      setLoading(false);
    }
  };

  // Input change handler
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add or Update facility
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFacility) {
        await facilitiesService.updateFacility(editingFacility._id, formData);
        await fetchFacilities(); // Refresh the list
      } else {
        await facilitiesService.addFacility(formData);
        await fetchFacilities(); // Refresh the list
      }
      setEditingFacility(null);
      setFormData({ name: "", type: "", status: "Available", usage: 0 });
      setShowForm(false);
    } catch (err) {
      console.error('Error saving facility:', err);
      setError('Failed to save facility');
    }
  };

  // Edit
  const handleEdit = (facility) => {
    setEditingFacility(facility);
    setFormData(facility);
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await facilitiesService.deleteFacility(id);
      await fetchFacilities(); // Refresh the list
    } catch (err) {
      console.error('Error deleting facility:', err);
      setError('Failed to delete facility');
    }
  };

  // Chart Data
  const statusData = [
    { name: "Available", value: facilities.filter(f => f.status === "Available").length },
    { name: "Unavailable", value: facilities.filter(f => f.status === "Unavailable").length },
  ];
  const usageData = facilities.map(f => ({ name: f.name, usage: f.usage }));

  const COLORS = ["#10B981", "#EF4444"];

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'cardio': return <Activity className="w-4 h-4" />;
      case 'strength': return <Dumbbell className="w-4 h-4" />;
      case 'wellness': return <Heart className="w-4 h-4" />;
      case 'recreation': return <Users className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
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
                <Building2 className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
                Facilities<span className="text-teal-500 dark:text-teal-400"> Management</span>
              </h1>
              <p className="text-muted-foreground text-lg">Monitor and manage your gym's equipment and facilities</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Facility
            </motion.button>
          </motion.div>

          {/* Dashboard Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-6 h-6 text-teal-500 dark:text-teal-400" />
                <h3 className="text-lg font-semibold text-foreground">Total Facilities</h3>
              </div>
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{facilities.length}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-900/10 to-green-800/5 dark:from-green-900/20 dark:to-green-800/10 border border-green-700/20 dark:border-green-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-foreground">Available</h3>
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {facilities.filter(f => f.status === "Available").length}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-red-900/10 to-red-800/5 dark:from-red-900/20 dark:to-red-800/10 border border-red-700/20 dark:border-red-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
                <h3 className="text-lg font-semibold text-foreground">Unavailable</h3>
              </div>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {facilities.filter(f => f.status === "Unavailable").length}
              </p>
            </motion.div>
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                <h3 className="text-lg font-semibold text-foreground">Facility Status</h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie data={statusData} dataKey="value" outerRadius={80} fill="#8884d8" label>
                    {statusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                <h3 className="text-lg font-semibold text-foreground">Facility Usage (%)</h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          {/* Loading and Error States */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center py-12"
            >
              <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
              <span className="ml-2 text-muted-foreground">Loading facilities...</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-8"
            >
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 dark:text-red-400 font-medium">{error}</span>
              </div>
            </motion.div>
          )}

          {/* Facilities Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="overflow-x-auto bg-background border border-border rounded-2xl shadow-xl"
          >
            <table className="w-full text-left border-collapse">
              <thead className="bg-gradient-to-r from-teal-600 to-teal-500">
                <tr>
                  <th className="px-6 py-4 text-white font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Facility Name
                  </th>
                  <th className="px-6 py-4 text-white font-semibold">Type</th>
                  <th className="px-6 py-4 text-white font-semibold">Status</th>
                  <th className="px-6 py-4 text-white font-semibold">Usage %</th>
                  <th className="px-6 py-4 text-white font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {facilities.map((facility, index) => (
                  <motion.tr
                    key={facility._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="border-b border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">{facility.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(facility.type)}
                        <span className="text-foreground">{facility.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          facility.status === "Available"
                            ? "bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-600"
                            : "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-600"
                        }`}
                      >
                        {facility.status === "Available" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {facility.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${facility.usage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-foreground">{facility.usage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(facility)}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm font-medium"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(facility._id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
                {facilities.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <Building2 className="w-8 h-8 text-muted-foreground/50" />
                        <span className="text-lg">No facilities found.</span>
                        <span className="text-sm">Add your first facility to get started!</span>
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
            transition={{ delay: 1.0 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 rounded-full px-4 py-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4 text-teal-500 dark:text-teal-400" />
              <span className="font-medium">{facilities.length} facilities</span>
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
                  {editingFacility ? <Edit3 className="w-5 h-5 text-teal-500 dark:text-teal-400" /> : <Plus className="w-5 h-5 text-teal-500 dark:text-teal-400" />}
                  {editingFacility ? "Edit Facility" : "Add Facility"}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowForm(false);
                    setEditingFacility(null);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Facility Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="type"
                    placeholder="Facility Type (e.g., Cardio, Wellness)"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                  >
                    <option>Available</option>
                    <option>Unavailable</option>
                  </select>
                </div>
                <div className="relative">
                  <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="usage"
                    placeholder="Usage %"
                    min="0"
                    max="100"
                    value={formData.usage}
                    onChange={handleChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingFacility(null);
                    }}
                    className="px-6 py-3 bg-muted text-muted-foreground rounded-xl hover:bg-muted/80 transition-all font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all font-semibold flex items-center gap-2"
                  >
                    {editingFacility ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingFacility ? "Update" : "Add"}
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

export default Facilities;
