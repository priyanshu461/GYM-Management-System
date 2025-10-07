import React, { useState } from "react";
import Layout from "../../components/Layout"

const Finance = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-10-01", type: "Income", amount: 5000, description: "Membership Fees" },
    { id: 2, date: "2025-10-02", type: "Expense", amount: 2000, description: "Equipment Maintenance" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({ date: "", type: "Income", amount: "", description: "" });

  // Handle input change
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add / Update transaction
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) => (t.id === editingTransaction.id ? { ...formData, id: t.id, amount: Number(formData.amount) } : t))
      );
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, { ...formData, id: Date.now(), amount: Number(formData.amount) }]);
    }
    setFormData({ date: "", type: "Income", amount: "", description: "" });
    setShowForm(false);
  };

  // Edit
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData(transaction);
    setShowForm(true);
  };

  // Delete
  const handleDelete = (id) => setTransactions(transactions.filter((t) => t.id !== id));

  // Summary
  const totalIncome = transactions.filter((t) => t.type === "Income").reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "Expense").reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
   <Layout>
     <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-flex-800">Finance  <span className="text-teal-300 font-lg">Management</span></h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-teal-700 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          + Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-5 bg-teal-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-teal-900">Total Income</h2>
          <p className="text-2xl font-bold">₹{totalIncome}</p>
        </div>
        <div className="p-5 bg-teal-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-teal-900">Total Expense</h2>
          <p className="text-2xl font-bold">₹{totalExpense}</p>
        </div>
        <div className="p-5 bg-teal-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-teal-900">Balance</h2>
          <p className="text-2xl font-bold">₹{balance}</p>
        </div>
      </div>

      {/* Finance Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-teal-500 text-gray-700">
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b hover:bg-teal-50 transition">
                <td className="px-6 py-4">{t.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      t.type === "Income" ? "bg-teal-100 text-green-700" : "bg-teal-100 text-teal-400"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">₹{t.amount}</td>
                <td className="px-6 py-4">{t.description}</td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(t)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No transactions found.
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
            <h2 className="text-lg font-bold mb-4">{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option>Income</option>
                <option>Expense</option>
              </select>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTransaction(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {editingTransaction ? "Update" : "Add"}
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

export default Finance;