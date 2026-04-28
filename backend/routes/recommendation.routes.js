import { Router } from 'express'
import { createRecommendation, listRecommendations } from '../controllers/recommendation.controller.js'

const router = Router()
router.post('/', createRecommendation)
router.get('/', listRecommendations)
export default router
