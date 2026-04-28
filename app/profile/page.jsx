'use client'

import { useEffect, useState } from 'react'
import AppNav from '@/components/AppNav'
import ProtectedPage from '@/components/ProtectedPage'
import { getJSON } from '@/services/api'
import { getSession } from '@/utils/clientAuth'

const initial = {
  age: '',
  weight: '',
  height: '',
  gender: 'male',
  activityLevel: 'moderate',
  goal: 'maintain',
  dietPreference: 'veg'
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(initial)
  const [status, setStatus] = useState('')
  const session = getSession()

  useEffect(() => {
    async function load() {
      if (!session?.token) return
      const data = await getJSON('/api/profile', session.token)
      if (data.profile) {
        setProfile({
          age: data.profile.age || '',
          weight: data.profile.weight || '',
          height: data.profile.height || '',
          gender: data.profile.gender || 'male',
          activityLevel: data.profile.activityLevel || 'moderate',
          goal: data.profile.goal || 'maintain',
          dietPreference: data.profile.dietPreference || 'veg'
        })
      }
    }
    load()
  }, [session?.token])

  async function saveProfile() {
    if (!session?.token) return
    await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`
      },
      body: JSON.stringify(profile)
    })
    setStatus('Profile updated successfully')
  }

  return (
    <ProtectedPage>
      <main className="container">
        <AppNav />
        <div className="card" style={{ maxWidth: 700 }}>
          <h2>Profile Settings</h2>
          <p className="muted">Manage your body metrics and diet preferences.</p>

          <input placeholder="Age" value={profile.age} onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))} />
          <input placeholder="Weight (kg)" value={profile.weight} onChange={(e) => setProfile((p) => ({ ...p, weight: e.target.value }))} />
          <input placeholder="Height (cm)" value={profile.height} onChange={(e) => setProfile((p) => ({ ...p, height: e.target.value }))} />
          <select value={profile.gender} onChange={(e) => setProfile((p) => ({ ...p, gender: e.target.value }))}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            value={profile.activityLevel}
            onChange={(e) => setProfile((p) => ({ ...p, activityLevel: e.target.value }))}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="active">Active</option>
          </select>
          <select value={profile.goal} onChange={(e) => setProfile((p) => ({ ...p, goal: e.target.value }))}>
            <option value="loss">Weight Loss</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Muscle Gain</option>
          </select>
          <select
            value={profile.dietPreference}
            onChange={(e) => setProfile((p) => ({ ...p, dietPreference: e.target.value }))}
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-veg</option>
            <option value="vegan">Vegan</option>
          </select>
          <button onClick={saveProfile}>Save Profile</button>
          {status && <p className="muted">{status}</p>}
        </div>
      </main>
    </ProtectedPage>
  )
}
