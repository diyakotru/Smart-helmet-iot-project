'use client'

import { useState, useMemo } from 'react'

const MOCK_HELMETS = [
  {
    helmetId: 'HLM001',
    assignedWorker: 'John Smith',
    workerId: 'WRK001',
    assignmentDate: '2024-01-10',
    lastCalibrated: '2024-11-15',
    firmwareVersion: 'v3.2.1',
    status: 'Assigned',
  },
  {
    helmetId: 'HLM002',
    assignedWorker: 'Sarah Johnson',
    workerId: 'WRK002',
    assignmentDate: '2024-01-12',
    lastCalibrated: '2024-11-14',
    firmwareVersion: 'v3.2.1',
    status: 'Assigned',
  },
  {
    helmetId: 'HLM003',
    assignedWorker: 'Mike Chen',
    workerId: 'WRK003',
    assignmentDate: '2024-01-15',
    lastCalibrated: '2024-11-10',
    firmwareVersion: 'v3.2.0',
    status: 'Assigned',
  },
  {
    helmetId: 'HLM004',
    assignedWorker: 'Emma Davis',
    workerId: 'WRK004',
    assignmentDate: '2024-02-01',
    lastCalibrated: '2024-11-15',
    firmwareVersion: 'v3.2.1',
    status: 'Assigned',
  },
  {
    helmetId: 'HLM005',
    assignedWorker: 'Alex Wilson',
    workerId: 'WRK005',
    assignmentDate: '2024-02-05',
    lastCalibrated: '2024-11-12',
    firmwareVersion: 'v3.1.9',
    status: 'Assigned',
  },
  {
    helmetId: 'HLM006',
    assignedWorker: 'Lisa Brown',
    workerId: 'WRK006',
    assignmentDate: '2024-02-08',
    lastCalibrated: '2024-11-15',
    firmwareVersion: 'v3.2.1',
    status: 'Assigned',
  },
  {
    helmetId: 'HLM007',
    assignedWorker: 'Unassigned',
    workerId: 'N/A',
    assignmentDate: 'N/A',
    lastCalibrated: '2024-11-01',
    firmwareVersion: 'v3.2.1',
    status: 'Available',
  },
  {
    helmetId: 'HLM008',
    assignedWorker: 'Maintenance',
    workerId: 'N/A',
    assignmentDate: 'N/A',
    lastCalibrated: '2024-10-15',
    firmwareVersion: 'v3.1.8',
    status: 'Maintenance',
  },
]

export default function HelmetAssignmentTable() {
  const [sortField, setSortField] = useState('helmetId')
  const [sortDirection, setSortDirection] = useState('asc')
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredAndSorted = useMemo(() => {
    let filtered = MOCK_HELMETS

    if (filterStatus !== 'All') {
      filtered = filtered.filter((helmet) => helmet.status === filterStatus)
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [sortField, sortDirection, filterStatus])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Assigned':
        return 'bg-green-100 text-green-800'
      case 'Available':
        return 'bg-blue-100 text-blue-800'
      case 'Maintenance':
        return 'bg-orange-100 text-orange-800'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {['All', 'Assigned', 'Available', 'Maintenance'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              {[
                'helmetId',
                'assignedWorker',
                'workerId',
                'assignmentDate',
                'lastCalibrated',
                'firmwareVersion',
                'status',
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
            {filteredAndSorted.map((helmet) => (
              <tr
                key={helmet.helmetId}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-mono text-blue-600">
                  {helmet.helmetId}
                </td>
                <td className="px-4 py-3 text-sm">{helmet.assignedWorker}</td>
                <td className="px-4 py-3 text-sm font-mono text-gray-600">
                  {helmet.workerId}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {helmet.assignmentDate}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {helmet.lastCalibrated}
                </td>
                <td className="px-4 py-3 text-sm font-mono">
                  {helmet.firmwareVersion}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      helmet.status
                    )}`}
                  >
                    {helmet.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-600">
        Showing {filteredAndSorted.length} of {MOCK_HELMETS.length} helmets
      </div>
    </div>
  )
}
