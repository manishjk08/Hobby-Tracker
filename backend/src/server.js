import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import './config/db.js'
import { errorHandler,notFound } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import habitRoutes from './routes/habitRoutes.js'
import logRoutes from './routes/logRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import rateLimit from 'express-rate-limit';

const app=express()
const PORT=process.env.PORT||5000

//parse and cors
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',   
  credentials: true                  
}));
app.use(helmet())
app.use(morgan("dev"))
app.use(cookieParser());

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // 5 AI calls per minute per IP
  message: { success: false, message: 'Too many requests' }
});

//routes
app.use('/api/auth',authRoutes)
app.use('/api/habit',habitRoutes)
app.use('/api/log',logRoutes)
app.use("/api/ai", aiLimiter, aiRoutes);



//mock
app.get('/', (req, res) => {
  res.json({ message: 'habit tracker API is running.' });
});

//error handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});