import Layout from "@/components/Layout";
import React, { useMemo, useState } from "react";

// Notifications & Communication page – Teal color palette applied
export default function NotificationsCommunication() {
  const [range, setRange] = useState("7");
  const [highContrast, setHighContrast] = useState(false);
  const [channel, setChannel] = useState({ email: true, sms: true, push: true, inapp: true });
  const [message, setMessage] = useState("Great job this week. New workout challenges are live. Tap to join and log your best set today!");
  const [subject, setSubject] = useState("New challenge + your weekly summary");
  const [segment, setSegment] = useState("all");
  const [schedule, setSchedule] = useState("");
  const [priority, setPriority] = useState("normal");
  const [search, setSearch] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const base = highContrast ? "from-teal-50 via-teal-100 to-teal-50" : "from-white via-teal-50 to-white";

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
      <div className={`min-h-screen w-full bg-gradient-to-b ${base} text-gray-900`}>
        <div className="mx-auto max-w-7xl px-4 py-6">

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-teal-700">Notifications & Communication</h1>
              <p className="mt-1 text-sm text-gray-700">Live status, quick actions, and clean visuals.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs">
                <span>High contrast</span>
                <input type="checkbox" className="toggle toggle-sm" checked={highContrast} onChange={e=>setHighContrast(e.target.checked)} />
              </label>
              <select value={range} onChange={e=>setRange(e.target.value)} className="rounded-xl bg-teal-50 px-3 py-2 text-xs ring-1 ring-teal-300 focus:outline-none">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <button className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 hover:brightness-110">Export</button>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-teal-200 bg-white/70 p-4 backdrop-blur-md hover:border-teal-400/40">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-gray-600">{s.label}</p>
                  <svg className="h-5 w-5 text-teal-500 opacity-70" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12h3l3 7 4-14 3 7h5"/></svg>
                </div>
                <div className="mt-2 text-2xl font-bold text-teal-700">{s.value}</div>
                <div className="text-xs text-gray-600">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Activity & Inbox */}
            <div className="lg:col-span-2 space-y-6">

              {/* Activity chart stub – bars teal */}
              <div className="rounded-2xl border border-teal-200 bg-white/60 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-teal-700">Channel performance</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="rounded bg-teal-200 px-2 py-1">Email</span>
                    <span className="rounded bg-teal-200 px-2 py-1">SMS</span>
                    <span className="rounded bg-teal-200 px-2 py-1">Push</span>
                    <span className="rounded bg-teal-200 px-2 py-1">In‑app</span>
                  </div>
                </div>
                <div className="grid grid-cols-12 items-end gap-2 h-40">
                  {[48, 52, 61, 43, 70, 65, 58, 62, 73, 69, 76, 71].map((v, i) => (
                    <div key={i} className="group flex h-full items-end">
                      <div style={{ height: `${v}%` }} className="w-full rounded-t-xl bg-teal-500/80 group-hover:bg-teal-400 transition-all"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-600">Open and response trend over {range} days.</div>
              </div>

              {/* Live feed – teal hovers */}
              <div className="rounded-2xl border border-teal-200 bg-white/60">
                <div className="flex items-center justify-between border-b border-teal-100 p-4">
                  <div>
                    <h3 className="text-lg font-semibold text-teal-700">Live activity</h3>
                    <p className="text-xs text-gray-700">Real time opens, clicks, replies, and alerts.</p>
                  </div>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search feed" className="rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-300 focus:outline-none"/>
                </div>
                <ul className="max-h-80 divide-y divide-teal-100 overflow-auto">
                  {filteredActivity.map((a) => (
                    <li key={a.id} className="flex items-center justify-between px-4 py-3 hover:bg-teal-100">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-white font-bold">{a.who.slice(0,1)}</div>
                        <div>
                          <p className="text-sm"><span className="font-semibold">{a.who}</span> • {a.what}</p>
                          <p className="text-xs text-gray-600">{a.detail}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600">{a.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick log – teal button */}
              <div className="rounded-2xl border border-teal-200 bg-white/60 p-4">
                <h3 className="text-lg font-semibold text-teal-700">Quick announcement</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <input className="rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-300" placeholder="Title" />
                  <input className="rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-300" placeholder="Location or club" />
                  <input className="rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-300" placeholder="Starts at" />
                  <button className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:brightness-110">Publish</button>
                </div>
              </div>
            </div>

            {/* Composer, Templates, System health */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-teal-200 bg-white/60 p-4">
                <h3 className="text-lg font-semibold text-teal-700">Composer</h3>
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input value={subject} onChange={e=>setSubject(e.target.value)} className="col-span-2 rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-300" placeholder="Subject or title" />
                    <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={5} className="col-span-2 rounded-xl bg-teal-50 px-3 py-2 text-sm ring-1 ring-teal-300" placeholder="Write your message" />
                  </div>

                  {/* Channels */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { key: "email", label: "Email" },
                      { key: "sms", label: "SMS" },
                      { key: "push", label: "Push" },
                      { key: "inapp", label: "In‑app" },
                    ].map((c)=> (
                      <label key={c.key} className="flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50 px-3 py-2">
                        <span>{c.label}</span>
                        <input type="checkbox" checked={channel[c.key]} onChange={e=>setChannel({ ...channel, [c.key]: e.target.checked })} />
                      </label>
                    ))}
                  </div>

                  {/* Targeting */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <select value={segment} onChange={e=>setSegment(e.target.value)} className="rounded-xl bg-teal-50 px-3 py-2 ring-1 ring-teal-300">
                      <option value="all">All members</option>
                      <option value="new">New joiners (30d)</option>
                      <option value="inactive">Inactive 7d</option>
                      <option value="trial">Trial users</option>
                      <option value="vip">PT clients</option>
                    </select>
                    <select value={priority} onChange={e=>setPriority(e.target.value)} className="rounded-xl bg-teal-50 px-3 py-2 ring-1 ring-teal-300">
                      <option value="normal">Priority normal</option>
                      <option value="high">Priority high</option>
                      <option value="urgent">Urgent</option>
                    </select>
                    <input value={schedule} onChange={e=>setSchedule(e.target.value)} type="datetime-local" className="col-span-2 rounded-xl bg-teal-50 px-3 py-2 ring-1 ring-teal-300" />
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
              <div className="rounded-2xl border border-teal-200 bg-white/60 p-4">
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
              <div className="rounded-2xl border border-teal-200 bg-white/60 p-4">
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
