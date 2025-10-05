import {Router} from 'express';
import { deleteUser, getUser, getUsers, createUser, updateUser } from '../controller/user.controller.js';
import authorize from "../middleware/auth.middleware.js";
const userRouter = Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',authorize, getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;