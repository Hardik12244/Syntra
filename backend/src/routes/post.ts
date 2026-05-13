import { Router } from "express";
import { createPost, deletePost, getPost,getPosts,toggleLike,updatePost,createComment } from "../controllers/post";
import { upload } from "../multer";
import { authMiddleware } from "../middlewares/auth";

const postRouter = Router();

postRouter.get('/', getPosts)

postRouter.get('/:id', getPost)

postRouter.post('/:id/like',authMiddleware, toggleLike)

postRouter.post('/',authMiddleware,upload.single("media"),createPost)

postRouter.patch('/:id',authMiddleware,updatePost)

postRouter.delete('/:id',authMiddleware,deletePost)

postRouter.post('/:id/comment',authMiddleware,createComment)

export default postRouter;