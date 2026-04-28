import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/services/db'
import User from '@/models/User'
import { signToken } from '@/services/auth'

export async function POST(req) {
  try {
    await connectDB()
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }
    const existing = await User.findOne({ email })
    if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash })
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
    return NextResponse.json({ error: 'Signup failed', detail: error.message }, { status: 500 })
  }
}
