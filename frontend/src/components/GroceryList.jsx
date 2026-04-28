import jsPDF from 'jspdf'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function GroceryList({ mealPlan }) {
  const [grocery, setGrocery] = useState(null)

  useEffect(() => {
    if (!mealPlan) return
    api.grocery(mealPlan).then((d) => setGrocery(d.grocery)).catch(() => {})
  }, [mealPlan])

  if (!mealPlan) return null
  if (!grocery) return <div className="card text-slate-500">Loading grocery...</div>

  function exportCSV() {
    const rows = [['Category', 'Item']]
    Object.entries(grocery).forEach(([cat, items]) => items.forEach((i) => rows.push([cat, i])))
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'grocery.csv'; a.click()
  }

  function exportPDF() {
    const doc = new jsPDF()
    doc.setFontSize(16); doc.text('Grocery List', 20, 20)
    let y = 32
    Object.entries(grocery).forEach(([cat, items]) => {
      doc.setFontSize(13); doc.text(cat.toUpperCase(), 20, y); y += 8
      doc.setFontSize(11)
      items.forEach((i) => { doc.text(`- ${i}`, 24, y); y += 6 })
      y += 4
    })
    doc.save('grocery.pdf')
  }

  return (
    <div className="card space-y-3">
      <h2 className="text-xl font-semibold">Grocery List</h2>
      {Object.entries(grocery).map(([cat, items]) => (
        <div key={cat}>
          <div className="text-sm font-semibold text-emerald-700 capitalize">{cat}</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {items.length ? items.map((i) => (
              <span key={i} className="px-2 py-1 bg-slate-100 rounded text-sm">{i}</span>
            )) : <span className="text-slate-400 text-sm">—</span>}
          </div>
        </div>
      ))}
      <div className="flex gap-2 pt-2">
        <button onClick={exportCSV} className="btn">Export CSV</button>
        <button onClick={exportPDF} className="btn-outline">Export PDF</button>
      </div>
    </div>
  )
}
