'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/utils/clientAuth'

export default function ProtectedPage({ children }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const session = getSession()
    if (!session?.token) {
      router.replace('/login')
      return
    }
    setReady(true)
  }, [router])

  if (!ready) return <main className="container muted">Checking session...</main>
  return children
}
