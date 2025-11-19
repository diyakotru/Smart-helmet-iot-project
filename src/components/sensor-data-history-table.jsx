'use client'

import { useState, useMemo } from 'react'

const MOCK_HISTORY = [
  {
    recordId: 'REC001',
    helmetId: 'HLM001',
    timestamp: '2024-11-19 14:32:15',
    temperature: 28.5,
    gasLevels: 12,
    fallDetected: false,
    batteryLevel: 85,
  },
  {
    recordId: 'REC002',
    helmetId: 'HLM002',
    timestamp: '2024-11-19 14:31:45',
    temperature: 29.2,
    gasLevels: 15,
    fallDetected: false,
    batteryLevel: 78,
  },
  {
    recordId: 'REC003',
    helmetId: 'HLM003',
    timestamp: '2024-11-19 14:31:20',
    temperature: 31.8,
    gasLevels: 45,
    fallDetected: false,
    batteryLevel: 92,
  },
  {
    recordId: 'REC004',
    helmetId: 'HLM004',
    timestamp: '2024-11-19 14:30:50',
    temperature: 27.3,
    gasLevels: 8,
    fallDetected: false,
    batteryLevel: 88,
  },
  {
    recordId: 'REC005',
    helmetId: 'HLM005',
    timestamp: '2024-11-19 14:30:15',
    temperature: 32.1,
    gasLevels: 22,
    fallDetected: true,
    batteryLevel: 72,
  },
  {
    recordId: 'REC006',
    helmetId: 'HLM006',
    timestamp: '2024-11-19 14:29:40',
    temperature: 26.8,
    gasLevels: 11,
    fallDetected: false,
    batteryLevel: 81,
  },
  {
    recordId: 'REC007',
    helmetId: 'HLM001',
    timestamp: '2024-11-19 14:25:10',
    temperature: 28.2,
    gasLevels: 13,
    fallDetected: false,
    batteryLevel: 86,
  },
  {
    recordId: 'REC008',
    helmetId: 'HLM002',
    timestamp: '2024-11-19 14:20:05',
    temperature: 29.5,
    gasLevels: 16,
    fallDetected: false,
    batteryLevel: 79,
  },
]

export default function SensorDataHistoryTable() {
  const [sortField, setSortField] = useState('timestamp')
  const [sortDirection, setSortDirection] = useState('desc')
  const [filterHelmet, setFilterHelmet] = useState('All')

  const helmets = useMemo(
    () => ['All', ...new Set(MOCK_HISTORY.map((h) => h.helmetId))],
    []
  )

  const filteredAndSorted = useMemo(() => {
    let filtered = MOCK_HISTORY

    if (filterHelmet !== 'All') {
      filtered = filtered.filter((record) => record.helmetId === filterHelmet)
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [sortField, sortDirection, filterHelmet])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getTemperatureColor = (temp) => {
    if (temp > 35 || temp < 20) return 'text-red-600'
    return 'text-green-600'
  }

  const getGasColor = (gas) => {
    if (gas > 50) return 'text-red-600'
    if (gas > 30) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-4">
      {/* Helmet Filters */}
      <div className="flex gap-2 flex-wrap">
        {helmets.map((helmet) => (
          <button
            key={helmet}
            onClick={() => setFilterHelmet(helmet)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterHelmet === helmet
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {helmet}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              {[
                'recordId',
                'helmetId',
                'timestamp',
                'temperature',
                'gasLevels',
                'fallDetected',
                'batteryLevel',
              ].map((field) => (
                <th key={field}>
                  <button
                    onClick={() => handleSort(field)}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace(/([A-Z])/g, ' $1')}
                    {sortField === field && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredAndSorted.map((record) => (
              <tr
                key={record.recordId}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-mono text-blue-600">
                  {record.recordId}
                </td>
                <td className="px-4 py-3 text-sm font-mono">{record.helmetId}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{record.timestamp}</td>

                <td className={`px-4 py-3 text-sm ${getTemperatureColor(record.temperature)}`}>
                  {record.temperature}°C
                </td>

                <td className={`px-4 py-3 text-sm ${getGasColor(record.gasLevels)}`}>
                  {record.gasLevels} PPM
                </td>

                <td className="px-4 py-3 text-sm">
                  {record.fallDetected ? (
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                      No
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-full rounded-full bg-green-600"
                        style={{ width: `${record.batteryLevel}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold">{record.batteryLevel}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-600">
        Showing {filteredAndSorted.length} of {MOCK_HISTORY.length} records
      </div>
    </div>
  )
}
