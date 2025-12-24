import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";

export default function Settings() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [highContrast, setHighContrast] = useState(false);
  const [range, setRange] = useState("7");

  return (
    <Layout>
      <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-teal-900 text-teal-100' : 'bg-teal-50 text-teal-900'}`}>
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>Settings</h1>
              <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Manage your account, preferences, and club level controls.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>
                <span>High contrast</span>
                <input type="checkbox" checked={highContrast} onChange={e => setHighContrast(e.target.checked)} className="accent-teal-600" />
              </label>
              <select
                value={range}
                onChange={e => setRange(e.target.value)}
                className={`rounded-xl px-3 py-2 text-xs ring-1 ring-teal-300 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <button onClick={() => alert('Exporting data...')} className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110">Export</button>
            </div>
          </div>

          {/* Tabs + content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left rail */}
            <nav className="lg:col-span-3">
              <ul className="space-y-2">
                {[
                  { id: "profile", label: "Profile" },
                  { id: "security", label: "Security" },
                  { id: "notifications", label: "Notifications" },
                  { id: "appearance", label: "Appearance" },
                  { id: "branches", label: "Branches" },
                  { id: "integrations", label: "Integrations" },
                  { id: "billing", label: "Billing" },
                  { id: "advanced", label: "Advanced" },
                ].map(t => (
                  <li key={t.id}>
                    <button
                      onClick={() => setActiveTab(t.id)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        activeTab === t.id
                          ? `border-teal-500 shadow ${theme === 'dark' ? 'bg-gray-700' : 'bg-teal-100'}`
                          : `border-teal-300 hover:border-teal-400 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`
                      } ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}
                    >
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Main card */}
            <div className="lg:col-span-9">
              {activeTab === "profile" && <ProfileTab />}
              {activeTab === "security" && <SecurityTab />}
              {activeTab === "notifications" && <NotificationsTab />}
              {activeTab === "appearance" && <AppearanceTab />}
              {activeTab === "branches" && <BranchesTab />}
              {activeTab === "integrations" && <IntegrationsTab />}
              {activeTab === "billing" && <BillingTab />}
              {activeTab === "advanced" && <AdvancedTab />}
            </div>
          </div>

          <footer className="mt-10 border-t border-teal-300 py-6 text-center text-xs text-teal-600">
            © {new Date().getFullYear()} IronBase Gym. All rights reserved.
          </footer>
        </div>
      </div>
    </Layout>
  );
}

function Section({ title, subtitle, children }) {
  const { theme } = useTheme();
  return (
    <div className={`rounded-2xl border border-teal-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-5 shadow`}>
      <div className="mb-4">
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>{title}</h3>
        {subtitle && <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function SaveBar({ onReset, onSave }) {
  const { theme } = useTheme();
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <button onClick={onReset} className={`rounded-xl px-4 py-2 text-sm ${theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-200 text-teal-900'}`}>
        Reset
      </button>
      <button onClick={onSave} className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow">
        Save changes
      </button>
    </div>
  );
}

/* PROFILE */
function ProfileTab() {
  const { theme } = useTheme();
  const [name, setName] = useState("Vaibhav Singh");
  const [email, setEmail] = useState("vaibhav@ironbase.gym");
  const [phone, setPhone] = useState("+91 90000 00000");
  const [role, setRole] = useState("Admin");
  const [bio, setBio] = useState("Helps members hit real goals. Loves strength, hates fluff.");

  function save() {
    alert("Profile saved");
  }
  function reset() {
    alert("Reverted changes");
  }

  return (
    <div className="space-y-6">
      <Section title="Profile" subtitle="Your basic info for staff and members.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Full name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className={`mt-1 w-full rounded-xl px-3 py-2 text-sm ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            />
          </div>
          <div>
            <label className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className={`mt-1 w-full rounded-xl px-3 py-2 text-sm ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Trainer</option>
              <option>Support</option>
            </select>
          </div>
          <div>
            <label className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`mt-1 w-full rounded-xl px-3 py-2 text-sm ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            />
          </div>
          <div>
            <label className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Phone</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className={`mt-1 w-full rounded-xl px-3 py-2 text-sm ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            />
          </div>
          <div className="md:col-span-2">
            <label className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              className={`mt-1 w-full rounded-xl px-3 py-2 text-sm ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            />
          </div>
        </div>
        <SaveBar onReset={reset} onSave={save} />
      </Section>

      <Section title="Team visibility" subtitle="Choose what your team sees on member profiles.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            "Workout history",
            "Body metrics",
            "Payment status",
            "Injury notes",
            "Diet plans",
            "Trainer comments",
          ].map(key => (
            <label
              key={key}
              className={`flex items-center justify-between rounded-xl border border-teal-300 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <span>{key}</span>
              <input type="checkbox" defaultChecked className="accent-teal-600" />
            </label>
          ))}
        </div>
        <SaveBar onReset={() => {}} onSave={save} />
      </Section>
    </div>
  );
}

/* SECURITY */
function SecurityTab() {
  const { theme } = useTheme();
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [otp, setOtp] = useState(false);
  const [sessions] = useState([
    { id: 1, device: "Windows Chrome", ip: "103.22.10.4", last: "2h ago" },
    { id: 2, device: "Mac Safari", ip: "102.76.1.22", last: "1d ago" },
  ]);

  function save() {
    alert("Security settings saved");
  }

  return (
    <div className="space-y-6">
      <Section title="Password" subtitle="Keep it long. Keep it unique.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>New password</label>
            <input
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              type="password"
              className={`mt-1 w-full rounded-xl px-3 py-2 text-sm ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            />
          </div>
          <div>
            <label className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Confirm password</label>
            <input
              value={pwd2}
              onChange={e => setPwd2(e.target.value)}
              type="password"
              className={`mt-1 w-full rounded-xl px-3 py-2 text-sm ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            />
          </div>
        </div>
        <SaveBar onReset={() => { setPwd(""); setPwd2(""); }} onSave={save} />
      </Section>

      <Section title="Two factor" subtitle="One time code for sign in">
        <div className={`flex items-center justify-between rounded-xl border border-teal-300 px-4 py-3 text-sm ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}>
          <div>
            <div className="font-semibold">Authenticator app</div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Get a code when you sign in</div>
          </div>
          <input type="checkbox" checked={otp} onChange={e => setOtp(e.target.checked)} className="accent-teal-600" />
        </div>
        <SaveBar onReset={() => setOtp(false)} onSave={save} />
      </Section>

      <Section title="Sessions" subtitle="Devices using your account.">
        <ul className="space-y-2">
          {sessions.map(s => (
            <li
              key={s.id}
              className={`flex items-center justify-between rounded-xl border border-teal-300 px-4 py-3 text-sm ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <div>
                <div className="font-semibold">{s.device}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>IP {s.ip} • {s.last}</div>
              </div>
              <button className={`rounded-lg px-3 py-1 text-xs ${theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-300 text-teal-900'}`}>Sign out</button>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

/* NOTIFICATIONS */
function NotificationsTab() {
  const { theme } = useTheme();
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(true);
  const [push, setPush] = useState(true);

  function save() {
    alert("Notification preferences saved");
  }

  return (
    <div className="space-y-6">
      <Section title="Member updates" subtitle="Choose what you receive.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { k: "Class reminders", state: email, set: setEmail },
            { k: "New signups", state: sms, set: setSms },
            { k: "PT booking alerts", state: push, set: setPush },
            { k: "Low attendance", state: true, set: () => {} },
            { k: "Missed payments", state: true, set: () => {} },
            { k: "Weekly summary", state: true, set: () => {} },
          ].map(item => (
            <label
              key={item.k}
              className={`flex items-center justify-between rounded-xl border border-teal-300 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <span>{item.k}</span>
              <input
                type="checkbox"
                defaultChecked={item.state}
                onChange={e => item.set(e.target.checked)}
                className="accent-teal-600"
              />
            </label>
          ))}
        </div>
        <SaveBar onReset={() => { setEmail(true); setSms(true); setPush(true); }} onSave={save} />
      </Section>

      <Section title="Channels" subtitle="Your default delivery method.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Email", key: "email" },
            { label: "SMS", key: "sms" },
            { label: "Push", key: "push" },
            { label: "In app", key: "inapp" },
          ].map(c => (
            <div
              key={c.key}
              className={`flex items-center justify-between rounded-xl border border-teal-300 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <span>{c.label}</span>
              <input type="checkbox" defaultChecked className="accent-teal-600" />
            </div>
          ))}
        </div>
        <SaveBar onReset={() => {}} onSave={save} />
      </Section>
    </div>
  );
}

/* APPEARANCE */
function AppearanceTab() {
  const { theme } = useTheme();
  const [themeColor, setThemeColor] = useState("emerald");
  const [density, setDensity] = useState("comfortable");

  function save() {
    alert("Appearance saved");
  }

  return (
    <div className="space-y-6">
      <Section title="Theme" subtitle="Pick your accent and layout density.">
        <div className="grid grid-cols-2 gap-3">
          <select
            value={themeColor}
            onChange={e => setThemeColor(e.target.value)}
            className={`rounded-xl px-3 py-2 text-sm ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
          >
            <option value="emerald">Emerald</option>
            <option value="cyan">Cyan</option>
            <option value="indigo">Indigo</option>
            <option value="rose">Rose</option>
          </select>
          <select
            value={density}
            onChange={e => setDensity(e.target.value)}
            className={`rounded-xl px-3 py-2 text-sm ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`h-20 rounded-xl border border-teal-300 ${theme === 'dark' ? 'bg-gray-700' : 'bg-teal-100'}`}></div>
          ))}
        </div>
        <SaveBar onReset={() => { setThemeColor("emerald"); setDensity("comfortable"); }} onSave={save} />
      </Section>
    </div>
  );
}

/* BRANCHES */
function BranchesTab() {
  const { theme } = useTheme();
  const [branches, setBranches] = useState([
    { id: 1, name: "Hyderabad", code: "HYD", status: "Open" },
    { id: 2, name: "Agra", code: "AGR", status: "Open" },
    { id: 3, name: "Delhi", code: "DEL", status: "Maintenance" },
  ]);
  const [newBranch, setNewBranch] = useState({ name: "", code: "" });

  function addBranch() {
    if (!newBranch.name || !newBranch.code) return alert("Add name and code");
    setBranches([{ id: Date.now(), name: newBranch.name, code: newBranch.code, status: "Open" }, ...branches]);
    setNewBranch({ name: "", code: "" });
  }

  return (
    <div className="space-y-6">
      <Section title="Branches" subtitle="Manage locations and status.">
        <div className="mb-3 grid grid-cols-3 gap-3 text-sm">
          <input
            value={newBranch.name}
            onChange={e => setNewBranch({ ...newBranch, name: e.target.value })}
            placeholder="Branch name"
            className={`rounded-xl px-3 py-2 ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
          />
          <input
            value={newBranch.code}
            onChange={e => setNewBranch({ ...newBranch, code: e.target.value })}
            placeholder="Code"
            className={`rounded-xl px-3 py-2 ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
          />
          <button onClick={addBranch} className="rounded-xl bg-teal-400 px-4 py-2 font-semibold text-teal-900">
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {branches.map(b => (
            <li
              key={b.id}
              className={`flex items-center justify-between rounded-xl border border-teal-300 px-4 py-3 text-sm ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <div>
                <div className="font-semibold">{b.name} • {b.code}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Status {b.status}</div>
              </div>
              <select
                defaultValue={b.status}
                className={`rounded-lg px-2 py-1 text-xs ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-200 text-teal-900'}`}
              >
                <option>Open</option>
                <option>Maintenance</option>
                <option>Closed</option>
              </select>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

/* INTEGRATIONS */
function IntegrationsTab() {
  const { theme } = useTheme();
  const tools = [
    { id: "razorpay", name: "Razorpay", desc: "Payments and invoices", status: "Connected" },
    { id: "whatsapp", name: "WhatsApp Business", desc: "Member chat and alerts", status: "Connected" },
    { id: "mailgun", name: "Mailgun", desc: "Email delivery", status: "Not connected" },
    { id: "twilio", name: "Twilio SMS", desc: "Text messages", status: "Not connected" },
  ];

  return (
    <div className="space-y-6">
      <Section title="Integrations" subtitle="Connect the tools you already use.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {tools.map(t => (
            <div
              key={t.id}
              className={`flex items-center justify-between rounded-2xl border border-teal-300 p-4 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>{t.desc}</div>
              </div>
              <button
                className={`rounded-lg px-3 py-1 text-xs ${
                  t.status === "Connected" ? "bg-teal-600 text-white" : (theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-300 text-teal-900')
                }`}
              >
                {t.status === "Connected" ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* BILLING */
function BillingTab() {
  const { theme } = useTheme();
  const invoices = [
    { id: "INV-1101", amount: "₹ 24,000", date: "2025-09-01", status: "Paid" },
    { id: "INV-1098", amount: "₹ 24,000", date: "2025-08-01", status: "Paid" },
    { id: "INV-1095", amount: "₹ 24,000", date: "2025-07-01", status: "Paid" },
  ];

  return (
    <div className="space-y-6">
      <Section title="Plan" subtitle="Change or update your subscription.">
        <div className={`flex items-center justify-between rounded-xl border border-teal-300 px-4 py-3 text-sm ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}>
          <div>
            <div className="font-semibold">Pro plan</div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Unlimited members and branches</div>
          </div>
          <button className={`rounded-lg px-3 py-1 text-xs ${theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-300 text-teal-900'}`}>Change plan</button>
        </div>
      </Section>

      <Section title="Invoices" subtitle="Download past invoices.">
        <div className="overflow-hidden rounded-2xl border border-teal-300">
          <table className={`w-full text-sm ${theme === 'dark' ? 'text-teal-100' : 'text-teal-900'}`}>
            <thead className={`text-left text-xs ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-teal-100 text-teal-700'}`}>
              <tr>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-600 bg-gray-800' : 'divide-teal-200 bg-white'}`}>
              {invoices.map(inv => (
                <tr key={inv.id} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-teal-50'}>
                  <td className="px-4 py-3 font-medium">{inv.id}</td>
                  <td className="px-4 py-3">{inv.date}</td>
                  <td className="px-4 py-3">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-1 text-xs ${theme === 'dark' ? 'bg-teal-600/20 text-gray-300' : 'bg-teal-600/20 text-teal-700'}`}>{inv.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className={`rounded-lg px-3 py-1 text-xs ${theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-300 text-teal-900'}`}>Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

/* ADVANCED */
function AdvancedTab() {
  const { theme } = useTheme();
  const [dangerOpen, setDangerOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Section title="Automation" subtitle="Daily jobs and health checks.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            "Daily backup",
            "Cleanup old sessions",
            "Rebuild analytics",
            "Sync email lists",
          ].map(k => (
            <label
              key={k}
              className={`flex items-center justify-between rounded-xl border border-teal-300 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <span>{k}</span>
              <input type="checkbox" defaultChecked className="accent-teal-600" />
            </label>
          ))}
        </div>
      </Section>

      <Section title="Danger zone" subtitle="These actions cannot be undone.">
        <div className="flex items-center justify-between rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          <div>
            <div className="font-semibold">Delete account</div>
            <div className="text-xs">Remove the workspace and all data</div>
          </div>
          <button onClick={() => setDangerOpen(true)} className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white">
            Delete
          </button>
        </div>
      </Section>

      {dangerOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-red-300 bg-white p-5 text-red-700">
            <h4 className="text-lg font-semibold">Confirm deletion</h4>
            <p className="mt-1 text-sm">Type DELETE to confirm</p>
            <input placeholder="DELETE" className="mt-3 w-full rounded-xl bg-red-100 px-3 py-2 text-sm ring-1 ring-red-300" />
            <div className="mt-4 flex items-center justify-end gap-2">
              <button onClick={() => setDangerOpen(false)} className="rounded-xl bg-red-200 px-4 py-2 text-sm text-red-700">
                Cancel
              </button>
              <button className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
