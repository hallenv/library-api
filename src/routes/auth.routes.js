import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();

// rota pub - registrar novo user
router.post('/register', register);

// rota pub - login
router.post('/login', login);

export default router;
