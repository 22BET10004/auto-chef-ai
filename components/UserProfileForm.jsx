'use client'

export default function UserProfileForm({ form, setForm, onRecommend, loading }) {
  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleFilter(filter) {
    setForm((prev) => {
      const exists = prev.filters.includes(filter)
      return {
        ...prev,
        filters: exists ? prev.filters.filter((f) => f !== filter) : [...prev.filters, filter]
      }
    })
  }

  return (
    <div className="card">
      <h3>User Inputs</h3>
      <input placeholder="Age" value={form.age} onChange={(e) => update('age', e.target.value)} />
      <input placeholder="Weight (kg)" value={form.weight} onChange={(e) => update('weight', e.target.value)} />
      <input placeholder="Height (cm)" value={form.height} onChange={(e) => update('height', e.target.value)} />
      <select value={form.gender} onChange={(e) => update('gender', e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select value={form.activityLevel} onChange={(e) => update('activityLevel', e.target.value)}>
        <option value="sedentary">Sedentary</option>
        <option value="light">Lightly Active</option>
        <option value="moderate">Moderately Active</option>
        <option value="active">Active</option>
      </select>
      <select value={form.goal} onChange={(e) => update('goal', e.target.value)}>
        <option value="loss">Weight Loss</option>
        <option value="maintain">Maintain</option>
        <option value="gain">Muscle Gain</option>
      </select>
      <select value={form.region} onChange={(e) => update('region', e.target.value)}>
        <option value="">Any Region</option>
        <option value="north">North Indian</option>
        <option value="south">South Indian</option>
        <option value="punjabi">Punjabi</option>
      </select>

      {['veg', 'non-veg', 'vegan', 'high-protein', 'keto', 'indian'].map((filter) => (
        <span key={filter} className="pill" onClick={() => toggleFilter(filter)} style={{ cursor: 'pointer', opacity: form.filters.includes(filter) ? 1 : 0.5 }}>
          {filter}
        </span>
      ))}
      <button onClick={onRecommend}>{loading ? 'Generating...' : "Today's Recommendation"}</button>
    </div>
  )
}
