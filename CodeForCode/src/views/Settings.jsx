import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import settingsService from "../services/settingsService";
import { BASE_API_URL, getToken } from "../Utils/data";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-5 text-center">
          <h3 className="text-lg font-semibold text-red-600">Something went wrong.</h3>
          <p className="text-sm text-gray-600">Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Settings() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [highContrast, setHighContrast] = useState(false);
  const [range, setRange] = useState("7");
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchSettings();
      const interval = setInterval(fetchSettings, 10000); // Real-time updates every 10 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getSettings(user.id);
      setSettings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load settings');
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      // Implement export functionality
      const response = await fetch(`${BASE_API_URL}export/${user.id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Export failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'settings_export.json';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Export failed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading settings...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </Layout>
    );
  }

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
              <button onClick={handleExport} className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110">Export</button>
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
              {activeTab === "profile" && <ErrorBoundary><ProfileTab settings={settings} /></ErrorBoundary>}
              {activeTab === "security" && <SecurityTab settings={settings} />}
              {activeTab === "notifications" && <NotificationsTab settings={settings} />}
              {activeTab === "appearance" && <AppearanceTab settings={settings} />}
              {activeTab === "branches" && <BranchesTab settings={settings} />}
              {activeTab === "integrations" && <IntegrationsTab settings={settings} />}
              {activeTab === "billing" && <BillingTab settings={settings} />}
              {activeTab === "advanced" && <AdvancedTab settings={settings} />}
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
function ProfileTab({ settings }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [teamVisibility, setTeamVisibility] = useState({
    workoutHistory: true,
    bodyMetrics: true,
    paymentStatus: true,
    injuryNotes: true,
    dietPlans: true,
    trainerComments: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings?.profile) {
      setName(settings.profile.name || "");
      setEmail(settings.profile.email || "");
      setPhone(settings.profile.phone || "");
      setRole(settings.profile.role || "");
      setBio(settings.profile.bio || "");
      setTeamVisibility(settings.profile.teamVisibility || teamVisibility);
    }
  }, [settings]);

  async function save() {
    setLoading(true);
    try {
      await settingsService.updateProfile(user.id, { name, email, phone, role, bio, teamVisibility });
      alert("Profile saved successfully");
    } catch (err) {
      alert("Failed to save profile: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    if (settings?.profile) {
      setName(settings.profile.name || "");
      setEmail(settings.profile.email || "");
      setPhone(settings.profile.phone || "");
      setRole(settings.profile.role || "");
      setBio(settings.profile.bio || "");
      setTeamVisibility(settings.profile.teamVisibility || teamVisibility);
    }
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
            { key: "workoutHistory", label: "Workout history" },
            { key: "bodyMetrics", label: "Body metrics" },
            { key: "paymentStatus", label: "Payment status" },
            { key: "injuryNotes", label: "Injury notes" },
            { key: "dietPlans", label: "Diet plans" },
            { key: "trainerComments", label: "Trainer comments" },
          ].map(item => (
            <label
              key={item.key}
              className={`flex items-center justify-between rounded-xl border border-teal-300 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <span>{item.label}</span>
              <input
                type="checkbox"
                checked={teamVisibility[item.key]}
                onChange={e => setTeamVisibility({ ...teamVisibility, [item.key]: e.target.checked })}
                className="accent-teal-600"
              />
            </label>
          ))}
        </div>
        <SaveBar onReset={reset} onSave={save} />
      </Section>
    </div>
  );
}

