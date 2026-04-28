import { useState } from 'react'
import { api } from '../services/api'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! Ask me about meals, calories, or your diet goal.' }
  ])
  const [input, setInput] = useState('')

  async function send(e) {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    try {
      const { answer } = await api.chat(userMsg.text)
      setMessages((m) => [...m, { role: 'bot', text: answer }])
    } catch {
      setMessages((m) => [...m, { role: 'bot', text: 'Server unavailable.' }])
    }
  }

  return (
    <div className="card flex flex-col h-96">
      <h2 className="text-xl font-semibold mb-2">Chatbot Assistant</h2>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2 mt-3">
        <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask: What should I eat today?" />
        <button className="btn">Send</button>
      </form>
    </div>
  )
}
