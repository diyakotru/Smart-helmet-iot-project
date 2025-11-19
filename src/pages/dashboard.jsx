'use client';

import { useState } from 'react';
import { Link } from "react-router-dom";

// Assuming these components also adopt the new theme internally
import LiveSensorDataPanel from "../components/live-sensor-panel";
import WorkersOverviewPanel from "../components/workers-overview-panel";
import AlertsPanel from "../components/alerts-panel";

export default function Dashboard() {
  const [refreshInterval] = useState(5000); // Retained for future use if needed

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

      {/* Main Dashboard Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up">
        {/* A. Live Sensor Data Panel */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50 animate-slide-in-left">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
            <span className="w-1.5 h-6 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full animate-pulse-vertical" />
            Live Sensor Data
          </h2>
          <LiveSensorDataPanel />
        </div>

        {/* B & C. Workers Overview and Alerts */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workers Overview */}
          <div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50 animate-slide-in-bottom">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
              <span className="w-1.5 h-6 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full animate-pulse-vertical" />
              Workers Overview
            </h2>
            <WorkersOverviewPanel />
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