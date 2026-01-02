import express from 'express';
import { getApplication, getHistory } from '../controllers/application.controller.js';

const router = express.Router();

router.get('/history', getHistory);
router.get('/:id', getApplication);

export default router;