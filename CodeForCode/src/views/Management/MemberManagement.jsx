import Layout from "@/components/Layout";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, User, Mail, Crown, Trash2, Users } from "lucide-react";

export default function Member() {
  const [members, setMembers] = useState([
    { id: 1, name: "Aadi Singh", email: "aadi@example.com", plan: "Gold" },
    { id: 2, name: "Rohit Sharma", email: "rohit@example.com", plan: "Silver" },
  ]);
  const [newMember, setNewMember] = useState({ name: "", email: "", plan: "Basic" });
  const [search, setSearch] = useState("");

  const addMember = () => {
    if (!newMember.name || !newMember.email) return;
    setMembers([
      ...members,
      { ...newMember, id: Date.now() }
    ]);
    setNewMember({ name: "", email: "", plan: "Basic" });
  };

  const deleteMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
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

          {/* Add Member Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-gradient-to-br from-teal-900/10 to-teal-800/5 dark:from-teal-900/20 dark:to-teal-800/10 border border-teal-700/20 dark:border-teal-600/30 shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-teal-500 dark:text-teal-400" />
              Add New Member
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Crown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={newMember.plan}
                  onChange={(e) => setNewMember({ ...newMember, plan: e.target.value })}
                  className="w-full bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all appearance-none"
                >
                  <option>Basic</option>
                  <option>Silver</option>
                  <option>Gold</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addMember}
                className="md:col-span-1 rounded-xl border border-teal-500 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-3 font-semibold hover:from-teal-700 hover:to-teal-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Member
              </motion.button>
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

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full rounded-2xl overflow-hidden shadow-sm bg-background border border-border">
              <thead className="bg-gradient-to-r from-teal-600 to-teal-500">
                <tr>
                  <th className="px-5 py-3 text-left text-white font-semibold">Name</th>
                  <th className="px-5 py-3 text-left text-white font-semibold">Email</th>
                  <th className="px-5 py-3 text-left text-white font-semibold">Plan</th>
                  <th className="px-5 py-3 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b border-border hover:bg-teal-900/5 dark:hover:bg-teal-900/10 transition-colors">
                      <td className="px-5 py-3 text-foreground">{member.name}</td>
                      <td className="px-5 py-3 text-foreground">{member.email}</td>
                      <td className="px-5 py-3">
                        <span className={`py-1 px-3 rounded-full text-xs font-semibold
                          ${member.plan === "Gold" ? "bg-yellow-200 text-yellow-800 border border-yellow-300 dark:bg-yellow-300 dark:text-yellow-900" :
                            member.plan === "Silver" ? "bg-gray-300 text-gray-700 border border-gray-400 dark:bg-gray-400 dark:text-gray-800" :
                              "bg-gray-200 text-gray-800 border border-gray-300 dark:bg-gray-300 dark:text-gray-900"}`}>
                          {member.plan}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => deleteMember(member.id)}
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

          <div className="mt-6 text-center text-xs text-muted-foreground">{filteredMembers.length} members</div>
        </div>
      </div>
    </Layout>
  );
}
