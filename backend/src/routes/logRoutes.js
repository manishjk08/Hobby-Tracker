import express from 'express'
import { markComplete,unMark } from '../controllers/logController.js'
import authenticate from '../middleware/auth.js'

const router=express.Router()

router.post('/',authenticate,markComplete)
router.delete('/',authenticate,unMark)

export default router
