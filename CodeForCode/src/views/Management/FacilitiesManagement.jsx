import React, { useState } from "react";
import Layout from "../../components/Layout";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const Facilities = () => {
  const [facilities, setFacilities] = useState([
    { id: 1, name: "Treadmill", type: "Cardio", status: "Available", usage: 70 },
    { id: 2, name: "Swimming Pool", type: "Recreation", status: "Unavailable", usage: 40 },
    { id: 3, name: "Yoga Hall", type: "Wellness", status: "Available", usage: 55 },
    { id: 4, name: "Weight Section", type: "Strength", status: "Available", usage: 85 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [formData, setFormData] = useState({
    name: "", type: "", status: "Available", usage: 0
  });

  // Input change handler
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add or Update facility
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFacility) {
      setFacilities(
        facilities.map((f) =>
          f.id === editingFacility.id ? { ...formData, id: f.id } : f
        )
      );
      setEditingFacility(null);
    } else {
      setFacilities([...facilities, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", type: "", status: "Available", usage: 0 });
    setShowForm(false);
  };

  // Edit
  const handleEdit = (facility) => {
    setEditingFacility(facility);
    setFormData(facility);
    setShowForm(true);
  };

  // Delete
  const handleDelete = (id) => setFacilities(facilities.filter((f) => f.id !== id));

  // Chart Data
  const statusData = [
    { name: "Available", value: facilities.filter(f => f.status === "Available").length },
    { name: "Unavailable", value: facilities.filter(f => f.status === "Unavailable").length },
  ];
  const usageData = facilities.map(f => ({ name: f.name, usage: f.usage }));

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Facilities <span className="text-teal-500">Management</span></h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-teal-700 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            + Add Facility
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-teal-100 p-5 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold text-teal-700">Total Facilities</h3>
            <p className="text-3xl font-bold text-teal-900">{facilities.length}</p>
          </div>
          <div className="bg-teal-100 p-5 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold text-teal-700">Available</h3>
            <p className="text-3xl font-bold text-teal-900">
              {facilities.filter(f => f.status === "Available").length}
            </p>
          </div>
          <div className="bg-teal-100 p-5 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold text-teal-700">Unavailable</h3>
            <p className="text-3xl font-bold text-teal-900">
              {facilities.filter(f => f.status === "Unavailable").length}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-teal-50 p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Facility Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} dataKey="value" outerRadius={80} fill="#8884d8" label>
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-teal-50 p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-teal-700 mb-3">Facility Usage (%)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usage" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Facilities Table */}
        <div className="overflow-x-auto bg-teal-50 shadow-lg rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-teal-900">
                <th className="px-6 py-3">Facility Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Usage %</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr key={facility.id} className="border-b hover:bg-teal-100 transition">
                  <td className="px-6 py-4 font-medium">{facility.name}</td>
                  <td className="px-6 py-4">{facility.type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        facility.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {facility.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{facility.usage}%</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(facility)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(facility.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {facilities.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No facilities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">
                {editingFacility ? "Edit Facility" : "Add Facility"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Facility Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Facility Type (e.g., Cardio, Wellness)"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                >
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
                <input
                  type="number"
                  name="usage"
                  placeholder="Usage %"
                  min="0"
                  max="100"
                  value={formData.usage}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingFacility(null);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingFacility ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Facilities;
