import { buildGroceryList } from '../utils/mealDataset.js'

export function generateGrocery(req, res) {
  try {
    const { mealPlan } = req.body
    if (!mealPlan) return res.status(400).json({ error: 'mealPlan required' })
    const grocery = buildGroceryList(mealPlan)
    res.json({ grocery })
  } catch (err) {
    res.status(500).json({ error: 'Failed to build grocery', detail: err.message })
  }
}

export function exportGroceryCSV(req, res) {
  const { grocery } = req.body
  if (!grocery) return res.status(400).json({ error: 'grocery required' })
  const rows = [['Category', 'Item']]
  Object.entries(grocery).forEach(([cat, items]) =>
    items.forEach((i) => rows.push([cat, i]))
  )
  const csv = rows.map((r) => r.join(',')).join('\n')
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename=grocery.csv')
  res.send(csv)
}
