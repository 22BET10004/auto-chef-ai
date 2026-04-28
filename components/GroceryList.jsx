'use client'
import jsPDF from 'jspdf'

const categories = {
  vegetables: ['Tomato', 'Onion', 'Spinach'],
  grains: ['Oats', 'Brown Rice', 'Whole Wheat Flour'],
  protein: ['Paneer', 'Eggs', 'Moong Dal']
}

export default function GroceryList() {
  function exportCSV() {
    const rows = [['Category', 'Item']]
    Object.entries(categories).forEach(([cat, items]) => items.forEach((item) => rows.push([cat, item])))
    const csv = rows.map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'grocery-list.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportPDF() {
    const doc = new jsPDF()
    doc.text('Grocery List', 20, 20)
    let y = 35
    Object.entries(categories).forEach(([cat, items]) => {
      doc.text(cat.toUpperCase(), 20, y)
      y += 8
      items.forEach((item) => {
        doc.text(`- ${item}`, 25, y)
        y += 8
      })
    })
    doc.save('grocery-list.pdf')
  }

  return (
    <div className="card">
      <h3>Grocery List Generator</h3>
      {Object.entries(categories).map(([cat, items]) => (
        <div key={cat}>
          <strong style={{ textTransform: 'capitalize' }}>{cat}</strong>: {items.join(', ')}
        </div>
      ))}
      <button onClick={exportPDF}>Download PDF</button>
      <button onClick={exportCSV}>Export CSV</button>
    </div>
  )
}
