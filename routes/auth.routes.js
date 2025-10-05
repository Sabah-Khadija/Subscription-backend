import { Router } from 'express';
import { signUp ,signIn ,signOut} from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-out', signOut);

export default authRouter;