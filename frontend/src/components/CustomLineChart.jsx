import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts'

const CustomLineChart = ({ data }) => {

  // 👉 Custom Tooltip for hover
  const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg border border-gray-300 shadow-md">
          <p className="text-sm font-semibold text-purple-700">{label}</p>
          <p className="text-sm text-gray-800">Results: <span className="font-bold">{payload[0].value}</span></p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Candidates' Performance Trend</h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
          <YAxis allowDecimals={false} stroke="#6b7280" fontSize={12} />
          <Tooltip content={<CustomToolTip />} />
          <Legend />

          <Line
            type="monotone"
            dataKey="total"
            stroke="url(#lineColor)"
            strokeWidth={3}
            dot={{ r: 4, stroke: '#7c3aed', strokeWidth: 2, fill: 'white' }}
            activeDot={{ r: 6, fill: '#7c3aed' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart
