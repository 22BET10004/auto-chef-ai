'use client'
import { useState } from 'react'
import { postJSON } from '@/services/api'

export default function FoodRecognition() {
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)

  async function detect() {
    if (!fileName) return
    const data = await postJSON('/api/food-recognition', { fileName })
    setResult(data)
  }

  return (
    <div className="card">
      <h3>Food Image Recognition (Mocked)</h3>
      <input type="file" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
      <button onClick={detect}>Detect Food</button>
      {result && (
        <p>
          Detected: <strong>{result.food}</strong> - {result.calories} kcal
        </p>
      )}
    </div>
  )
}
