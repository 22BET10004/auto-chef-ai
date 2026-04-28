import { NextResponse } from 'next/server'
import { connectDB } from '@/services/db'
import User from '@/models/User'
import { requireAuth } from '@/services/auth'

export async function GET(req) {
  try {
    const { user, errorResponse } = requireAuth(req)
    if (errorResponse) return errorResponse
    await connectDB()
    const profile = await User.findById(user.userId).select('-passwordHash')
    return NextResponse.json({ profile })
  } catch (error) {
    return NextResponse.json({ error: 'Fetch profile failed', detail: error.message }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const { user, errorResponse } = requireAuth(req)
    if (errorResponse) return errorResponse
    await connectDB()
    const payload = await req.json()
    const updated = await User.findByIdAndUpdate(
      user.userId,
      {
        age: Number(payload.age) || undefined,
        weight: Number(payload.weight) || undefined,
        height: Number(payload.height) || undefined,
        gender: payload.gender || undefined,
        activityLevel: payload.activityLevel || undefined,
        goal: payload.goal || undefined,
        dietPreference: payload.dietPreference || undefined
      },
      { new: true }
    ).select('-passwordHash')
    return NextResponse.json({ profile: updated })
  } catch (error) {
    return NextResponse.json({ error: 'Update profile failed', detail: error.message }, { status: 500 })
  }
}
