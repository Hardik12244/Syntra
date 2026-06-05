import { Request, Response } from "express";
import Post from "../models/post";
import Crush from "../models/crush";

export async function getActivitySummary(
  req: Request,
  res: Response
) {
  try {

    const userId = (req as any).user.id;

    const crushCount =
      await Crush.countDocuments({
        receiver: userId
      });

    const posts = await Post.find({
      user: userId
    });

    const likesCount =
      posts.reduce(
        (sum, post) =>
          sum + post.likes.length,
        0
      );

    const commentsCount =
      posts.reduce(
        (sum, post) =>
          sum + post.comments.length,
        0
      );

    return res.json({
      crushes: crushCount,
      likes: likesCount,
      comments: commentsCount
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      msg: "Server Error"
    });

  }
}