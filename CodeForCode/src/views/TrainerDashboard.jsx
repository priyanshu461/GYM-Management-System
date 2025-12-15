import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import trainerServices from "../services/trainerServices";
import {
  Users,
  Calendar,
  Dumbbell,
  TrendingUp,
  Award,
  Clock,
  Moon,
  Sun,
  MessageSquare,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";
import Layout from "@/components/Layout";

const TrainerDashboard = () => {
  const { trainer, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [stats, setStats] = useState({
    assignedMembers: 0,
    classesTaught: 0,
    memberProgress: 0,
    upcomingSessions: 0,
  });

  const [assignedMembers, setAssignedMembers] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Form states
  const [workoutForm, setWorkoutForm] = useState({
    name: '',
    goal: 'General',
    difficulty: 'Intermediate',
    assignedTo: '',
    days: [
      {
        day: 'Day 1',
        exercises: [{ name: '', sets: 3, reps: '10-12', rest: '60s' }]
      }
    ]
  });

  const [classForm, setClassForm] = useState({
    title: '',
    date: '',
    time: '',
    capacity: 15,
    category: 'Strength',
    difficulty: 'Intermediate',
    location: ''
  });

  const [selectedClient, setSelectedClient] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [availableClients, setAvailableClients] = useState([]);
  const [availableWorkouts, setAvailableWorkouts] = useState([]);

  // Quick Actions Handlers
  const handleCreateWorkout = async () => {
    try {
      const members = await trainerServices.getAssignedMembers();
      setAvailableClients(members || []);
      setShowWorkoutModal(true);
    } catch (error) {
      console.error("Error fetching members:", error);
      alert("Error loading members");
    }
  };

  const handleScheduleClass = () => {
    setShowClassModal(true);
  };

  const handleAssignClient = async () => {
    try {
      const clients = await trainerServices.getTrainerClients();
      setAvailableClients(clients || []);
      const workouts = await trainerServices.getWorkouts();
      setAvailableWorkouts(workouts || []);
      setShowClientModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error loading data");
    }
  };

  const handleContactMember = () => {
    setShowContactModal(true);
  };

  const handleViewProgress = () => {
    setShowProgressModal(true);
  };

  const handleManageMembers = async () => {
    try {
      const availableMembers = await trainerServices.getAvailableMembers();
      setAvailableClients(availableMembers || []);
      setShowMemberModal(true);
    } catch (error) {
      console.error("Error fetching available members:", error);
      alert("Error loading available members");
    }
  };

  // Form submission handlers
  const submitWorkout = async () => {
    try {
      const workoutData = {
        name: workoutForm.name,
        goal: workoutForm.goal,
        difficulty: workoutForm.difficulty,
        duration: workoutForm.days[0].exercises.length * 10, // Estimate duration
        exercises: workoutForm.days[0].exercises.filter(ex => ex.name.trim() !== ''),
        assignedTo: workoutForm.assignedTo || null
      };

      const response = await trainerServices.createWorkout(workoutData);
      if (response.message) {
        alert("Workout created successfully!");
        setShowWorkoutModal(false);
        setWorkoutForm({
          name: '',
          goal: 'General',
          difficulty: 'Intermediate',
          assignedTo: '',
          days: [
            {
              day: 'Day 1',
              exercises: [{ name: '', sets: 3, reps: '10-12', rest: '60s' }]
            }
          ]
        });
        // Refresh dashboard data
        window.location.reload();
      } else {
        alert("Failed to create workout");
      }
    } catch (error) {
      console.error("Error creating workout:", error);
      alert("Error creating workout");
    }
  };

  const submitClass = async () => {
    try {
      const scheduleData = {
        title: classForm.title,
        date: classForm.date,
        time: classForm.time,
        capacity: classForm.capacity,
        category: classForm.category,
        difficulty: classForm.difficulty,
        location: classForm.location
      };

      const response = await trainerServices.createSchedule(scheduleData);
      if (response.message) {
        alert("Schedule created successfully!");
        setShowClassModal(false);
        setClassForm({
          title: '',
          date: '',
          time: '',
          capacity: 15,
          category: 'Strength',
          difficulty: 'Intermediate',
          location: ''
        });
        // Refresh dashboard data
        window.location.reload();
      } else {
        alert("Failed to create schedule");
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
      alert("Error creating schedule");
    }
  };

  const assignWorkoutToClient = async () => {
    try {
      if (!selectedClient || !selectedWorkout) {
        alert("Please select a client and workout");
        return;
      }

      const response = await trainerServices.assignWorkoutToClient({
        clientId: selectedClient,
        workoutId: selectedWorkout
      });

      if (response.message) {
        alert("Workout assigned successfully!");
        setShowClientModal(false);
        setSelectedClient('');
        setSelectedWorkout('');
      } else {
        alert("Failed to assign workout");
      }
    } catch (error) {
      console.error("Error assigning workout:", error);
      alert("Error assigning workout");
    }
  };

  // Helper functions for workout form
  const addExercise = () => {
    setWorkoutForm({
      ...workoutForm,
      days: [{
        ...workoutForm.days[0],
        exercises: [...workoutForm.days[0].exercises, { name: '', sets: 3, reps: '10-12', rest: '60s' }]
      }]
    });
  };

  const updateExercise = (index, field, value) => {
    const updatedExercises = workoutForm.days[0].exercises.map((ex, i) =>
      i === index ? { ...ex, [field]: value } : ex
    );
    setWorkoutForm({
      ...workoutForm,
      days: [{
        ...workoutForm.days[0],
        exercises: updatedExercises
      }]
    });
  };

  const removeExercise = (index) => {
    setWorkoutForm({
      ...workoutForm,
      days: [{
        ...workoutForm.days[0],
        exercises: workoutForm.days[0].exercises.filter((_, i) => i !== index)
      }]
    });
  };



  // -----------------------------
  // Fetch All Dashboard Data
  // -----------------------------
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [statsData, members, activities, classes] = await Promise.all([
          trainerServices.getTrainerStats(),
          trainerServices.getAssignedMembers(),
          trainerServices.getTrainerActivities(),
          trainerServices.getTrainerClasses(),
        ]);

        setStats({
          assignedMembers: statsData?.assignedMembers || 0,
          classesTaught: statsData?.classesTaught || 0,
          memberProgress: statsData?.memberProgress || 0,
          upcomingSessions: statsData?.upcomingSessions || 0,
        });

        setAssignedMembers(members || []);
        setRecentActivities(activities || []);
        setUpcomingClasses(classes || []);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);

        // Fallback Mock
        setStats({
          assignedMembers: 12,
          classesTaught: 45,
          memberProgress: 78,
          upcomingSessions: 8,
        });

        setAssignedMembers([
          {
            _id: "1",
            name: "John Doe",
            progress: 85,
            lastWorkout: "2024-01-15",
            membershipStatus: "Active",
          },
          {
            _id: "2",
            name: "Jane Smith",
            progress: 92,
            lastWorkout: "2024-01-14",
            membershipStatus: "Active",
          },
        ]);

        setRecentActivities([
          {
            id: 1,
            type: "class",
            title: "HIIT Training Completed",
            date: "2024-01-15",
            details: "15 members attended",
          },
          {
            id: 2,
            type: "workout",
            title: "New Workout Plan Created",
            date: "2024-01-14",
            details: "For John Doe",
          },
          {
            id: 3,
            type: "progress",
            title: "Milestone Achieved",
            date: "2024-01-13",
            details: "Jane Smith completed 10 sessions",
          },
        ]);

        setUpcomingClasses([
          {
            _id: "1",
            title: "HIIT Training",
            date: "2024-01-16",
            time: "10:00 AM",
            duration: "60 min",
            capacity: 15,
            enrolled: 12,
          },
          {
            _id: "2",
            title: "Strength Training",
            date: "2024-01-17",
            time: "2:00 PM",
            duration: "45 min",
            capacity: 10,
            enrolled: 8,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // -----------------------------
  // UTILS
  // -----------------------------
  const cardClass =
    theme === "dark"
      ? "bg-teal-800 border-teal-700 text-white"
      : "bg-white border-teal-200 text-teal-900";

  const subText =
    theme === "dark" ? "text-teal-200" : "text-teal-600";

  const containerBg =
    theme === "dark"
      ? "bg-teal-900"
      : "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50";

  return (
    <Layout>
      <div className={`min-h-screen flex ${containerBg}`}>
        <div className="flex-1 p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {trainer?.name || "Trainer"}!
              </h1>
              <p className={`text-sm mt-1 ${subText}`}>
                Track your members' progress and manage sessions
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition ${
                  theme === "dark"
                    ? "bg-teal-700 text-teal-100 hover:bg-teal-600"
                    : "bg-teal-100 text-teal-800 hover:bg-teal-200"
                }`}
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Assigned Members */}
            <div className={`p-6 rounded-xl shadow-lg border ${cardClass}`}>
              <div className="flex justify-between">
                <div>
                  <p className={`text-sm ${subText}`}>Assigned Members</p>
                  <p className="text-3xl font-bold">{stats.assignedMembers}</p>
                </div>
                <Users className="h-8 w-8 text-teal-500" />
              </div>
            </div>

            {/* Classes Taught */}
            <div className={`p-6 rounded-xl shadow-lg border ${cardClass}`}>
              <div className="flex justify-between">
                <div>
                  <p className={`text-sm ${subText}`}>Classes Taught</p>
                  <p className="text-3xl font-bold">{stats.classesTaught}</p>
                </div>
                <Calendar className="h-8 w-8 text-teal-500" />
              </div>
            </div>

            {/* Member Progress */}
            <div className={`p-6 rounded-xl shadow-lg border ${cardClass}`}>
              <div className="flex justify-between">
                <div>
                  <p className={`text-sm ${subText}`}>Avg Progress</p>
                  <p className="text-3xl font-bold">{stats.memberProgress}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-teal-500" />
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className={`p-6 rounded-xl shadow-lg border ${cardClass}`}>
              <div className="flex justify-between">
                <div>
                  <p className={`text-sm ${subText}`}>Upcoming Sessions</p>
                  <p className="text-3xl font-bold">{stats.upcomingSessions}</p>
                </div>
                <Clock className="h-8 w-8 text-teal-500" />
              </div>
            </div>
          </div>

          {/* ASSIGNED MEMBERS + ACTIVITIES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Assigned Members */}
            <div className={`p-6 rounded-xl shadow-lg border ${cardClass}`}>
              <h2 className="text-xl font-bold mb-4">Assigned Members</h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-b-2 border-teal-500 rounded-full"></div>
                </div>
              ) : assignedMembers.length > 0 ? (
                assignedMembers.slice(0, 5).map((m) => (
                  <div
                    key={m._id}
                    className={`flex items-center justify-between p-3 rounded-lg mb-3 ${
                      theme === "dark" ? "bg-teal-700" : "bg-teal-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          m.membershipStatus === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <UserCheck size={16} />
                      </div>

                      <div>
                        <p className="font-medium">{m.name}</p>
                        <p className={`text-sm ${subText}`}>
                          Progress: {m.progress}% • Last:{" "}
                          {new Date(m.lastWorkout).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-sm">
                      View
                    </button>
                  </div>
                ))
              ) : (
                <p className={subText}>No assigned members.</p>
              )}
            </div>

            {/* Recent Activities */}
            <div className={`p-6 rounded-xl shadow-lg border ${cardClass}`}>
              <h2 className="text-xl font-bold mb-4">Recent Activities</h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-b-2 border-teal-500 rounded-full"></div>
                </div>
              ) : recentActivities.length > 0 ? (
                recentActivities.map((act) => (
                  <div
                    key={act.id}
                    className={`flex items-center p-3 mb-3 rounded-lg ${
                      theme === "dark" ? "bg-teal-700" : "bg-teal-50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full mr-3 ${
                        act.type === "class"
                          ? "bg-blue-100 text-blue-600"
                          : act.type === "workout"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {act.type === "class" ? (
                        <Calendar size={16} />
                      ) : act.type === "workout" ? (
                        <Dumbbell size={16} />
                      ) : (
                        <Award size={16} />
                      )}
                    </div>

                    <div>
                      <p className="font-medium">{act.title}</p>
                      <p className={`text-sm ${subText}`}>
                        {new Date(act.date).toLocaleDateString()} •{" "}
                        {act.details}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={subText}>No recent activities.</p>
              )}
            </div>
          </div>

          {/* UPCOMING CLASSES */}
          <div className={`mt-8 p-6 rounded-xl shadow-lg border ${cardClass}`}>
            <h2 className="text-xl font-bold mb-4">Upcoming Classes</h2>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-b-2 border-teal-500 rounded-full"></div>
              </div>
            ) : upcomingClasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingClasses.map((c) => (
                  <div
                    key={c._id}
                    className={`p-4 rounded-lg border ${
                      theme === "dark"
                        ? "bg-teal-700 border-teal-600"
                        : "bg-teal-50 border-teal-200"
                    }`}
                  >
                    <h3 className="font-semibold mb-2">{c.title}</h3>

                    <p className={`text-sm ${subText}`}>
                      📅 {new Date(c.date).toLocaleDateString()}
                    </p>
                    <p className={`text-sm ${subText}`}>
                      🕐 {c.time} • {c.duration}
                    </p>
                    <p className={`text-sm ${subText}`}>
                      👥 {c.enrolled}/{c.capacity} enrolled
                    </p>

                    <button className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg text-sm">
                      Manage Class
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={subText}>No upcoming classes found.</p>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div className={`mt-8 p-6 rounded-xl shadow-lg border ${cardClass}`}>
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { icon: Dumbbell, label: "Create Workout", handler: handleCreateWorkout },
                { icon: Calendar, label: "Schedule Class", handler: handleScheduleClass },
                { icon: UserPlus, label: "Assign Client", handler: handleAssignClient },
                { icon: Users, label: "Manage Members", handler: handleManageMembers },
                { icon: MessageSquare, label: "Contact Member", handler: handleContactMember },
                { icon: TrendingUp, label: "View Progress", handler: handleViewProgress },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.handler}
                  className={`p-4 rounded-lg border-2 border-dashed transition cursor-pointer ${
                    theme === "dark"
                      ? "border-teal-600 text-teal-200 hover:bg-teal-700"
                      : "border-teal-300 text-teal-700 hover:bg-teal-50"
                  }`}
                >
                  <btn.icon className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* MODALS */}
          {/* Workout Creation Modal */}
          {showWorkoutModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto ${
                theme === "dark" ? "bg-teal-800 text-white" : "bg-white text-teal-900"
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Create New Workout</h3>
                  <button
                    onClick={() => setShowWorkoutModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Workout Name</label>
                    <input
                      type="text"
                      value={workoutForm.name}
                      onChange={(e) => setWorkoutForm({...workoutForm, name: e.target.value})}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                      placeholder="Enter workout name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Goal</label>
                    <select
                      value={workoutForm.goal}
                      onChange={(e) => setWorkoutForm({...workoutForm, goal: e.target.value})}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="General">General</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Muscle Gain">Muscle Gain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Difficulty</label>
                    <select
                      value={workoutForm.difficulty}
                      onChange={(e) => setWorkoutForm({...workoutForm, difficulty: e.target.value})}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Assign to Member (Optional)</label>
                    <select
                      value={workoutForm.assignedTo}
                      onChange={(e) => setWorkoutForm({...workoutForm, assignedTo: e.target.value})}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="">Select a member...</option>
                      {availableClients.map(member => (
                        <option key={member._id} value={member._id}>{member.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Exercises</label>
                    {workoutForm.days[0].exercises.map((exercise, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Exercise name"
                          value={exercise.name}
                          onChange={(e) => updateExercise(index, 'name', e.target.value)}
                          className={`flex-1 p-2 border rounded-lg ${
                            theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                          }`}
                        />
                        <input
                          type="number"
                          placeholder="Sets"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                          className={`w-16 p-2 border rounded-lg ${
                            theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Reps"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                          className={`w-20 p-2 border rounded-lg ${
                            theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Rest"
                          value={exercise.rest}
                          onChange={(e) => updateExercise(index, 'rest', e.target.value)}
                          className={`w-20 p-2 border rounded-lg ${
                            theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                          }`}
                        />
                        <button
                          onClick={() => removeExercise(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-lg"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addExercise}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Add Exercise
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowWorkoutModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitWorkout}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
                  >
                    Create Workout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Class Scheduling Modal */}
          {showClassModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`p-6 rounded-lg shadow-lg max-w-md w-full mx-4 ${
                theme === "dark" ? "bg-teal-800 text-white" : "bg-white text-teal-900"
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Schedule New Class</h3>
                  <button
                    onClick={() => setShowClassModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Class Title</label>
                    <input
                      type="text"
                      value={classForm.title}
                      onChange={(e) => setClassForm({...classForm, title: e.target.value})}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                      placeholder="Enter class title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                      type="date"
                      value={classForm.date}
                      onChange={(e) => setClassForm({...classForm, date: e.target.value})}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <input
                      type="time"
                      value={classForm.time}
                      onChange={(e) => setClassForm({...classForm, time: e.target.value})}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Capacity</label>
                      <input
                        type="number"
                        value={classForm.capacity}
                        onChange={(e) => setClassForm({...classForm, capacity: parseInt(e.target.value)})}
                        className={`w-full p-2 border rounded-lg ${
                          theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Difficulty</label>
                      <select
                        value={classForm.difficulty}
                        onChange={(e) => setClassForm({...classForm, difficulty: e.target.value})}
                        className={`w-full p-2 border rounded-lg ${
                          theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                        }`}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={classForm.category}
                      onChange={(e) => setClassForm({...classForm, category: e.target.value})}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="Strength">Strength</option>
                      <option value="Cardio">Cardio</option>
                      <option value="Yoga">Yoga</option>
                      <option value="HIIT">HIIT</option>
                      <option value="Pilates">Pilates</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={classForm.location}
                      onChange={(e) => setClassForm({...classForm, location: e.target.value})}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                      placeholder="Enter location"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowClassModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitClass}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
                  >
                    Schedule Class
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Client Assignment Modal */}
          {showClientModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`p-6 rounded-lg shadow-lg max-w-md w-full mx-4 ${
                theme === "dark" ? "bg-teal-800 text-white" : "bg-white text-teal-900"
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Assign Workout to Client</h3>
                  <button
                    onClick={() => setShowClientModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Client</label>
                    <select
                      value={selectedClient}
                      onChange={(e) => setSelectedClient(e.target.value)}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="">Choose a client...</option>
                      {availableClients.map(client => (
                        <option key={client._id} value={client._id}>{client.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Select Workout</label>
                    <select
                      value={selectedWorkout}
                      onChange={(e) => setSelectedWorkout(e.target.value)}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                    >
                      <option value="">Choose a workout...</option>
                      {availableWorkouts.map(workout => (
                        <option key={workout._id} value={workout._id}>{workout.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowClientModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={assignWorkoutToClient}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
                  >
                    Assign Workout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Contact Member Modal */}
          {showContactModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`p-6 rounded-lg shadow-lg max-w-md w-full mx-4 ${
                theme === "dark" ? "bg-teal-800 text-white" : "bg-white text-teal-900"
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Contact Member</h3>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Member</label>
                    <select className={`w-full p-2 border rounded-lg ${
                      theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                    }`}>
                      <option value="">Choose a member...</option>
                      {assignedMembers.map(member => (
                        <option key={member._id} value={member._id}>{member.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      rows={4}
                      className={`w-full p-2 border rounded-lg ${
                        theme === "dark" ? "bg-teal-700 border-teal-600 text-white" : "bg-white border-gray-300"
                      }`}
                      placeholder="Enter your message..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert("Message sent successfully!");
                      setShowContactModal(false);
                    }}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Progress View Modal */}
          {showProgressModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto ${
                theme === "dark" ? "bg-teal-800 text-white" : "bg-white text-teal-900"
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Member Progress Overview</h3>
                  <button
                    onClick={() => setShowProgressModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {assignedMembers.map(member => (
                    <div key={member._id} className={`p-4 rounded-lg border ${
                      theme === "dark" ? "bg-teal-700 border-teal-600" : "bg-teal-50 border-teal-200"
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{member.name}</h4>
                        <span className="text-sm text-teal-600">{member.progress}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full"
                          style={{ width: `${member.progress}%` }}
                        ></div>
                      </div>
                      <p className={`text-sm ${subText}`}>
                        Last workout: {new Date(member.lastWorkout).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowProgressModal(false)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manage Members Modal */}
          {showMemberModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto ${
                theme === "dark" ? "bg-teal-800 text-white" : "bg-white text-teal-900"
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Manage Members</h3>
                  <button
                    onClick={() => setShowMemberModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Available Members</h4>
                    {availableClients.length > 0 ? (
                      availableClients.map(member => (
                        <div key={member._id} className={`p-3 rounded-lg border mb-2 ${
                          theme === "dark" ? "bg-teal-700 border-teal-600" : "bg-teal-50 border-teal-200"
                        }`}>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className={`text-sm ${subText}`}>{member.email}</p>
                            </div>
                            <button
                              onClick={() => {
                                // Add member to trainer
                                alert(`Adding ${member.name} to your members`);
                                setShowMemberModal(false);
                              }}
                              className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-sm"
                            >
                              Add Member
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={subText}>No available members found.</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Current Members</h4>
                    {assignedMembers.length > 0 ? (
                      assignedMembers.map(member => (
                        <div key={member._id} className={`p-3 rounded-lg border mb-2 ${
                          theme === "dark" ? "bg-teal-700 border-teal-600" : "bg-teal-50 border-teal-200"
                        }`}>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className={`text-sm ${subText}`}>Progress: {member.progress}%</p>
                            </div>
                            <button
                              onClick={() => {
                                // Remove member from trainer
                                alert(`Removing ${member.name} from your members`);
                                setShowMemberModal(false);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={subText}>No assigned members.</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowMemberModal(false)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrainerDashboard;
