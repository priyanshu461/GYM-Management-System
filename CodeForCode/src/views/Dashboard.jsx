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
import Layout from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";
import gymServices from "@/services/gymServices";

const Dashboard = () => {
  // Sample token for demonstration
  const { theme } = useTheme();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsIcons, setStatsIcons] = useState({});

  // Fetch dashboard data on component mount

  const fetchStates = async () => {
    try {
      const parms = {};
      const res = await gymServices.getStats(parms);
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
      const parms = { isTop: true };
      const res = await gymServices.getProducts(parms);
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

  useEffect(() => {
    fetchStates();
    fetchTopProducts();
    fetchOrders();
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
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1
                className={`text-4xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
              >
                <Home className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
                Dashboard
                <span className="text-teal-500 dark:text-teal-400">
                  {" "}
                  Overview
                </span>
              </h1>
              <p className={`text-lg text-teal-600 dark:text-teal-400`}>
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((s, index) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-6 rounded-2xl shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center shadow-lg">
                    {s.title === 'Total Members' && <Users size={20} className="text-white" />}
                    {s.title === 'Active Trainers' && <UserCheck size={20} className="text-white" />}
                    {s.title === 'Revenue This Month' && <DollarSign size={20} className="text-white" />}
                    {s.title === 'Classes Today' && <Calendar size={20} className="text-white" />}
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
                    className={`text-3xl font-bold mt-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
                  >
                    {s.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sales Chart + Orders List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
                >
                  <BarChart className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                  Sales Overview
                </h3>
                <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  Last 30 days
                </div>
              </div>

              {/* Enhanced SVG chart */}
              <div className="w-full h-48 mb-6 bg-gradient-to-r from-teal-900/5 to-teal-800/5 dark:from-teal-900/10 dark:to-teal-800/10 rounded-xl p-4 border border-teal-700/10 dark:border-teal-600/20">
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
                  <polyline
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="4"
                    points="0,120 80,100 160,80 240,95 320,60 400,72 480,40 560,55 600,30"
                  />
                  <polyline
                    fill="url(#chartGradient)"
                    stroke="none"
                    points="0,120 80,100 160,80 240,95 320,60 400,72 480,40 560,55 600,30 600,160 0,160"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4
                    className={`text-lg font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
                  >
                    <Box className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                    Recent Orders
                  </h4>
                  <div className="space-y-3">
                    {orders.slice(0, 4).map((o, index) => (
                      <motion.div
                        key={o.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                      >
                        <div>
                          <div className="text-sm font-semibold text-foreground">
                            Order #{o.id}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {o.customer} • {o.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">
                            ₹{o.amount.toLocaleString()}
                          </div>
                          <div
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
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
                    <TrendingUp className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                    Top Products
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
                          <div className="text-2xl">{p.image}</div>
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
                <Package className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                Quick Actions
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
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-teal-300 via-teal-200 to-teal-100 bg-clip-text text-transparent`}
              >
                <Box className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                All Orders
              </h3>
              <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                Showing latest 50 orders
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gradient-to-r from-teal-600 to-teal-500">
                  <tr>
                    <th className="px-6 py-4 text-white font-semibold dark:text-gray-100">
                      Order
                    </th>
                    <th className="px-6 py-4 text-white font-semibold dark:text-gray-100">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-white font-semibold dark:text-gray-100">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-white font-semibold dark:text-gray-100">
                      Status
                    </th>
                    <th className="px-6 py-4 text-white font-semibold dark:text-gray-100">
                      Date
                    </th>
                    <th className="px-6 py-4 text-white font-semibold text-center dark:text-gray-100">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, index) => (
                    <motion.tr
                      key={o.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.05 }}
                      className="border-b border-border hover:bg-gradient-to-r hover:from-teal-900/5 hover:to-teal-800/5 dark:hover:from-teal-900/10 dark:hover:to-teal-800/10 transition-all duration-200"
                    >
                      <td className="px-6 py-4 font-semibold text-foreground dark:text-gray-200">
                        #{o.id}
                      </td>
                      <td className="px-6 py-4 text-foreground dark:text-gray-200">
                        {o.customer}
                      </td>
                      <td className="px-6 py-4 font-bold text-foreground dark:text-gray-200">
                        ₹{o.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                      <td className="px-6 py-4 text-muted-foreground dark:text-gray-300">
                        {o.date}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <motion.button
                          onClick={() => setSelectedOrder(o)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl shadow-lg hover:from-teal-700 hover:to-teal-600 transition-all font-medium flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
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
