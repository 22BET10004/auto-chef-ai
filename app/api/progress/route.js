import { NextResponse } from 'next/server'
import { connectDB } from '@/services/db'
import ProgressLog from '@/models/ProgressLog'
import { requireAuth } from '@/services/auth'

export async function GET(req) {
  try {
    const { user, errorResponse } = requireAuth(req)
    if (errorResponse) return errorResponse
    await connectDB()
    const logs = await ProgressLog.find({ userId: user.userId }).sort({ date: 1 }).limit(30)
    return NextResponse.json({ logs })
  } catch (error) {
    return NextResponse.json({ error: 'Fetch progress failed', detail: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const { user, errorResponse } = requireAuth(req)
    if (errorResponse) return errorResponse
    await connectDB()
    const payload = await req.json()
    const log = await ProgressLog.create({ ...payload, userId: user.userId })
    return NextResponse.json({ log })
  } catch (error) {
    return NextResponse.json({ error: 'Save progress failed', detail: error.message }, { status: 500 })
  }
}
