import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Activity,
  Calendar,
  Clock,
  Dumbbell,
  Target,
  TrendingUp,
  Award,
  Filter,
  Flame,
  Users,
  Trophy
} from 'lucide-react';
import MemberSidebar from '@/components/layout/MemberSidebar';
import MemberLayout from '@/components/layout/MemberLayout';

const MemberActivity = () => {
  const { theme } = useTheme();
  const { member } = useAuth();
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const mockActivities = [
      { id: 1, type: 'workout', title: 'Completed Chest Workout', description: 'Bench Press, Push-ups, Chest Flyes', date: '2024-01-15', time: '10:30 AM', duration: '45 min', calories: 320, icon: Dumbbell },
      { id: 2, type: 'goal', title: 'Goal Achieved: Weight Loss', description: 'Lost 2kg this month', date: '2024-01-14', time: '2:15 PM', duration: null, calories: null, icon: Target },
      { id: 3, type: 'class', title: 'Attended Yoga Class', description: 'Morning Yoga Session with Sarah', date: '2024-01-13', time: '8:00 AM', duration: '60 min', calories: 180, icon: Calendar },
      { id: 4, type: 'progress', title: 'Progress Update', description: 'BMI decreased by 0.5 points', date: '2024-01-12', time: '11:45 AM', duration: null, calories: null, icon: TrendingUp },
      { id: 5, type: 'achievement', title: 'Achievement Unlocked', description: 'Completed 10 workouts this month', date: '2024-01-11', time: '4:20 PM', duration: null, calories: null, icon: Award }
    ];
    setActivities(mockActivities);
  }, []);

  const getActivityColor = useCallback((type) => {
    switch (type) {
      case 'workout': return 'text-blue-500';
      case 'goal': return 'text-green-500';
      case 'class': return 'text-purple-500';
      case 'progress': return 'text-orange-500';
      case 'achievement': return 'text-yellow-500';
      default: return 'text-teal-500';
    }
  }, []);

  const getActivityBg = useCallback((type) => {
    switch (type) {
      case 'workout': return theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50';
      case 'goal': return theme === 'dark' ? 'bg-green-900' : 'bg-green-50';
      case 'class': return theme === 'dark' ? 'bg-purple-900' : 'bg-purple-50';
      case 'progress': return theme === 'dark' ? 'bg-orange-900' : 'bg-orange-50';
      case 'achievement': return theme === 'dark' ? 'bg-yellow-900' : 'bg-yellow-50';
      default: return theme === 'dark' ? 'bg-teal-900' : 'bg-teal-50';
    }
  }, [theme]);

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => filter === 'all' || activity.type === filter);
  }, [activities, filter]);

  const handleFilterChange = useCallback((newFilter) => setFilter(newFilter), []);

  const workoutCount = useMemo(() => activities.filter(a => a.type === 'workout').length, [activities]);
  const achievementCount = useMemo(() => activities.filter(a => a.type === 'achievement').length, [activities]);
  const goalCount = useMemo(() => activities.filter(a => a.type === 'goal').length, [activities]);

  return (
      <MemberLayout>
    <div className={`min-h-screen flex w-full ${theme === 'dark' ? 'bg-teal-950' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>
      <div className={`flex-1 p-8 w-full min-h-screen relative overflow-hidden ${theme === 'dark'
          ? 'bg-gradient-to-br from-teal-950 via-teal-900 to-teal-950 text-white'
          : 'bg-gradient-to-br from-teal-50 via-slate-50 to-teal-100'}`}>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, ${theme === 'dark' ? '#14b8a6' : '#0f766e'} 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, ${theme === 'dark' ? '#14b8a6' : '#0f766e'} 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Header */}
        <header className="mb-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}
          >
            Activity <span className="text-teal-500">Log</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}
          >
            Track your fitness journey and achievements
          </motion.p>
        </header>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 relative z-10"
        >
          <div className="flex items-center justify-center space-x-4">
            <Filter className="h-5 w-5 text-teal-500" />
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { value: 'all', label: 'All Activities', icon: Activity },
                { value: 'workout', label: 'Workouts', icon: Dumbbell },
                { value: 'class', label: 'Classes', icon: Users },
                { value: 'goal', label: 'Goals', icon: Target },
                { value: 'progress', label: 'Progress', icon: TrendingUp },
                { value: 'achievement', label: 'Achievements', icon: Trophy }
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleFilterChange(option.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-300 ${
                      filter === option.value
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                        : theme === 'dark'
                          ? 'bg-teal-800/50 backdrop-blur-sm text-teal-100 hover:bg-teal-700/70 border border-teal-600/30'
                          : 'bg-white/70 backdrop-blur-sm text-teal-700 hover:bg-teal-50/80 border border-teal-200/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Activities Timeline */}
        <div className="relative w-full px-4 sm:px-8 lg:px-12">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-teal-500 to-teal-600 opacity-30"></div>
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {filteredActivities.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Activity className="h-16 w-16 text-teal-300 mx-auto mb-4" />
                  </motion.div>
                  <p className={`text-lg ${theme === 'dark' ? 'text-teal-300' : 'text-teal-600'}`}>
                    No activities found for the selected filter.
                  </p>
                </motion.div>
              ) : (
                filteredActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative flex items-start space-x-6"
                    >
                      <motion.div
                        className={`flex-shrink-0 w-4 h-4 rounded-full ${getActivityColor(activity.type)} border-4 ${theme === 'dark' ? 'border-teal-800' : 'border-white'} shadow-lg`}
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          boxShadow: theme === 'dark'
                            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                        className={`flex-1 p-6 rounded-2xl backdrop-blur-sm border ${
                          theme === 'dark'
                            ? 'bg-teal-800/40 border-teal-600/30 shadow-xl'
                            : 'bg-white/70 border-teal-200/50 shadow-lg'
                        } ${getActivityBg(activity.type)}`}
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`p-3 rounded-xl ${getActivityColor(activity.type)} ${
                              theme === 'dark' ? 'bg-teal-700/50' : 'bg-white/80'
                            } shadow-md`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
                                {activity.title}
                              </h3>
                              <div className="flex items-center space-x-3 text-sm opacity-75">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{activity.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{activity.time}</span>
                                </div>
                              </div>
                            </div>
                            <p className={`mb-4 text-sm leading-relaxed ${theme === 'dark' ? 'text-teal-200' : 'text-slate-600'}`}>
                              {activity.description}
                            </p>
                            <div className="flex items-center space-x-6 text-sm">
                              {activity.duration && (
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-teal-500" />
                                  <span className={`font-medium ${theme === 'dark' ? 'text-teal-300' : 'text-slate-600'}`}>
                                    {activity.duration}
                                  </span>
                                </div>
                              )}
                              {activity.calories && (
                                <div className="flex items-center space-x-2">
                                  <Flame className="h-4 w-4 text-orange-500" />
                                  <span className={`font-medium ${theme === 'dark' ? 'text-teal-300' : 'text-slate-600'}`}>
                                    {activity.calories} cal
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    </MemberLayout>
  );
};

export default MemberActivity;
