import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  BarChart,
  TrendingUp,
  Eye,
  X,
  Users,
  UserCheck,
  DollarSign,
  Dumbbell,
  Activity,
  Target,
  UserPlus,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";
import gymServices from "@/services/gymServices";
import { BASE_API_URL, getToken } from "@/utils/data";

const GymDashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);
  const [stats, setStats] = useState([]);
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gym-specific dashboard data
  const fetchGymStats = async () => {
    try {
      const res = await gymServices.getStats();
      // Transform stats for gym context
      const gymStats = res.stats?.map(stat => {
        if (stat.title === 'Total Sales') return { ...stat, title: 'Membership Revenue', icon: 'DollarSign' };
        if (stat.title === 'Orders') return { ...stat, title: 'Active Members', icon: 'Users' };
        if (stat.title === 'Customers') return { ...stat, title: 'Total Members', icon: 'UserCheck' };
        if (stat.title === 'Traffic') return { ...stat, title: 'Monthly Attendance', icon: 'TrendingUp' };
        return stat;
      }) || [];
      setStats(gymStats);
    } catch (err) {
      setError(err.message);
      setStats([]);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await gymServices.getCustomers();
      setMembers(res.customers || []);
    } catch (err) {
      console.error('Error fetching members:', err);
      setMembers([]);
    }
  };

  const fetchClasses = async () => {
    try {
      // Assuming there's a classes endpoint
      const token = getToken();
      const res = await fetch(`${BASE_API_URL}classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setClasses(data || []);
      } else {
        // Fallback to sample data
        setClasses([
          { id: 1, name: 'Yoga Class', instructor: 'Sarah Johnson', time: '9:00 AM', capacity: 20, enrolled: 15 },
          { id: 2, name: 'HIIT Training', instructor: 'Mike Chen', time: '6:00 PM', capacity: 15, enrolled: 12 },
          { id: 3, name: 'Strength Training', instructor: 'Alex Rodriguez', time: '7:30 PM', capacity: 12, enrolled: 10 },
        ]);
      }
    } catch (err) {
      console.error('Error fetching classes:', err);
      setClasses([]);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${BASE_API_URL}dashboard/attendance-overview`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAttendanceData(data);
      } else {
        // Fallback to sample data
        setAttendanceData([
          { date: "2025-01-01", attendance: 45 },
          { date: "2025-01-02", attendance: 52 },
          { date: "2025-01-03", attendance: 48 },
          { date: "2025-01-04", attendance: 61 },
          { date: "2025-01-05", attendance: 55 },
        ]);
      }
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      setAttendanceData([]);
    }
  };

  useEffect(() => {
    fetchGymStats();
    fetchMembers();
    fetchClasses();
    fetchAttendanceData();
    setLoading(false);
  }, []);

  const quickActions = [
    {
      title: "Add Member",
      description: "Register new gym member",
      icon: UserPlus,
      shortcut: "Ctrl + M",
      color: "from-blue-600 to-blue-500",
      action: () => navigate("/members/add")
    },
    {
      title: "Schedule Class",
      description: "Create new fitness class",
      icon: CalendarIcon,
      shortcut: "Ctrl + C",
      color: "from-green-600 to-green-500",
      action: () => navigate("/classes-schedule")
    },
    {
      title: "View Reports",
      description: "Gym performance analytics",
      icon: BarChart,
      shortcut: "Ctrl + R",
      color: "from-purple-600 to-purple-500",
      action: () => navigate("/reports-analytics")
    },
    {
      title: "Check Attendance",
      description: "Mark member attendance",
      icon: Activity,
      shortcut: "Ctrl + A",
      color: "from-orange-600 to-orange-500",
      action: () => navigate("/progress-tracking")
    },
  ];

  const recentMembers = members.slice(0, 5);
  const todayClasses = classes.filter(c => {
    // Simple filter for today's classes - in real app, check actual date
    return true; // Show all for demo
  });

  return (
    <Layout>
      <div
        className={`min-h-screen py-10 px-4 ${
          theme === "light"
            ? "bg-gradient-to-br from-teal-100 via-teal-50 to-white text-black"
            : "bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8"
          >
            <div>
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 tracking-tight bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
              >
                <Dumbbell className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-2 sm:mr-3 text-teal-500 dark:text-teal-400" />
                <span className="text-teal-800">Gym Dashboard</span>
                <span className="text-teal-700 dark:text-teal-400">
                  {" "}
                  <span className="text-teal-500">Overview</span>
                </span>
              </h1>
              <p className={`text-sm sm:text-base md:text-lg text-teal-600 dark:text-teal-400`}>
                Welcome back! Here's what's happening at your gym today.
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            {stats.map((s, index) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center shadow-lg">
                    {s.icon === 'DollarSign' && <DollarSign size={18} className="sm:w-5 sm:h-5 text-white" />}
                    {s.icon === 'Box' && <Box size={18} className="sm:w-5 sm:h-5 text-white" />}
                    {s.icon === 'Users' && <Users size={18} className="sm:w-5 sm:h-5 text-white" />}
                    {s.icon === 'UserCheck' && <UserCheck size={18} className="sm:w-5 sm:h-5 text-white" />}
                    {s.icon === 'TrendingUp' && <TrendingUp size={18} className="sm:w-5 sm:h-5 text-white" />}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      s.changeType === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    {s.change}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {s.title}
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl font-bold mt-2 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-600 bg-clip-text text-transparent`}
                  >
                    {s.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Attendance Chart + Recent Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h3
                  className={`text-lg sm:text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
                >
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 dark:text-teal-400" />
                  <span className="text-teal-700">Attendance Overview</span>
                </h3>
                <div className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                  Last 7 days
                </div>
              </div>

              {/* Attendance Chart */}
              <div className="w-full h-40 sm:h-48 mb-4 sm:mb-6 bg-gradient-to-r from-teal-900/5 to-teal-800/5 dark:from-teal-900/10 dark:to-teal-800/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-teal-700/10 dark:border-teal-600/20 overflow-hidden">
                {attendanceData.length > 0 ? (
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 600 160"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="attendanceGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                        <stop
                          offset="100%"
                          stopColor="#14b8a6"
                          stopOpacity="0.8"
                        />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="4"
                      points={attendanceData.map((point, index) => {
                        const x = (index / (attendanceData.length - 1)) * 600;
                        const maxAttendance = Math.max(...attendanceData.map(d => d.attendance));
                        const y = 160 - (point.attendance / maxAttendance) * 120;
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                    <polyline
                      fill="url(#attendanceGradient)"
                      stroke="none"
                      points={`${attendanceData.map((point, index) => {
                        const x = (index / (attendanceData.length - 1)) * 600;
                        const maxAttendance = Math.max(...attendanceData.map(d => d.attendance));
                        const y = 160 - (point.attendance / maxAttendance) * 120;
                        return `${x},${y}`;
                      }).join(' ')} 600,160 0,160`}
                    />
                  </svg>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No attendance data available</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4
                    className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 dark:text-teal-400" />
                    <span className="text-teal-700">Recent Members</span>
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {recentMembers.map((member, index) => (
                      <motion.div
                        key={member._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            {member.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.mobile}</div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4
                    className={`text-lg font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
                  >
                    <CalendarIcon className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                    <span className="text-teal-700">Today's Classes</span>
                  </h4>
                  <ul className="space-y-3">
                    {todayClasses.slice(0, 4).map((classItem, index) => (
                      <motion.li
                        key={classItem.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="p-4 rounded-xl bg-background border border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-foreground text-sm">{classItem.name}</div>
                          <div className="text-xs text-muted-foreground">{classItem.time}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">{classItem.instructor}</div>
                          <div className="text-xs text-teal-600 dark:text-teal-400">
                            {classItem.enrolled}/{classItem.capacity}
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-6 rounded-2xl shadow-xl"
            >
              <h3
                className={`text-xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
              >
                <Target className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                <span className="text-teal-700">Quick Actions</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-foreground">
                          {action.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {action.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md font-mono">
                      {action.shortcut}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Members Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8 bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-6 rounded-2xl shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h3
                className={`text-lg sm:text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 dark:text-teal-400" />
                <span className="text-teal-700">Active Members</span>
              </h3>
              <div className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                Showing latest members
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-teal-700">
                    <thead className="bg-gradient-to-r from-teal-600 to-teal-500">
                      <tr>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white dark:text-gray-100">
                          Member
                        </th>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white dark:text-gray-100 hidden sm:table-cell">
                          Contact
                        </th>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white dark:text-gray-100 hidden md:table-cell">
                          Membership
                        </th>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white dark:text-gray-100 hidden lg:table-cell">
                          Join Date
                        </th>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white text-center dark:text-gray-100">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-teal-900/50 divide-y divide-gray-200 dark:divide-teal-700">
                      {members.slice(0, 10).map((member, index) => (
                        <motion.tr
                          key={member._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + index * 0.05 }}
                          className="hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                        >
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                {member.name?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <div>
                                <div className="font-semibold text-foreground">{member.name}</div>
                                {member.occupation && (
                                  <div className="text-xs text-muted-foreground">{member.occupation}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground dark:text-gray-200 hidden sm:table-cell">
                            <div>{member.mobile}</div>
                            {member.email && (
                              <div className="text-xs text-muted-foreground">{member.email}</div>
                            )}
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hidden md:table-cell">
                            <span className="px-2 py-1 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 rounded-lg text-xs font-medium">
                              Active
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-[10px] sm:text-xs text-muted-foreground dark:text-gray-300 hidden lg:table-cell">
                            {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                            <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-600">
                              Active
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Eye className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                  Member Details
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMember(null)}
                  className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-semibold text-foreground">
                    {selectedMember.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Mobile:</span>
                  <span className="font-semibold text-foreground">
                    {selectedMember.mobile}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-semibold text-foreground">
                    {selectedMember.email || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Membership:</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-600">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Join Date:</span>
                  <span className="font-semibold text-foreground">
                    {selectedMember.createdAt ? new Date(selectedMember.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <p>
                    This member is actively using gym facilities and participating in classes.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default GymDashboard;
