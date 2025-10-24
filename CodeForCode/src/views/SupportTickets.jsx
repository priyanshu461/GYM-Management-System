import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, CheckCircle, AlertTriangle, Plus, Search, Filter, Download, Settings, X, Send } from "lucide-react";
import Layout from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";

// Support Tickets page for a gym management website
// Bold, dark UI inspired by the provided dashboard screenshot
// Tailwind only. No TypeScript.

const seedTickets = [
  { id: "GB-1042", subject: "App not logging workouts", member: "Aarav S.", club: "Hyderabad", priority: "High", status: "Open", created: "2025-10-01 09:34", updated: "2025-10-03 14:12", assignee: "Vikram", category: "App", replies: 2 },
  { id: "GB-1041", subject: "Refund for canceled class", member: "Nisha K.", club: "Agra", priority: "Medium", status: "Pending", created: "2025-10-01 08:02", updated: "2025-10-02 11:51", assignee: "Maya", category: "Billing", replies: 3 },
  { id: "GB-1039", subject: "Door access not working", member: "Rahul P.", club: "Delhi", priority: "Urgent", status: "Open", created: "2025-09-30 18:11", updated: "2025-10-01 07:41", assignee: "Aisha", category: "Facilities", replies: 1 },
  { id: "GB-1038", subject: "PT session reschedule", member: "Sanya R.", club: "Hyderabad", priority: "Low", status: "Resolved", created: "2025-09-29 10:19", updated: "2025-09-29 13:44", assignee: "Vikram", category: "Training", replies: 2 },
  { id: "GB-1035", subject: "Unable to renew membership", member: "Zara A.", club: "Agra", priority: "High", status: "Open", created: "2025-09-28 15:03", updated: "2025-09-30 12:15", assignee: "—", category: "Billing", replies: 0 },
  { id: "GB-1032", subject: "Steam room temperature", member: "Club: Delhi", club: "Delhi", priority: "Medium", status: "Pending", created: "2025-09-26 12:33", updated: "2025-09-27 09:10", assignee: "Ops", category: "Facilities", replies: 5 },
  { id: "GB-1027", subject: "Diet plan not syncing", member: "Ritika", club: "Online", priority: "Low", status: "Resolved", created: "2025-09-23 16:45", updated: "2025-09-24 08:55", assignee: "Maya", category: "App", replies: 4 },
];

