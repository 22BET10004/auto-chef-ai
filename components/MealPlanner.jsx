export default function MealPlanner({ recommendation }) {
  if (!recommendation) return <div className="card muted">Generate a recommendation to see meal plan.</div>
  const { meals, workouts, targetCalories } = recommendation
  return (
    <div className="card">
      <h3>Personalized Meal Planner</h3>
      <p className="muted">Target Calories: {targetCalories} kcal</p>
      {Object.entries(meals).map(([slot, meal]) => (
        <div key={slot}>
          <strong style={{ textTransform: 'capitalize' }}>{slot}:</strong> {meal.name} ({meal.calories} kcal)
        </div>
      ))}
      <h4>Workout Integration</h4>
      {workouts.map((item) => (
        <div key={item} className="muted">
          - {item}
        </div>
      ))}
    </div>
  )
}
