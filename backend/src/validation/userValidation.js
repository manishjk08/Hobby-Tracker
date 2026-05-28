import {z} from 'zod' 

export const registerSchema=z.object({
name:z.string()
.min(3, 'Name must be atleast 3 characters')
.max(20,'Name cant be this long'),

email:z.string()
.email('Please provide valid email address')
.toLowerCase(),

password: z.string()
.min(6, 'Password must be at least 6 characters')
})

export const loginSchema=z.object({
email:z.string()
.email('Please provide valid email address')
.toLowerCase(),

password: z.string()
.min(6, 'Password must be at least 6 characters')
})
