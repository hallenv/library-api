import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = Router();

// Rota pública - Registro de novo usuário
router.post('/register', register);

// Rota pública - Login
router.post('/login', login);

export default router;
