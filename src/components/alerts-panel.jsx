'use client'

import { useState, useEffect } from 'react'
import { Card } from "../components/ui/card" // Assuming Card accepts Tailwind classes

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'Gas',
      message: 'High gas levels detected - Mike Chen (Electrical Room)',
      timestamp: new Date(Date.now() - 2 * 60000),
      severity: 'warning',
      workerId: 'WRK003',
    },  
    {
      id: '2',
      type: 'Fall',
      message: 'Fall detected - Alex Wilson (Main Hall)',
      timestamp: new Date(Date.now() - 5 * 60000),
      severity: 'danger',
      workerId: 'WRK005',
    },
    {
      id: '3',
      type: 'Temperature',
      message: 'Extreme temperature - Sarah Johnson (Roof Section)',
      timestamp: new Date(Date.now() - 12 * 60000),
      severity: 'warning',
      workerId: 'WRK002',
    },
  ])

  // Simulate live sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prev) => {
        if (Math.random() > 0.8) {
          const alertTypes = ['Fall', 'Gas', 'Temperature']
          const severities = ['warning', 'danger']
          const workers = ['WRK001', 'WRK002', 'WRK003', 'WRK004', 'WRK005', 'WRK006']

          const newAlert = {
            id: Date.now().toString(),
            type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
            message: `Alert triggered for worker ${workers[Math.floor(Math.random() * workers.length)]}`,
            timestamp: new Date(),
            severity: severities[Math.floor(Math.random() * severities.length)],
            workerId: workers[Math.floor(Math.random() * workers.length)],
          }

          return [newAlert, ...prev].slice(0, 10)
        }
        return prev
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)

    if (minutes > 0) return `${minutes}m ago`
    return `${seconds}s ago`
  }
  
  // --- Theme Helpers ---
  const getSeverityClasses = (severity) => {
    if (severity === 'danger') {
      return {
        bg: 'bg-red-900/20',
        border: 'border-red-600',
        text: 'text-red-400',
        dot: 'bg-red-500 animate-pulse-slow',
        shadow: 'shadow-lg shadow-red-900/50',
        animation: 'animate-slide-in-alert', // Custom animation for new danger alerts
      };
    }
    // Warning and other severities use the primary yellow accent
    return {
      bg: 'bg-yellow-900/20',
      border: 'border-yellow-600',
      text: 'text-yellow-400',
      dot: 'bg-yellow-500',
      shadow: 'shadow-lg shadow-yellow-900/30',
      animation: 'animate-slide-in-alert', // Custom animation for new warning alerts
    };
  };

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar animate-fade-in-up">
      {alerts.length > 0 ? (
        alerts.map((alert) => {
          const classes = getSeverityClasses(alert.severity);
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${classes.bg} ${classes.border} ${classes.shadow} ${classes.animation}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${classes.dot}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`font-semibold text-sm ${classes.text} uppercase`}>
                      {alert.type} Alert
                    </h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {formatTime(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {alert.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Card className="p-8 bg-gray-900 border border-gray-800 text-center animate-pulse-subtle">
          <p className="text-gray-500 text-sm">No critical alerts at this time</p>
        </Card>
      )}
    </div>
  );
}