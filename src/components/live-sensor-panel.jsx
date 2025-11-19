'use client'

import { useState, useEffect } from 'react'
import { Card } from "../components/ui/card" // Assuming Card accepts Tailwind classes

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

  // --- Theme Mappings ---
  const COLOR = {
    SAFE_TEXT: 'text-teal-400',
    WARNING_TEXT: 'text-yellow-400',
    DANGER_TEXT: 'text-red-500',
    SAFE_BG: 'bg-teal-900/20',
    WARNING_BG: 'bg-yellow-900/20',
    DANGER_BG: 'bg-red-900/20',
    CARD_BORDER: 'border-gray-800',
    CARD_HOVER: 'hover:border-yellow-600',
    METER_BG: 'bg-gray-700',
  };

  const getStatusColor = (type, value) => {
    if (type === 'temperature') {
      if (value < 20 || value > 32) return COLOR.WARNING_TEXT // Adjusted high threshold slightly
      return COLOR.SAFE_TEXT
    }
    if (type === 'gas') {
      if (value > 40) return COLOR.DANGER_TEXT
      if (value > 20) return COLOR.WARNING_TEXT
      return COLOR.SAFE_TEXT
    }
    if (type === 'battery') {
      if (value < 30) return COLOR.DANGER_TEXT
      if (value < 50) return COLOR.WARNING_TEXT
      return COLOR.SAFE_TEXT
    }
    return COLOR.SAFE_TEXT
  }

  const getStatusBgColor = (type, value) => {
    if (type === 'temperature') {
      if (value < 20 || value > 32) return COLOR.WARNING_BG
      return COLOR.SAFE_BG
    }
    if (type === 'gas') {
      if (value > 40) return COLOR.DANGER_BG
      if (value > 20) return COLOR.WARNING_BG
      return COLOR.SAFE_BG
    }
    if (type === 'battery') {
      if (value < 30) return COLOR.DANGER_BG
      if (value < 50) return COLOR.WARNING_BG
      return COLOR.SAFE_BG
    }
    return COLOR.SAFE_BG
  }

  // Determine animation classes based on status for critical alerts
  const getAlertAnimation = (status) => {
    if (status === 'Alert') return 'animate-alert-pulse border-red-500 shadow-lg shadow-red-900/50';
    return 'animate-fade-in-card';
  };

  // Determine battery meter color
  const getBatteryMeterColor = (level) => {
    if (level < 30) return 'bg-red-600';
    if (level < 50) return 'bg-yellow-600';
    return 'bg-teal-600';
  };
  // --- End Theme Mappings ---


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">

      {/* Temperature Card */}
      <Card 
        className={`p-6 bg-gray-900 border ${COLOR.CARD_BORDER} ${COLOR.CARD_HOVER} transition-colors duration-300 animate-slide-in-card`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Temperature</p>
            <p className={`text-3xl font-bold ${getStatusColor('temperature', sensors.temperature)}`}>
              {sensors.temperature}°C
            </p>
          </div>
          <div className={`text-2xl ${COLOR.WARNING_TEXT}`}>🌡️</div>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-semibold w-fit 
          ${getStatusBgColor('temperature', sensors.temperature)} 
          ${getStatusColor('temperature', sensors.temperature)}`}
        >
          {sensors.temperature > 32 ? 'High Warning' : sensors.temperature < 20 ? 'Low Warning' : 'Normal'}
        </div>
      </Card>

      {/* Gas Levels Card */}
      <Card 
        className={`p-6 bg-gray-900 border ${COLOR.CARD_BORDER} ${COLOR.CARD_HOVER} transition-colors duration-300 animate-slide-in-card delay-1`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Gas Levels (CO)</p>
            <p className={`text-3xl font-bold ${getStatusColor('gas', sensors.gasLevels)}`}>
              {sensors.gasLevels} PPM
            </p>
          </div>
          <div className={`text-2xl ${COLOR.DANGER_TEXT}`}>💨</div>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-semibold w-fit 
          ${getStatusBgColor('gas', sensors.gasLevels)} 
          ${getStatusColor('gas', sensors.gasLevels)}`}
        >
          {sensors.gasLevels > 40 ? 'Danger' : sensors.gasLevels > 20 ? 'Warning' : 'Safe'}
        </div>
      </Card>

      {/* Fall Detection Card */}
      <Card 
        className={`p-6 bg-gray-900 border transition-all duration-1500 
          ${sensors.fallStatus === 'Alert' ? getAlertAnimation('Alert') : `${COLOR.CARD_BORDER} ${COLOR.CARD_HOVER} animate-slide-in-card delay-2`}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Fall Detection</p>
            <p className={`text-3xl font-bold ${sensors.fallStatus === 'Alert' ? COLOR.DANGER_TEXT : COLOR.SAFE_TEXT}`}>
              {sensors.fallStatus.toUpperCase()}
            </p>
          </div>
          <div className={`text-2xl ${sensors.fallStatus === 'Alert' ? COLOR.DANGER_TEXT : COLOR.SAFE_TEXT}`}>📍</div>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-semibold w-fit ${
            sensors.fallStatus === 'Alert'
              ? `${COLOR.DANGER_BG} ${COLOR.DANGER_TEXT} font-extrabold`
              : `${COLOR.SAFE_BG} ${COLOR.SAFE_TEXT}`
          }`}
        >
          {sensors.fallStatus === 'Alert' ? 'Fall Detected!' : 'No Fall Detected'}
        </div>
      </Card>

      {/* Battery Card */}
      <Card 
        className={`p-6 bg-gray-900 border ${COLOR.CARD_BORDER} ${COLOR.CARD_HOVER} transition-colors duration-300 animate-slide-in-card delay-3`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Battery Level</p>
            <p className={`text-3xl font-bold ${getStatusColor('battery', sensors.batteryLevel)}`}>
              {sensors.batteryLevel.toFixed(0)}%
            </p>
          </div>
          <div className={`text-2xl ${getStatusColor('battery', sensors.batteryLevel)}`}>🔋</div>
        </div>

        <div className={`w-full ${COLOR.METER_BG} rounded-full h-2 mt-2`}>
          <div
            className={`h-full rounded-full transition-all duration-1000 ${getBatteryMeterColor(sensors.batteryLevel)}`}
            style={{ width: `${sensors.batteryLevel}%` }}
          />
        </div>
        <p className={`text-xs mt-2 text-right ${getStatusColor('battery', sensors.batteryLevel)} font-medium`}>
          {sensors.batteryLevel < 30 ? 'CRITICAL LOW' : sensors.batteryLevel < 50 ? 'Low Charge' : 'Optimal'}
        </p>
      </Card>

    </div>
  )
}