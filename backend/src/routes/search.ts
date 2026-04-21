import { Router } from "express";
import Post from "../models/post";
import User from "../models/user";
const searchRouter = Router();

searchRouter.get('/trending',async (req,res)=>{
    const posts = await Post.find()
    .populate("user")
    .sort({ likes: -1 })
    .limit(5);

  res.json(posts);
})


export default searchRouter;