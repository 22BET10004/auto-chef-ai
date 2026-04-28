import { useState } from 'react'
import MealPlanner from './components/MealPlanner'
import MealCards from './components/MealCards'
import Dashboard from './components/Dashboard'
import GroceryList from './components/GroceryList'
import WorkoutSuggestions from './components/WorkoutSuggestions'
import Chatbot from './components/Chatbot'
import { api } from './services/api'

export default function App() {
  const [plan, setPlan] = useState(null)

  async function generate(form) {
    const data = await api.recommend(form)
    setPlan(data)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-700">🍽️ AI Nutrition Planner</h1>
          <span className="text-sm text-slate-500">Personalized Indian meal plans</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-2 gap-5">
        <div className="space-y-5">
          <MealPlanner onPlan={generate} />
          <MealCards mealPlan={plan?.mealPlan} />
          <WorkoutSuggestions workouts={plan?.workouts} />
        </div>
        <div className="space-y-5">
          <Dashboard plan={plan} />
          <GroceryList mealPlan={plan?.mealPlan} />
          <Chatbot />
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 py-6">Built with React + Express + MongoDB</footer>
    </div>
  )
}
