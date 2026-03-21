import { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/user";

const userRouter = Router();

userRouter.post('/user',createUser)

userRouter.get('/user/:id', getUser)

userRouter.patch('/user/:id',updateUser)

export default userRouter;