// Dashboard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

import LiveSensorDataPanel from "../components/live-sensor-panel";
import AlertsPanel from "../components/alerts-panel";

const THINGSPEAK_CHANNEL_ID = "3175273"; // keep your channel id here

export default function Dashboard() {
  const [refreshInterval] = useState(5000);

  // Shared alert list (source of truth for AlertsPanel)
  const [alertList, setAlertList] = useState([]);

  // iframe styles (keeps chart responsive)
  const IFRAME_STYLE_FULL = {
    width: "100%",
    height: "100%",
    border: "none",
  };

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
          {/* Pass setAlertList so the live panel can add/remove real alerts */}
          <LiveSensorDataPanel setAlertList={setAlertList} />
        </div>

        {/* B. Charts Grid (ThingSpeak live charts) */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Temperature (charts/1) + Humidity small chart (charts/2) stacked */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50 animate-slide-in-left">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
              <span>🌡️</span>
              Temperature & Humidity Trend (live)
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Temperature main chart */}
              <div style={{ width: "100%", height: 300, background: "#0f1720", borderRadius: 8, overflow: "hidden" }}>
                <iframe
                  title="ThingSpeak Temperature"
                  src={`https://thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/charts/1?bgcolor=000000&color=00FFAA&dynamic=true&type=line&results=60`}
                  style={IFRAME_STYLE_FULL}
                />
              </div>

              {/* Humidity small chart under the main chart */}
              <div style={{ width: "100%", height: 140, background: "#0f1720", borderRadius: 8, overflow: "hidden" }}>
                <iframe
                  title="ThingSpeak Humidity"
                  src={`https://thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/charts/2?bgcolor=000000&color=60A5FA&dynamic=true&type=line&results=60`}
                  style={IFRAME_STYLE_FULL}
                />
              </div>
            </div>
          </div>

          {/* Right: Gas Levels Chart */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50 animate-slide-in-right">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
              <span>💨</span>
              Gas Levels Status (live)
            </h2>

            <div style={{ width: "100%", height: 420, background: "#0f1720", borderRadius: 8, overflow: "hidden" }}>
              <iframe
                title="ThingSpeak Gas"
                src={`https://thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/charts/3?bgcolor=000000&color=FBBF24&dynamic=true&type=line&results=60`}
                style={IFRAME_STYLE_FULL}
              />
            </div>
          </div>
        </div>

        {/* C. Worker Activity + Alerts */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Worker Activity (keep mock / placeholder or later replaced) */}
          <div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-800/50 animate-slide-in-bottom">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-yellow-400">
              <span>👥</span>
              Worker Activity Timeline
            </h2>

            {/* You can later replace this with ThingSpeak history data or another source */}
            <div style={{ width: "100%", height: 300 }} className="flex items-center justify-center text-gray-400">
              Placeholder for worker/activity chart (optional)
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-1 bg-gray-900 p-6 rounded-xl shadow-lg border border-red-700/50 animate-slide-in-right">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-red-400">
              <span className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-700 rounded-full animate-pulse-vertical" />
              Alerts
            </h2>
            <AlertsPanel alertList={alertList} />
          </div>
        </div>
      </section>
    </main>
  );
}
