export function saveSession(session) {
  if (typeof window === 'undefined') return
  localStorage.setItem('nutrition_session', JSON.stringify(session))
}

export function getSession() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('nutrition_session')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('nutrition_session')
}
