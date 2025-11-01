import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import {
  UserPlus, Users, Award, Calendar, User, Star, Plus, Edit3, Trash2, X,
  Dumbbell, Heart, Activity, Zap
} from "lucide-react";

export default function Trainer() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "John Carter",
      expertise: "Strength & Conditioning",
      experience: "5 Years",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      certifications: ["NSCA-CSCS", "ACSM"],
      specializations: ["Powerlifting", "Olympic Lifting"]
    },
    {
      id: 2,
      name: "Emily Smith",
      expertise: "Yoga & Flexibility",
      experience: "3 Years",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 4.9,
      certifications: ["RYT-500", "Prenatal Yoga"],
      specializations: ["Hatha Yoga", "Vinyasa Flow"]
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    experience: "",
    image: "",
    rating: 0,
    certifications: "",
    specializations: ""
  });

  const [showForm, setShowForm] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTrainer = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.expertise) return;

    const newTrainer = {
      ...formData,
      id: Date.now(),
      certifications: formData.certifications.split(',').map(c => c.trim()).filter(c => c),
      specializations: formData.specializations.split(',').map(s => s.trim()).filter(s => s),
      rating: parseFloat(formData.rating) || 0
    };

    if (editingTrainer) {
      setTrainers(trainers.map(t => t.id === editingTrainer.id ? { ...newTrainer, id: t.id } : t));
      setEditingTrainer(null);
    } else {
      setTrainers([...trainers, newTrainer]);
    }

    setFormData({ name: "", expertise: "", experience: "", image: "", rating: 0, certifications: "", specializations: "" });
    setShowForm(false);
  };

  const handleEdit = (trainer) => {
    setEditingTrainer(trainer);
    setFormData({
      ...trainer,
      certifications: trainer.certifications.join(', '),
      specializations: trainer.specializations.join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTrainers(trainers.filter(t => t.id !== id));
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
              onClick={() => navigate("/trainers/add")}
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
                {(trainers.reduce((sum, t) => sum + t.rating, 0) / trainers.length).toFixed(1)} ⭐
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-700/20 dark:border-blue-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-foreground">Total Experience</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {trainers.reduce((sum, t) => sum + parseInt(t.experience), 0)} Years
              </p>
            </motion.div>
          </motion.div>

          {/* Trainer Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {trainers.map((trainer, index) => (
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

          {/* Add/Edit Trainer Modal */}
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
                    {editingTrainer ? <Edit3 className="w-5 h-5 text-teal-500 dark:text-teal-400" /> : <Plus className="w-5 h-5 text-teal-500 dark:text-teal-400" />}
                    {editingTrainer ? "Edit Trainer" : "Add Trainer"}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowForm(false);
                      setEditingTrainer(null);
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                <form onSubmit={handleAddTrainer} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Trainer Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="expertise"
                      placeholder="Expertise (e.g., Strength & Conditioning)"
                      value={formData.expertise}
                      onChange={handleChange}
                      className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="experience"
                      placeholder="Experience (e.g., 5 Years)"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      name="rating"
                      placeholder="Rating (0-5)"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                  </div>
                  <input
                    type="text"
                    name="certifications"
                    placeholder="Certifications (comma-separated)"
                    value={formData.certifications}
                    onChange={handleChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  />
                  <input
                    type="text"
                    name="specializations"
                    placeholder="Specializations (comma-separated)"
                    value={formData.specializations}
                    onChange={handleChange}
                    className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setFormData({ ...formData, image: e.target.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 dark:file:bg-teal-900 dark:file:text-teal-200 dark:hover:file:bg-teal-800"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      📁
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        setShowForm(false);
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
                      className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all font-semibold flex items-center gap-2"
                    >
                      {editingTrainer ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      {editingTrainer ? "Update" : "Add"}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
