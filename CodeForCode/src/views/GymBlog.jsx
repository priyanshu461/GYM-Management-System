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

  const categories = [
    { key: "all", label: "All" },
    { key: "training", label: "Training" },
    { key: "nutrition", label: "Nutrition" },
    { key: "recovery", label: "Recovery" },
    { key: "mindset", label: "Mindset" },
    { key: "news", label: "Club news" },
  ];

  const tags = ["hiit", "strength", "flexibility", "fatloss", "protein", "mobility", "recipe", "supplements", "coachTips", "beginners"];

  const posts = [
    {
      id: 1,
      title: "The 30 minute strength stack",
      excerpt: "Three compound moves. Smart rest. Real gains.",
      category: "training",
      tags: ["strength", "beginners"],
      author: "Coach Maya",
      time: "6 min read",
      cover: "https://images.unsplash.com/photo-1517341723568-d8e2f8d78ccf?q=80&w=1200&auto=format&fit=crop",
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
      time: "4 min read",
      cover: "https://images.unsplash.com/photo-1542691457-cbe4df041eb2?q=80&w=1200&auto=format&fit=crop",
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
      time: "5 min read",
      cover: "https://images.unsplash.com/photo-1546484959-f3abce5f7d23?q=80&w=1200&auto=format&fit=crop",
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
      cover: "https://images.unsplash.com/photo-1607968565040-6161c88d6d55?q=80&w=1200&auto=format&fit=crop",
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
      author: "Nisha",
      time: "5 min read",
      cover: "https://images.unsplash.com/photo-1511295742362-92c96b7d3e83?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 1250, likes: 140, comments: 9 },
      featured: false,
      date: "2025-09-25",
    },
    {
      id: 6,
      title: "New class timetable for October",
      excerpt: "More early morning slots and a fresh spin format.",
      category: "news",
      tags: ["club"],
      author: "Team IronBase",
      time: "2 min read",
      cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 960, likes: 88, comments: 6 },
      featured: false,
      date: "2025-09-23",
    },
    {
      id: 7,
      title: "Prehab for desk athletes",
      excerpt: "Undo eight hours of sitting with ten minutes of smart work.",
      category: "mindset",
      tags: ["mobility", "coachTips"],
      author: "Coach Aisha",
      time: "6 min read",
      cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
      stat: { views: 1780, likes: 210, comments: 12 },
      featured: false,
      date: "2025-09-20",
    },
  ];

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
                    <img src={p.cover} alt="cover" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
                        <span className="flex items-center gap-1">
                          <span className="text-teal-400">👁</span> {p.stat.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-teal-600">❤</span> {p.stat.likes}
                        </span>
                        <span className="flex items-center gap-1">
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
            <div className="grid items-center gap-4 md:grid-cols-3">
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button key={c.key} onClick={()=>{ setCategory(c.key); setPage(1); }} className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${category===c.key ? "bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg hover:shadow-xl" : "bg-teal-50 text-teal-700 hover:bg-teal-100"}`}>{c.label}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={()=>{ setTagFilter("all"); setPage(1); }} className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 ${tagFilter==="all" ? "bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg" : "bg-teal-50 text-teal-700 hover:bg-teal-100"}`}>All tags</button>
                <div className="flex flex-wrap gap-2">
                  {tags.map(t => (
                    <button key={t} onClick={()=>{ setTagFilter(t); setPage(1); }} className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 ${tagFilter===t ? "bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg" : "bg-teal-50 text-teal-700 hover:bg-teal-100"}`}>#{t}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <input value={query} onChange={e=>{ setQuery(e.target.value); setPage(1); }} placeholder="Search posts..." className="w-full rounded-xl bg-teal-50 px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-300 focus:outline-none md:w-64 shadow-sm" />
                <button className="rounded-xl bg-teal-100 px-4 py-3 text-sm font-medium text-teal-700 hover:bg-teal-200 transition-colors duration-200">Clear</button>
              </div>
            </div>
          </div>

          {/* Posts grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paged.map(p => (
              <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img src={p.cover} alt="cover" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
                      <span className="flex items-center gap-1">
                        <span className="text-teal-400">👁</span> {p.stat.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-teal-600">❤</span> {p.stat.likes}
                      </span>
                      <span className="flex items-center gap-1">
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
              <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200">View all →</a>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0,6).map(p => (
                <div key={p.id} className="group overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img src={p.cover} alt="cover" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-2 text-sm font-bold text-teal-900">{p.title}</p>
                    <p className="mt-2 line-clamp-2 text-xs text-teal-700">{p.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Write a post CTA */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100 shadow-lg p-8 lg:col-span-2">
              <h3 className="text-2xl font-bold text-teal-900">Got a tip or a story?</h3>
              <p className="mt-2 text-sm text-teal-700">Share your routine, a quick recipe, or your first PR. We review every post and love hearing from our community.</p>
              <div className="mt-6 flex gap-3">
                <input placeholder="What's your story title?" className="flex-1 rounded-xl bg-white px-4 py-3 text-sm ring-2 ring-teal-100 focus:ring-teal-500 focus:outline-none shadow-sm" />
                <button className="rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-600 transition-all duration-200">Start writing</button>
              </div>
            </div>

            <div className="rounded-2xl border border-teal-200 bg-white shadow-lg p-6">
              <h3 className="text-xl font-bold text-teal-900">Community guidelines</h3>
              <ul className="mt-4 space-y-3 text-sm text-teal-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Real results. Real names. No spam.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Be clear. Be kind. Cite sources when you can.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Opt out any time. Privacy first.</span>
                </li>
              </ul>
            </div>
          </div>

          <footer className="mt-10 border-t border-teal-100 py-6 text-center text-xs text-teal-600">© {new Date().getFullYear()} IronBase Gym. All rights reserved.</footer>
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </Layout>
  );
}
