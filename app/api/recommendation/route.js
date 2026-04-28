import { NextResponse } from 'next/server'
import { calculateBMI, calculateBMR, getBMIStatus, getDailyCalories } from '@/utils/health'
import { getPersonalizedMealPlan, getWorkoutSuggestion, getRegionalFilter } from '@/utils/mealDataset'

export async function POST(req) {
  try {
    const payload = await req.json()
    const { age, weight, height, gender, activityLevel, goal, filters = [], region } = payload

    const bmi = calculateBMI(Number(weight), Number(height))
    const bmr = calculateBMR({
      gender,
      weight: Number(weight),
      height: Number(height),
      age: Number(age)
    })
    const targetCalories = getDailyCalories({ bmr, activityLevel, goal })
    const normalizedFilters = [...filters, region ? getRegionalFilter(region) : null].filter(Boolean)
    const meals = getPersonalizedMealPlan(normalizedFilters)
    const workouts = getWorkoutSuggestion(goal)

    return NextResponse.json({
      bmi,
      bmiStatus: getBMIStatus(bmi),
      bmr,
      targetCalories,
      meals,
      workouts
    })
  } catch (error) {
    return NextResponse.json({ error: 'Could not generate recommendation', detail: error.message }, { status: 500 })
  }
}
