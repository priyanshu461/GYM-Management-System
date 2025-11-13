import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';

const MemberClasses = () => {
  const { member } = useAuth();
  const { theme } = useTheme();
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockClasses = [
      {
        id: 1,
        title: 'HIIT Training',
        instructor: 'Sarah Johnson',
        date: '2024-01-20',
        time: '10:00 AM',
        duration: '45 min',
        location: 'Studio A',
        capacity: 20,
        enrolled: 15,
        status: 'upcoming',
        type: 'cardio'
      },
      {
        id: 2,
        title: 'Yoga Flow',
        instructor: 'Mike Chen',
        date: '2024-01-18',
        time: '2:00 PM',
        duration: '60 min',
        location: 'Studio B',
        capacity: 25,
        enrolled: 22,
        status: 'upcoming',
        type: 'yoga'
      },
      {
        id: 3,
        title: 'Strength Training',
        instructor: 'Emma Davis',
        date: '2024-01-15',
        time: '6:00 PM',
        duration: '50 min',
        location: 'Weight Room',
        capacity: 15,
        enrolled: 12,
        status: 'past',
        type: 'strength'
      },
      {
        id: 4,
        title: 'Pilates Core',
        instructor: 'John Smith',
        date: '2024-01-22',
        time: '9:00 AM',
        duration: '45 min',
        location: 'Studio C',
        capacity: 18,
        enrolled: 18,
        status: 'upcoming',
        type: 'pilates'
      }
    ];
    setClasses(mockClasses);
  }, []);

  const filteredClasses = classes.filter(cls => {
    if (filter === 'all') return true;
    return cls.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <AlertCircle className="text-blue-500" size={20} />;
      case 'past':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <XCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'past':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
      <Layout>
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
              My Classes
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
              View and manage your class schedule
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-teal-800 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
            >
              <option value="all">All Classes</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200 hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                    {cls.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                    {cls.instructor}
                  </p>
                </div>
                {getStatusIcon(cls.status)}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-teal-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                    {new Date(cls.date).toLocaleDateString()} at {cls.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-teal-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                    {cls.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-teal-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                    {cls.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-teal-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                    {cls.enrolled}/{cls.capacity} enrolled
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(cls.status)}`}>
                  {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                </span>
                {cls.status === 'upcoming' && (
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className={`text-center py-12 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
            <Calendar size={48} className="mx-auto mb-4 text-teal-400" />
            <h3 className="text-xl font-semibold mb-2">No classes found</h3>
            <p>Try adjusting your filter or check back later for new classes.</p>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default MemberClasses;
