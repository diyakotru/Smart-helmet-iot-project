'use client'

import { useState, useEffect } from 'react'
import { Card } from "../components/ui/card"

export default function LiveSensorDataPanel() {
  const [sensors, setSensors] = useState({
    temperature: 28.5,
    gasLevels: 12,
    fallStatus: 'Normal',
    batteryLevel: 85,
    lastUpdate: new Date(),
  })

  // Simulate live sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) => ({
        temperature: parseFloat((28 + Math.random() * 3).toFixed(1)),
        gasLevels: Math.floor(10 + Math.random() * 20),
        fallStatus: Math.random() > 0.95 ? 'Alert' : 'Normal',
        batteryLevel: Math.max(20, prev.batteryLevel - Math.random() * 0.5),
        lastUpdate: new Date(),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (type, value) => {
    if (type === 'temperature') {
      if (value < 20 || value > 35) return 'text-warning-orange'
      return 'text-safe-green'
    }
    if (type === 'gas') {
      if (value > 50) return 'text-danger-red'
      if (value > 30) return 'text-warning-orange'
      return 'text-safe-green'
    }
    if (type === 'battery') {
      if (value < 30) return 'text-danger-red'
      if (value < 50) return 'text-warning-orange'
      return 'text-safe-green'
    }
    return 'text-safe-green'
  }

  const getStatusBgColor = (type, value) => {
    if (type === 'temperature') {
      if (value < 20 || value > 35) return 'bg-warning-orange/10'
      return 'bg-safe-green/10'
    }
    if (type === 'gas') {
      if (value > 50) return 'bg-danger-red/10'
      if (value > 30) return 'bg-warning-orange/10'
      return 'bg-safe-green/10'
    }
    if (type === 'battery') {
      if (value < 30) return 'bg-danger-red/10'
      if (value < 50) return 'bg-warning-orange/10'
      return 'bg-safe-green/10'
    }
    return 'bg-safe-green/10'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Temperature Card */}
      <Card className="p-6 border-border/40 hover:border-primary/40 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Temperature</p>
            <p className={`text-3xl font-bold ${getStatusColor('temperature', sensors.temperature)}`}>
              {sensors.temperature}°C
            </p>
          </div>
          <div className="text-2xl">🌡️</div>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-semibold w-fit 
          ${getStatusBgColor('temperature', sensors.temperature)} 
          ${getStatusColor('temperature', sensors.temperature)}`}
        >
          {sensors.temperature > 35 ? 'High' : sensors.temperature < 20 ? 'Low' : 'Normal'}
        </div>
      </Card>

      {/* Gas Levels Card */}
      <Card className="p-6 border-border/40 hover:border-primary/40 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Gas Levels</p>
            <p className={`text-3xl font-bold ${getStatusColor('gas', sensors.gasLevels)}`}>
              {sensors.gasLevels} PPM
            </p>
          </div>
          <div className="text-2xl">💨</div>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-semibold w-fit 
          ${getStatusBgColor('gas', sensors.gasLevels)} 
          ${getStatusColor('gas', sensors.gasLevels)}`}
        >
          {sensors.gasLevels > 50 ? 'Danger' : sensors.gasLevels > 30 ? 'Warning' : 'Safe'}
        </div>
      </Card>

      {/* Fall Detection Card */}
      <Card className="p-6 border-border/40 hover:border-primary/40 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Fall Detection</p>
            <p className={`text-3xl font-bold ${sensors.fallStatus === 'Alert' ? 'text-danger-red' : 'text-safe-green'}`}>
              {sensors.fallStatus}
            </p>
          </div>
          <div className="text-2xl">📍</div>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-semibold w-fit ${
            sensors.fallStatus === 'Alert'
              ? 'bg-danger-red/10 text-danger-red'
              : 'bg-safe-green/10 text-safe-green'
          }`}
        >
          {sensors.fallStatus === 'Alert' ? 'Fall Detected!' : 'No Fall'}
        </div>
      </Card>

      {/* Battery Card */}
      <Card className="p-6 border-border/40 hover:border-primary/40 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Battery Level</p>
            <p className={`text-3xl font-bold ${getStatusColor('battery', sensors.batteryLevel)}`}>
              {sensors.batteryLevel.toFixed(0)}%
            </p>
          </div>
          <div className="text-2xl">🔋</div>
        </div>

        <div className="w-full bg-muted/40 rounded-full h-2 mt-2">
          <div
            className={`h-full rounded-full transition-all ${
              sensors.batteryLevel < 30
                ? 'bg-danger-red'
                : sensors.batteryLevel < 50
                ? 'bg-warning-orange'
                : 'bg-safe-green'
            }`}
            style={{ width: `${sensors.batteryLevel}%` }}
          />
        </div>
      </Card>

    </div>
  )
}
