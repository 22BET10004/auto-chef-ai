export default function MealCards({ mealPlan }) {
  if (!mealPlan) return null
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-3">Today's Meals</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {Object.entries(mealPlan).map(([slot, meal]) => (
          <div key={slot} className="rounded-xl bg-slate-50 p-3">
            <div className="text-xs uppercase text-slate-500">{slot}</div>
            <div className="font-semibold">{meal.name}</div>
            <div className="text-sm text-emerald-700">{meal.calories} kcal</div>
          </div>
        ))}
      </div>
    </div>
  )
}
