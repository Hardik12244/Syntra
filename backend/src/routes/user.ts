import { Router } from "express";
import { createUser, getUser,getUserByPhone,updateProfile } from "../controllers/user";
import {authMiddleware} from '../middlewares/auth'

const userRouter = Router();

userRouter.post('/',createUser)

userRouter.get('/:id', getUser)
userRouter.get('/phone/:phoneNo', getUserByPhone)

userRouter.put('/profile',authMiddleware,updateProfile)

export default userRouter;