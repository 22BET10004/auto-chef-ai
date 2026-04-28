'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function HealthDashboard({ recommendation, progress }) {
  if (!recommendation) return null

  const weekly = progress.slice(-7).map((p, idx) => ({
    day: `D${idx + 1}`,
    calories: p.caloriesConsumed || 0,
    weight: p.weight || 0
  }))

  return (
    <div className="card">
      <h3>Health Analytics Dashboard</h3>
      <p>
        BMI: <strong>{recommendation.bmi}</strong> ({recommendation.bmiStatus})
      </p>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weekly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
