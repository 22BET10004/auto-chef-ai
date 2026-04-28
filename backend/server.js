import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './utils/db.js'
import recommendationRoutes from './routes/recommendation.routes.js'
import groceryRoutes from './routes/grocery.routes.js'
import chatbotRoutes from './routes/chatbot.routes.js'
import progressRoutes from './routes/progress.routes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => res.json({ status: 'ok', service: 'nutrition-planner-api' }))

app.use('/api/recommendation', recommendationRoutes)
app.use('/api/grocery', groceryRoutes)
app.use('/api/chatbot', chatbotRoutes)
app.use('/api/progress', progressRoutes)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
})
