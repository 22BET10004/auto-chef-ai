'use client'
import { useState } from 'react'

export default function ReminderPanel() {
  const [status, setStatus] = useState('')

  async function requestPermission() {
    if (!('Notification' in window)) return
    if (Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  function setMealReminder(meal, seconds) {
    setTimeout(() => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`${meal} reminder`, { body: 'Time for your meal!' })
      } else {
        alert(`${meal} reminder: Time for your meal!`)
      }
    }, seconds * 1000)
    setStatus(`${meal} reminder set for ${seconds} seconds`)
  }

  return (
    <div className="card">
      <h3>Meal Reminder System</h3>
      <button onClick={requestPermission}>Enable Browser Notifications</button>
      <button onClick={() => setMealReminder('Breakfast', 5)}>Set Breakfast Reminder</button>
      <button onClick={() => setMealReminder('Lunch', 10)}>Set Lunch Reminder</button>
      <button onClick={() => setMealReminder('Dinner', 15)}>Set Dinner Reminder</button>
      <p className="muted">{status}</p>
    </div>
  )
}
