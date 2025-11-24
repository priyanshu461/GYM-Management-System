import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import trainerServices from "../../services/trainerServices";
import { Dumbbell, Plus, X, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";

const CreateWorkout = () => {
  const { trainer } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [createdWorkouts, setCreatedWorkouts] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [workout, setWorkout] = useState({
    title: "",
    description: "",
    difficulty: "Beginner",
    duration: "",
    exercises: [{ name: "", sets: "", reps: "", rest: "" }],
  });

  useEffect(() => {
    fetchCreatedWorkouts();
  }, []);

  const fetchCreatedWorkouts = async () => {
    try {
      setFetchLoading(true);
      const workouts = await trainerServices.getWorkouts();
      setCreatedWorkouts(workouts || []);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setCreatedWorkouts([]);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises[index][field] = value;
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const addExercise = () => {
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { name: "", sets: "", reps: "", rest: "" }],
    });
  };

  const removeExercise = (index) => {
    const updatedExercises = workout.exercises.filter((_, i) => i !== index);
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await trainerServices.createWorkout(workout);
      alert("Workout created successfully!");
      // Reset form
      setWorkout({
        title: "",
        description: "",
        difficulty: "Beginner",
        duration: "",
        exercises: [{ name: "", sets: "", reps: "", rest: "" }],
      });
    } catch (error) {
      console.error("Error creating workout:", error);
      alert("Failed to create workout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cardClass = theme === "dark"
    ? "bg-teal-800 border-teal-700 text-white"
    : "bg-white border-teal-200 text-teal-900";

  const inputClass = theme === "dark"
    ? "bg-teal-700 border-teal-600 text-white placeholder-teal-300"
    : "bg-white border-gray-300 text-gray-900";

  return (
    <Layout>
      <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-teal-900" : "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50"}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create Workout</h1>

          <form onSubmit={handleSubmit} className={`p-8 rounded-xl shadow-lg border ${cardClass}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Workout Title</label>
                <input
                  type="text"
                  value={workout.title}
                  onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                  placeholder="Enter workout title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                <select
                  value={workout.difficulty}
                  onChange={(e) => setWorkout({ ...workout, difficulty: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={workout.duration}
                  onChange={(e) => setWorkout({ ...workout, duration: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                  placeholder="60"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={workout.description}
                onChange={(e) => setWorkout({ ...workout, description: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                rows="4"
                placeholder="Describe the workout..."
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Exercises</h3>
                <button
                  type="button"
                  onClick={addExercise}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Exercise
                </button>
              </div>

              {workout.exercises.map((exercise, index) => (
                <div key={index} className={`p-4 mb-4 rounded-lg border ${theme === "dark" ? "bg-teal-700 border-teal-600" : "bg-gray-50 border-gray-200"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Exercise {index + 1}</h4>
                    {workout.exercises.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExercise(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Exercise name"
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                      className={`px-3 py-2 border rounded focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Sets"
                      value={exercise.sets}
                      onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                      className={`px-3 py-2 border rounded focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Reps"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                      className={`px-3 py-2 border rounded focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Rest (sec)"
                      value={exercise.rest}
                      onChange={(e) => handleExerciseChange(index, "rest", e.target.value)}
                      className={`px-3 py-2 border rounded focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClass}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Workout"}
            </button>
          </form>

          {/* Created Workouts Section */}
          <div className={`p-8 rounded-xl shadow-lg border ${cardClass}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Created Workouts</h2>
              <button
                onClick={fetchCreatedWorkouts}
                disabled={fetchLoading}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw size={16} className={fetchLoading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>

            {fetchLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-b-2 border-teal-500 rounded-full"></div>
              </div>
            ) : createdWorkouts.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No workouts created yet.</p>
            ) : (
              <div className="space-y-4">
                {createdWorkouts.map((workout) => (
                  <div key={workout._id} className={`p-4 rounded-lg border ${theme === "dark" ? "bg-teal-700 border-teal-600" : "bg-gray-50 border-gray-200"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{workout.title}</h3>
                      <span className={`px-2 py-1 rounded text-sm ${workout.difficulty === "Beginner" ? "bg-green-100 text-green-800" : workout.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                        {workout.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{workout.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Duration: {workout.duration} min</span>
                      <span>Exercises: {workout.exercises?.length || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateWorkout;
