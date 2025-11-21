// Settings.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [refreshRate, setRefreshRate] = useState("5");

  return (
    <main className="min-h-screen bg-black text-gray-100 font-sans">
      {/* Header */}
      <header className="border-b border-gray-800 backdrop-blur-sm sticky top-0 z-50 bg-black/80 shadow-md shadow-yellow-900/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <button className="px-3 py-1 rounded-md bg-gray-900 hover:bg-gray-700 text-yellow-400 text-sm border border-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
                ← Back
              </button>
            </Link>
            <h1 className="text-3xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">
              Settings
            </h1>
          </div>
        </div>
      </header>

      {/* Settings Content */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Display Settings */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-yellow-400">
              <span>⚙️</span>
              Display Settings
            </h2>

            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div>
                  <h3 className="font-semibold text-white">Dark Mode</h3>
                  <p className="text-sm text-gray-400">Currently active</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    darkMode ? "bg-yellow-500" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      darkMode ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Refresh Rate */}
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <label className="block font-semibold text-white mb-2">
                  Dashboard Refresh Rate
                </label>
                <select
                  value={refreshRate}
                  onChange={(e) => setRefreshRate(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition"
                >
                  <option value="1">1 second</option>
                  <option value="3">3 seconds</option>
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-yellow-400">
              <span>🔔</span>
              Notification Settings
            </h2>

            <div className="space-y-4">
              {/* Alert Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div>
                  <h3 className="font-semibold text-white">Alert Notifications</h3>
                  <p className="text-sm text-gray-400">
                    Get notified of critical alerts
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications ? "bg-yellow-500" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      notifications ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Email Alerts */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div>
                  <h3 className="font-semibold text-white">Email Alerts</h3>
                  <p className="text-sm text-gray-400">
                    Receive email notifications
                  </p>
                </div>
                <button className="relative w-14 h-8 rounded-full bg-gray-600 transition-colors">
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full" />
                </button>
              </div>
            </div>
          </div>

          {/* Sensor Settings */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-yellow-400">
              <span>📡</span>
              Sensor Configuration
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <label className="block font-semibold text-white mb-2">
                  Gas Detector Sensitivity
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  className="w-full"
                />
                <p className="text-sm text-gray-400 mt-2">Current: Medium</p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <label className="block font-semibold text-white mb-2">
                  Temperature Alert Threshold
                </label>
                <input
                  type="number"
                  defaultValue="35"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                />
                <p className="text-sm text-gray-400 mt-2">°C</p>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-yellow-400">
              <span>ℹ️</span>
              System Information
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-gray-800/50 rounded border border-gray-700">
                <span className="text-gray-400">System Version</span>
                <span className="text-white font-semibold">v2.1.0</span>
              </div>

              <div className="flex justify-between p-3 bg-gray-800/50 rounded border border-gray-700">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-white font-semibold">
                  Nov 21, 2025
                </span>
              </div>

              <div className="flex justify-between p-3 bg-gray-800/50 rounded border border-gray-700">
                <span className="text-gray-400">API Status</span>
                <span className="text-green-400 font-semibold">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
