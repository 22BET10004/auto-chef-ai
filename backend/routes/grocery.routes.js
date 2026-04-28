import { Router } from 'express'
import { generateGrocery, exportGroceryCSV } from '../controllers/grocery.controller.js'

const router = Router()
router.post('/', generateGrocery)
router.post('/export-csv', exportGroceryCSV)
export default router
