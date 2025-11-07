import Layout from "@/components/Layout";
import React, { useMemo, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Notifications & Communication page – Teal color palette applied
export default function NotificationsCommunication() {
  const { theme, highContrast, toggleHighContrast, toggleTheme } = useTheme();
  const [range, setRange] = useState("7");
  const [channel, setChannel] = useState({ email: true, sms: true, push: true, inapp: true });
  const [message, setMessage] = useState("Great job this week. New workout challenges are live. Tap to join and log your best set today!");
  const [subject, setSubject] = useState("New challenge + your weekly summary");
  const [segment, setSegment] = useState("all");
  const [schedule, setSchedule] = useState("");
  const [priority, setPriority] = useState("normal");
  const [search, setSearch] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const base = highContrast ? "from-teal-50 via-teal-100 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" : "from-white via-teal-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900";

  const stats = [
    { label: "Sent", value: "12.4k", sub: "+8% vs last week" },
    { label: "Open rate", value: "48%", sub: "avg across channels" },
    { label: "Clicks", value: "5.7k", sub: "+11% engaged" },
    { label: "Unsubs", value: "0.3%", sub: "stable" },
  ];

  const templates = [
    { id: "welcome", name: "Welcome pack", text: "Welcome to IronBase. Your plan is ready. Start with the Day 1 warmup and record your set PRs." },
    { id: "winback", name: "7‑day winback", text: "We miss you in the gym. Here is a 3‑move quick routine to get back on track. Tap to book a slot." },
    { id: "milestone", name: "Milestone unlocked", text: "You just crossed 10 sessions this month. Claim your badge and try the advanced push pull plan." },
    { id: "renewal", name: "Membership renewal", text: "Your membership ends soon. Renew now to keep access to classes, trainers, and priority slots." },
  ];

  const activity = [
    { id: 1, who: "Sanya R.", what: "Opened", detail: "Weekly goals + challenge", time: "2m" },
    { id: 2, who: "Rahul P.", what: "Clicked", detail: "Strength plan", time: "7m" },
    { id: 3, who: "Club: Agra", what: "Announcement", detail: "Pool closed today 3pm", time: "11m" },
    { id: 4, who: "Trainer: Vikram", what: "Reply", detail: "Client booked PT", time: "22m" },
    { id: 5, who: "Zara A.", what: "Unsubscribed", detail: "SMS only", time: "40m" },
    { id: 6, who: "Batch: 6am", what: "Reminder sent", detail: "Class starts in 1h", time: "1h" },
  ];

  const filteredActivity = useMemo(() => activity.filter(a => `${a.who} ${a.what} ${a.detail}`.toLowerCase().includes(search.toLowerCase())), [search]);

  function quickFill(t) {
    setSubject(t.name);
    setMessage(t.text);
  }

  function sendNow() {
    alert("Queued to send via " + (Object.entries(channel).filter(([,v])=>v).map(([k])=>k).join(", ") || "no channel") +
      "\nSegment: " + segment +
      "\nPriority: " + priority +
      "\nSchedule: " + (schedule || "now"));
  }

  return (
    <Layout>
      <div className={`min-h-screen w-full bg-gradient-to-b ${base} text-gray-900 dark:text-gray-100`}>
        <div className="mx-auto max-w-7xl px-4 py-6">

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 p-3 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0l-4 4m4-4l4 4" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-teal-700 dark:text-teal-300">Notifications & Communication</h1>
                <p className="mt-2 text-base text-gray-700 dark:text-gray-300">Live status, quick actions, and clean visuals.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <span>Dark mode</span>
                <input type="checkbox" className="toggle toggle-sm toggle-primary" checked={theme === 'dark'} onChange={toggleTheme} />
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <span>High contrast</span>
                <input type="checkbox" className="toggle toggle-sm toggle-primary" checked={highContrast} onChange={toggleHighContrast} />
              </label>
              <select value={range} onChange={e=>setRange(e.target.value)} className="rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 px-4 py-2 text-sm ring-2 ring-teal-300 focus:outline-none focus:ring-teal-500 transition-all duration-300">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <button className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-105 transition-all duration-300">Export</button>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, index) => (
              <div key={s.label} className="group relative overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-white/80 to-teal-50/50 dark:from-gray-800/80 dark:to-gray-700/50 p-6 backdrop-blur-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-teal-300">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-medium">{s.label}</p>
                    <div className="rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 p-2 shadow-md">
                      <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        {index === 0 && <path d="M3 12h3l3 7 4-14 3 7h5"/>}
                        {index === 1 && <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>}
                        {index === 2 && <path d="M15 15l-3 3m0 0l-3-3m3 3V8"/>}
                        {index === 3 && <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>}
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 text-3xl font-bold text-teal-700 dark:text-teal-300">{s.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Activity & Inbox */}
            <div className="lg:col-span-2 space-y-6">

              {/* Activity chart stub – bars teal */}
              <div className="group relative overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-white/80 to-teal-50/50 dark:from-gray-800/80 dark:to-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 p-2 shadow-md">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300">Channel performance</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="rounded-full bg-gradient-to-r from-teal-200 to-emerald-200 px-3 py-1 text-teal-900 font-medium shadow-sm">Email</span>
                      <span className="rounded-full bg-gradient-to-r from-teal-200 to-emerald-200 px-3 py-1 text-teal-900 font-medium shadow-sm">SMS</span>
                      <span className="rounded-full bg-gradient-to-r from-teal-200 to-emerald-200 px-3 py-1 text-teal-900 font-medium shadow-sm">Push</span>
                      <span className="rounded-full bg-gradient-to-r from-teal-200 to-emerald-200 px-3 py-1 text-teal-900 font-medium shadow-sm">In‑app</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-end gap-3 h-48">
                    {[48, 52, 61, 43, 70, 65, 58, 62, 73, 69, 76, 71].map((v, i) => (
                      <div key={i} className="group/bar flex h-full items-end">
                        <div style={{ height: `${v}%` }} className="w-full rounded-t-2xl bg-gradient-to-t from-teal-500 to-emerald-400 group-hover/bar:from-teal-400 group-hover/bar:to-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl"></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">Open and response trend over {range} days.</div>
                </div>
              </div>

              {/* Live feed – teal hovers */}
              <div className="group relative overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-white/80 to-teal-50/50 dark:from-gray-800/80 dark:to-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-teal-200/50 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 p-2 shadow-md">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300">Live activity</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Real time opens, clicks, replies, and alerts.</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search feed" className="rounded-xl bg-white/80 dark:bg-gray-700/80 px-4 py-2 text-sm ring-2 ring-teal-300 focus:outline-none focus:ring-teal-500 transition-all duration-300 shadow-sm"/>
                      <svg className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <ul className="max-h-80 divide-y divide-teal-200/30 overflow-auto">
                    {filteredActivity.map((a) => (
                      <li key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-emerald-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-400 text-white font-bold shadow-md ring-2 ring-white dark:ring-gray-800">{a.who.slice(0,1)}</div>
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-gray-800"></div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100"><span className="text-teal-700 dark:text-teal-300">{a.who}</span> • {a.what}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{a.detail}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{a.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick log – teal button */}
              <div className="rounded-2xl border border-teal-200 bg-white/60 dark:bg-gray-800/60 p-4">
                <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300">Quick announcement</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <input className="rounded-xl bg-teal-50 dark:bg-gray-700 px-3 py-2 text-sm ring-1 ring-teal-300 dark:ring-gray-600" placeholder="Title" />
                  <input className="rounded-xl bg-teal-50 dark:bg-gray-700 px-3 py-2 text-sm ring-1 ring-teal-300 dark:ring-gray-600" placeholder="Location or club" />
                  <input className="rounded-xl bg-teal-50 dark:bg-gray-700 px-3 py-2 text-sm ring-1 ring-teal-300 dark:ring-gray-600" placeholder="Starts at" />
                  <button className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:brightness-110">Publish</button>
                </div>
              </div>
            </div>

            {/* Composer, Templates, System health */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-teal-200 bg-white/60 dark:bg-gray-800/60 p-4">
                <h3 className="text-lg font-semibold text-teal-700">Composer</h3>
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input value={subject} onChange={e=>setSubject(e.target.value)} className="col-span-2 rounded-xl bg-teal-50 dark:bg-gray-900 px-3 py-2 text-sm ring-1 ring-teal-300 dark:ring-gray-600" placeholder="Subject or title" />
                    <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={5} className="col-span-2 rounded-xl bg-teal-50 dark:bg-gray-900 px-3 py-2 text-sm ring-1 ring-teal-300 dark:ring-gray-600" placeholder="Write your message" />
                  </div>

                  {/* Channels */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { key: "email", label: "Email" },
                      { key: "sms", label: "SMS" },
                      { key: "push", label: "Push" },
                      { key: "inapp", label: "In‑app" },
                    ].map((c)=> (
                      <label key={c.key} className="flex items-center justify-between rounded-xl border border-teal-200 dark:border-gray-600 bg-teal-50 dark:bg-gray-900 px-3 py-2">
                        <span>{c.label}</span>
                        <input type="checkbox" checked={channel[c.key]} onChange={e=>setChannel({ ...channel, [c.key]: e.target.checked })} />
                      </label>
                    ))}
                  </div>

                  {/* Targeting */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <select value={segment} onChange={e=>setSegment(e.target.value)} className="rounded-xl bg-teal-50 dark:bg-gray-900 px-3 py-2 ring-1 ring-teal-300 dark:ring-gray-600">
                      <option value="all">All members</option>
                      <option value="new">New joiners (30d)</option>
                      <option value="inactive">Inactive 7d</option>
                      <option value="trial">Trial users</option>
                      <option value="vip">PT clients</option>
                    </select>
                    <select value={priority} onChange={e=>setPriority(e.target.value)} className="rounded-xl bg-teal-50 dark:bg-gray-900 px-3 py-2 ring-1 ring-teal-300 dark:ring-gray-600">
                      <option value="normal">Priority normal</option>
                      <option value="high">Priority high</option>
                      <option value="urgent">Urgent</option>
                    </select>
                    <input value={schedule} onChange={e=>setSchedule(e.target.value)} type="datetime-local" className="col-span-2 rounded-xl bg-teal-50 dark:bg-gray-900 px-3 py-2 ring-1 ring-teal-300 dark:ring-gray-600" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600">Compliance: opt out links auto added for SMS and email.</div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>setPreviewOpen(true)} className="rounded-xl bg-teal-200 px-4 py-2 text-sm text-teal-900 hover:brightness-110">Preview</button>
                      <button onClick={sendNow} className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 hover:brightness-110">{schedule ? "Schedule" : "Send now"}</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Templates */}
              <div className="rounded-2xl border border-teal-200 bg-white/60 dark:bg-gray-800/60 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-teal-700">Templates</h3>
                  <button className="rounded-lg bg-teal-200 px-3 py-1 text-xs text-teal-900">Create</button>
                </div>
                <ul className="space-y-2">
                  {templates.map(t => (
                    <li key={t.id} className="rounded-xl border border-teal-200 bg-teal-50 p-3 hover:border-teal-400/40">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-gray-600 line-clamp-2">{t.text}</p>
                        </div>
                        <button onClick={()=>quickFill(t)} className="rounded-lg bg-teal-500 px-3 py-1 text-xs font-semibold text-white hover:brightness-110">Use</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Health */}
              <div className="rounded-2xl border border-teal-200 bg-white/60 dark:bg-gray-800/60 p-4">
                <h3 className="text-lg font-semibold text-teal-700">System health</h3>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  {[
                    { k: "Email API", v: "OK" },
                    { k: "SMS gateway", v: "OK" },
                    { k: "Push service", v: "Degraded" },
                  ].map((r) => (
                    <div key={r.k} className="rounded-xl border border-teal-200 bg-teal-50 p-3">
                      <div className="text-xs text-gray-600">{r.k}</div>
                      <div className={`text-base font-semibold ${r.v === "OK" ? "text-teal-500" : "text-yellow-500"}`}>{r.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview modal */}
        {previewOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-white/70 p-4">
            <div className="w-full max-w-2xl rounded-2xl border border-teal-200 bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-teal-700">Message preview</h4>
                <button onClick={()=>setPreviewOpen(false)} className="rounded-lg bg-teal-200 px-3 py-1 text-xs text-teal-900">Close</button>
              </div>
              <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
                <div className="text-xs text-gray-600">Subject</div>
                <div className="text-base font-semibold text-teal-900">{subject}</div>
                <div className="mt-3 whitespace-pre-line text-sm text-gray-800">{message}</div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>Segment: <span className="text-teal-900">{segment}</span></div>
                  <div>Priority: <span className="text-teal-900">{priority}</span></div>
                  <div>Channels: <span className="text-teal-900">{Object.entries(channel).filter(([,v])=>v).map(([k])=>k).join(", ")}</span></div>
                  <div>Schedule: <span className="text-teal-900">{schedule || "now"}</span></div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={()=>setPreviewOpen(false)} className="rounded-xl bg-teal-200 px-4 py-2 text-sm text-teal-900">Edit</button>
                <button onClick={()=>{ setPreviewOpen(false); sendNow(); }} className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 hover:brightness-110">Confirm send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
