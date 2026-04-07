import { Router } from "express";
import { createUser, getUser, updateUser,getUserByPhone } from "../controllers/user";

const userRouter = Router();

userRouter.post('/',createUser)

userRouter.get('/:id', getUser)
userRouter.get('/phone/:phoneNo', getUserByPhone)

userRouter.patch('/:id',updateUser)

export default userRouter;