import { Router } from "express";
import { createPost, deletePost, getPost,getPosts,updatePost } from "../controllers/post";

const postRouter = Router();

postRouter.get('/', getPosts)

postRouter.get('/post/:id', getPost)

postRouter.post('/post',createPost)

postRouter.patch('/post/:id',updatePost)

postRouter.delete('/post/:id',deletePost)

export default postRouter;