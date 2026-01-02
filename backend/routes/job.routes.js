import express from 'express';
import { getJobs, swipeRight, seedJobs } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/feed', getJobs);
router.post('/swipe', swipeRight);
router.post('/seed', seedJobs);

export default router;