import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import {
  Building, MapPin, Phone, Mail, Plus, Edit3, Trash2, Eye,
  AlertCircle, X
} from "lucide-react";
import gymServices from "../../services/gymServices";

export default function GymsManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGym, setSelectedGym] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch gyms on component mount and when location changes (e.g., after edit/add)
  useEffect(() => {
    fetchGyms();
  }, [location]);

  const fetchGyms = async () => {
    try {
      setLoading(true);
      const res = await gymServices.getAllGyms();
      setGyms(res.gyms || []);
    } catch (err) {
      setError(err.message);
      setGyms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (gym) => {
    navigate(`/gyms/edit/${gym._id}`);
  };

  const handleView = (gym) => {
    setSelectedGym(gym);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this gym?")) return;

    try {
      await gymServices.deleteGym(id);
      await fetchGyms(); // Refresh the list
    } catch (err) {
      alert("Failed to delete gym: " + err.message);
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
                <Building className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
                Gyms<span className="text-teal-500 dark:text-teal-400"> Management</span>
              </h1>
              <p className="text-muted-foreground text-lg">Manage your gym locations and details</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/gyms/add')}
              className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Gym
            </motion.button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Building className="w-6 h-6 text-teal-500 dark:text-teal-400" />
                <h3 className="text-lg font-semibold text-foreground">Total Gyms</h3>
              </div>
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{gyms.length}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-900/10 to-green-800/5 dark:from-green-900/20 dark:to-green-800/10 border border-green-700/20 dark:border-green-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-6 h-6 text-green-500 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-foreground">Active Locations</h3>
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{gyms.length}</p>
            </motion.div>
          </motion.div>

          {/* Loading/Error States */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
              <span className="ml-3 text-muted-foreground">Loading gyms...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12">
              <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
              <span className="text-red-500">Error loading gyms: {error}</span>
            </div>
          )}

          {/* Gym Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {!loading && !error && gyms.map((gym, index) => (
              <motion.div
                key={gym._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={gym.image || "https://picsum.photos/150/150?random=1&text=No+Image"}
                      alt={gym.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-teal-500 dark:border-teal-400"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{gym.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm">{gym.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{gym.mobile}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{gym.email}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleView(gym)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(gym)}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(gym._id)}
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

      {/* Modal */}
      {isModalOpen && selectedGym && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Building className="w-8 h-8 text-teal-500 dark:text-teal-400" />
                  {selectedGym.name}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <img
                    src={selectedGym.image || "https://picsum.photos/150/150?random=1&text=No+Image"}
                    alt={selectedGym.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-teal-500 dark:border-teal-400"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{selectedGym.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground">{selectedGym.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground">{selectedGym.mobile}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground">{selectedGym.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-4 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Gym ID</h4>
                    <p className="text-muted-foreground text-sm">{selectedGym._id}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-900/10 to-green-800/5 dark:from-green-900/20 dark:to-green-800/10 border border-green-700/20 dark:border-green-600/30 p-4 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Status</h4>
                    <p className="text-green-600 dark:text-green-400 font-medium">Active</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-700/20 dark:border-blue-600/30 p-4 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Created At</h4>
                    <p className="text-muted-foreground text-sm">
                      {new Date(selectedGym.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-900/10 to-purple-800/5 dark:from-purple-900/20 dark:to-purple-800/10 border border-purple-700/20 dark:border-purple-600/30 p-4 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Updated At</h4>
                    <p className="text-muted-foreground text-sm">
                      {new Date(selectedGym.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsModalOpen(false);
                      handleEdit(selectedGym);
                    }}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-medium"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Gym
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-medium"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
