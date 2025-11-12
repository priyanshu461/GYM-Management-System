import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import {
  Building, MapPin, Phone, Mail, ArrowLeft, Eye,
  AlertCircle
} from "lucide-react";
import gymServices from "../../services/gymServices";

export default function ViewGym() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGym();
  }, [id]);

  const fetchGym = async () => {
    try {
      setLoading(true);
      const res = await gymServices.getGymById(id);
      setGym(res.gym);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background text-foreground py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
              <span className="ml-3 text-muted-foreground">Loading gym details...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-background text-foreground py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
              <span className="text-red-500">Error loading gym details: {error}</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/gyms')}
              className="bg-gradient-to-r from-gray-600 to-gray-500 text-white px-4 py-2 rounded-xl shadow-lg hover:from-gray-700 hover:to-gray-600 transition-all flex items-center gap-2 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Gyms
            </motion.button>
            <div>
              <h1 className="text-4xl font-extrabold mb-3 text-foreground tracking-tight">
                <Eye className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
                View Gym Details
              </h1>
              <p className="text-muted-foreground text-lg">Complete information about the gym</p>
            </div>
          </motion.div>

          {/* Gym Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={gym.image || "https://via.placeholder.com/150"}
                  alt={gym.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-teal-500 dark:border-teal-400"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-2">{gym.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{gym.address}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile</p>
                      <p className="text-lg font-semibold text-foreground">{gym.mobile}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-lg font-semibold text-foreground">{gym.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-lg font-semibold text-foreground">{gym.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gym ID</p>
                      <p className="text-lg font-semibold text-foreground font-mono">{gym._id}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-8 pt-6 border-t border-teal-700/20 dark:border-teal-600/30">
                <h3 className="text-xl font-bold text-foreground mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Created At</p>
                    <p className="text-foreground">{new Date(gym.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="text-foreground">{new Date(gym.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
