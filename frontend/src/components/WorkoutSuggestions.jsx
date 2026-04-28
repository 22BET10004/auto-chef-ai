export default function WorkoutSuggestions({ workouts }) {
  if (!workouts) return null
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Workout — {workouts.type}</h2>
      <ul className="space-y-1 text-sm">
        {workouts.items.map((w) => (
          <li key={w} className="flex items-start gap-2">
            <span className="text-emerald-600">●</span>{w}
          </li>
        ))}
      </ul>
    </div>
  )
}
