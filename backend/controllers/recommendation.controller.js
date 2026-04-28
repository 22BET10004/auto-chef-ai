import { calculateBMI, getBMIStatus, calculateBMR, calculateCalories } from '../utils/health.js'
import { generateMealPlan, getWorkoutPlan } from '../utils/mealDataset.js'
import UserPlan from '../models/UserPlan.js'

export async function createRecommendation(req, res) {
  try {
    const { age, weight, height, gender, activityLevel, goal, filters = [] } = req.body
    const w = Number(weight), h = Number(height), a = Number(age)

    const bmi = calculateBMI(w, h)
    const bmiStatus = getBMIStatus(bmi)
    const bmr = calculateBMR({ gender, weight: w, height: h, age: a })
    const targetCalories = calculateCalories({ bmr, activityLevel, goal })
    const mealPlan = generateMealPlan(filters)
    const workouts = getWorkoutPlan(goal)

    const saved = await UserPlan.create({
      age: a, weight: w, height: h, gender, activityLevel, goal, filters,
      bmi, bmiStatus, bmr, targetCalories, mealPlan, workouts
    })

    res.json({ id: saved._id, bmi, bmiStatus, bmr, targetCalories, mealPlan, workouts })
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate plan', detail: err.message })
  }
}

export async function listRecommendations(_req, res) {
  const items = await UserPlan.find().sort({ createdAt: -1 }).limit(10)
  res.json({ items })
}
