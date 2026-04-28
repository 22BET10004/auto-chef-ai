import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

export function signToken(user) {
  return jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

export function getTokenFromRequest(req) {
  const authHeader = req.headers.get('authorization') || ''
  const [, token] = authHeader.split(' ')
  const cookieToken = req.cookies?.get('token')?.value
  return token || cookieToken
}

export function requireAuth(req) {
  try {
    const token = getTokenFromRequest(req)
    if (!token) return { errorResponse: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
    const decoded = verifyToken(token)
    return { user: decoded }
  } catch {
    return { errorResponse: NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  }
}
