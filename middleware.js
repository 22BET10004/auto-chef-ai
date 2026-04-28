import { NextResponse } from 'next/server'

export function middleware(req) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl
  const protectedPaths = ['/dashboard', '/planner', '/chat', '/profile']
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/planner/:path*', '/chat/:path*', '/profile/:path*', '/login']
}
