// Tiny API helper. Backend base URL configurable via VITE_API_URL.
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) throw new Error(`API ${path} failed`)
  return res.json()
}

export const api = {
  recommend: (body) => request('/recommendation', { method: 'POST', body: JSON.stringify(body) }),
  grocery: (mealPlan) => request('/grocery', { method: 'POST', body: JSON.stringify({ mealPlan }) }),
  chat: (message) => request('/chatbot', { method: 'POST', body: JSON.stringify({ message }) }),
  logProgress: (body) => request('/progress', { method: 'POST', body: JSON.stringify(body) }),
  getProgress: () => request('/progress')
}
