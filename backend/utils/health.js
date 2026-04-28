// Pure helpers — easy to explain in viva.

export function calculateBMI(weightKg, heightCm) {
  const h = heightCm / 100
  if (!h || !weightKg) return 0
  return +(weightKg / (h * h)).toFixed(1)
}

export function getBMIStatus(bmi) {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  return 'Overweight'
}

// Mifflin-St Jeor formula
export function calculateBMR({ gender, weight, height, age }) {
  if (!weight || !height || !age) return 0
  const base = 10 * weight + 6.25 * height - 5 * age
  return Math.round(gender === 'female' ? base - 161 : base + 5)
}

export function calculateCalories({ bmr, activityLevel, goal }) {
  const map = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 }
  const multiplier = map[activityLevel] || 1.2
  let cal = bmr * multiplier
  if (goal === 'loss') cal -= 350
  if (goal === 'gain') cal += 300
  return Math.round(cal)
}
