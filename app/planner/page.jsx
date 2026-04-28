'use client'

import AppNav from '@/components/AppNav'
import ProtectedPage from '@/components/ProtectedPage'
import MealPlanner from '@/components/MealPlanner'
import GroceryList from '@/components/GroceryList'
import FoodRecognition from '@/components/FoodRecognition'
import ReminderPanel from '@/components/ReminderPanel'
import { useEffect, useState } from 'react'
import { getJSON } from '@/services/api'
import { getSession } from '@/utils/clientAuth'

export default function PlannerPage() {
  const [recommendation, setRecommendation] = useState(null)
  const session = getSession()

  useEffect(() => {
    async function fetchPlan() {
      if (!session?.token) return
      const data = await getJSON('/api/diet-plan', session.token)
      if (data.plan) setRecommendation(data.plan)
    }
    fetchPlan()
  }, [session?.token])

  return (
    <ProtectedPage>
      <main className="container">
        <AppNav />
        <div className="grid">
          <MealPlanner recommendation={recommendation} />
          <GroceryList />
          <FoodRecognition />
          <ReminderPanel />
        </div>
      </main>
    </ProtectedPage>
  )
}
