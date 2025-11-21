// Dashboard.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import LiveSensorDataPanel from "../components/live-sensor-panel";
import AlertsPanel from "../components/alerts-panel";

// Mock data for charts
const temperatureData = [
  { time: "00:00", temp: 22, humidity: 45 },
  { time: "04:00", temp: 20, humidity: 50 },
  { time: "08:00", temp: 25, humidity: 48 },
  { time: "12:00", temp: 28, humidity: 60 },
  { time: "16:00", temp: 26, humidity: 55 },
  { time: "20:00", temp: 23, humidity: 52 },
  { time: "24:00", temp: 21, humidity: 46 },
];

const gasLevelsData = [
  { sensor: "CO", level: 12, safe: 35 },
  { sensor: "CH4", level: 8, safe: 20 },
  { sensor: "H2S", level: 3, safe: 10 },
  { sensor: "O2", level: 20.8, safe: 19.5 },
];

const workerActivityData = [
  { hour: "6:00", active: 5, idle: 2 },
  { hour: "9:00", active: 12, idle: 1 },
  { hour: "12:00", active: 8, idle: 3 },
  { hour: "15:00", active: 14, idle: 2 },
  { hour: "18:00", active: 10, idle: 4 },
];

export default function Dashboard() {
  const [refreshInterval] = useState(5000);

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

            <h1 className="text-3xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 animate-fade-in">
              Real-Time Monitoring Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2 text-sm text-yellow-400">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow shadow-green-500/50" />
            <span className="font-semibold tracking-wide">LIVE</span>
          </div>
        </div>
      </header>

      {/* Dashboard Body */}
      <section className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up">
        
        {/* A. Live Sensor Data */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50 animate-slide-in-left">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
            <span className="w-1.5 h-6 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full animate-pulse-vertical" />
            Live Sensor Data
          </h2>
          <LiveSensorDataPanel />
        </div>

        {/* B. Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Temperature & Humidity Chart */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50 animate-slide-in-left">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
              <span>🌡️</span>
              Temperature & Humidity Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }} />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#FBBF24" name="Temp (°C)" strokeWidth={2} />
                <Line type="monotone" dataKey="humidity" stroke="#60A5FA" name="Humidity (%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gas Levels Chart */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50 animate-slide-in-right">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
              <span>💨</span>
              Gas Levels Status
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gasLevelsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="sensor" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }} />
                <Legend />
                <Bar dataKey="level" fill="#FBBF24" name="Current Level" />
                <Bar dataKey="safe" fill="#34D399" name="Safe Limit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* C. Worker Activity + Alerts */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Worker Activity */}
          <div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50 animate-slide-in-bottom">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
              <span>👥</span>
              Worker Activity Timeline
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={workerActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }} />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#10B981" name="Active Workers" strokeWidth={2} />
                <Line type="monotone" dataKey="idle" stroke="#F59E0B" name="Idle Workers" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-1 bg-gray-900 p-6 rounded-xl shadow-lg border border-red-700/50 animate-slide-in-right">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-red-400">
              <span className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-700 rounded-full animate-pulse-vertical" />
              Alerts
            </h2>
            <AlertsPanel />
          </div>

        </div>
      </section>
    </main>
  );
}
