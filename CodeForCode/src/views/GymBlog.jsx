import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";

// Gym Blog page, now teal-themed!
export default function GymBlog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [range, setRange] = useState("7");
  const [highContrast, setHighContrast] = useState(false);
  const [tagFilter, setTagFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAllPicks, setShowAllPicks] = useState(false);

  // AI Plan Generator states
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [equipment, setEquipment] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    { key: "all", label: "All" },
    { key: "training", label: "Training" },
    { key: "nutrition", label: "Nutrition" },
    { key: "recovery", label: "Recovery" },
    { key: "mindset", label: "Mindset" },
    { key: "news", label: "Club news" },
  ];

  const tags = ["hiit", "strength", "flexibility", "fatloss", "protein", "mobility", "recipe", "supplements", "coachTips", "beginners"];

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The 30 minute strength stack",
      excerpt: "Three compound moves. Smart rest. Real gains.",
      category: "training",
      tags: ["strength", "beginners"],
      author: "Coach Maya",
      time: "6 min read",
      cover: "https://www.youtube.com/embed/Eh5azwtC8lo?si=4dZfnSeDNEcRiLoV",
      stat: { views: 3100, likes: 420, comments: 32 },
      featured: true,
      date: "2025-10-02",
    },
    {
      id: 2,
      title: "Protein made simple",
      excerpt: "How much, when, and from where.",
      category: "nutrition",
      tags: ["protein"],
      author: "Ritika",
      time: "13 min read",
      cover: "https://www.youtube.com/embed/Kf-LQg-CQiA?si=knBiXmAgndxbxf7Y",
      stat: { views: 2100, likes: 310, comments: 18 },
      featured: false,
      date: "2025-10-01",
    },
    {
      id: 3,
      title: "Mobility reset after leg day",
      excerpt: "Bring back range without losing strength.",
      category: "recovery",
      tags: ["mobility", "flexibility"],
      author: "Anish",
      time: "11 min read",
      cover: "https://www.youtube.com/embed/CKnlEt5n3Sk?si=bB1v0hgWdflKchSI",
      stat: { views: 1800, likes: 220, comments: 14 },
      featured: false,
      date: "2025-09-29",
    },
    {
      id: 4,
      title: "HIIT that respects your joints",
      excerpt: "Power sessions without the pain.",
      category: "training",
      tags: ["hiit", "fatloss"],
      author: "Coach Vikram",
      time: "7 min read",
      cover: "https://www.youtube.com/embed/k0dL-Y32bJA?si=VilRSYt2TbnJP4wl",
      stat: { views: 3900, likes: 560, comments: 41 },
      featured: true,
      date: "2025-09-28",
    },
    {
      id: 5,
      title: "Sleep like an athlete",
      excerpt: "Recovery rules that actually stick.",
      category: "recovery",
      tags: ["mindset"],
      author: "Git",
      time: "5 min read",
      cover: "https://www.youtube.com/embed/baM67GdZ6n0",
      stat: { views: 1250, likes: 140, comments: 9 },
      featured: false,
      date: "2025-09-25",
    },
    {
      id: 6,
      title: "New class timetable to be fit",
      excerpt: "More early morning slots and a fresh spin format.",
      category: "news",
      tags: ["club"],
      author: "Team IronBase",
      time: "12 min read",
      cover: "https://www.youtube.com/embed/CkoWGLBRsR4",
      stat: { views: 960, likes: 88, comments: 6 },
      featured: false,
      date: "2025-09-23",
    },
    {
      id: 7,
      title: "Explosive Sprint Exercise",
      excerpt: "Undo eight hours of sitting with ten minutes of smart work.",
      category: "mindset",
      tags: ["mobility", "coachTips"],
      author: "Coach Aisha",
      time: "7 min read",
      cover: "https://www.youtube.com/embed/FYJJbwG_i8U",
      stat: { views: 1780, likes: 210, comments: 12 },
      featured: false,
      date: "2025-09-20",
    },
    {
      id: 8,
      title: "Ultimate Full Body Workout",
      excerpt: "Build strength and burn fat with this intense routine.",
      category: "training",
      tags: ["strength", "fatloss"],
      author: "Coach Alex",
      time: "2 min read",
      cover: "https://www.youtube.com/embed/gwLzBJYoWlI?si=example",
      stat: { views: 4500, likes: 620, comments: 55 },
      featured: false,
      date: "2025-09-18",
    },
    {
      id: 9,
      title: "Healthy Meal Prep Ideas",
      excerpt: "Easy recipes for busy fitness enthusiasts.",
      category: "nutrition",
      tags: ["recipe", "protein"],
      author: "Chef Lena",
      time: "7 min read",
      cover: "https://www.youtube.com/embed/z7xNDHNQrwg?si=DMT9r44M5r9L1q-e",
      stat: { views: 2800, likes: 380, comments: 25 },
      featured: false,
      date: "2025-09-16",
    },
    {
      id: 10,
      title: "Foam Rolling Techniques",
      excerpt: "Improve recovery with proper foam rolling.",
      category: "recovery",
      tags: ["mobility", "flexibility"],
      author: "Dr. Sam",
      time: "15 min read",
      cover: "https://www.youtube.com/embed/Hu-rVZVSzxs?si=xLMBGv9t_Jn7k0e3",
      stat: { views: 2200, likes: 290, comments: 19 },
      featured: false,
      date: "2025-09-14",
    },
    {
      id: 11,
      title: "Mental Toughness in Training",
      excerpt: "Build resilience and push through limits.",
      category: "mindset",
      tags: ["coachTips", "mindset"],
      author: "Coach Raj",
      time: "8 min read",
      cover: "https://www.youtube.com/embed/rNxC16mlO60?si=mL5Eq6WJVpUC_Uhl",
      stat: { views: 1900, likes: 250, comments: 15 },
      featured: false,
      date: "2025-09-12",
    },
    {
      id: 12,
      title: "Supplements That Work",
      excerpt: "Evidence-based supplements for better performance.",
      category: "nutrition",
      tags: ["supplements", "protein"],
      author: "NutriExpert",
      time: "12 min read",
      cover: "https://www.youtube.com/embed/KHTDAnsSO5k?si=aPXgXjPRV3KokXEj",
      stat: { views: 3200, likes: 410, comments: 30 },
      featured: false,
      date: "2025-09-10",
    },
    {
      id: 13,
      title: "Yoga for Strength",
      excerpt: "Combine flexibility and power in your routine.",
      category: "training",
      tags: ["flexibility", "strength"],
      author: "Yoga Guru",
      time: "11 min read",
      cover: "https://www.youtube.com/embed/4pKly2JojMw?si=example",
      stat: { views: 2600, likes: 340, comments: 22 },
      featured: false,
      date: "2025-09-08",
    },
    {
      id: 14,
      title: "Hydration Hacks",
      excerpt: "Stay hydrated for optimal performance.",
      category: "recovery",
      tags: ["mindset", "coachTips"],
      author: "HydraCoach",
      time: "13 min read",
      cover: "https://www.youtube.com/embed/9iMGFqMmUFs?si=example",
      stat: { views: 1500, likes: 180, comments: 10 },
      featured: false,
      date: "2025-09-06",
    },
    {
      id: 15,
      title: "Gym Membership Update",
      excerpt: "New facilities and classes coming soon.",
      category: "news",
      tags: ["club"],
      author: "IronBase Team",
      time: "11 min read",
      cover: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 1100, likes: 120, comments: 8 },
      featured: false,
      date: "2025-09-04",
    },
  ]);

  const updateStat = (postId, statType) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, stat: { ...p.stat, [statType]: p.stat[statType] + 1 } } : p));
  };

  const generatePlan = async () => {
    if (!age || !gender || !weight || !height || !fitnessLevel || !goal || !equipment) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setGeneratedPlan(null);

    try {
      // Simulate API call or AI processing
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

      // Simple logic for plan generation (can be replaced with actual AI API)
      let workoutPlan = "";
      let dietTips = "";

      if (goal === "weightloss") {
        workoutPlan = "Focus on cardio and HIIT: 3-4 sessions/week, 45-60 min each. Include running, cycling, and bodyweight exercises.";
        dietTips = "Calorie deficit: Aim for 500 calories less than maintenance. High protein, veggies, whole grains. Hydrate well.";
      } else if (goal === "muscle") {
        workoutPlan = "Strength training: 4-5 days/week, compound lifts like squats, deadlifts, bench press. Progressive overload.";
        dietTips = "Surplus calories: 250-500 above maintenance. Protein-rich foods, carbs for energy, healthy fats.";
      } else if (goal === "endurance") {
        workoutPlan = "Endurance training: Long runs, cycling, swimming. 4-5 sessions/week, building distance gradually.";
        dietTips = "Balanced carbs and proteins. Focus on complex carbs for sustained energy. Recovery snacks post-workout.";
      } else {
        workoutPlan = "General fitness: Mix of cardio, strength, and flexibility. 3-4 days/week.";
        dietTips = "Balanced diet with variety. Listen to your body and adjust as needed.";
      }

      // Adjust based on fitness level
      if (fitnessLevel === "beginner") {
        workoutPlan += " Start slow, focus on form. Rest days are important.";
      } else if (fitnessLevel === "intermediate") {
        workoutPlan += " Increase intensity and volume.";
      } else {
        workoutPlan += " Advanced techniques: drop sets, supersets.";
      }

      // Adjust based on equipment
      if (equipment === "none") {
        workoutPlan += " Bodyweight exercises: push-ups, squats, planks.";
      } else if (equipment === "basic") {
        workoutPlan += " Use dumbbells, resistance bands.";
      } else {
        workoutPlan += " Full gym access: machines, free weights.";
      }

      setGeneratedPlan({ workout: workoutPlan, diet: dietTips });
    } catch (error) {
      setErrorMessage("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pageSize = 6;

  const filtered = useMemo(() => {
    return posts
      .filter(p => (category === "all" ? true : p.category === category))
      .filter(p => (tagFilter === "all" ? true : p.tags.includes(tagFilter)))
      .filter(p => `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (b.featured === a.featured ? new Date(b.date) - new Date(a.date) : b.featured - a.featured));
  }, [category, tagFilter, query]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const gradient = highContrast ? "from-teal-50 via-teal-100 to-teal-50" : "from-white via-teal-50 to-white";

  const renderCover = (cover) => {
    if (cover.includes("youtube.com/embed") || cover.includes("youtube.com/embed")) {
      return (
        <iframe
          src={cover}
          title="YouTube video"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else {
      return (
        <img
          src={cover}
          alt="cover"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      );
    }
  };

  return (
    <Layout>
      <div className={`min-h-screen w-full bg-gradient-to-b ${gradient} text-teal-900`}>
        <div className="mx-auto max-w-screen-xl px-4 py-8">

          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-teal-800">Gym Blog</h1>
              <p className="mt-1 text-sm text-teal-700">Fresh workouts, real nutrition, sharp recovery tips. Clean visuals. Quick reads.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <label className="flex items-center gap-2 text-xs">
                <span>High contrast</span>
                <input type="checkbox" checked={highContrast} onChange={e=>setHighContrast(e.target.checked)} />
              </label>
              <select value={range} onChange={e=>setRange(e.target.value)} className="rounded-xl bg-teal-50 px-3 py-2 text-xs ring-1 ring-teal-200 focus:outline-none">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <button className="rounded-xl bg-teal-500 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-teal-500/30 hover:brightness-110">Export</button>
            </div>
          </div>

          {/* Top row: Featured + Subscribe */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {posts.filter(p=>p.featured).slice(0,2).map(p => (
                <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    {renderCover(p.cover)}
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-gradient-to-r from-teal-500 to-teal-400 px-3 py-1 text-white font-medium">Featured</span>
                      <span className="rounded-full bg-teal-50 px-3 py-1 text-teal-700 font-medium">{p.category}</span>
                      <span className="text-teal-500">{p.time}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight text-teal-900">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-teal-700">{p.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-teal-600">
                      <span className="font-medium">By {p.author}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 cursor-pointer" onClick={() => updateStat(p.id, 'views')}>
                          <span className="text-teal-400">👁</span> {p.stat.views}
                        </span>
                        <span className="flex items-center gap-1 cursor-pointer" onClick={() => updateStat(p.id, 'likes')}>
                          <span className="text-teal-600">❤</span> {p.stat.likes}
                        </span>
                        <span className="flex items-center gap-1 cursor-pointer" onClick={() => updateStat(p.id, 'comments')}>
                          <span className="text-teal-700">💬</span> {p.stat.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100 shadow-lg p-6">
              <h3 className="text-xl font-bold text-teal-900">Subscribe</h3>
              <p className="mt-2 text-sm text-teal-700">One weekly email. New workouts, real food ideas, and member stories.</p>
              <div className="mt-4 flex gap-2">
                <input placeholder="Your email" className="w-full rounded-xl bg-white px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-300 focus:outline-none shadow-sm" />
                <button className="rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-500 transition-all duration-200">Join</button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs">
                <div className="rounded-xl border border-teal-200 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-bold text-teal-900">48%</div>
                  <div className="text-teal-700 font-medium">Open rate</div>
                </div>
                <div className="rounded-xl border border-teal-200 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-bold text-teal-900">5.7k</div>
                  <div className="text-teal-700 font-medium">Clicks</div>
                </div>
                <div className="rounded-xl border border-teal-200 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-bold text-teal-900">0.3%</div>
                  <div className="text-teal-700 font-medium">Unsubs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 rounded-2xl border border-teal-200 bg-white shadow-lg p-6">
            <h3 className="text-lg font-bold text-teal-900 mb-4">Filter Posts</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button key={c.key} onClick={()=>{ setCategory(c.key); setPage(1); }} className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${category===c.key ? "bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg hover:shadow-xl" : "bg-teal-50 text-teal-700 hover:bg-teal-100"}`}>{c.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={()=>{ setTagFilter("all"); setPage(1); }} className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 ${tagFilter==="all" ? "bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg" : "bg-teal-50 text-teal-700 hover:bg-teal-100"}`}>All tags</button>
                  {tags.map(t => (
                    <button key={t} onClick={()=>{ setTagFilter(t); setPage(1); }} className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 ${tagFilter===t ? "bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg" : "bg-teal-50 text-teal-700 hover:bg-teal-100"}`}>#{t}</button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-semibold text-teal-800 mb-2">Search</label>
                <div className="flex gap-3">
                  <input value={query} onChange={e=>{ setQuery(e.target.value); setPage(1); }} placeholder="Search posts..." className="flex-1 rounded-xl bg-teal-50 px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-300 focus:outline-none shadow-sm" />
                  <button onClick={()=>{ setQuery(""); setPage(1); }} className="rounded-xl bg-teal-100 px-4 py-3 text-sm font-medium text-teal-700 hover:bg-teal-200 transition-colors duration-200">Clear</button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paged.map(p => (
              <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  {renderCover(p.cover)}
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-teal-700 font-medium">{p.category}</span>
                    <span className="text-teal-500">{p.time}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight text-teal-900">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-teal-700">{p.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-teal-600">
                      <span className="font-medium">By {p.author}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 cursor-pointer" onClick={() => updateStat(p.id, 'views')}>
                          <span className="text-teal-400">👁</span> {p.stat.views}
                        </span>
                        <span className="flex items-center gap-1 cursor-pointer" onClick={() => updateStat(p.id, 'likes')}>
                          <span className="text-teal-600">❤</span> {p.stat.likes}
                        </span>
                        <span className="flex items-center gap-1 cursor-pointer" onClick={() => updateStat(p.id, 'comments')}>
                          <span className="text-teal-700">💬</span> {p.stat.comments}
                        </span>
                      </div>
                    </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-teal-700 font-medium">Showing {(page-1)*pageSize+1}-{Math.min(page*pageSize, filtered.length)} of {filtered.length} posts</div>
            <div className="flex items-center gap-3">
              <button onClick={()=>setPage(p=>Math.max(1, p-1))} className="rounded-xl bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={page===1}>Previous</button>
              <div className="rounded-xl bg-teal-50 px-4 py-2 text-sm font-medium text-teal-900 shadow-sm border border-teal-200">Page {page} of {totalPages}</div>
              <button onClick={()=>setPage(p=>Math.min(totalPages, p+1))} className="rounded-xl bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={page===totalPages}>Next</button>
            </div>
          </div>

          {/* Editor picks grid */}
          <div className="mt-12 rounded-2xl border border-teal-200 bg-white shadow-lg p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-teal-900">Editor picks</h3>
              <button onClick={() => setShowAllPicks(!showAllPicks)} className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200">
                {showAllPicks ? 'Show less' : 'View all →'}
              </button>
            </div>
            <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${showAllPicks ? 'animate-fade-in' : ''}`}>
              {(showAllPicks ? posts : posts.slice(0, 6)).map(p => (
                <div key={p.id} className="group overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    {renderCover(p.cover)}
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-2 text-sm font-bold text-teal-900">{p.title}</p>
                    <p className="mt-2 line-clamp-2 text-xs text-teal-700">{p.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Plan Generator */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100 shadow-lg p-8 lg:col-span-2">
              <h3 className="text-2xl font-bold text-teal-900">AI Fitness Plan Generator</h3>
              <p className="mt-2 text-sm text-teal-700">Get a personalized workout and diet plan based on your specifications. Fill in the details below.</p>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" type="number" className="rounded-xl bg-white px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-500 focus:outline-none shadow-sm" />
                <select value={gender} onChange={e => setGender(e.target.value)} className="rounded-xl bg-white px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-500 focus:outline-none shadow-sm">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (kg)" type="number" className="rounded-xl bg-white px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-500 focus:outline-none shadow-sm" />
                <input value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (cm)" type="number" className="rounded-xl bg-white px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-500 focus:outline-none shadow-sm" />
                <select value={fitnessLevel} onChange={e => setFitnessLevel(e.target.value)} className="rounded-xl bg-white px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-500 focus:outline-none shadow-sm">
                  <option value="">Fitness Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <select value={goal} onChange={e => setGoal(e.target.value)} className="rounded-xl bg-white px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-500 focus:outline-none shadow-sm">
                  <option value="">Goal</option>
                  <option value="weightloss">Weight Loss</option>
                  <option value="muscle">Muscle Gain</option>
                  <option value="endurance">Endurance</option>
                  <option value="general">General Fitness</option>
                </select>
                <select value={equipment} onChange={e => setEquipment(e.target.value)} className="rounded-xl bg-white px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-500 focus:outline-none shadow-sm md:col-span-2">
                  <option value="">Equipment Access</option>
                  <option value="none">No Equipment</option>
                  <option value="basic">Basic (Dumbbells, Bands)</option>
                  <option value="full">Full Gym</option>
                </select>
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={generatePlan} disabled={loading} className="rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Generating..." : "Generate Plan"}
                </button>
                <button onClick={() => { setAge(""); setGender(""); setWeight(""); setHeight(""); setFitnessLevel(""); setGoal(""); setEquipment(""); setGeneratedPlan(null); setErrorMessage(""); }} className="rounded-xl bg-teal-100 px-6 py-3 text-sm font-medium text-teal-700 hover:bg-teal-200 transition-colors duration-200">Reset</button>
              </div>
              {errorMessage && (
                <div className="mt-4 rounded-xl bg-red-50 p-4 border border-red-200">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}
              {generatedPlan && (
                <div className="mt-6 rounded-xl bg-white p-4 shadow-sm border border-teal-200">
                  <h4 className="text-lg font-bold text-teal-900 mb-2">Your Personalized Plan</h4>
                  <div className="space-y-2 text-sm text-teal-700">
                    <p><strong>Workout Plan:</strong> {generatedPlan.workout}</p>
                    <p><strong>Diet Tips:</strong> {generatedPlan.diet}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-teal-200 bg-white shadow-lg p-6">
              <h3 className="text-xl font-bold text-teal-900">Plan Guidelines</h3>
              <ul className="mt-4 space-y-3 text-sm text-teal-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Consult a doctor before starting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Listen to your body and rest when needed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Track progress and adjust as needed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Stay hydrated and eat balanced meals.</span>
                </li>
              </ul>
            </div>
          </div>

          <footer className="mt-10 border-t border-teal-100 py-6 text-center text-xs text-teal-600">© {new Date().getFullYear()} IronBase Gym. All rights reserved.</footer>
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </Layout>
  );
}
