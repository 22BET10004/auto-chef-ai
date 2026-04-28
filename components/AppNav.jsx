'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { clearSession } from '@/utils/clientAuth'
import { postJSON } from '@/services/api'

export default function AppNav() {
  const router = useRouter()

  async function logout() {
    await postJSON('/api/auth/logout', {})
    clearSession()
    router.push('/login')
  }

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/planner">Planner</Link>
        <Link href="/chat">Chatbot</Link>
        <Link href="/profile">Profile</Link>
        <button style={{ width: 'auto', padding: '8px 14px' }} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}
