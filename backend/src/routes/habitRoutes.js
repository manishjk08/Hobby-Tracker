import express from 'express'
import { createHabit,getHabit, updateHabit,deleteHabit,archiveHabit,restoreHabit,getActiveHabit, getArchivedHabit } from "../controllers/habitController.js";
import { habitSchema } from "../validation/habitFormValidation.js";
import validate from "../middleware/validate.js";
import authenticate from '../middleware/auth.js'
const router=express.Router()

router.post('/',authenticate,validate(habitSchema),createHabit)
router.get('/',authenticate,getHabit)
router.get('/archive',authenticate,getArchivedHabit)
router.get('/active',authenticate,getActiveHabit)

router.put('/update/:id',authenticate,updateHabit)
router.delete('/delete/:id',authenticate,deleteHabit)

router.patch('/:id/archive', authenticate, archiveHabit)
router.patch('/:id/restore', authenticate, restoreHabit)
export default router