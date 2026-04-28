import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/services/db'
import User from '@/models/User'
import { signToken } from '@/services/auth'

export async function POST(req) {
  try {
    await connectDB()
    const { email, password } = await req.json()
    const user = await User.findOne({ email })
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const token = signToken(user)
    const response = NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email } })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    })
    return response
  } catch (error) {
    return NextResponse.json({ error: 'Login failed', detail: error.message }, { status: 500 })
  }
}
