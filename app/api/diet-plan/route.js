import { NextResponse } from 'next/server'
import { connectDB } from '@/services/db'
import DietPlan from '@/models/DietPlan'
import { requireAuth } from '@/services/auth'

export async function GET(req) {
  try {
    const { user, errorResponse } = requireAuth(req)
    if (errorResponse) return errorResponse
    await connectDB()
    const latest = await DietPlan.findOne({ userId: user.userId }).sort({ createdAt: -1 })
    return NextResponse.json({ plan: latest })
  } catch (error) {
    return NextResponse.json({ error: 'Fetch diet plan failed', detail: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const { user, errorResponse } = requireAuth(req)
    if (errorResponse) return errorResponse
    await connectDB()
    const payload = await req.json()
    const saved = await DietPlan.create({ ...payload, userId: user.userId })
    return NextResponse.json({ plan: saved })
  } catch (error) {
    return NextResponse.json({ error: 'Save diet plan failed', detail: error.message }, { status: 500 })
  }
}
