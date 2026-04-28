'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { postJSON } from '@/services/api'
import { getSession, saveSession } from '@/utils/clientAuth'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  useEffect(() => {
    if (getSession()?.token) router.replace('/dashboard')
  }, [router])

  async function submit() {
    const route = mode === 'login' ? '/api/auth/login' : '/api/auth/signup'
    const data = await postJSON(route, form)
    saveSession({ token: data.token, user: data.user })
    router.push('/dashboard')
  }

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
        <h2>{mode === 'login' ? 'Login' : 'Create account'}</h2>
        {mode === 'signup' && (
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        )}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        />
        <button onClick={submit}>{mode === 'login' ? 'Login' : 'Signup'}</button>
        <button onClick={() => setMode((m) => (m === 'login' ? 'signup' : 'login'))}>
          Switch to {mode === 'login' ? 'Signup' : 'Login'}
        </button>
      </div>
    </main>
  )
}
