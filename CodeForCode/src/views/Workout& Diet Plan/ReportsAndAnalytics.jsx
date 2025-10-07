import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Layout from "../../components/Layout";


// Default export: a self-contained React component (Tailwind + Recharts)
// To use: import GymAnalyticsDashboard from './GymAnalyticsDashboard';
// Place <GymAnalyticsDashboard /> inside your app. Tailwind must be configured.

export default function ReportsAnalytics({ initialData }) {
  // initialData is optional. If not passed, component uses internal mock data.
  const [range, setRange] = useState("30d");
  const [selectedPlan, setSelectedPlan] = useState("All");

  // Mock data generator (replace with real API data)
  const mockData = useMemo(() => {
    // workouts per day for last 30 days
    const today = new Date();
    const days = 30;
    const workoutTrend = Array.from({ length: days }).map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (days - 1 - i));
      return {
        date: d.toISOString().slice(5, 10), // MM-DD
        workouts: Math.round(10 + Math.sin(i / 4) * 4 + Math.random() * 4),
        caloriesBurned: Math.round(200 + Math.cos(i / 6) * 120 + Math.random() * 80),
      };
    });

    const dietDistribution = [
      { name: "Protein", value: 40 },
      { name: "Carbs", value: 35 },
      { name: "Fats", value: 25 },
    ];

    const plans = [
      {
        id: "W1",
        name: "Strength Builder",
        type: "Workout",
        subscribers: 128,
        avgDurationMin: 48,
        complianceRate: 0.78,
      },
      {
        id: "W2",
        name: "HIIT Blast",
        type: "Workout",
        subscribers: 92,
        avgDurationMin: 30,
        complianceRate: 0.63,
      },
      {
        id: "D1",
        name: "Lean Gains",
        type: "Diet",
        subscribers: 65,
        avgCalories: 2200,
        complianceRate: 0.71,
      },
      {
        id: "D2",
        name: "Keto Starter",
        type: "Diet",
        subscribers: 42,
        avgCalories: 1800,
        complianceRate: 0.59,
      },
    ];

    return { workoutTrend, dietDistribution, plans };
  }, []);

  const data = initialData || mockData;

  // Filter & derived metrics
  const filteredPlans = data.plans.filter((p) => selectedPlan === "All" || p.id === selectedPlan);

  const totalSubscribers = filteredPlans.reduce((s, p) => s + (p.subscribers || 0), 0);
  const avgCompliance =
    filteredPlans.reduce((s, p) => s + (p.complianceRate || 0), 0) / Math.max(1, filteredPlans.length);

  // Colors for pie chart
  const PIE_COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#C084FC"];

  // Simple CSV export for plans
  function exportCSV() {
    const headers = Object.keys(filteredPlans[0] || {});
    const rows = filteredPlans.map((p) => headers.map((h) => (p[h] !== undefined ? p[h] : "")).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plans_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100 min-h-screen">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold">Reports and <span className="text-teal-500 font-extrabold">Analytics</span></h1>
            <p className="text-lg text-slate-500">Dynamic reporting to measure plan performance & member engagement</p>
          </div>

          <div className="flex gap-3 items-center">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>

            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="All">All Plans</option>
              {data.plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <button onClick={exportCSV} className="px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition">
              Export CSV
            </button>
          </div>
        </header>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-5 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-105 text-center">
            <h3 className="text-lg font-semibold text-teal-500">Total Subscribers</h3>
            <p className="text-2xl font-bold mt-2 text-slate-800">{totalSubscribers}</p>
            <p className="text-sm text-slate-500">Across selected plans</p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-5 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-105 text-center">
            <h3 className="text-lg font-semibold text-teal-500">Avg Compliance</h3>
            <p className="text-2xl font-bold mt-2 text-slate-800">{(avgCompliance * 100).toFixed(0)}%</p>
            <p className="text-sm text-slate-500">Member adherence to plans</p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-5 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-105 text-center">
            <h3 className="text-lg font-semibold text-teal-500">Active Plans</h3>
            <p className="text-2xl font-bold mt-2 text-slate-800">{filteredPlans.length}</p>
            <p className="text-sm text-slate-500">Plans in selection</p>
          </div>

          <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-5 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-105 text-center">
            <h3 className="text-lg font-semibold text-teal-500">Avg Workout Duration</h3>
            <p className="text-2xl font-bold mt-2 text-slate-800">
              {Math.round(
                filteredPlans.reduce((s, p) => s + (p.avgDurationMin || p.avgCalories || 0), 0) / Math.max(1, filteredPlans.length)
              )} min
            </p>
            <p className="text-sm text-slate-500">Estimated</p>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart: Workouts & Calories */}
          <div className="col-span-2 bg-gradient-to-br from-teal-50 to-teal-500 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-teal-600">Member Activity (trend)</h3>
              <div className="text-sm text-slate-500">Showing: {range}</div>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.workoutTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#64748b" />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Line type="monotone" dataKey="workouts" stroke="#14b8a6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="caloriesBurned" stroke="#f97316" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Diet macro distribution */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-500 p-5 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-teal-600">Diet Macro Distribution</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.dietDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {data.dietDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Plans table and small bar chart */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-gradient-to-br from-teal-50 to-teal-500 p-5 rounded-2xl shadow-sm overflow-x-auto">
            <h3 className="text-lg font-semibold mb-3 text-teal-600">Plans Overview</h3>
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs text-slate-500 uppercase">
                <tr>
                  <th className="py-2 px-3">Plan</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Subscribers</th>
                  <th className="py-2 px-3">Avg Duration / Calories</th>
                  <th className="py-2 px-3">Compliance</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.map((p) => (
                  <tr key={p.id} className="border-t border-slate-300">
                    <td className="py-3 px-3 font-medium text-slate-800">{p.name}</td>
                    <td className="py-3 px-3 text-slate-600">{p.type}</td>
                    <td className="py-3 px-3 text-slate-800">{p.subscribers}</td>
                    <td className="py-3 px-3 text-slate-800">{p.avgDurationMin || p.avgCalories || "—"}</td>
                    <td className="py-3 px-3 text-slate-800">{Math.round((p.complianceRate || 0) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-500 p-5 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-teal-600">Subscribers by Plan</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.plans} margin={{ left: -20 }}>
                  <XAxis dataKey="name" hide />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="subscribers" radius={[6, 6, 0, 0]} fill="#14b8a6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Small action area */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">Last updated: {new Date().toLocaleString()}</div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-md border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition">Refresh</button>
            <button className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition">Create New Plan</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}