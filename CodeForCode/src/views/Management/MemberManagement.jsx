import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Search, User, Mail, Crown, Trash2, Users, X, Phone, MapPin, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import gymServices from "@/services/gymServices";

export default function Member() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    mobile: "",
    email: "",
    aadharNo: "",
    address: "",
    emergencyContact: "",
    dob: "",
    gender: "",
    occupation: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await gymServices.getCustomers();
      setMembers(res.customers || []);
    } catch (err) {
      setError(err.message);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async () => {
    // Validate required fields
    if (!newMember.name || !newMember.mobile || !newMember.aadharNo) {
      alert("Please fill in all required fields (Name, Mobile, Aadhar Number)");
      return;
    }

    try {
      setIsSubmitting(true);
      await gymServices.addCustomer(newMember);
      await fetchMembers(); // Refresh the list
      setIsModalOpen(false);
      setNewMember({
        name: "",
        mobile: "",
        email: "",
        aadharNo: "",
        address: "",
        emergencyContact: "",
        dob: "",
        gender: "",
        occupation: ""
      });
    } catch (err) {
      alert("Failed to add member: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMember = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      await gymServices.deleteCustomer(id);
      await fetchMembers(); // Refresh the list
    } catch (err) {
      alert("Failed to delete member: " + err.message);
    }
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.mobile.includes(search) ||
    (m.email && m.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground py-10 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-extrabold mb-3 text-foreground tracking-tight">
              <Users className="inline-block w-10 h-10 mr-3 text-teal-500 dark:text-teal-400" />
              Member<span className="text-teal-500 dark:text-teal-400"> Management</span>
            </h1>
            <p className="text-muted-foreground text-lg">Add, search and manage gym members efficiently</p>
          </motion.div>

          {/* Add Member Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-8"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-teal-400/5 to-teal-600/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-teal-500/20 rounded-3xl blur-xl"></div>

            <div className="relative bg-gradient-to-br from-white/80 to-teal-50/50 dark:from-teal-900/20 dark:to-teal-800/20 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/30 rounded-3xl shadow-2xl p-8 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/15 to-teal-700/15 rounded-full blur-xl translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  {/* Left Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-center lg:justify-start gap-3 mb-4"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <UserPlus className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                          Add New Member
                        </h2>
                        <p className="text-muted-foreground text-sm">Expand your gym community</p>
                      </div>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-muted-foreground mb-6 max-w-md"
                    >
                      Welcome new members to your fitness family. Collect essential information and get them started on their fitness journey.
                    </motion.p>

                    {/* Quick Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-center lg:justify-start gap-6 mb-6"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{filteredMembers.length}</div>
                        <div className="text-xs text-muted-foreground">Total Members</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {members.filter(m => m.createdAt && new Date(m.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length}
                        </div>
                        <div className="text-xs text-muted-foreground">This Month</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Content - CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex-shrink-0"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsModalOpen(true)}
                      className="group relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Button Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                      {/* Button Content */}
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <UserPlus className="w-4 h-4" />
                        </div>
                        <span className="text-lg">Add Member</span>
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine rounded-2xl"></div>
                    </motion.button>

                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                  </motion.div>
                </div>

                {/* Bottom Decorative Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-teal-500/50 via-teal-400/70 to-teal-500/50 rounded-full mt-6 origin-left"
                ></motion.div>
              </div>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between items-center mb-6"
          >
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>
          </motion.div>

          {/* Loading/Error States */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading members...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 dark:text-red-300">Error: {error}</p>
              </div>
            </div>
          )}

          {/* Members Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full rounded-2xl overflow-hidden shadow-sm bg-background border border-border">
                <thead className="bg-gradient-to-r from-teal-600 to-teal-500">
                  <tr>
                    <th className="px-5 py-3 text-left text-white font-semibold">Name</th>
                    <th className="px-5 py-3 text-left text-white font-semibold">Mobile</th>
                    <th className="px-5 py-3 text-left text-white font-semibold">Email</th>
                    <th className="px-5 py-3 text-left text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr key={member._id} className="border-b border-border hover:bg-teal-900/5 dark:hover:bg-teal-900/10 transition-colors">
                        <td className="px-5 py-3 text-foreground">{member.name}</td>
                        <td className="px-5 py-3 text-foreground">{member.mobile}</td>
                        <td className="px-5 py-3 text-foreground">{member.email || "N/A"}</td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => deleteMember(member._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl transition shadow text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-5 py-6 text-center text-muted-foreground">
                        No members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 text-center text-xs text-muted-foreground">{filteredMembers.length} members</div>
        </div>
      </div>

      {/* Add Member Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <UserPlus className="w-6 h-6 text-teal-500" />
                    Add New Member
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={newMember.mobile}
                      onChange={(e) => setNewMember({ ...newMember, mobile: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter 10-digit mobile number"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Aadhar Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Aadhar Number *
                    </label>
                    <input
                      type="text"
                      value={newMember.aadharNo}
                      onChange={(e) => setNewMember({ ...newMember, aadharNo: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter 12-digit aadhar number"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </label>
                    <textarea
                      value={newMember.address}
                      onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all resize-none"
                      placeholder="Enter address"
                      rows="3"
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={newMember.emergencyContact}
                      onChange={(e) => setNewMember({ ...newMember, emergencyContact: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter emergency contact"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={newMember.dob}
                      onChange={(e) => setNewMember({ ...newMember, dob: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Gender</label>
                    <select
                      value={newMember.gender}
                      onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Occupation */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">Occupation</label>
                    <input
                      type="text"
                      value={newMember.occupation}
                      onChange={(e) => setNewMember({ ...newMember, occupation: e.target.value })}
                      className="w-full bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                      placeholder="Enter occupation"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-border">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addMember}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl hover:from-teal-700 hover:to-teal-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Add Member
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
