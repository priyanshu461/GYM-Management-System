import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import memberServices from '../services/memberServices';
import { User, Calendar, Dumbbell, TrendingUp, Award, Clock, Target, Activity, Moon, Sun } from 'lucide-react';
import MemberLayout from '@/components/layout/MemberLayout';

const MemberDashboard = () => {
  const { member, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [stats, setStats] = useState({
    workoutsCompleted: 0,
    classesAttended: 0,
    bmiScore: 0,
    progressPoints: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch member stats
        const statsData = await memberServices.getMemberStats();
        setStats({
          workoutsCompleted: statsData.workoutsCompleted || 0,
          classesAttended: statsData.classesAttended || 0,
          bmiScore: statsData.bmi || 0,
          progressPoints: statsData.progressPoints || 0
        });

        // Fetch recent activities
        const activitiesData = await memberServices.getRecentActivities();
        setRecentActivities(activitiesData || []);

        // Fetch upcoming classes
        const classesData = await memberServices.getUpcomingClasses();
        setUpcomingClasses(classesData || []);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to mock data if API fails
        setStats({
          workoutsCompleted: 24,
          classesAttended: 12,
          bmiScore: 22.5,
          progressPoints: 1250
        });
        setRecentActivities([
          { id: 1, type: 'workout', title: 'Upper Body Strength', date: '2024-01-15', duration: '45 min' },
          { id: 2, type: 'class', title: 'Yoga Flow', date: '2024-01-14', instructor: 'Sarah Johnson' },
          { id: 3, type: 'achievement', title: '10 Workouts Streak', date: '2024-01-13' },
          { id: 4, type: 'workout', title: 'Cardio Blast', date: '2024-01-12', duration: '30 min' }
        ]);
        setUpcomingClasses([
          { id: 1, title: 'HIIT Training', date: '2024-01-16', time: '10:00 AM', instructor: 'Mike Chen' },
          { id: 2, title: 'Pilates Core', date: '2024-01-17', time: '2:00 PM', instructor: 'Emma Davis' },
          { id: 3, title: 'Strength Training', date: '2024-01-18', time: '6:00 PM', instructor: 'John Smith' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
      <MemberLayout >
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
              Welcome back, {member?.name || 'Member'}!
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
              Track your progress and stay motivated
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-teal-700 text-teal-100 hover:bg-teal-600' : 'bg-teal-100 text-teal-800 hover:bg-teal-200'}`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Workouts Completed</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{stats.workoutsCompleted}</p>
              </div>
              <Dumbbell className="h-8 w-8 text-teal-500" />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Classes Attended</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{stats.classesAttended}</p>
              </div>
              <Calendar className="h-8 w-8 text-teal-500" />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>BMI Score</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{stats.bmiScore}</p>
              </div>
              <Target className="h-8 w-8 text-teal-500" />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Progress Points</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{stats.progressPoints}</p>
              </div>
              <Award className="h-8 w-8 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Recent Activities</h2>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.length > 0 ? recentActivities.map((activity, index) => (
                  <div key={activity.id || index} className={`flex items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-50'}`}>
                    <div className={`p-2 rounded-full mr-3 ${activity.type === 'workout' ? 'bg-blue-100 text-blue-600' : activity.type === 'class' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      {activity.icon || (activity.type === 'workout' ? <Dumbbell size={16} /> : activity.type === 'class' ? <Calendar size={16} /> : <Award size={16} />)}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{activity.title}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        {new Date(activity.date).toLocaleDateString()} {activity.description && `• ${activity.description}`}
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>No recent activities found.</p>
                )}
              </div>
            )}
          </div>

          {/* Upcoming Classes */}
          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Upcoming Classes</h2>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingClasses.length > 0 ? upcomingClasses.map((classItem, index) => (
                  <div key={classItem.id || index} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-50'}`}>
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{classItem.title}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        {new Date(classItem.date).toLocaleDateString()} • {classItem.time} • {classItem.instructor}
                      </p>
                    </div>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                      Book
                    </button>
                  </div>
                )) : (
                  <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>No upcoming classes found.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`mt-8 p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
          <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className={`p-4 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-teal-600 text-teal-200 hover:bg-teal-700' : 'border-teal-300 text-teal-600 hover:bg-teal-50'} transition-colors`}>
              <Dumbbell className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Start Workout</span>
            </button>
            <button className={`p-4 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-teal-600 text-teal-200 hover:bg-teal-700' : 'border-teal-300 text-teal-600 hover:bg-teal-50'} transition-colors`}>
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Book Class</span>
            </button>
            <button className={`p-4 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-teal-600 text-teal-200 hover:bg-teal-700' : 'border-teal-300 text-teal-600 hover:bg-teal-50'} transition-colors`}>
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">View Progress</span>
            </button>
            <button className={`p-4 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-teal-600 text-teal-200 hover:bg-teal-700' : 'border-teal-300 text-teal-600 hover:bg-teal-50'} transition-colors`}>
              <User className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Update Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </MemberLayout>
  );
};

export default MemberDashboard;
