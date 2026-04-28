'use client'

import { useEffect, useMemo, useState } from 'react'
import jsPDF from 'jspdf'
import AppNav from '@/components/AppNav'
import ProtectedPage from '@/components/ProtectedPage'
import UserProfileForm from '@/components/UserProfileForm'
import MealPlanner from '@/components/MealPlanner'
import HealthDashboard from '@/components/HealthDashboard'
import ThemeAndWater from '@/components/ThemeAndWater'
import { getJSON, postJSON } from '@/services/api'
import { getSession } from '@/utils/clientAuth'

const initialForm = {
  age: '22',
  weight: '70',
  height: '172',
  gender: 'male',
  activityLevel: 'moderate',
  goal: 'maintain',
  region: '',
  filters: ['veg']
}

export default function DashboardPage() {
  const [form, setForm] = useState(initialForm)
  const [recommendation, setRecommendation] = useState(null)
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(false)
  const consumedToday = useMemo(() => progress.at(-1)?.caloriesConsumed || 0, [progress])
  const session = getSession()

  useEffect(() => {
    async function hydrate() {
      if (!session?.token) return
      const [progressData, planData] = await Promise.all([
        getJSON('/api/progress', session.token),
        getJSON('/api/diet-plan', session.token)
      ])
      if (progressData.logs?.length) setProgress(progressData.logs)
      if (planData.plan) setRecommendation(planData.plan)
    }
    hydrate()
  }, [session?.token])

  async function fetchRecommendation() {
    setLoading(true)
    try {
      const data = await postJSON('/api/recommendation', form)
      setRecommendation(data)
      if (session?.token) {
        await postJSON(
          '/api/diet-plan',
          {
            targetCalories: data.targetCalories,
            bmi: data.bmi,
            bmiStatus: data.bmiStatus,
            meals: data.meals,
            workouts: data.workouts,
            filters: form.filters
          },
          session.token
        )
      }
    } finally {
      setLoading(false)
    }
  }

  async function logProgress() {
    if (!session?.token) return
    const payload = {
      caloriesConsumed: Math.max(1200, consumedToday + 100),
      weight: +(Number(progress.at(-1)?.weight || 70) - 0.1).toFixed(1),
      waterMl: 1000
    }
    await postJSON('/api/progress', payload, session.token)
    const refreshed = await getJSON('/api/progress', session.token)
    setProgress(refreshed.logs || [])
  }

  function exportPlanPDF() {
    if (!recommendation) return
    const doc = new jsPDF()
    doc.text('Full Diet Plan', 20, 20)
    doc.text(`BMI: ${recommendation.bmi} (${recommendation.bmiStatus})`, 20, 32)
    doc.text(`Target Calories: ${recommendation.targetCalories}`, 20, 42)
    let y = 54
    Object.entries(recommendation.meals || {}).forEach(([slot, meal]) => {
      doc.text(`${slot}: ${meal.name} (${meal.calories} kcal)`, 20, y)
      y += 10
    })
    doc.save('full-diet-plan.pdf')
  }

  return (
    <ProtectedPage>
      <main className="container">
        <AppNav />
        <div className="grid">
          <UserProfileForm form={form} setForm={setForm} onRecommend={fetchRecommendation} loading={loading} />
          <MealPlanner recommendation={recommendation} />
          <HealthDashboard recommendation={recommendation} progress={progress} />
          <div className="card">
            <h3>Calories Status</h3>
            <p>Consumed today: {consumedToday} kcal</p>
            <p>Target: {recommendation?.targetCalories || 0} kcal</p>
            <button onClick={logProgress}>Log Progress</button>
            <button onClick={exportPlanPDF}>Export Full Diet Plan PDF</button>
          </div>
          <ThemeAndWater />
        </div>
      </main>
    </ProtectedPage>
  )
}
