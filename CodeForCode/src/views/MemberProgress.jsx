import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { TrendingUp, Target, Calendar, Award, Activity, Weight, Ruler, Heart } from 'lucide-react';
import Layout from '@/components/Layout';

const MemberProgress = () => {
  const { member } = useAuth();
  const { theme } = useTheme();
  const [progressData, setProgressData] = useState([]);
  const [timeRange, setTimeRange] = useState('30'); // 7, 30, 90 days

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockProgress = [
      {
        date: '2024-01-15',
        weight: 75.5,
        bmi: 22.5,
        bodyFat: 18.2,
        muscleMass: 65.3,
        workoutsCompleted: 12,
        caloriesBurned: 2400
      },
      {
        date: '2024-01-08',
        weight: 76.2,
        bmi: 22.7,
        bodyFat: 18.5,
        muscleMass: 64.8,
        workoutsCompleted: 10,
        caloriesBurned: 2100
      },
      {
        date: '2024-01-01',
        weight: 77.0,
        bmi: 23.0,
        bodyFat: 19.0,
        muscleMass: 64.2,
        workoutsCompleted: 8,
        caloriesBurned: 1800
      }
    ];
    setProgressData(mockProgress);
  }, []);

  const currentStats = progressData[0] || {};
  const previousStats = progressData[1] || {};

  const calculateChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return '↗️';
    if (change < 0) return '↘️';
    return '→';
  };

  return (
    <Layout>
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
              My Progress
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
              Track your fitness journey and achievements
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-teal-800 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Current Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Weight</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{currentStats.weight} kg</p>
                <p className={`text-sm ${getChangeColor(calculateChange(currentStats.weight, previousStats.weight))}`}>
                  {getChangeIcon(calculateChange(currentStats.weight, previousStats.weight))} {Math.abs(calculateChange(currentStats.weight, previousStats.weight))}% from last week
                </p>
              </div>
              <Weight className="h-8 w-8 text-teal-500" />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>BMI</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{currentStats.bmi}</p>
                <p className={`text-sm ${getChangeColor(calculateChange(currentStats.bmi, previousStats.bmi))}`}>
                  {getChangeIcon(calculateChange(currentStats.bmi, previousStats.bmi))} {Math.abs(calculateChange(currentStats.bmi, previousStats.bmi))}% from last week
                </p>
              </div>
              <Target className="h-8 w-8 text-teal-500" />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Workouts</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{currentStats.workoutsCompleted}</p>
                <p className={`text-sm ${getChangeColor(calculateChange(currentStats.workoutsCompleted, previousStats.workoutsCompleted))}`}>
                  {getChangeIcon(calculateChange(currentStats.workoutsCompleted, previousStats.workoutsCompleted))} {Math.abs(calculateChange(currentStats.workoutsCompleted, previousStats.workoutsCompleted))}% from last week
                </p>
              </div>
              <Activity className="h-8 w-8 text-teal-500" />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Calories Burned</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{currentStats.caloriesBurned}</p>
                <p className={`text-sm ${getChangeColor(calculateChange(currentStats.caloriesBurned, previousStats.caloriesBurned))}`}>
                  {getChangeIcon(calculateChange(currentStats.caloriesBurned, previousStats.caloriesBurned))} {Math.abs(calculateChange(currentStats.caloriesBurned, previousStats.caloriesBurned))}% from last week
                </p>
              </div>
              <Heart className="h-8 w-8 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Detailed Progress Table */}
        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Progress History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${theme === 'dark' ? 'border-teal-600' : 'border-teal-200'}`}>
                  <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>Date</th>
                  <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>Weight (kg)</th>
                  <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>BMI</th>
                  <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>Body Fat (%)</th>
                  <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>Muscle Mass (kg)</th>
                  <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>Workouts</th>
                  <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>Calories</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((entry, index) => (
                  <tr key={index} className={`border-b ${theme === 'dark' ? 'border-teal-700' : 'border-teal-100'}`}>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{entry.weight}</td>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{entry.bmi}</td>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{entry.bodyFat}%</td>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{entry.muscleMass}</td>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{entry.workoutsCompleted}</td>
                    <td className={`py-3 px-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{entry.caloriesBurned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Goals Section */}
        <div className={`mt-8 p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Current Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-50'}`}>
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-teal-500" size={20} />
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Weight Goal</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Target: 72 kg (Lose 3.5 kg)</p>
              <div className="w-full bg-teal-200 rounded-full h-2 mt-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-50'}`}>
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-teal-500" size={20} />
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Workout Goal</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Complete 15 workouts this month</p>
              <div className="w-full bg-teal-200 rounded-full h-2 mt-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default MemberProgress;
