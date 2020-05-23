import { Router } from 'express';
import { singUp, singIn } from '../controllers/auth.controller';

const authRouter = Router();

// Registro de usuarios
authRouter.post('/signup', singUp);

// Login de usuario
authRouter.post('/signin', singIn);

export default authRouter;
