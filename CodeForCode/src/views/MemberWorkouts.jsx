import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import MemberSidebar from '../components/layout/MemberSidebar';
import { Dumbbell, Clock, Target, TrendingUp, Play, Pause, CheckCircle, Calendar } from 'lucide-react';

const MemberWorkouts = () => {
  const { member } = useAuth();
  const { theme } = useTheme();
  const [workouts, setWorkouts] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(null);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockWorkouts = [
      {
        id: 1,
        title: 'Upper Body Strength',
        description: 'Build strength in your chest, shoulders, and arms',
        duration: 45,
        difficulty: 'Intermediate',
        exercises: [
          { name: 'Bench Press', sets: 3, reps: '8-10', completed: false },
          { name: 'Shoulder Press', sets: 3, reps: '10-12', completed: false },
          { name: 'Bicep Curls', sets: 3, reps: '12-15', completed: false },
          { name: 'Tricep Dips', sets: 3, reps: '10-12', completed: false }
        ],
        status: 'available'
      },
      {
        id: 2,
        title: 'Cardio Blast',
        description: 'High-intensity cardio to boost your heart rate',
        duration: 30,
        difficulty: 'Beginner',
        exercises: [
          { name: 'Treadmill Run', sets: 1, reps: '20 min', completed: false },
          { name: 'Burpees', sets: 3, reps: '10', completed: false },
          { name: 'Jump Rope', sets: 3, reps: '2 min', completed: false }
        ],
        status: 'available'
      },
      {
        id: 3,
        title: 'Core & Abs',
        description: 'Strengthen your core and improve stability',
        duration: 25,
        difficulty: 'Advanced',
        exercises: [
          { name: 'Planks', sets: 3, reps: '45 sec', completed: false },
          { name: 'Russian Twists', sets: 3, reps: '20', completed: false },
          { name: 'Leg Raises', sets: 3, reps: '15', completed: false }
        ],
        status: 'available'
      }
    ];
    setWorkouts(mockWorkouts);
  }, []);

  const startWorkout = (workoutId) => {
    setActiveWorkout(workoutId);
  };

  const completeExercise = (workoutId, exerciseIndex) => {
    setWorkouts(prev => prev.map(workout => {
      if (workout.id === workoutId) {
        const updatedExercises = [...workout.exercises];
        updatedExercises[exerciseIndex].completed = !updatedExercises[exerciseIndex].completed;
        return { ...workout, exercises: updatedExercises };
      }
      return workout;
    }));
  };

  const completeWorkout = (workoutId) => {
    setActiveWorkout(null);
    // In real app, save progress to backend
    alert('Workout completed! Great job!');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>
      <MemberSidebar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
            My Workouts
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
            Choose and complete your personalized workout routines
          </p>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200 hover:shadow-xl transition-shadow`}
            >
              <div className="mb-4">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                  {workout.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
                  {workout.description}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-teal-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                    {workout.duration} min
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(workout.difficulty)}`}>
                  {workout.difficulty}
                </span>
              </div>

              <div className="mb-4">
                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'} mb-2`}>
                  Exercises ({workout.exercises.length}):
                </p>
                <ul className="space-y-1">
                  {workout.exercises.slice(0, 3).map((exercise, index) => (
                    <li key={index} className={`text-xs ${theme === 'dark' ? 'text-teal-300' : 'text-teal-600'}`}>
                      • {exercise.name} - {exercise.sets} x {exercise.reps}
                    </li>
                  ))}
                  {workout.exercises.length > 3 && (
                    <li className={`text-xs ${theme === 'dark' ? 'text-teal-300' : 'text-teal-600'}`}>
                      • +{workout.exercises.length - 3} more exercises
                    </li>
                  )}
                </ul>
              </div>

              {activeWorkout === workout.id ? (
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-teal-600 mb-2">Current Workout:</div>
                  {workout.exercises.map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-teal-50 rounded">
                      <span className="text-sm">{exercise.name} - {exercise.sets} x {exercise.reps}</span>
                      <button
                        onClick={() => completeExercise(workout.id, index)}
                        className={`p-1 rounded ${exercise.completed ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                      >
                        <CheckCircle size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => completeWorkout(workout.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
                  >
                    Complete Workout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startWorkout(workout.id)}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Start Workout
                </button>
              )}
            </div>
          ))}
        </div>

        {workouts.length === 0 && (
          <div className={`text-center py-12 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
            <Dumbbell size={48} className="mx-auto mb-4 text-teal-400" />
            <h3 className="text-xl font-semibold mb-2">No workouts available</h3>
            <p>Contact your trainer to get personalized workout plans.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberWorkouts;
