import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Nutrition Planner Web App</h1>
        <p className="muted">Production-style intelligent diet and health assistant</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/login">Login</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/planner">Planner</Link>
          <Link href="/chat">Chatbot</Link>
        </div>
      </div>
    </main>
  )
}
