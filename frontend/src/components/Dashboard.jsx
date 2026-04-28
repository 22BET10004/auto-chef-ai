import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function Dashboard({ plan, progress }) {
  if (!plan) return <div className="card text-slate-500">Generate a plan to see analytics.</div>

  const data = (progress?.length ? progress : [
    { day: 'Mon', cal: 1800 }, { day: 'Tue', cal: 1950 }, { day: 'Wed', cal: 2050 },
    { day: 'Thu', cal: 1900 }, { day: 'Fri', cal: 2100 }, { day: 'Sat', cal: 2000 }, { day: 'Sun', cal: 1850 }
  ]).map((p, i) => ({ day: p.day || `D${i+1}`, cal: p.caloriesConsumed || p.cal || 0 }))

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Health Analytics</h2>
      <div className="grid grid-cols-3 gap-3 text-center">
        <Stat label="BMI" value={plan.bmi} sub={plan.bmiStatus} />
        <Stat label="BMR" value={plan.bmr} sub="kcal/day" />
        <Stat label="Target" value={plan.targetCalories} sub="kcal/day" />
      </div>
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" /><YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cal" stroke="#059669" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-2xl font-bold text-emerald-700">{value}</div>
      <div className="text-xs text-slate-500">{sub}</div>
    </div>
  )
}
