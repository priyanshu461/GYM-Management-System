import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import {
  BookOpen, Plus, Edit3, Trash2, Eye,
  AlertCircle, X, Search, Filter
} from "lucide-react";
import courseService from "../../services/courseService";
import { useAuth } from "../../contexts/AuthContext";

export default function CoursesManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");
  const [filterGym, setFilterGym] = useState("All");

  // Fetch courses on component mount and when location changes (e.g., after edit/add)
  useEffect(() => {
    fetchCourses();
  }, [location]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await courseService.getAllCourses();
      setCourses(res.courses || []);
    } catch (err) {
      setError(err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    navigate(`/courses/edit/${course._id}`);
  };

  const handleView = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await courseService.deleteCourse(id);
      await fetchCourses(); // Refresh the list
    } catch (err) {
      alert("Failed to delete course: " + err.message);
    }
  };

  // Filter courses based on search, level, and gym
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === "All" || course.level === filterLevel;
    const matchesGym = filterGym === "All" || course.gymId?._id === filterGym;
    return matchesSearch && matchesLevel && matchesGym;
  });

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
                <BookOpen className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
                Courses<span className="text-teal-500 dark:text-teal-400"> Management</span>
              </h1>
              <p className="text-muted-foreground text-lg">Manage your gym courses and training programs</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/courses/add')}
              className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Course
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
                <BookOpen className="w-6 h-6 text-teal-500 dark:text-teal-400" />
                <h3 className="text-lg font-semibold text-foreground">Total Courses</h3>
              </div>
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{courses.length}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-900/10 to-green-800/5 dark:from-green-900/20 dark:to-green-800/10 border border-green-700/20 dark:border-green-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Filter className="w-6 h-6 text-green-500 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-foreground">Active Courses</h3>
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{courses.length}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-700/20 dark:border-blue-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <Search className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-foreground">Filtered Results</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{filteredCourses.length}</p>
            </motion.div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-900/10 to-gray-800/5 dark:from-gray-900/20 dark:to-gray-800/10 border border-gray-700/20 dark:border-gray-600/30 p-6 rounded-2xl shadow-xl mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                  />
                </div>
              </div>
              {user.user_type === "Admin" && (
                <div className="md:w-48">
                  <select
                    value={filterGym}
                    onChange={(e) => setFilterGym(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                  >
                    <option value="All">All Gyms</option>
                    {courses
                      .map(course => course.gymId)
                      .filter((gym, index, arr) => arr.findIndex(g => g?._id === gym?._id) === index)
                      .map(gym => (
                        <option key={gym?._id} value={gym?._id}>{gym?.name || 'Unknown Gym'}</option>
                      ))
                    }
                  </select>
                </div>
              )}
              <div className="md:w-48">
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Loading/Error States */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
              <span className="ml-3 text-muted-foreground">Loading courses...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12">
              <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
              <span className="text-red-500">Error loading courses: {error}</span>
            </div>
          )}

          {/* Course Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {!loading && !error && filteredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={course.image || "https://picsum.photos/150/150?random=1&text=No+Image"}
                      alt={course.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-teal-500 dark:border-teal-400"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          course.level === 'Advanced' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {course.level}
                        </span>
                        <span className="text-muted-foreground text-sm">{course.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
                      ${course.price?.monthly || 0}/month
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${course.price?.annual || 0}/year
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleView(course)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(course)}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(course._id)}
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

          {/* No Results */}
          {!loading && !error && filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCourse && (
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
                  <BookOpen className="w-8 h-8 text-teal-500 dark:text-teal-400" />
                  {selectedCourse.name}
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
                    src={selectedCourse.image || "https://picsum.photos/150/150?random=1&text=No+Image"}
                    alt={selectedCourse.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-teal-500 dark:border-teal-400"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{selectedCourse.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedCourse.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          selectedCourse.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          selectedCourse.level === 'Advanced' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {selectedCourse.level}
                        </span>
                        <span className="text-muted-foreground">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
                          ${selectedCourse.price?.monthly || 0}/month
                        </div>
                        <div className="text-muted-foreground">
                          ${selectedCourse.price?.annual || 0}/year
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedCourse.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-4 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Course ID</h4>
                    <p className="text-muted-foreground text-sm">{selectedCourse._id}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-900/10 to-green-800/5 dark:from-green-900/20 dark:to-green-800/10 border border-green-700/20 dark:border-green-600/30 p-4 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Status</h4>
                    <p className="text-green-600 dark:text-green-400 font-medium">Active</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/10 to-blue-800/5 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-700/20 dark:border-blue-600/30 p-4 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">Created At</h4>
                    <p className="text-muted-foreground text-sm">
                      {new Date(selectedCourse.createdAt).toLocaleDateString('en-US', {
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
                      {new Date(selectedCourse.updatedAt).toLocaleDateString('en-US', {
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
                      handleEdit(selectedCourse);
                    }}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-medium"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Course
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
