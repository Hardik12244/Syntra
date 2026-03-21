import { Router } from "express";
import { createPost, deletePost, getPost,getPosts,updatePost } from "../controllers/post";

const postRouter = Router();

postRouter.get('/', getPosts)

postRouter.get('/:id', getPost)

postRouter.post('/',createPost)

postRouter.patch('/:id',updatePost)

postRouter.delete('/:id',deletePost)

export default postRouter;