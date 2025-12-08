import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, Users, Trash2, AlertCircle, Edit2, Eye, Phone, Mail, Calendar, Filter, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gymServices from "@/services/gymServices";
import { useAuth } from "@/contexts/AuthContext";

export default function Member() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isTrainer = user?.user_type === "Trainer";
  const [members, setMembers] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch members, gyms, and trainers on component mount
  useEffect(() => {
    fetchMembers();
    fetchGyms();
    fetchTrainers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await gymServices.getUser();
      let allMembers = res.customers || [];

      // If user is a trainer, filter to show only assigned members
      if (isTrainer && user?.id) {
        allMembers = allMembers.filter(member => {
          if (!member.assignedTrainer) return false;

          // Case 1: assignedTrainer = string
          if (typeof member.assignedTrainer === "string") {
            return member.assignedTrainer === user.id;
          }

          // Case 2: assignedTrainer = object like {_id, name}
          if (typeof member.assignedTrainer === "object") {
            return member.assignedTrainer._id === user.id;
          }

          return false;
        });
      }

      setMembers(allMembers);
    } catch (err) {
      setError(err.message);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchGyms = async () => {
    try {
      const res = await gymServices.getAllGyms();
      setGyms(res.gyms || []);
    } catch (err) {
      console.error("Failed to fetch gyms:", err);
      setGyms([]);
    }
  };

  const fetchTrainers = async () => {
    try {
      const trainers = await gymServices.getAllTrainers();
      setTrainers(trainers || []);
    } catch (err) {
      console.error("Failed to fetch trainers:", err);
      setTrainers([]);
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await gymServices.deleteUser(id);
      await fetchMembers(); // Refresh the list
    } catch (err) {
      alert("Failed to delete member: " + err.message);
    }
  };

  const filteredMembers = members.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.mobile?.includes(search) ||
    (m.email && m.email.toLowerCase().includes(search.toLowerCase()))
  );

  const newMembersThisMonth = members.filter(m =>
    m.createdAt && new Date(m.createdAt) > new Date(Date.now() - 30*24*60*60*1000)
  ).length;

  const handleExport = () => {
    if (filteredMembers.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = ["Name", "Mobile", "Email", "Gym", "Plan", "Assigned Trainer"];
    const csvContent = [
      headers.join(","),
      ...filteredMembers.map(member => [
        `"${member.name || ""}"`,
        `"${member.mobile || ""}"`,
        `"${member.email || ""}"`,
        `"${member.gymId?.name || ""}"`,
        `"${member.plan || ""}"`,
        `"${member.assignedTrainer ? (typeof member.assignedTrainer === "object" ? member.assignedTrainer.name : "Assigned") : ""}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `members_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-teal-50/50 dark:from-teal-900 dark:via-teal-900 dark:to-teal-800 text-foreground py-6 sm:py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-foreground tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  {isTrainer ? "My Members" : "Member"} <span className="text-teal-500 dark:text-teal-400">{isTrainer ? "" : "Management"}</span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">Manage your gym members efficiently</p>
              </div>
              {!isTrainer && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/members/add")}
                  className="group relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10 text-sm sm:text-base">Add Member</span>
                </motion.button>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/90 dark:bg-teal-900/50 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/30 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Members</p>
                    <p className="text-2xl sm:text-3xl font-bold text-teal-600 dark:text-teal-400">{members.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 dark:bg-teal-900/50 backdrop-blur-sm border border-green-200/50 dark:border-green-700/30 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">New This Month</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{newMembersThisMonth}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 dark:bg-teal-900/50 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Gyms</p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{gyms.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                    <Filter className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/90 dark:bg-teal-900/50 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/30 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Active Trainers</p>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{trainers.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, mobile, or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/90 dark:bg-teal-900/50 backdrop-blur-sm border border-input text-foreground rounded-xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all shadow-sm"
                />
              </div>
              <button
                onClick={handleExport}
                className="px-4 py-2.5 sm:py-3 bg-white/90 dark:bg-teal-900/50 backdrop-blur-sm border border-input rounded-xl hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </motion.div>

          {/* Loading/Error States */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading members...</p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-300">Error: {error}</p>
              </div>
            </motion.div>
          )}

          {/* Members Table/Cards */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <div className="bg-white/90 dark:bg-teal-900/50 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/30 rounded-2xl shadow-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-teal-600 to-teal-500">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white">Name</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white">Contact</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white hidden xl:table-cell">Email</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white hidden xl:table-cell">Gym</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white hidden xl:table-cell">Plan</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white hidden xl:table-cell">Assign Trainers</th>
                        {!isTrainer && <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-white">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                          <motion.tr
                            key={member._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.05 }}
                            className="hover:bg-teal-50/50 dark:hover:bg-teal-800/30 transition-colors"
                          >
                            <td className="px-4 sm:px-6 py-3 sm:py-4">
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
                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-teal-500" />
                                <span className="text-foreground">{member.mobile}</span>
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 hidden xl:table-cell">
                              {member.email ? (
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                  <Mail className="w-4 h-4 text-teal-500" />
                                  <span>{member.email}</span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-sm">N/A</span>
                              )}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 hidden xl:table-cell">
                              {member.gymId?.name ? (
                                <span className="px-2 py-1 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 rounded-lg text-xs font-medium">
                                  {member.gymId.name}
                                </span>
                              ) : (
                                <span className="text-muted-foreground text-sm">-</span>
                              )}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 hidden xl:table-cell">
                              {member.plan ? (
                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium">
                                  {member.plan}
                                </span>
                              ) : (
                                <span className="text-muted-foreground text-sm">-</span>
                              )}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 hidden xl:table-cell">
                              {member.assignedTrainer ? (
                                <span className="text-foreground text-sm">
                                  {typeof member.assignedTrainer === "object"
                                    ? member.assignedTrainer.name
                                    : "Assigned"}
                                </span>
                              ) : (
                                <span className="text-muted-foreground text-sm">-</span>
                              )}
                            </td>
                            {!isTrainer && (
                              <td className="px-4 sm:px-6 py-3 sm:py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => navigate(`/members/edit/${member._id}`)}
                                    className="p-2 bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-300 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors"
                                    title="Edit Member"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => deleteMember(member._id)}
                                    className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                    title="Delete Member"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                              </td>
                            )}
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={isTrainer ? "5" : "7"} className="px-4 sm:px-6 py-12 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <Users className="w-12 h-12 text-muted-foreground opacity-50" />
                              <p className="text-muted-foreground">No members found</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <motion.div
                      key={member._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="bg-white/90 dark:bg-teal-900/50 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/30 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {member.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
                            {member.occupation && (
                              <p className="text-xs text-muted-foreground truncate">{member.occupation}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Phone className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          <span className="truncate">{member.mobile}</span>
                        </div>
                        {member.email && (
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <Mail className="w-4 h-4 text-teal-500 flex-shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </div>
                        )}
                        {member.gymId?.name && (
                          <div>
                            <span className="px-2 py-1 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 rounded-lg text-xs font-medium">
                              {member.gymId.name}
                            </span>
                          </div>
                        )}
                        {member.plan && (
                          <div>
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium">
                              {member.plan}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-border">
                        {!isTrainer && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => navigate(`/members/edit/${member._id}`)}
                              className="flex-1 px-3 py-2 bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-300 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => deleteMember(member._id)}
                              className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </motion.button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 bg-white/90 dark:bg-teal-900/50 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/30 rounded-xl p-12 text-center">
                    <Users className="w-16 h-16 text-muted-foreground opacity-50 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No members found</p>
                  </div>
                )}
              </div>

              {/* Footer Count */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Showing {filteredMembers.length} of {members.length} members
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
