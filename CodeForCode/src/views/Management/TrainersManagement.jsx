import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import {
  Users, Award, Calendar, Star, Plus, Edit3, Trash2,
  Dumbbell, Heart, Activity, Zap, AlertCircle
} from "lucide-react";
import trainerServices from "../../services/trainerServices";
export default function TrainersManagement() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingTrainer, setEditingTrainer] = useState(null);

  // Fetch trainers on component mount
  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await trainerServices.getAllTrainers();
      setTrainers(res || []);
    } catch (err) {
      setError(err.message);
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (trainer) => {
    navigate(`/trainers/edit/${trainer.id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this trainer?")) return;

    try {
      await trainerServices.deleteTrainer({ id });
      await fetchTrainers(); // Refresh the list
    } catch (err) {
      alert("Failed to delete trainer: " + err.message);
    }
  };

  const getExpertiseIcon = (expertise) => {
    switch (expertise.toLowerCase()) {
      case 'strength & conditioning': return <Dumbbell className="w-5 h-5" />;
      case 'yoga & flexibility': return <Heart className="w-5 h-5" />;
      case 'cardio': return <Activity className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
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
                <Users className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
                Trainers<span className="text-teal-500 dark:text-teal-400"> Management</span>
              </h1>
              <p className="text-muted-foreground text-lg">Manage your gym's professional trainers and their expertise</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/trainers/add')}
              className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Trainer
            </motion.button>
          </motion.div>

          {/* Stats Cards */}
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
                <Users className="w-6 h-6 text-teal-500 dark:text-teal-400" />
                <h3 className="text-lg font-semibold text-foreground">Total Trainers</h3>
              </div>
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{trainers.length}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-900/10 to-green-800/5 dark:from-green-900/20 dark:to-green-800/10 border border-green-700/20 dark:border-green-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-green-500 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-foreground">Avg Rating</h3>
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {trainers.length > 0 ? (trainers.reduce((sum, t) => sum + (t.rating || 0), 0) / trainers.length).toFixed(1) : '0.0'} ⭐
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-700/20 dark:border-blue-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-foreground">Avg Experience</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {trainers.length > 0 ? (trainers.reduce((sum, t) => sum + (parseInt(t.experience) || 0), 0) / trainers.length).toFixed(1) : '0.0'} Years
              </p>
            </motion.div>
          </motion.div>

          {/* Loading/Error States */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
              <span className="ml-3 text-muted-foreground">Loading trainers...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12">
              <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
              <span className="text-red-500">Error loading trainers: {error}</span>
            </div>
          )}

          {/* Trainer Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {!loading && !error && trainers.map((trainer, index) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={trainer.image || "https://via.placeholder.com/150"}
                      alt={trainer.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-teal-500 dark:border-teal-400"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{trainer.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getExpertiseIcon(trainer.expertise)}
                        <span className="text-muted-foreground">{trainer.expertise}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Experience</span>
                      <span className="font-semibold text-foreground">{trainer.experience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-foreground">{trainer.rating}</span>
                      </div>
                    </div>
                  </div>

                  {trainer.certifications.length > 0 && (
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground block mb-2">Certifications</span>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, idx) => (
                          <span key={idx} className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 text-xs rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {trainer.specializations.length > 0 && (
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground block mb-2">Specializations</span>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specializations.map((spec, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(trainer)}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(trainer.id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </div>
    </Layout>
  );
}
