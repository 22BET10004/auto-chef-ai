import { Router } from 'express'
import { logProgress, getProgress } from '../controllers/progress.controller.js'

const router = Router()
router.post('/', logProgress)
router.get('/', getProgress)
export default router
