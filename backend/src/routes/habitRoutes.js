import express from 'express'
import { createHabit,getHabit, updateHabit,deleteHabit,archiveHabit,restoreHabit,getActiveHabit, getArchivedHabit } from "../controllers/habitController.js";
import { habitSchema } from "../validation/habitFormValidation.js";
import validate from "../middleware/validate.js";
import authenticate from '../middleware/auth.js'
const router=express.Router()

router.post('/create',validate(habitSchema),authenticate,createHabit)
router.get('/get',authenticate,getHabit)
router.put('/update/:id',authenticate,updateHabit)
router.post('/delete/:id',authenticate,deleteHabit)
router.get('/archive',authenticate,getArchivedHabit)
router.get('/active',authenticate,getActiveHabit)
router.post('/archived/:id',authenticate,archiveHabit)
router.post('/restore/:id',authenticate,restoreHabit)
export default router