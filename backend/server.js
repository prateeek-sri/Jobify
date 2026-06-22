import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'; // <--- NEW
import resumeRoutes from './routes/resume.routes.js';
import analyzeRoutes from './routes/analyze.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';
import profileRoutes from './routes/profile.routes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());


const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:4000',
  'http://localhost:5173',
  'https://jobify-nu-ecru.vercel.app',
  'https://jobifysearch.vercel.app',
  'https://jobfysearch.vercel.app',
];

if (process.env.FRONTEND_URL) {
  const cleanedUrl = process.env.FRONTEND_URL.replace(/\/$/, '');
  if (!allowedOrigins.includes(cleanedUrl)) {
    allowedOrigins.push(cleanedUrl);
  }
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true 
}));

// Routes
app.use('/api/analyze', analyzeRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/resume', resumeRoutes);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
