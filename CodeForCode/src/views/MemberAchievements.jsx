import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Award, Trophy, Star, Target, Flame, Calendar, TrendingUp, Medal } from 'lucide-react';
import Layout from '@/components/Layout';

const MemberAchievements = () => {
  const { member } = useAuth();
  const { theme } = useTheme();
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockAchievements = [
      {
        id: 1,
        title: 'First Workout',
        description: 'Completed your first workout session',
        icon: 'Star',
        earned: true,
        earnedDate: '2024-01-01',
        category: 'milestones'
      },
      {
        id: 2,
        title: 'Week Warrior',
        description: 'Completed 7 consecutive workout days',
        icon: 'Flame',
        earned: true,
        earnedDate: '2024-01-08',
        category: 'consistency'
      },
      {
        id: 3,
        title: 'Strength Master',
        description: 'Lifted 100kg in bench press',
        icon: 'Trophy',
        earned: true,
        earnedDate: '2024-01-10',
        category: 'strength'
      },
      {
        id: 4,
        title: 'Marathon Runner',
        description: 'Ran 5km without stopping',
        icon: 'Target',
        earned: false,
        earnedDate: null,
        category: 'cardio'
      },
      {
        id: 5,
        title: 'Consistency King',
        description: '30 days of continuous workouts',
        icon: 'Calendar',
        earned: false,
        earnedDate: null,
        category: 'consistency'
      },
      {
        id: 6,
        title: 'Weight Loss Champion',
        description: 'Lost 5kg in one month',
        icon: 'TrendingUp',
        earned: false,
        earnedDate: null,
        category: 'progress'
      }
    ];

    const mockStats = {
      totalEarned: 3,
      totalAchievements: 6,
      currentStreak: 12,
      longestStreak: 15,
      totalWorkouts: 45,
      totalHours: 67
    };

    setAchievements(mockAchievements);
    setStats(mockStats);
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      Star: <Star className="w-8 h-8" />,
      Flame: <Flame className="w-8 h-8" />,
      Trophy: <Trophy className="w-8 h-8" />,
      Target: <Target className="w-8 h-8" />,
      Calendar: <Calendar className="w-8 h-8" />,
      TrendingUp: <TrendingUp className="w-8 h-8" />,
      Award: <Award className="w-8 h-8" />,
      Medal: <Medal className="w-8 h-8" />
    };
    return icons[iconName] || <Award className="w-8 h-8" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      milestones: 'bg-blue-100 text-blue-800',
      consistency: 'bg-green-100 text-green-800',
      strength: 'bg-red-100 text-red-800',
      cardio: 'bg-purple-100 text-purple-800',
      progress: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const earnedAchievements = achievements.filter(a => a.earned);
  const lockedAchievements = achievements.filter(a => !a.earned);

  return (
      <Layout >
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
            My Achievements
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
            Celebrate your fitness milestones and unlock new goals
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Achievements Earned</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{stats.totalEarned}/{stats.totalAchievements}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Current Streak</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{stats.currentStreak} days</p>
              </div>
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Total Workouts</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{stats.totalWorkouts}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>Training Hours</p>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{stats.totalHours}h</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Earned Achievements */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Earned Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 border-yellow-300 ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'} relative`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-yellow-500">
                    {getIcon(achievement.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{achievement.title}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>{achievement.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(achievement.category)}`}>
                        {achievement.category}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-teal-300' : 'text-teal-500'}`}>
                        Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Achievements */}
        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Locked Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 border-gray-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} relative opacity-60`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-gray-400">
                    {getIcon(achievement.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{achievement.title}</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{achievement.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(achievement.category)}`}>
                        {achievement.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default MemberAchievements;
