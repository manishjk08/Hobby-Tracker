import express from 'express'
import {  markComplete,unMark,getToday, getRange,getStreak } from '../controllers/logController.js'
import authenticate from '../middleware/auth.js'

const router=express.Router()

router.post('/',authenticate,markComplete)
router.delete('/',authenticate,unMark)

router.get('/today',authenticate,getToday)
router.get('/range',authenticate,getRange)

router.get('/streaks/:habit_id',authenticate,getStreak)

export default router
