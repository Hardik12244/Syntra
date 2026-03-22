import { Router } from "express";
import { createPost, deletePost, getPost,getPosts,toggleLike,updatePost } from "../controllers/post";

const postRouter = Router();

postRouter.get('/', getPosts)

postRouter.get('/:id', getPost)

postRouter.post('/:id/like', toggleLike)

postRouter.post('/',createPost)

postRouter.patch('/:id',updatePost)

postRouter.delete('/:id',deletePost)

export default postRouter;