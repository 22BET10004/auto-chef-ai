'use client'
import { useState } from 'react'
import { postJSON } from '@/services/api'

export default function ChatbotAssistant() {
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])

  async function askBot() {
    if (!message.trim()) return
    const data = await postJSON('/api/chatbot', { message })
    setHistory((prev) => [...prev, { q: message, a: data.answer }])
    setMessage('')
  }

  return (
    <div className="card">
      <h3>Diet Chatbot Assistant</h3>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask: Calories in rice?" />
      <button onClick={askBot}>Send</button>
      {history.map((item, i) => (
        <div key={`${item.q}-${i}`}>
          <p>
            <strong>You:</strong> {item.q}
          </p>
          <p className="muted">
            <strong>Bot:</strong> {item.a}
          </p>
        </div>
      ))}
    </div>
  )
}
