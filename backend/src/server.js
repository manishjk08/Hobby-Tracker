import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import './config/db.js'
import { errorHandler,notFound } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import habitRoutes from './routes/habitRoutes.js'
import logRoutes from './routes/logRoutes.js'

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

//routes
app.use('/api/auth',authRoutes)
app.use('/api/habit',habitRoutes)
app.use('/api/log',logRoutes)



//mock
app.get('/', (req, res) => {
  res.json({ message: 'Hobby tracker API is running.' });
});

//error handler
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});