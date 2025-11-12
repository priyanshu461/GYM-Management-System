import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import MemberSidebar from '../components/layout/MemberSidebar';
import { Target, Plus, Edit, Trash2, CheckCircle, Clock, TrendingUp, Calendar } from 'lucide-react';

const MemberGoals = () => {
  const { member } = useAuth();
  const { theme } = useTheme();
  const [goals, setGoals] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'fitness',
    targetValue: '',
    currentValue: 0,
    unit: 'kg',
    deadline: '',
    priority: 'medium'
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockGoals = [
      {
        id: 1,
        title: 'Lose 5kg',
        description: 'Reach target weight of 75kg',
        category: 'fitness',
        targetValue: 75,
        currentValue: 77.5,
        unit: 'kg',
        deadline: '2024-02-01',
        priority: 'high',
        status: 'in_progress',
        createdAt: '2024-01-01',
        progress: 50
      },
      {
        id: 2,
        title: 'Bench Press 100kg',
        description: 'Increase bench press strength',
        category: 'strength',
        targetValue: 100,
        currentValue: 85,
        unit: 'kg',
        deadline: '2024-03-01',
        priority: 'medium',
        status: 'in_progress',
        createdAt: '2024-01-05',
        progress: 85
      },
      {
        id: 3,
        title: 'Run 5km',
        description: 'Complete 5km run without stopping',
        category: 'cardio',
        targetValue: 5,
        currentValue: 5,
        unit: 'km',
        deadline: '2024-01-15',
        priority: 'low',
        status: 'completed',
        createdAt: '2024-01-01',
        progress: 100
      }
    ];
    setGoals(mockGoals);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGoal) {
      setGoals(prev => prev.map(goal =>
        goal.id === editingGoal.id
          ? { ...goal, ...formData, progress: Math.round((formData.currentValue / formData.targetValue) * 100) }
          : goal
      ));
      setEditingGoal(null);
    } else {
      const newGoal = {
        id: Date.now(),
        ...formData,
        status: 'in_progress',
        createdAt: new Date().toISOString().split('T')[0],
        progress: Math.round((formData.currentValue / formData.targetValue) * 100)
      };
      setGoals(prev => [...prev, newGoal]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'fitness',
      targetValue: '',
      currentValue: 0,
      unit: 'kg',
      deadline: '',
      priority: 'medium'
    });
    setShowAddForm(false);
    setEditingGoal(null);
  };

  const startEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      targetValue: goal.targetValue,
      currentValue: goal.currentValue,
      unit: goal.unit,
      deadline: goal.deadline,
      priority: goal.priority
    });
    setShowAddForm(true);
  };

  const deleteGoal = (goalId) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const updateProgress = (goalId, newValue) => {
    setGoals(prev => prev.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            currentValue: newValue,
            progress: Math.round((newValue / goal.targetValue) * 100),
            status: newValue >= goal.targetValue ? 'completed' : 'in_progress'
          }
        : goal
    ));
  };

  const getCategoryColor = (category) => {
    const colors = {
      fitness: 'bg-blue-100 text-blue-800',
      strength: 'bg-red-100 text-red-800',
      cardio: 'bg-purple-100 text-purple-800',
      nutrition: 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const activeGoals = goals.filter(g => g.status === 'in_progress');
  const completedGoals = goals.filter(g => g.status === 'completed');

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>
      <MemberSidebar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
              My Goals
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
              Set and track your fitness objectives
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Goal
          </button>
        </div>

        {/* Add/Edit Goal Form */}
        {showAddForm && (
          <div className={`mb-8 p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
              {editingGoal ? 'Edit Goal' : 'Add New Goal'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                >
                  <option value="fitness">Fitness</option>
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="nutrition">Nutrition</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                  Target Value
                </label>
                <input
                  type="number"
                  value={formData.targetValue}
                  onChange={(e) => setFormData({...formData, targetValue: parseFloat(e.target.value)})}
                  className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                  Current Value
                </label>
                <input
                  type="number"
                  value={formData.currentValue}
                  onChange={(e) => setFormData({...formData, currentValue: parseFloat(e.target.value)})}
                  className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                  Unit
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                  placeholder="kg, km, hours, etc."
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                  Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                  rows="3"
                />
              </div>
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {editingGoal ? 'Update Goal' : 'Add Goal'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Active Goals */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
            Active Goals ({activeGoals.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeGoals.map((goal) => (
              <div
                key={goal.id}
                className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-teal-700 border-teal-600' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{goal.title}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>{goal.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(goal)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(goal.priority)}`}>
                    {goal.priority} priority
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}>
                      Progress: {goal.currentValue} / {goal.targetValue} {goal.unit}
                    </span>
                    <span className={theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}>{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-teal-300' : 'text-teal-500'}>
                    <Calendar size={14} className="inline mr-1" />
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                  <input
                    type="number"
                    value={goal.currentValue}
                    onChange={(e) => updateProgress(goal.id, parseFloat(e.target.value))}
                    className={`w-20 px-2 py-1 text-sm border rounded ${theme === 'dark' ? 'bg-teal-600 text-white border-teal-500' : 'bg-white text-teal-900 border-teal-200'}`}
                    step="0.1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Goals */}
        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
            Completed Goals ({completedGoals.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedGoals.map((goal) => (
              <div
                key={goal.id}
                className={`p-4 rounded-lg border-2 border-green-300 ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div className="flex-1">
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{goal.title}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>{goal.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(goal.category)}`}>
                        {goal.category}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-teal-300' : 'text-teal-500'}`}>
                        Completed {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberGoals;
