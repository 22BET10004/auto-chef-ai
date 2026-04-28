'use client'
import { useEffect, useState } from 'react'

export default function ThemeAndWater() {
  const [dark, setDark] = useState(false)
  const [waterMl, setWaterMl] = useState(0)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="card">
      <h3>Extra Features</h3>
      <button onClick={() => setDark((d) => !d)}>{dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
      <p>Water Intake: {waterMl} ml</p>
      <button onClick={() => setWaterMl((v) => v + 250)}>+ 250ml</button>
    </div>
  )
}
