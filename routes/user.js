import express from 'express';
import { login, register } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);

export default router;