import { Router } from "express";
import { createUser, getUser,getUserByPhone,updateProfile } from "../controllers/user";
import {authMiddleware} from '../middlewares/auth'
import { upload } from "../multer";

const userRouter = Router();

userRouter.post('/',createUser)

userRouter.get('/:id', getUser)
userRouter.get('/phone/:phoneNo', getUserByPhone)

userRouter.put('/profile', authMiddleware, (req, res, next) => {
    upload.single("avatar")(req, res, (err) => {
        if (err) {
            console.error("Multer/Cloudinary Error:", err);
            return res.status(500).json({ msg: err.message || "File upload failed", error: err });
        }
        next();
    });
}, updateProfile)

export default userRouter;