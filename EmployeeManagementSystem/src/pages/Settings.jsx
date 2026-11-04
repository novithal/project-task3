import { useState } from "react";

import {
  User,
  Bell,
  Palette,
  ShieldCheck,
  Save,
} from "lucide-react";

import { useHR } from "../context/HRContext";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Avatar from "../components/common/Avatar";

function Settings() {
  const {
    admin,
    setAdmin,
    theme,
    toggleTheme,
    showToast,
  } = useHR();

  const [profile, setProfile] = useState({
    name: admin.name,
    email: admin.email,
    role: admin.role,
  });

  const [notifications, setNotifications] = useState({
    leaveRequests: true,
    attendanceAlerts: true,
    employeeUpdates: false,
    weeklyReports: true,
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const handleProfileSave = (event) => {
    event.preventDefault();

    if (!profile.name.trim() || !profile.email.trim()) {
      showToast("Name and email are required", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      showToast("Enter a valid email address", "error");
      return;
    }

    setAdmin(profile);

    showToast("Profile updated successfully", "success");
  };

  const handlePasswordSave = (event) => {
    event.preventDefault();

    if (!password.current || !password.newPassword || !password.confirm) {
      showToast("Please complete all password fields", "error");
      return;
    }

    if (password.newPassword.length < 8) {
      showToast("Password must have at least 8 characters", "error");
      return;
    }

    if (password.newPassword !== password.confirm) {
      showToast("New passwords do not match", "error");
      return;
    }

    showToast(
      "Demo only: password changes require backend authentication",
      "error"
    );

    setPassword({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  const toggleNotification = (key) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {/* Profile */}

          <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">
                <User size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Administrator Profile
                </h3>

                <p className="text-xs text-slate-500">
                  Update your personal information
                </p>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <Avatar name={profile.name} size="lg" />

              <div>
                <p className="font-semibold text-slate-800">
                  {profile.name}
                </p>

                <p className="text-sm text-slate-500">
                  {profile.role}
                </p>
              </div>
            </div>

            <form
              onSubmit={handleProfileSave}
              className="space-y-4"
            >
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
              />

              <Input
                label="Email Address"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
              />

              <Input
                label="Role"
                value={profile.role}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    role: e.target.value,
                  })
                }
              />

              <div className="flex justify-end">
                <Button type="submit" icon={Save}>
                  Save Profile
                </Button>
              </div>
            </form>
          </section>

          {/* Password */}

          <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 p-3 text-amber-600">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Security
                </h3>

                <p className="text-xs text-slate-500">
                  Password settings
                </p>
              </div>
            </div>

            <form
              onSubmit={handlePasswordSave}
              className="space-y-4"
            >
              <Input
                label="Current Password"
                type="password"
                value={password.current}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    current: e.target.value,
                  })
                }
              />

              <Input
                label="New Password"
                type="password"
                value={password.newPassword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    newPassword: e.target.value,
                  })
                }
              />

              <Input
                label="Confirm New Password"
                type="password"
                value={password.confirm}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    confirm: e.target.value,
                  })
                }
              />

              <div className="flex justify-end">
                <Button type="submit">
                  Update Password
                </Button>
              </div>
            </form>

            <p className="mt-4 text-xs text-amber-700">
              Demo frontend only. Actual password changes require a secure backend.
            </p>
          </section>
        </div>

        <div className="space-y-6">
          {/* Theme */}

          <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
                <Palette size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Appearance
                </h3>

                <p className="text-xs text-slate-500">
                  Choose your theme
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Dark Mode
                </p>

                <p className="text-xs text-slate-500">
                  {theme === "dark" ? "Enabled" : "Disabled"}
                </p>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                aria-pressed={theme === "dark"}
                className={`relative h-6 w-11 rounded-full transition ${
                  theme === "dark"
                    ? "bg-indigo-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    theme === "dark"
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Notifications */}

          <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
                <Bell size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Notifications
                </h3>

                <p className="text-xs text-slate-500">
                  Manage preferences
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                ["leaveRequests", "Leave Requests"],
                ["attendanceAlerts", "Attendance Alerts"],
                ["employeeUpdates", "Employee Updates"],
                ["weeklyReports", "Weekly Reports"],
              ].map(([key, label]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center justify-between gap-3"
                >
                  <span className="text-sm text-slate-700">
                    {label}
                  </span>

                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={() => toggleNotification(key)}
                    className="h-4 w-4 accent-indigo-600"
                  />
                </label>
              ))}
            </div>

            <Button
              block
              className="mt-6"
              onClick={() =>
                showToast(
                  "Notification preferences saved for this session",
                  "success"
                )
              }
            >
              Save Preferences
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;