import { Router } from "express";
import Post from "../models/post";
import User from "../models/user";
const searchRouter = Router();

searchRouter.get('/trending', async (req, res) => {
  const posts = await Post.find()
    .populate("user")
    .sort({ likes: -1 })
    .limit(5);

  res.json(posts);
})

searchRouter.get('/result', async (req, res) => {
  const q = String(req.query.q || "")
  if (!q) {
    return res.json({ users: [], posts: [] });
  }
  try {
    const users = await User.find({
      name: { $regex: q, $options: "i" }
    }).limit(10);

    const posts = await Post.find({
      caption: { $regex: q, $options: "i" }
    }).populate("user")
      .limit(10);

    res.json({ users, posts });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
})

searchRouter.get("/suggestions", async (req, res) => {
  try {

    const q = req.query.q as string;

    if (!q || q.length < 2) {
      return res.json([]);
    }

    const users = await User.find({
      name: {
        $regex: q,
        $options: "i"
      }
    })
      .select("name avatar username")
      .limit(5);

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });
  }});

export default searchRouter;