export default function SupportTickets() {
  const { theme } = useTheme();
  const [tickets, setTickets] = useState(seedTickets);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [category, setCategory] = useState("all");
  const [range, setRange] = useState("7");
  const [sort, setSort] = useState("updated-desc");
  const [selected, setSelected] = useState([]);
  const [drawer, setDrawer] = useState(null); // ticket id or null
  const [composeOpen, setComposeOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const stats = useMemo(() => {
    const open = tickets.filter(t => t.status === "Open").length;
    const pending = tickets.filter(t => t.status === "Pending").length;
    const resolved = tickets.filter(t => t.status === "Resolved").length;
    const urgent = tickets.filter(t => t.priority === "Urgent").length;
    return [
      { label: "Open", value: open },
      { label: "Pending", value: pending },
      { label: "Resolved", value: resolved },
      { label: "Urgent", value: urgent },
    ];
  }, [tickets]);

  const filtered = useMemo(() => {
    let list = tickets
      .filter(t => (status === "all" ? true : t.status === status))
      .filter(t => (priority === "all" ? true : t.priority === priority))
      .filter(t => (category === "all" ? true : t.category === category))
      .filter(t => `${t.id} ${t.subject} ${t.member} ${t.club} ${t.assignee}`.toLowerCase().includes(query.toLowerCase()));

    if (sort === "updated-desc") list = list.sort((a,b)=> new Date(b.updated) - new Date(a.updated));
    if (sort === "updated-asc") list = list.sort((a,b)=> new Date(a.updated) - new Date(b.updated));
    if (sort === "priority") {
      const order = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
      list = list.sort((a,b)=> order[a.priority]-order[b.priority]);
    }
    return list;
  }, [tickets, status, priority, category, query, sort]);

  function toggleSelect(id) {
    setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);
  }

  function bulkUpdate(field, value) {
    setTickets(ts => ts.map(t => selected.includes(t.id) ? { ...t, [field]: value, updated: new Date().toISOString().slice(0,16).replace('T',' ') } : t));
    setSelected([]);
  }

  function createTicket(data) {
    const id = `GB-${(1000 + Math.floor(Math.random()*9000))}`;
    const now = new Date().toISOString().slice(0,16).replace('T',' ');
    const t = { id, subject: data.subject, member: data.member || "—", club: data.club || "Online", priority: data.priority || "Medium", status: "Open", created: now, updated: now, assignee: data.assignee || "—", category: data.category || "App", replies: 0 };
    setTickets([t, ...tickets]);
    setComposeOpen(false);
    setDrawer(id);
  }

  return (
    <Layout>
       <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-gray-100' : 'bg-gradient-to-br from-teal-50 via-white to-teal-100 text-gray-900'}`}>
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <motion.div className="mb-6 flex items-center justify-between" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div>
            <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>Support Tickets</h1>
            <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`}>Fast triage, clean visuals, real time updates.</p>
          </div>
          <div className="flex items-center gap-3">
            <select value={range} onChange={e=>setRange(e.target.value)} className={`rounded-xl px-3 py-2 text-xs ring-1 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-teal-800 text-teal-100 ring-teal-600 focus:ring-teal-400' : 'bg-teal-50 text-gray-900 ring-teal-200 focus:ring-teal-500'}`}>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <motion.button onClick={()=>setComposeOpen(true)} className={`rounded-xl px-4 py-2 text-sm font-semibold shadow-lg ${theme === 'dark' ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-teal-600 text-white hover:bg-teal-700'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Plus className="inline mr-2 h-4 w-4" />
              New ticket
            </motion.button>
          </div>
        </motion.div>

        {/* KPI cards */}
        <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {stats.map((s, index) => (
            <motion.div key={s.label} className={`rounded-2xl border p-4 shadow-lg flex items-center justify-between ${theme === 'dark' ? 'border-teal-600 bg-teal-900' : 'border-teal-300 bg-gradient-to-br from-teal-100 to-teal-200'}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
              <div>
                <div className={`text-xs uppercase tracking-wide ${theme === 'dark' ? 'text-teal-300' : 'text-teal-800'}`}>{s.label}</div>
                <div className={`text-2xl font-bold mt-1 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>{s.value}</div>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${theme === 'dark' ? 'bg-teal-800' : 'bg-gradient-to-br from-teal-300 to-teal-400'}`}>
                {s.label === "Open" && <MessageSquare size={20} className={theme === 'dark' ? 'text-teal-300' : 'text-teal-800'} />}
                {s.label === "Pending" && <AlertTriangle size={20} className={theme === 'dark' ? 'text-teal-300' : 'text-teal-800'} />}
                {s.label === "Resolved" && <CheckCircle size={20} className={theme === 'dark' ? 'text-teal-300' : 'text-teal-800'} />}
                {s.label === "Urgent" && <AlertTriangle size={20} className="text-red-600" />}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div className={`mt-6 rounded-2xl border p-4 shadow-md ${theme === 'dark' ? 'border-teal-600 bg-gradient-to-r from-teal-700 to-gray-800' : 'border-teal-600 bg-gradient-to-r from-teal-100 to-teal-200'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <div className="grid gap-3 md:grid-cols-6">
            <div className="md:col-span-2 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tickets, members, assignees" className={`w-full rounded-xl px-10 py-2 text-sm ring-1 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-teal-800 text-teal-100 ring-teal-600 focus:ring-teal-400' : 'bg-white text-gray-900 ring-teal-200 focus:ring-teal-500'}`} />
            </div>
            <select value={status} onChange={e=>setStatus(e.target.value)} className={`rounded-xl px-3 py-2 text-sm ring-1 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-teal-800 text-teal-100 ring-teal-600 focus:ring-teal-400' : 'bg-white text-gray-900 ring-teal-200 focus:ring-teal-500'}`}><option value="all">All status</option><option>Open</option><option>Pending</option><option>Resolved</option></select>
            <select value={priority} onChange={e=>setPriority(e.target.value)} className={`rounded-xl px-3 py-2 text-sm ring-1 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-teal-800 text-teal-100 ring-teal-600 focus:ring-teal-400' : 'bg-white text-gray-900 ring-teal-200 focus:ring-teal-500'}`}><option value="all">All priority</option><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select>
            <select value={category} onChange={e=>setCategory(e.target.value)} className={`rounded-xl px-3 py-2 text-sm ring-1 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-teal-800 text-teal-100 ring-teal-600 focus:ring-teal-400' : 'bg-white text-gray-900 ring-teal-200 focus:ring-teal-500'}`}><option value="all">All categories</option><option>Billing</option><option>App</option><option>Facilities</option><option>Training</option></select>
            <select value={sort} onChange={e=>setSort(e.target.value)} className={`rounded-xl px-3 py-2 text-sm ring-1 focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-teal-800 text-teal-100 ring-teal-600 focus:ring-teal-400' : 'bg-white text-gray-900 ring-teal-200 focus:ring-teal-500'}`}><option value="updated-desc">Newest updated</option><option value="updated-asc">Oldest updated</option><option value="priority">Priority</option></select>
          </div>
          {selected.length>0 && (
            <motion.div className={`mt-3 flex items-center justify-between rounded-xl px-3 py-2 text-sm ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
              <div>{selected.length} selected</div>
              <div className="flex items-center gap-2">
                <motion.button onClick={()=>bulkUpdate('status','Resolved')} className="rounded-lg bg-teal-600 px-3 py-1 text-white hover:bg-teal-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Mark resolved</motion.button>
                <motion.button onClick={()=>bulkUpdate('assignee','—')} className="rounded-lg bg-teal-500 px-3 py-1 text-white hover:bg-teal-600" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Unassign</motion.button>
                <motion.button onClick={()=>setSelected([])} className={`rounded-lg px-3 py-1 hover:bg-teal-200 ${theme === 'dark' ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-teal-100 text-teal-700'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Clear</motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Table */}
        <motion.div className={`mt-6 overflow-hidden rounded-2xl border p-4 shadow-md ${theme === 'dark' ? 'border-teal-600 bg-teal-900' : 'border-teal-300 bg-gradient-to-br from-teal-50 to-teal-100'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <div className={`grid grid-cols-12 gap-3 border-b p-3 text-xs ${theme === 'dark' ? 'border-teal-600 text-teal-100 bg-teal-800' : 'border-teal-300 text-teal-700 bg-teal-100'}`}>
            <div className="col-span-1">Select</div>
            <div className="col-span-2">Ticket</div>
            <div className="col-span-3">Subject</div>
            <div className="col-span-2">Member</div>
            <div className="col-span-1">Priority</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Updated</div>
          </div>
          <ul className={`divide-y ${theme === 'dark' ? 'divide-teal-700' : 'divide-teal-200'}`}>
            {filtered.map((t, index) => (
              <motion.li key={t.id} className={`grid grid-cols-12 items-center gap-3 px-3 py-3 transition-colors ${theme === 'dark' ? 'hover:bg-teal-800' : 'hover:bg-teal-50'}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                <div className="col-span-1">
                  <input type="checkbox" checked={selected.includes(t.id)} onChange={()=>toggleSelect(t.id)} className={`rounded ${theme === 'dark' ? 'border-teal-600' : 'border-teal-300'}`} />
                </div>
                <div className="col-span-2">
                  <motion.button onClick={()=>setDrawer(t.id)} className="rounded bg-teal-600 px-2 py-1 text-xs text-white hover:bg-teal-700 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{t.id}</motion.button>
                  <div className={`text-[11px] ${theme === 'dark' ? 'text-teal-300' : 'text-teal-600'}`}>{t.category} • {t.club}</div>
                </div>
                <div className="col-span-3">
                  <div className={`text-sm font-medium ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>{t.subject}</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>Assignee: {t.assignee}</div>
                </div>
                <div className={`col-span-2 text-sm ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>{t.member}</div>
                <div className="col-span-1">
                  <span className={`rounded px-2 py-1 text-xs ${
                    t.priority==='Urgent'?'bg-red-500/20 text-red-600':
                    t.priority==='High'?'bg-orange-500/20 text-orange-600':
                    t.priority==='Medium'?'bg-yellow-500/20 text-yellow-600':'bg-teal-200 text-teal-800'}`}>{t.priority}</span>
                </div>
                <div className="col-span-1">
                  <span className={`rounded px-2 py-1 text-xs ${t.status==='Resolved'?'bg-green-500/20 text-green-600':t.status==='Pending'?'bg-blue-500/20 text-blue-600':'bg-indigo-500/20 text-indigo-600'}`}>{t.status}</span>
                </div>
                <div className={`col-span-2 text-xs ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>{t.updated}</div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Footer actions */}
        <motion.div className={`mt-6 flex items-center justify-between text-sm ${theme === 'dark' ? 'text-teal-300' : 'text-gray-600'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
          <div>{filtered.length} tickets</div>
          <div className="flex items-center gap-2">
            <motion.button className={`rounded-xl px-3 py-2 hover:bg-opacity-80 ${theme === 'dark' ? 'bg-teal-700 text-teal-100 hover:bg-teal-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Export</motion.button>
            <motion.button className={`rounded-xl px-3 py-2 hover:bg-opacity-80 ${theme === 'dark' ? 'bg-teal-700 text-teal-100 hover:bg-teal-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Automation</motion.button>
          </div>
        </motion.div>
      </div>

      {/* Drawer */}
      {drawer && (
        <TicketDrawer ticket={tickets.find(x=>x.id===drawer)} onClose={()=>setDrawer(null)} onUpdate={(patch)=>{
          setTickets(ts=>ts.map(t=> t.id===drawer? { ...t, ...patch, updated: new Date().toISOString().slice(0,16).replace('T',' ') }: t));
        }} />
      )}

      {/* Compose */}
      {composeOpen && (
        <ComposeModal onClose={()=>setComposeOpen(false)} onCreate={createTicket} />
      )}
    </div>
    </Layout>
  );
}

function TicketDrawer({ ticket, onClose, onUpdate }) {
  const [reply, setReply] = useState("");
  const [nextStatus, setNextStatus] = useState(ticket.status);
  const [nextAssignee, setNextAssignee] = useState(ticket.assignee);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-900 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{ticket.id} - {ticket.subject}</h3>
          <button onClick={onClose} className="rounded-lg bg-slate-700 px-3 py-1 text-xs">Close</button>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <Info label="Member" value={ticket.member} />
          <Info label="Club" value={ticket.club} />
          <Info label="Priority" value={ticket.priority} />
          <Info label="Status" value={ticket.status} />
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <Info label="Category" value={ticket.category} />
          <Info label="Assignee" value={ticket.assignee} />
          <Info label="Created" value={ticket.created} />
          <Info label="Updated" value={ticket.updated} />
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Replies ({ticket.replies})</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {/* Mock replies */}
            <div className="rounded-xl border border-white/10 bg-teal-100/60 p-3">
              <div className="text-xs text-slate-400">Vikram • 2025-10-03 14:12</div>
              <div className="text-sm mt-1">We're looking into this issue. Please provide more details about your device.</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-teal-100/60 p-3">
              <div className="text-xs text-slate-400">Aarav S. • 2025-10-03 13:45</div>
              <div className="text-sm mt-1">I'm using an iPhone 12 with the latest app version.</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <select value={nextStatus} onChange={e=>setNextStatus(e.target.value)} className="rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-white/10">
            <option>Open</option><option>Pending</option><option>Resolved</option>
          </select>
          <input value={nextAssignee} onChange={e=>setNextAssignee(e.target.value)} placeholder="Assignee" className="rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-white/10" />
        </div>
        <textarea value={reply} onChange={e=>setReply(e.target.value)} placeholder="Add a reply..." className="w-full rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-white/10 mb-4" rows={3} />
        <div className="flex items-center justify-end gap-2">
          <button onClick={onClose} className="rounded-xl bg-slate-700 px-4 py-2 text-sm">Cancel</button>
          <button onClick={()=>{onUpdate({status:nextStatus, assignee:nextAssignee}); onClose();}} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30">Update</button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function ComposeModal({ onClose, onCreate }) {
  const [subject, setSubject] = useState("");
  const [member, setMember] = useState("");
  const [club, setClub] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("App");
  const [assignee, setAssignee] = useState("");

  function submit() {
    if (!subject.trim()) return alert("Add a subject");
    onCreate({ subject, member, club, priority, category, assignee });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-teal-50/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-teal-200 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create ticket</h3>
          <button onClick={onClose} className="rounded-lg bg-slate-700 px-3 py-1 text-xs">Close</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Subject" className="col-span-2 rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-white/10" />
          <input value={member} onChange={e=>setMember(e.target.value)} placeholder="Member name" className="rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-white/10" />
          <input value={club} onChange={e=>setClub(e.target.value)} placeholder="Club or location" className="rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-white/10" />
          <select value={priority} onChange={e=>setPriority(e.target.value)} className="rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-white/10"><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-white/10"><option>Billing</option><option>App</option><option>Facilities</option><option>Training</option></select>
          <input value={assignee} onChange={e=>setAssignee(e.target.value)} placeholder="Assign to" className="rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-white/10" />
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button onClick={onClose} className="rounded-xl bg-slate-700 px-4 py-2 text-sm">Cancel</button>
          <button onClick={submit} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30">Create</button>
        </div>
      </div>
    </div>
  );
}
 