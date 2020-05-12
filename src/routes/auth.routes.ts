import { Router } from 'express';
import { singUp, singIn } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup', singUp);
authRouter.post('/signin', singIn);

export default authRouter;
