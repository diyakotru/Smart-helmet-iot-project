'use client'

import { useState, useEffect } from 'react'
import { Card } from "../components/ui/card"

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

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto">
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border animate-in slide-in-from-right-1/2 duration-300 ${
              alert.severity === 'danger'
                ? 'bg-danger-red/10 border-danger-red/50'
                : 'bg-warning-orange/10 border-warning-orange/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                  alert.severity === 'danger' ? 'bg-danger-red' : 'bg-warning-orange'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{alert.type} Alert</h4>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatTime(alert.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {alert.message}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Card className="p-8 border-border/40 text-center">
          <p className="text-muted-foreground text-sm">No alerts at this time</p>
        </Card>
      )}
    </div>
  )
}
