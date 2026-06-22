import express from 'express';
import { register, login, logout, getMe, googleLogin, githubLogin } from '../controllers/auth.controller.js';
import auth from '../middleware/auth.middleware.js'; // We will update this next

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', auth, getMe);
router.post('/google', googleLogin);
router.post('/github', githubLogin);
export default router;