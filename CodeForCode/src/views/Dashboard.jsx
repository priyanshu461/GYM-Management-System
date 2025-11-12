import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  BarChart,
  TrendingUp,
  Package,
  Eye,
  Send,
  Home,
  X,
  Users,
  UserCheck,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";
import gymServices from "@/services/gymServices";
import { BASE_API_URL, getToken } from "@/Utils/data";

const Dashboard = () => {
  // Sample token for demonstration
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsIcons, setStatsIcons] = useState({});

  // Fetch dashboard data on component mount

  const fetchStates = async () => {
    try {
      const res = await gymServices.getStats();
      setStats(res.stats || []);
    } catch (err) {
      setError(err.message);
      setStats([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const res = await gymServices.getProducts();
      setTopProducts(res.stats || []);
    } catch (err) {
      setError(err.message);
      setTopProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await gymServices.getOrders();
      setOrders(res.orders || []);
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesOverview = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${BASE_API_URL}dashboard/sales-overview`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch sales overview');
      }
      const data = await res.json();
      setSalesData(data);
    } catch (err) {
      console.error('Error fetching sales overview:', err);
      // Fallback to sample data
      setSalesData([
        { date: "2025-09-01", sales: 12000 },
        { date: "2025-09-02", sales: 15000 },
        { date: "2025-09-03", sales: 18000 },
      ]);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchTopProducts();
    fetchOrders();
    fetchSalesOverview();
  }, []);

  const quickActions = [
    {
      title: "Add product",
      description: "Create a new product listing",
      icon: Package,
      shortcut: "Ctrl + P",
      color: "from-blue-600 to-blue-500",
    },
    {
      title: "View reports",
      description: "Detailed sales & analytics",
      icon: BarChart,
      shortcut: "Enter",
      color: "from-green-600 to-green-500",
    },
    {
      title: "Send promo",
      description: "Email/SMS campaign",
      icon: Send,
      shortcut: "/",
      color: "from-purple-600 to-purple-500",
    },
  ];

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
                <Home className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-2 sm:mr-3 text-teal-500 dark:text-teal-400" />
                <span className="text-teal-800">Dashboard</span>
                <span className="text-teal-700 dark:text-teal-400">
                  {" "}
                <span className="text-teal-500"> Overview </span>
                </span>
              </h1>
              <p className={`text-sm sm:text-base md:text-lg text-teal-600 dark:text-teal-400`}>
                Welcome back! Here's what's happening with your business today.
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
            {/* Sales Chart + Orders List */}
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
                  <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 dark:text-teal-400" />
                  <span className="text-teal-700">Sales Overview </span>
                </h3>
                <div className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                  Last 30 days
                </div>
              </div>

              {/* Dynamic Chart */}
              <div className="w-full h-40 sm:h-48 mb-4 sm:mb-6 bg-gradient-to-r from-teal-900/5 to-teal-800/5 dark:from-teal-900/10 dark:to-teal-800/10 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-teal-700/10 dark:border-teal-600/20 overflow-hidden">
                {salesData.length > 0 ? (
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 600 160"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
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
                    {/* Generate dynamic points from salesData */}
                    <polyline
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="4"
                      points={salesData.map((point, index) => {
                        const x = (index / (salesData.length - 1)) * 600;
                        const maxSales = Math.max(...salesData.map(d => d.sales));
                        const y = 160 - (point.sales / maxSales) * 120; // Scale to fit height
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                    <polyline
                      fill="url(#chartGradient)"
                      stroke="none"
                      points={`${salesData.map((point, index) => {
                        const x = (index / (salesData.length - 1)) * 600;
                        const maxSales = Math.max(...salesData.map(d => d.sales));
                        const y = 160 - (point.sales / maxSales) * 120;
                        return `${x},${y}`;
                      }).join(' ')} 600,160 0,160`}
                    />
                  </svg>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <BarChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No sales data available</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4
                    className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
                  >
                    <Box className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 dark:text-teal-400" />
                    <span className="text-teal-700">Recent Orders </span>
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {orders.slice(0, 4).map((o, index) => (
                      <motion.div
                        key={o.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-xs sm:text-sm font-semibold text-foreground truncate">
                            Order #{o.id}
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground truncate">
                            {o.customer} • {o.date}
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1">
                          <div className="text-sm sm:text-base font-bold text-foreground">
                            ₹{o.amount.toLocaleString()}
                          </div>
                          <div
                            className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:py-1 rounded-full ${
                              o.status === "Delivered"
                                ? "bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-600"
                                : o.status === "Returned"
                                ? "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-600"
                                : "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-600"
                            }`}
                          >
                            {o.status}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4
                    className={`text-lg font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
                  >
                    <TrendingUp className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                   <span className="text-teal-700"> Top Products </span>
                  </h4>
                  <ul className="space-y-3">
                    {topProducts.map((p, index) => (
                      <motion.li
                        key={p.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="p-4 rounded-xl bg-background border border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-semibold text-foreground">
                              {p.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Sold: {p.sold}
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
                          {p.price}
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
                <Package className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                <span className="text-teal-700">Quick Actions </span>
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
                    onClick={() => {
                      if (action.title === "Add product") {
                        navigate("/products");
                      } else if (action.title === "View reports") {
                        navigate("/reportsAnalytics");
                      } else if (action.title === "Send promo") {
                        navigate("/notificationcommunication");
                      }
                    }}
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

          {/* Orders Table */}
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
                <Box className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 dark:text-teal-400" />
                <span className="text-teal-700">All Orders </span>
              </h3>
              <div className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                Showing latest 50 orders
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-teal-700">
                    <thead className="bg-gradient-to-r from-teal-600 to-teal-500">
                      <tr>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white dark:text-gray-100">
                          Order
                        </th>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white dark:text-gray-100 hidden sm:table-cell">
                          Customer
                        </th>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white dark:text-gray-100">
                          Amount
                        </th>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white dark:text-gray-100 hidden md:table-cell">
                          Status
                        </th>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white dark:text-gray-100 hidden lg:table-cell">
                          Date
                        </th>
                        <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-white text-center dark:text-gray-100">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-teal-900/50 divide-y divide-gray-200 dark:divide-teal-700">
                      {orders.map((o, index) => (
                        <motion.tr
                          key={o.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + index * 0.05 }}
                          className="hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                        >
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground dark:text-gray-200">
                            #{o.id}
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground dark:text-gray-200 hidden sm:table-cell">
                            <span className="truncate block max-w-[120px] lg:max-w-none">{o.customer}</span>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm font-bold text-foreground dark:text-gray-200">
                            ₹{o.amount.toLocaleString()}
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 hidden md:table-cell">
                            <span
                              className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                                o.status === "Delivered"
                                  ? "bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-600"
                                  : o.status === "Returned"
                                  ? "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-600"
                                  : "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-600"
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-[10px] sm:text-xs text-muted-foreground dark:text-gray-300 hidden lg:table-cell">
                            {o.date}
                          </td>
                          <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                            <motion.button
                              onClick={() => setSelectedOrder(o)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 mx-auto"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">View</span>
                            </motion.button>
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

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
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
                  Order Details
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-semibold text-foreground">
                    #{selectedOrder.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-semibold text-foreground">
                    {selectedOrder.customer}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">
                    ₹{selectedOrder.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedOrder.status === "Delivered"
                        ? "bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-600"
                        : selectedOrder.status === "Returned"
                        ? "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-600"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-600"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-semibold text-foreground">
                    {selectedOrder.date}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <p>
                    This is a sample order detail view. In a real application,
                    this would show more detailed information about the order,
                    including items purchased, shipping details, and order
                    history.
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

export default Dashboard;
