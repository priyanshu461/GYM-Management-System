import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import gymServices from "@/services/gymServices";
import { useAuth } from "@/contexts/AuthContext";

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

  // form state
  const [form, setForm] = useState({
    name: "",
    goal: "General",
    difficulty: "Beginner",
    days: [],
  });

  useEffect(() => {
    fetchRoutines();
  }, []);

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
    setForm({ name: "", goal: "General", difficulty: "Beginner", days: [] });
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
    setForm((f) => ({ ...f, days: [...(f.days || []), { day: "New Day", exercises: [] }] }));
  }

  function addExercise(dayIndex) {
    setForm((f) => {
      const days = [...f.days];
      days[dayIndex].exercises = [...(days[dayIndex].exercises || []), { name: "New Exercise", sets: 3, reps: "8", rest: "60s" }];
      return { ...f, days };
    });
  }

  function exportCSV(routine) {
    // simple CSV conversion
    let rows = [
      ["Routine", routine.name, "Goal", routine.goal, "Difficulty", routine.difficulty].join(","),
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
     <div className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold">Workout <span className="text-teal-500 font-extrabold">Routines</span></h1>
          <p className="text-lg text-slate-500">Dynamic, filterable routines for your gym members</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search routines..."
            className="px-3 py-2 rounded-lg border w-56 focus:outline-none"
          />

          <select className="px-2 py-2 rounded-lg border " value={goalFilter} onChange={(e) => setGoalFilter(e.target.value)}>
            <option>All</option>
            <option>Strength</option>
            <option>Muscle</option>
            <option>General</option>
          </select>

          <select
            className="px-2 py-2 rounded-lg border  "
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button onClick={openCreate} className="px-4 py-2 bg-teal-600 text-teal-900 rounded-lg shadow">+ New</button>
        </div>
      </header>

      <main className="grid md:grid-cols-2 gap-4">
        <section>
          <AnimatePresence>
            {filtered.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-4 rounded-2xl border bg-teal-50 shadow-sm mb-3"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-lg">{r.name}</h3>
                    <div className="text-sm text-slate-500">{r.goal} • {r.difficulty}</div>
                  </div>

                  <div className="flex items-center  gap-2">
                    <button onClick={() => { setSelectedRoutine(r); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-2 py-1 border rounded bg-teal-200 text-teal-600">View</button>
                    <button onClick={() => openEdit(r)} className="px-2 py-1 border rounded bg-teal-200 text-teal-600">Edit</button>
                    <button onClick={() => deleteRoutine(r.id)} className="px-2 py-1 rounded bg-teal-200 text-teal-600">Delete</button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
                  {r.days.slice(0,2).map((d, i) => (
                    <div key={i} className="p-2 rounded-lg bg-tale-200">
                      <div className="font-semibold">{d.day}</div>
                      <div className="mt-1">
                        {d.exercises.slice(0,3).map((ex, j) => (
                          <div key={j} className="text-xs">• {ex.name} ({ex.sets}×{ex.reps})</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <button onClick={() => exportCSV(r)} className="px-3 py-1 rounded border bg-teal-600 text-white">Export CSV</button>
                  <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(r)); alert('Copied JSON to clipboard'); }} className="px-3 py-1 rounded border">Copy JSON</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="p-4 text-center text-slate-500">No routines found. Try changing filters or add a new routine.</div>
          )}
        </section>

        <aside className="space-y-4">
          <div className="p-4 rounded-2xl border bg-tale-100 shadow-sm">
            <h4 className="font-bold">Routine Details</h4>
            {!selectedRoutine ? (
              <div className="text-sm text-slate-500 mt-3">Select a routine to view full breakdown.</div>
            ) : (
              <div className="mt-3 text-sm space-y-3">
                <div className="font-semibold">{selectedRoutine.name}</div>
                <div className="text-slate-500">{selectedRoutine.goal} • {selectedRoutine.difficulty}</div>

                <div className="mt-2 space-y-2">
                  {selectedRoutine.days.map((d, i) => (
                    <div key={i} className="p-2 border rounded">
                      <div className="font-medium">{d.day}</div>
                      <div className="mt-1 text-xs">
                        {d.exercises.map((ex, j) => (
                          <div key={j} className="flex justify-between">
                            <div>{ex.name}</div>
                            <div className="text-slate-500">{ex.sets}×{ex.reps} • {ex.rest}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <button onClick={() => openEdit(selectedRoutine)} className="px-3 py-1 rounded border">Edit</button>
                  <button onClick={() => exportCSV(selectedRoutine)} className="px-3 py-1 rounded border bg">Export CSV</button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl border bg-white">
            <h4 className="font-bold">Quick Stats</h4>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="p-2 rounded bg-slate-50 text-sm">
                <div className="font-semibold">Routines</div>
                <div className="text-slate-500">{routines.length}</div>
              </div>

              <div className="p-2 rounded bg-slate-50 text-sm">
                <div className="font-semibold">Avg Days</div>
                <div className="text-slate-500">{routines.length ? (routines.reduce((s, r) => s + (r.days?.length || 0), 0) / routines.length).toFixed(1) : 0}</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border bg-white">
            <h4 className="font-bold">Tips</h4>
            <ul className="list-disc list-inside text-sm text-slate-600 mt-2">
              <li>Keep routines focused: 3–5 prime movements per day.</li>
              <li>Use progressive overload — track weight & reps for members.</li>
              <li>Include warm-up & mobility on heavy days.</li>
            </ul>
          </div>
        </aside>
      </main>

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
                <h3 className="text-lg font-bold">{editing ? "Edit Routine" : "Create Routine"}</h3>
                <button type="button" onClick={() => setFormOpen(false)} className="text-slate-500">Close</button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Routine name" className="p-2 border rounded" />
                <select value={form.goal} onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))} className="p-2 border rounded">
                  <option>General</option>
                  <option>Strength</option>
                  <option>Muscle</option>
                </select>
                <select value={form.difficulty} onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))} className="p-2 border rounded">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>

                <div className="flex items-center gap-2">
                  <button type="button" onClick={addDay} className="px-3 py-2 border rounded">+ Add Day</button>
                  <div className="text-sm text-slate-500">Days: {(form.days || []).length}</div>
                </div>
              </div>

              <div className="mt-4 space-y-3 max-h-60 overflow-auto">
                {(form.days || []).map((d, di) => (
                  <div key={di} className="p-3 border rounded">
                    <div className="flex justify-between items-center gap-2">
                      <input value={d.day} onChange={(e) => {
                        const days = [...form.days]; days[di].day = e.target.value; setForm((f) => ({ ...f, days }));
                      }} className="p-1 border rounded w-full" />
                      <button type="button" onClick={() => addExercise(di)} className="px-2 py-1 border rounded">+ Ex</button>
                    </div>

                    <div className="mt-2 space-y-1 text-sm">
                      {d.exercises?.map((ex, ei) => (
                        <div key={ei} className="flex items-center gap-2">
                          <input value={ex.name} onChange={(e) => {
                            const days = [...form.days]; days[di].exercises[ei].name = e.target.value; setForm((f) => ({ ...f, days }));
                          }} className="p-1 border rounded w-36" />
                          <input value={ex.sets} onChange={(e) => {
                            const days = [...form.days]; days[di].exercises[ei].sets = e.target.value; setForm((f) => ({ ...f, days }));
                          }} className="p-1 border rounded w-20" />
                          <input value={ex.reps} onChange={(e) => {
                            const days = [...form.days]; days[di].exercises[ei].reps = e.target.value; setForm((f) => ({ ...f, days }));
                          }} className="p-1 border rounded w-24" />
                          <input value={ex.rest} onChange={(e) => {
                            const days = [...form.days]; days[di].exercises[ei].rest = e.target.value; setForm((f) => ({ ...f, days }));
                          }} className="p-1 border rounded w-20" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">Save</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
   </Layout>
  );
}