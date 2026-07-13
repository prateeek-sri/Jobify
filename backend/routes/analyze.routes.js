import express from 'express';
import { analyzeMatch, analyzeMatchWithFile, saveAnalysis, getSavedAnalyses } from '../controllers/analyze.controller.js';
import auth from '../middleware/auth.middleware.js'; // Import Auth
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/match', auth, analyzeMatch); 
router.post('/match-file', auth, upload.single('resume'), analyzeMatchWithFile);
router.post('/save', auth, saveAnalysis);
router.get('/saved', auth, getSavedAnalyses);

export default router;