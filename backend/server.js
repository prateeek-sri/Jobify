import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

// Import Routes
import authRoutes from './routes/auth.routes.js'; // <--- NEW
import resumeRoutes from './routes/resume.routes.js';
import analyzeRoutes from './routes/analyze.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// CORS: Critical for Cookies to work
app.use(cors({
  origin: 'http://localhost:3000', // Must match frontend URL exactly
  credentials: true 
}));

// Routes
app.use('/api/auth', authRoutes); // <--- NEW (Login/Register)
app.use('/api/resume', resumeRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/application', applicationRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));