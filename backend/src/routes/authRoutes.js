import express from 'express'
import { login, logout, refreshToken, register,getCurrentUser } from '../controllers/authController.js'
import validate from '../middleware/validate.js'
import { registerSchema,loginSchema } from '../validation/userValidation.js'
import authenticate from '../middleware/auth.js'
const router=express.Router()

router.post('/register',validate(registerSchema),register)
router.post('/login',validate(loginSchema),login)
router.post('/refresh-token',refreshToken)
router.post('/logout',logout)

router.get('/me',authenticate,getCurrentUser)
export default router