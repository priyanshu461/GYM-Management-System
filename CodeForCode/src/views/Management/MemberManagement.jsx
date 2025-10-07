import React, { useState } from "react";
import Layout from "../../components/Layout";

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
      <div className="min-h-screen bg-white text-gray-900 py-10 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Title */}
          <h1 className="text-3xl font-extrabold mb-3 text-gray-900 tracking-tight">Member<span className="text-teal-500">  management</span></h1>
          <p className="text-gray-600 text-base mb-8">Add, search and manage gym members</p>
          
          {/* Add Member Form */}
          <div className="rounded-2xl bg-teal-50 border border-teal-200 shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-5 text-gray-900">Add New Member</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
              <input
                type="text"
                placeholder="Full Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="bg-white border border-gray-300 text-black rounded-xl px-4 py-2 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                className="bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-2 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-200 focus:outline-none"
              />
              <select
                value={newMember.plan}
                onChange={(e) => setNewMember({ ...newMember, plan: e.target.value })}
                className="bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option>Basic</option>
                <option>Silver</option>
                <option>Gold</option>
              </select>
              <button
                onClick={addMember}
                className="rounded-xl border border-teal-500 bg-teal-200 text-green-900 px-4 py-2 font-semibold hover:bg-teal-300 hover:text-teal-950 transition disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="flex justify-between items-center mb-5">
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-2 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          
          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-300">
              <thead className="bg-teal-500">
                <tr>
                  <th className="px-5 py-3 text-left text-gray-100 font-semibold">Name</th>
                  <th className="px-5 py-3 text-left text-gray-100 font-semibold">Email</th>
                  <th className="px-5 py-3 text-left text-gray-100 font-semibold">Plan</th>
                  <th className="px-5 py-3 text-left text-gray-100 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="border border-gray-200 hover:bg-green-100 transition">
                      <td className="px-5 py-3">{member.name}</td>
                      <td className="px-5 py-3">{member.email}</td>
                      <td className="px-5 py-3">
                        <span className={`py-1 px-3 rounded-full text-xs font-semibold
                          ${member.plan === "Gold" ? "bg-yellow-200 text-yellow-800 border border-yellow-300" :
                            member.plan === "Silver" ? "bg-gray-300 text-gray-700 border border-gray-400" :
                              "bg-gray-200 text-gray-800 border border-gray-300"}`}>
                          {member.plan}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => deleteMember(member.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-xl transition shadow text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-5 py-6 text-center text-gray-500">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">{filteredMembers.length} members</div>
        </div>
      </div>
    </Layout>
  );
}