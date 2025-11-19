import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import trainerServices from "../../services/trainerServices";
import { UserCheck, Dumbbell, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

const AssignWorkout = () => {
  const { trainer } = useAuth();
  const { theme } = useTheme();
  const [clients, setClients] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);
        const [clientsData, workoutsData] = await Promise.all([
          trainerServices.getTrainerClients(),
          trainerServices.getWorkouts(), // Assuming this method exists or will be added
        ]);
        setClients(clientsData || []);
        setWorkouts(workoutsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setClients([]);
        setWorkouts([]);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedClient || !selectedWorkout) {
      alert("Please select both a client and a workout.");
      return;
    }

    try {
      setLoading(true);
      await trainerServices.assignWorkoutToClient({
        clientId: selectedClient,
        workoutId: selectedWorkout,
      });
      alert("Workout assigned successfully!");
      setSelectedClient("");
      setSelectedWorkout("");
    } catch (error) {
      console.error("Error assigning workout:", error);
      alert("Failed to assign workout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cardClass = theme === "dark"
    ? "bg-teal-800 border-teal-700 text-white"
    : "bg-white border-teal-200 text-teal-900";

  const inputClass = theme === "dark"
    ? "bg-teal-700 border-teal-600 text-white"
    : "bg-white border-gray-300 text-gray-900";

  if (fetchLoading) {
    return (
      <Layout>
        <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-teal-900" : "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50"}`}>
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-b-2 border-teal-500 rounded-full"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-teal-900" : "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50"}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Assign Workout to Client</h1>

          <div className={`p-8 rounded-xl shadow-lg border ${cardClass}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Select Client</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                >
                  <option value="">Choose a client...</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name} - {client.email}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select Workout</label>
                <select
                  value={selectedWorkout}
                  onChange={(e) => setSelectedWorkout(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                >
                  <option value="">Choose a workout...</option>
                  {workouts.map((workout) => (
                    <option key={workout._id} value={workout._id}>
                      {workout.title} ({workout.difficulty})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedClient && selectedWorkout && (
              <div className={`p-4 mb-6 rounded-lg ${theme === "dark" ? "bg-teal-700" : "bg-teal-50"}`}>
                <h3 className="font-semibold mb-2">Assignment Preview</h3>
                <p className="text-sm">
                  Assigning <strong>{workouts.find(w => w._id === selectedWorkout)?.title}</strong> to{" "}
                  <strong>{clients.find(c => c._id === selectedClient)?.name}</strong>
                </p>
              </div>
            )}

            <button
              onClick={handleAssign}
              disabled={loading || !selectedClient || !selectedWorkout}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              {loading ? "Assigning..." : "Assign Workout"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssignWorkout;
