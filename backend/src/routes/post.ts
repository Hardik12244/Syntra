import { Router } from "express";
import { createPost, deletePost, getPost,getPosts,toggleLike,updatePost,createComment,getSelfPosts } from "../controllers/post";
import { upload } from "../multer";
import { authMiddleware } from "../middlewares/auth";

const postRouter = Router();

postRouter.get('/', getPosts)

postRouter.get('/:id', getPost)

postRouter.get('/user/:userId', authMiddleware, getSelfPosts)

postRouter.post('/:id/like',authMiddleware, toggleLike)

postRouter.post('/', authMiddleware, (req, res, next) => {
    upload.single("media")(req, res, (err) => {
        if (err) {
            console.error("Multer/Cloudinary Error:", err);
            return res.status(500).json({ msg: err.message || "File upload failed", error: err });
        }
        next();
    });
}, createPost)

postRouter.patch('/:id',authMiddleware,updatePost)

postRouter.delete('/delete/:id',authMiddleware,deletePost)

postRouter.post('/:id/comment',authMiddleware,createComment)

export default postRouter;