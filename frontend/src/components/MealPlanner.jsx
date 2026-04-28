import { useState } from 'react'

const initial = {
  age: 22, weight: 70, height: 172,
  gender: 'male', activityLevel: 'moderate', goal: 'maintain',
  filters: ['veg']
}

export default function MealPlanner({ onPlan }) {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)

  function set(k, v) { setForm((p) => ({ ...p, [k]: v })) }
  function toggleFilter(f) {
    set('filters', form.filters.includes(f) ? form.filters.filter(x => x !== f) : [...form.filters, f])
  }

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await onPlan(form)
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="card space-y-3">
      <h2 className="text-xl font-semibold">Your Profile</h2>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Age</label><input className="input" type="number" value={form.age} onChange={(e)=>set('age',e.target.value)} /></div>
        <div><label className="label">Gender</label>
          <select className="input" value={form.gender} onChange={(e)=>set('gender',e.target.value)}>
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </div>
        <div><label className="label">Weight (kg)</label><input className="input" type="number" value={form.weight} onChange={(e)=>set('weight',e.target.value)} /></div>
        <div><label className="label">Height (cm)</label><input className="input" type="number" value={form.height} onChange={(e)=>set('height',e.target.value)} /></div>
        <div><label className="label">Activity</label>
          <select className="input" value={form.activityLevel} onChange={(e)=>set('activityLevel',e.target.value)}>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div><label className="label">Goal</label>
          <select className="input" value={form.goal} onChange={(e)=>set('goal',e.target.value)}>
            <option value="loss">Weight Loss</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Muscle Gain</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {['veg','non-veg','high-protein'].map((f) => (
          <button type="button" key={f} onClick={() => toggleFilter(f)}
            className={`px-3 py-1 rounded-full text-sm border ${form.filters.includes(f) ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 text-slate-600'}`}>
            {f}
          </button>
        ))}
      </div>
      <button className="btn w-full" disabled={loading}>{loading ? 'Generating...' : 'Generate My Plan'}</button>
    </form>
  )
}
