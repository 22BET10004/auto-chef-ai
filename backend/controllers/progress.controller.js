import ProgressLog from '../models/ProgressLog.js'

export async function logProgress(req, res) {
  try {
    const log = await ProgressLog.create(req.body)
    res.json({ log })
  } catch (err) {
    res.status(500).json({ error: 'Failed to log', detail: err.message })
  }
}

export async function getProgress(_req, res) {
  const logs = await ProgressLog.find().sort({ createdAt: -1 }).limit(7)
  res.json({ logs: logs.reverse() })
}
