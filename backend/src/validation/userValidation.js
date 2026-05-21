import {z} from 'zod' 

export const registerSchema=z.object({
name:z.string()
.min(3, 'Name must be atleast 3 characters')
.max(20,'Name cant be this long')
.regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

email:z.string()
.email('Please provide valid email address')
.toLowerCase(),

password: z.string()
.min(6, 'Password must be at least 6 characters')
})