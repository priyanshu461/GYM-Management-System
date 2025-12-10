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

  // Quick Actions Handlers
  const handleCreateWorkout = async () => {
    try {
      // For now, create a basic workout. In a real app, this would open a modal
      const workoutData = {
        title: "New Workout Routine",
        description: "Custom workout created from dashboard",
        difficulty: "Intermediate",
        duration: 45,
        exercises: [
          { name: "Push-ups", sets: 3, reps: "10-12", rest: "60s" },
          { name: "Squats", sets: 3, reps: "12-15", rest: "60s" },
          { name: "Plank", sets: 3, reps: "30-45s", rest: "60s" }
        ]
      };

      const response = await trainerServices.createWorkout(workoutData);
      if (response.message) {
        alert("Workout created successfully!");
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

  const handleScheduleClass = async () => {
    try {
      // For now, show a message. In a real app, this would open a scheduling modal
      alert("Class scheduling feature coming soon! Please use the management panel to schedule classes.");
    } catch (error) {
      console.error("Error scheduling class:", error);
      alert("Error scheduling class");
    }
  };

  const handleAssignClient = async () => {
    try {
      // For now, show available clients. In a real app, this would open an assignment modal
      const clients = await trainerServices.getTrainerClients();
      if (clients && clients.length > 0) {
        const clientNames = clients.map(client => client.name).join(", ");
        alert(`Available clients: ${clientNames}\n\nClient assignment modal coming soon!`);
      } else {
        alert("No clients available for assignment");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      alert("Error fetching clients");
    }
  };

  const handleContactMember = async () => {
    try {
      // For now, show assigned members. In a real app, this would open a communication modal
      const members = await trainerServices.getAssignedMembers();
      if (members && members.length > 0) {
        const memberNames = members.map(member => member.name).join(", ");
        alert(`Assigned members: ${memberNames}\n\nCommunication modal coming soon!`);
      } else {
        alert("No assigned members to contact");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      alert("Error fetching members");
    }
  };

  const handleViewProgress = async () => {
    try {
      // For now, show basic progress info. In a real app, this would open a progress tracking modal
      const members = await trainerServices.getAssignedMembers();
      if (members && members.length > 0) {
        const progressSummary = members.map(member =>
          `${member.name}: ${member.progress}% progress`
        ).join("\n");
        alert(`Member Progress Summary:\n\n${progressSummary}\n\nDetailed progress view coming soon!`);
      } else {
        alert("No assigned members to view progress for");
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
      alert("Error fetching progress");
    }
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
        </div>
      </div>
    </Layout>
  );
};

export default TrainerDashboard;
