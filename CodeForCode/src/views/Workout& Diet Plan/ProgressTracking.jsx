import React, { useState } from "react";
// import { Progress } from "@material-tailwind/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";

const ProgressTracker = () => {
  const { theme } = useTheme();

  // Example progress data (can be fetched dynamically from backend)
  const [progressData] = useState([
    { month: "Jan", weight: 80 },
    { month: "Feb", weight: 78 },
    { month: "Mar", weight: 76 },
    { month: "Apr", weight: 75 },
    { month: "May", weight: 73 },
  ]);

  const currentWeight = progressData[progressData.length - 1].weight;
  const goalWeight = 70;
  const progressPercent = ((80 - currentWeight) / (80 - goalWeight)) * 100;

  return (
    <Layout>
      <div className={`p-6 max-w-6xl mx-auto min-h-screen ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black'
          : 'bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100'
      }`}>
        <header className="mb-6">
          <h1 className={`text-2xl font-extrabold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Progress <span className="text-teal-500 font-extrabold">Tracker</span>
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-500'
          }`}>
            Track your fitness journey and achievements
          </p>
        </header>

        {/* Progress Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`p-5 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-105 text-center ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-700 to-gray-800'
              : 'bg-gradient-to-br from-teal-50 to-teal-100'
          }`}>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-500'
            }`}>
              Current Weight
            </h3>
            <p className={`text-2xl font-bold mt-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              {currentWeight} kg
            </p>
          </div>
          <div className={`p-5 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-105 text-center ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-700 to-gray-800'
              : 'bg-gradient-to-br from-teal-50 to-teal-100'
          }`}>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-500'
            }`}>
              Goal Weight
            </h3>
            <p className={`text-2xl font-bold mt-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              {goalWeight} kg
            </p>
          </div>
          <div className={`p-5 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:scale-105 text-center ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-700 to-gray-800'
              : 'bg-gradient-to-br from-teal-100 to-teal-50'
          }`}>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-500'
            }`}>
              Progress
            </h3>
            <p className={`text-2xl font-bold mt-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              {progressPercent.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`p-5 rounded-2xl shadow-sm mb-8 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-700 to-gray-800'
            : 'bg-gradient-to-br from-teal-50 to-teal-100'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 ${
            theme === 'dark' ? 'text-teal-400' : 'text-teal-500'
          }`}>
            Weight Loss Progress
          </h3>
          <div className={`w-full rounded-full h-4 ${
            theme === 'dark' ? 'bg-gray-600' : 'bg-slate-300'
          }`}>
            <div
              className={`h-4 rounded-full transition-all ${
                theme === 'dark' ? 'bg-teal-900' : 'bg-teal-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Area Chart */}
        <div className={`p-5 rounded-2xl shadow-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-700 to-gray-800'
            : 'bg-gradient-to-br from-teal-50 to-teal-500'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 ${
            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
          }`}>
            Weight Progress Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4b5563' : '#64748b'} />
              <XAxis dataKey="month" stroke={theme === 'dark' ? '#9ca3af' : '#64748b'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#64748b'} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="weight"
                stroke={theme === 'dark' ? '#0f766e' : '#14b8a6'}
                fill={theme === 'dark' ? '#0f766e' : '#14b8a6'}
                fillOpacity={0.3}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

export default ProgressTracker;