/* SECURITY */
function SecurityTab({ settings }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [otp, setOtp] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings?.security) {
      setOtp(settings.security.twoFactorEnabled || false);
      setSessions(settings.security.sessions || []);
    }
  }, [settings]);

  async function savePassword() {
    if (pwd !== pwd2) {
      alert("Passwords do not match");
      return;
    }
    if (pwd.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    setLoading(true);
    try {
      await settingsService.updatePassword(user.id, pwd);
      alert("Password updated successfully");
      setPwd("");
      setPwd2("");
    } catch (err) {
      alert("Failed to update password: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveSecurity() {
    setLoading(true);
    try {
      await settingsService.updateSecurity(user.id, { twoFactorEnabled: otp });
      alert("Security settings saved successfully");
    } catch (err) {
      alert("Failed to save security settings: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function resetPassword() {
    setPwd("");
    setPwd2("");
  }

  function resetSecurity() {
    if (settings?.security) {
      setOtp(settings.security.twoFactorEnabled || false);
    }
  }

  async function signOutSession(sessionId) {
    try {
      await settingsService.signOutSession(user.id, sessionId);
      setSessions(sessions.filter(s => s.id !== sessionId));
    } catch (err) {
      alert("Failed to sign out: " + err.message);
    }
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
        <SaveBar onReset={resetPassword} onSave={savePassword} />
      </Section>

      <Section title="Two factor" subtitle="One time code for sign in">
        <div className={`flex items-center justify-between rounded-xl border border-teal-300 px-4 py-3 text-sm ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}>
          <div>
            <div className="font-semibold">Authenticator app</div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Get a code when you sign in</div>
          </div>
          <input type="checkbox" checked={otp} onChange={e => setOtp(e.target.checked)} className="accent-teal-600" />
        </div>
        <SaveBar onReset={resetSecurity} onSave={saveSecurity} />
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
              <button onClick={() => signOutSession(s.id)} className={`rounded-lg px-3 py-1 text-xs ${theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-300 text-teal-900'}`}>Sign out</button>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

/* NOTIFICATIONS */
function NotificationsTab({ settings }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [memberUpdates, setMemberUpdates] = useState({
    classReminders: true,
    newSignups: true,
    ptBookingAlerts: true,
    lowAttendance: true,
    missedPayments: true,
    weeklySummary: true,
  });
  const [channels, setChannels] = useState({
    email: true,
    sms: true,
    push: true,
    inapp: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings?.notifications) {
      setMemberUpdates(settings.notifications.memberUpdates || memberUpdates);
      setChannels(settings.notifications.channels || channels);
    }
  }, [settings]);

  async function save() {
    setLoading(true);
    try {
      await settingsService.updateNotifications(user.id, { memberUpdates, channels });
      alert("Notification preferences saved successfully");
    } catch (err) {
      alert("Failed to save notification preferences: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    if (settings?.notifications) {
      setMemberUpdates(settings.notifications.memberUpdates || memberUpdates);
      setChannels(settings.notifications.channels || channels);
    }
  }

  return (
    <div className="space-y-6">
      <Section title="Member updates" subtitle="Choose what you receive.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { k: "Class reminders", key: "classReminders", state: memberUpdates.classReminders, set: (val) => setMemberUpdates({ ...memberUpdates, classReminders: val }) },
            { k: "New signups", key: "newSignups", state: memberUpdates.newSignups, set: (val) => setMemberUpdates({ ...memberUpdates, newSignups: val }) },
            { k: "PT booking alerts", key: "ptBookingAlerts", state: memberUpdates.ptBookingAlerts, set: (val) => setMemberUpdates({ ...memberUpdates, ptBookingAlerts: val }) },
            { k: "Low attendance", key: "lowAttendance", state: memberUpdates.lowAttendance, set: (val) => setMemberUpdates({ ...memberUpdates, lowAttendance: val }) },
            { k: "Missed payments", key: "missedPayments", state: memberUpdates.missedPayments, set: (val) => setMemberUpdates({ ...memberUpdates, missedPayments: val }) },
            { k: "Weekly summary", key: "weeklySummary", state: memberUpdates.weeklySummary, set: (val) => setMemberUpdates({ ...memberUpdates, weeklySummary: val }) },
          ].map(item => (
            <label
              key={item.k}
              className={`flex items-center justify-between rounded-xl border border-teal-300 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <span>{item.k}</span>
              <input
                type="checkbox"
                checked={item.state}
                onChange={e => item.set(e.target.checked)}
                className="accent-teal-600"
              />
            </label>
          ))}
        </div>
        <SaveBar onReset={reset} onSave={save} />
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
              <input
                type="checkbox"
                checked={channels[c.key]}
                onChange={e => setChannels({ ...channels, [c.key]: e.target.checked })}
                className="accent-teal-600"
              />
            </div>
          ))}
        </div>
        <SaveBar onReset={reset} onSave={save} />
      </Section>
    </div>
  );
}

/* APPEARANCE */
function AppearanceTab({ settings }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [themeColor, setThemeColor] = useState("emerald");
  const [density, setDensity] = useState("comfortable");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings?.appearance) {
      setThemeColor(settings.appearance.themeColor || "emerald");
      setDensity(settings.appearance.density || "comfortable");
    }
  }, [settings]);

  async function save() {
    setLoading(true);
    try {
      await settingsService.updateAppearance(user.id, { themeColor, density });
      alert("Appearance saved successfully");
    } catch (err) {
      alert("Failed to save appearance: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    if (settings?.appearance) {
      setThemeColor(settings.appearance.themeColor || "emerald");
      setDensity(settings.appearance.density || "comfortable");
    }
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
        <SaveBar onReset={reset} onSave={save} />
      </Section>
    </div>
  );
}

/* BRANCHES */
function BranchesTab({ settings }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [branches, setBranches] = useState([]);
  const [newBranch, setNewBranch] = useState({ name: "", code: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings?.branches) {
      setBranches(settings.branches || []);
    }
  }, [settings]);

  async function addBranch() {
    if (!newBranch.name || !newBranch.code) return alert("Add name and code");
    setLoading(true);
    try {
      const updatedBranches = [{ id: Date.now(), name: newBranch.name, code: newBranch.code, status: "Open" }, ...branches];
      await settingsService.updateBranches(user.id, updatedBranches);
      setBranches(updatedBranches);
      setNewBranch({ name: "", code: "" });
      alert("Branch added successfully");
    } catch (err) {
      alert("Failed to add branch: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateBranchStatus(branchId, status) {
    setLoading(true);
    try {
      const updatedBranches = branches.map(b => b.id === branchId ? { ...b, status } : b);
      await settingsService.updateBranches(user.id, updatedBranches);
      setBranches(updatedBranches);
    } catch (err) {
      alert("Failed to update branch status: " + err.message);
    } finally {
      setLoading(false);
    }
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
          <button onClick={addBranch} disabled={loading} className="rounded-xl bg-teal-400 px-4 py-2 font-semibold text-teal-900 disabled:opacity-50">
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
                value={b.status}
                onChange={e => updateBranchStatus(b.id, e.target.value)}
                disabled={loading}
                className={`rounded-lg px-2 py-1 text-xs ring-1 ring-teal-300 ${theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-200 text-teal-900'} disabled:opacity-50`}
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
function IntegrationsTab({ settings }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [integrations, setIntegrations] = useState([
    { id: "razorpay", name: "Razorpay", desc: "Payments and invoices", status: "Connected" },
    { id: "whatsapp", name: "WhatsApp Business", desc: "Member chat and alerts", status: "Connected" },
    { id: "mailgun", name: "Mailgun", desc: "Email delivery", status: "Not connected" },
    { id: "twilio", name: "Twilio SMS", desc: "Text messages", status: "Not connected" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings?.integrations) {
      setIntegrations(settings.integrations || integrations);
    }
  }, [settings]);

  async function toggleIntegration(id) {
    setLoading(true);
    const updated = integrations.map(i => i.id === id ? { ...i, status: i.status === 'Connected' ? 'Not connected' : 'Connected' } : i);
    setIntegrations(updated);
    try {
      await settingsService.updateIntegrations(user.id, updated);
    } catch (err) {
      alert('Failed to update integration: ' + err.message);
      setIntegrations(integrations);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Section title="Integrations" subtitle="Connect the tools you already use.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {integrations.map(t => (
            <div
              key={t.id}
              className={`flex items-center justify-between rounded-2xl border border-teal-300 p-4 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>{t.desc}</div>
              </div>
              <button
                onClick={() => toggleIntegration(t.id)}
                disabled={loading}
                className={`rounded-lg px-3 py-1 text-xs disabled:opacity-50 ${
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
function BillingTab({ settings }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [planChangeOpen, setPlanChangeOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [loading, setLoading] = useState(false);
  const invoices = [
    { id: "INV-1101", amount: "₹ 24,000", date: "2025-09-01", status: "Paid" },
    { id: "INV-1098", amount: "₹ 24,000", date: "2025-08-01", status: "Paid" },
    { id: "INV-1095", amount: "₹ 24,000", date: "2025-07-01", status: "Paid" },
  ];

  async function handleDownload(invoiceId) {
    try {
      const response = await fetch(`${BASE_API_URL}billing/${user.id}/invoices/${invoiceId}/download`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoiceId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Download failed: ' + err.message);
    }
  }

  async function changePlan() {
    setLoading(true);
    try {
      await settingsService.updateBilling(user.id, { plan: selectedPlan });
      alert("Plan changed successfully");
      setPlanChangeOpen(false);
    } catch (err) {
      alert("Failed to change plan: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Section title="Plan" subtitle="Change or update your subscription.">
        <div className={`flex items-center justify-between rounded-xl border border-teal-300 px-4 py-3 text-sm ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}>
          <div>
            <div className="font-semibold">Pro plan</div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-teal-700'}`}>Unlimited members and branches</div>
          </div>
          <button onClick={() => setPlanChangeOpen(true)} className={`rounded-lg px-3 py-1 text-xs ${theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-300 text-teal-900'}`}>Change plan</button>
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
                    <button onClick={() => handleDownload(inv.id)} className={`rounded-lg px-3 py-1 text-xs ${theme === 'dark' ? 'bg-gray-600 text-teal-100' : 'bg-teal-300 text-teal-900'}`}>Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {planChangeOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-teal-300 bg-white p-5">
            <h4 className="text-lg font-semibold">Change Plan</h4>
            <p className="mt-1 text-sm">Select a new plan</p>
            <select
              value={selectedPlan}
              onChange={e => setSelectedPlan(e.target.value)}
              className="mt-3 w-full rounded-xl bg-teal-100 px-3 py-2 text-sm ring-1 ring-teal-300"
            >
              <option>Basic</option>
              <option>Pro</option>
              <option>Enterprise</option>
            </select>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button onClick={() => setPlanChangeOpen(false)} className="rounded-xl bg-teal-200 px-4 py-2 text-sm text-teal-900">
                Cancel
              </button>
              <button onClick={changePlan} disabled={loading} className="rounded-xl bg-teal-600 px-4 py-2 text-sm text-white disabled:opacity-50">
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ADVANCED */
function AdvancedTab({ settings }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [automation, setAutomation] = useState({
    dailyBackup: true,
    cleanupSessions: true,
    rebuildAnalytics: true,
    syncEmails: true,
  });
  const [dangerOpen, setDangerOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings?.advanced) {
      setAutomation(settings.advanced.automation || automation);
    }
  }, [settings]);

  async function save() {
    setLoading(true);
    try {
      await settingsService.updateAdvanced(user.id, { automation });
      alert("Advanced settings saved successfully");
    } catch (err) {
      alert("Failed to save advanced settings: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    if (settings?.advanced) {
      setAutomation(settings.advanced.automation || automation);
    }
  }

  async function confirmDelete() {
    if (confirmText !== "DELETE") {
      alert("Please type DELETE to confirm");
      return;
    }
    setLoading(true);
    try {
      await settingsService.deleteAccount(user.id);
      alert("Account deleted successfully");
      // Optionally, redirect to login or home
      window.location.href = "/login";
    } catch (err) {
      alert("Failed to delete account: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Section title="Automation" subtitle="Daily jobs and health checks.">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { key: "dailyBackup", label: "Daily backup" },
            { key: "cleanupSessions", label: "Cleanup old sessions" },
            { key: "rebuildAnalytics", label: "Rebuild analytics" },
            { key: "syncEmails", label: "Sync email lists" },
          ].map(item => (
            <label
              key={item.key}
              className={`flex items-center justify-between rounded-xl border border-teal-300 px-3 py-2 ${theme === 'dark' ? 'bg-gray-700 text-teal-100' : 'bg-teal-100 text-teal-900'}`}
            >
              <span>{item.label}</span>
              <input
                type="checkbox"
                checked={automation[item.key]}
                onChange={e => setAutomation({ ...automation, [item.key]: e.target.checked })}
                className="accent-teal-600"
              />
            </label>
          ))}
        </div>
        <SaveBar onReset={reset} onSave={save} />
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
            <input
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="mt-3 w-full rounded-xl bg-red-100 px-3 py-2 text-sm ring-1 ring-red-300"
            />
            <div className="mt-4 flex items-center justify-end gap-2">
              <button onClick={() => { setDangerOpen(false); setConfirmText(""); }} className="rounded-xl bg-red-200 px-4 py-2 text-sm text-red-700">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={loading} className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
