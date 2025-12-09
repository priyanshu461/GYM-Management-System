import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import gymServices from "@/services/gymServices";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dumbbell,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Copy,
  X,
  Calendar,
  Target,
  Zap,
  Lightbulb,
} from "lucide-react";

export default function WorkoutRoutine() {
  const { user } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [goalFilter, setGoalFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [members, setMembers] = useState([]);

  // form state
  const [form, setForm] = useState({
    name: "",
    goal: "General",
    difficulty: "Beginner",
    selectedMember: "",
    days: [],
  });

  useEffect(() => {
    fetchRoutines();
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await gymServices.getAllMembers();
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members", err);
    }
  };

  const fetchRoutines = async () => {
    try {
      setLoading(true);
      const data = await gymServices.getAllRoutines();
      setRoutines(data);
    } catch (err) {
      setError("Failed to fetch routines");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // derived list
  const filtered = routines.filter((r) => {
    const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase());
    const matchesGoal = goalFilter === "All" || r.goal === goalFilter;
    const matchesDifficulty =
      difficultyFilter === "All" || r.difficulty === difficultyFilter;
    return matchesQuery && matchesGoal && matchesDifficulty;
  });

  // helpers
  function openCreate() {
    setForm({ name: "", goal: "General", difficulty: "Beginner", selectedMember: "", days: [] });
    setEditing(false);
    setFormOpen(true);
  }

  function openEdit(routine) {
    setForm({ ...routine });
    setEditing(true);
    setFormOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Routine name is required");
      return;
    }
    if (form.days.length === 0) {
      setError("At least one day is required");
      return;
    }
    for (const day of form.days) {
      if (!day.day.trim()) {
        setError("Day name is required for each day");
        return;
      }
      if (day.exercises.length === 0) {
        setError("At least one exercise is required per day");
        return;
      }
      for (const ex of day.exercises) {
        if (!ex.name.trim() || !ex.reps.trim() || !ex.rest.trim()) {
          setError("All exercise fields are required");
          return;
        }
      }
    }

    const routineData = { ...form, createdBy: user?._id };

    try {
      setSubmitting(true);
      setError(null);
      if (editing) {
        await gymServices.updateRoutine(form._id, routineData);
        setSuccessMessage("Routine updated successfully!");
      } else {
        await gymServices.addRoutine(routineData);
        setSuccessMessage("Routine added successfully!");
      }
      setForm({
        name: "",
        goal: "General",
        difficulty: "Beginner",
        days: [],
      });
      setFormOpen(false);
      fetchRoutines(); // Refresh the list
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(editing ? "Failed to update routine" : "Failed to add routine");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteRoutine = async (id) => {
    if (!confirm("Delete this routine?")) return;
    try {
      await gymServices.deleteRoutine(id);
      setRoutines((rs) => rs.filter((r) => r.id !== id));
      if (selectedRoutine?.id === id) setSelectedRoutine(null);
      setSuccessMessage("Routine deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete routine");
      console.error(err);
    }
  };

  function addDay() {
    setForm((f) => ({
      ...f,
      days: [...(f.days || []), { day: "New Day", exercises: [] }],
    }));
  }

  function addExercise(dayIndex) {
    setForm((f) => {
      const days = [...f.days];
      days[dayIndex].exercises = [
        ...(days[dayIndex].exercises || []),
        { name: "New Exercise", sets: 3, reps: "8", rest: "60s" },
      ];
      return { ...f, days };
    });
  }

  function exportCSV(routine) {
    // simple CSV conversion
    let rows = [
      [
        "Routine",
        routine.name,
        "Goal",
        routine.goal,
        "Difficulty",
        routine.difficulty,
      ].join(","),
      ["Day", "Exercise", "Sets", "Reps", "Rest"].join(","),
    ];
    routine.days.forEach((d) => {
      d.exercises.forEach((ex) => {
        rows.push([d.day, ex.name, ex.sets, ex.reps, ex.rest].join(","));
      });
    });
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${routine.name.replace(/\s+/g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-foreground tracking-tight my-0 py-0">
                  Workout
                  <span className="text-teal-500 dark:text-teal-400 px-2">
                    Routines
                  </span>
                </h1>
                <p className="text-muted-foreground text-md my-0 py-0">
                  Create, manage, and customize dynamic workout routines for
                  your gym members
                </p>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm border border-teal-200/50 rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search routines..."
                    className="w-full lg:w-64 bg-background border border-input text-foreground rounded-xl pl-10 pr-4 py-3 placeholder:text-muted-foreground focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <select
                    className="bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    value={goalFilter}
                    onChange={(e) => setGoalFilter(e.target.value)}
                  >
                    <option>All Goals</option>
                    <option>Strength</option>
                    <option>Muscle</option>
                    <option>General</option>
                  </select>

                  <select
                    className="bg-background border border-input text-foreground rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                  >
                    <option>All Levels</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCreate}
                className="group relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative z-10 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Routine</span>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Routines List */}
            <section className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Your Routines
                </h2>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/60 backdrop-blur-sm border border-teal-200/50 rounded-2xl p-6 shadow-lg"
                    >
                      <div className="animate-pulse">
                        <div className="h-6 bg-teal-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-teal-100 rounded w-1/2 mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-teal-100 rounded w-full"></div>
                          <div className="h-3 bg-teal-100 rounded w-4/5"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <AnimatePresence>
                  {filtered.map((r, index) => (
                    <motion.div
                      key={r.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group bg-white/80 backdrop-blur-sm border border-teal-200/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 mb-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                              <Dumbbell className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-foreground group-hover:text-teal-600 transition-colors">
                                {r.name}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    r.goal === "Strength"
                                      ? "bg-red-100 text-red-700"
                                      : r.goal === "Muscle"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {r.goal}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    r.difficulty === "Beginner"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : r.difficulty === "Intermediate"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {r.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            {r.days.slice(0, 2).map((d, i) => (
                              <div
                                key={i}
                                className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 rounded-xl p-3"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <Calendar className="w-4 h-4 text-teal-600" />
                                  <span className="font-semibold text-sm text-foreground">
                                    {d.day}
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {d.exercises.slice(0, 3).map((ex, j) => (
                                    <div
                                      key={j}
                                      className="flex items-center justify-between text-xs text-muted-foreground"
                                    >
                                      <span className="truncate">
                                        {ex.name}
                                      </span>
                                      <span className="text-teal-600 font-medium">
                                        {ex.sets}×{ex.reps}
                                      </span>
                                    </div>
                                  ))}
                                  {d.exercises.length > 3 && (
                                    <div className="text-xs text-muted-foreground">
                                      +{d.exercises.length - 3} more
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedRoutine(r);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="group/btn flex items-center gap-2 px-4 py-2 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-xl transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="text-sm font-medium">View</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openEdit(r)}
                            className="group/btn flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-xl transition-all duration-200"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="text-sm font-medium">Edit</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteRoutine(r.id)}
                            className="group/btn flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-xl transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Delete</span>
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-teal-200/50">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {r.days?.length || 0} days
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            {r.days?.reduce(
                              (total, day) =>
                                total + (day.exercises?.length || 0),
                              0
                            ) || 0}{" "}
                            exercises
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => exportCSV(r)}
                            className="flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg transition-all duration-200"
                          >
                            <Download className="w-4 h-4" />
                            <span className="text-sm font-medium">Export</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              navigator.clipboard.writeText(JSON.stringify(r));
                              alert("Copied JSON to clipboard");
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg transition-all duration-200"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="text-sm font-medium">Copy</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {!loading && filtered.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No routines found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or create your first workout
                    routine.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    Create Routine
                  </motion.button>
                </motion.div>
              )}
            </section>

            {/* Sidebar */}
            <aside className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/80 backdrop-blur-sm border border-teal-200/50 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">
                    Routine Details
                  </h4>
                </div>
                {!selectedRoutine ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-teal-600" />
                    </div>
                    <p className="text-muted-foreground">
                      Select a routine to view full breakdown
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 rounded-xl p-4">
                      <h5 className="font-semibold text-lg text-foreground mb-2">
                        {selectedRoutine.name}
                      </h5>
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedRoutine.goal === "Strength"
                              ? "bg-red-100 text-red-700"
                              : selectedRoutine.goal === "Muscle"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {selectedRoutine.goal}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedRoutine.difficulty === "Beginner"
                              ? "bg-emerald-100 text-emerald-700"
                              : selectedRoutine.difficulty === "Intermediate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {selectedRoutine.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {selectedRoutine.days.map((d, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white border border-teal-200/50 rounded-xl p-4"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-teal-600" />
                            <span className="font-semibold text-foreground">
                              {d.day}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {d.exercises.map((ex, j) => (
                              <div
                                key={j}
                                className="flex items-center justify-between bg-teal-50 rounded-lg p-2"
                              >
                                <span className="font-medium text-sm text-foreground">
                                  {ex.name}
                                </span>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    {ex.sets}×{ex.reps}
                                  </span>
                                  <span>•</span>
                                  <span>{ex.rest}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-teal-200/50">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openEdit(selectedRoutine)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-lg transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="font-medium">Edit</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => exportCSV(selectedRoutine)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg transition-all duration-200"
                      >
                        <Download className="w-4 h-4" />
                        <span className="font-medium">Export</span>
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/80 backdrop-blur-sm border border-teal-200/50 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">
                    Quick Stats
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-teal-600 mb-1">
                      {routines.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Routines
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-teal-600 mb-1">
                      {routines.length
                        ? (
                            routines.reduce(
                              (s, r) => s + (r.days?.length || 0),
                              0
                            ) / routines.length
                          ).toFixed(1)
                        : 0}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Days
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/80 backdrop-blur-sm border border-teal-200/50 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">
                    Pro Tips
                  </h4>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Keep routines focused: 3–5 prime movements per day for
                      optimal results.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Use progressive overload — track weight & reps for member
                      progress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Include warm-up & mobility work on heavy training days.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Balance push/pull movements to prevent imbalances.
                    </span>
                  </li>
                </ul>
              </motion.div>
            </aside>
          </motion.main>

          {/* modal form */}
          <AnimatePresence>
            {formOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
              >
                <motion.form
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: 20 }}
                  onSubmit={handleSubmit}
                  className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">
                      {editing ? "Edit Routine" : "Create Routine"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="text-slate-500"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Routine name"
                      className="p-2 border rounded"
                    />
                    <select
                      value={form.goal}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, goal: e.target.value }))
                      }
                      className="p-2 border rounded"
                    >
                      <option>General</option>
                      <option>Strength</option>
                      <option>Muscle</option>
                    </select>
                    <select
                      value={form.difficulty}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, difficulty: e.target.value }))
                      }
                      className="p-2 border rounded"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                    <select
                      value={form.selectedMember}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, selectedMember: e.target.value }))
                      }
                      className="p-2 border rounded"
                    >
                      <option value="">Select Member (Optional)</option>
                      {members.map((member) => (
                        <option key={member._id} value={member._id}>
                          {member.name}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-2 col-span-2">
                      <button
                        type="button"
                        onClick={addDay}
                        className="px-3 py-2 border rounded"
                      >
                        + Add Day
                      </button>
                      <div className="text-sm text-slate-500">
                        Days: {(form.days || []).length}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 max-h-60 overflow-auto">
                    {(form.days || []).map((d, di) => (
                      <div key={di} className="p-3 border rounded">
                        <div className="flex justify-between items-center gap-2">
                          <input
                            value={d.day}
                            onChange={(e) => {
                              const days = [...form.days];
                              days[di].day = e.target.value;
                              setForm((f) => ({ ...f, days }));
                            }}
                            className="p-1 border rounded w-full"
                          />
                          <button
                            type="button"
                            onClick={() => addExercise(di)}
                            className="px-2 py-1 border rounded"
                          >
                            + Ex
                          </button>
                        </div>

                        <div className="mt-2 space-y-1 text-sm">
                          {d.exercises?.map((ex, ei) => (
                            <div key={ei} className="flex items-center gap-2">
                              <input
                                value={ex.name}
                                onChange={(e) => {
                                  const days = [...form.days];
                                  days[di].exercises[ei].name = e.target.value;
                                  setForm((f) => ({ ...f, days }));
                                }}
                                className="p-1 border rounded w-36"
                              />
                              <input
                                value={ex.sets}
                                onChange={(e) => {
                                  const days = [...form.days];
                                  days[di].exercises[ei].sets = e.target.value;
                                  setForm((f) => ({ ...f, days }));
                                }}
                                className="p-1 border rounded w-20"
                              />
                              <input
                                value={ex.reps}
                                onChange={(e) => {
                                  const days = [...form.days];
                                  days[di].exercises[ei].reps = e.target.value;
                                  setForm((f) => ({ ...f, days }));
                                }}
                                className="p-1 border rounded w-24"
                              />
                              <input
                                value={ex.rest}
                                onChange={(e) => {
                                  const days = [...form.days];
                                  days[di].exercises[ei].rest = e.target.value;
                                  setForm((f) => ({ ...f, days }));
                                }}
                                className="p-1 border rounded w-20"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="px-4 py-2 rounded border"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-indigo-600 text-white"
                    >
                      Save
                    </button>
                  </div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
