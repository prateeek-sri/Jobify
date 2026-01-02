import express from 'express';
import { analyzeMatch } from '../controllers/analyze.controller.js';

const router = express.Router();

router.post('/match', analyzeMatch);

export default router;