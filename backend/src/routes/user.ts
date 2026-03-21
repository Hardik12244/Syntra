import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/user";

const userRouter = Router();

userRouter.post('/',createUser)

userRouter.get('/:id', getUser)

userRouter.patch('/:id',updateUser)

export default userRouter;