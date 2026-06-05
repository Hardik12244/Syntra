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
export async function getLikesActivity(
  req: Request,
  res: Response
) {
  try {

    const userId =
      (req as any).user.id;

    const posts =
      await Post.find({
        user: userId,
      })
      .populate(
        "likes",
        "name avatar"
      );

    const result: any[] = [];

    posts.forEach((post) => {

      post.likes.forEach((user: any) => {

        result.push({
          user,
          caption: post.caption,
          media: post.media,
          postId: post._id,
        });

      });

    });

    return res.json(result);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      msg: "Server Error",
    });

  }
}
export async function getCommentsActivity(
  req: Request,
  res: Response
) {
  try {

    const userId =
      (req as any).user.id;

    const posts =
      await Post.find({
        user: userId,
      })
      .populate(
        "comments.user",
        "name avatar"
      );

    const result: any[] = [];

    posts.forEach((post) => {

      post.comments.forEach(
        (comment: any) => {

          result.push({
            user: comment.user,
            text: comment.text,
            createdAt:
              comment.createdAt,
            caption:
              post.caption,
            media:
              post.media,
          });

        }
      );

    });

    result.sort(
      (a, b) =>
        new Date(
          b.createdAt
        ).getTime()
        -
        new Date(
          a.createdAt
        ).getTime()
    );

    return res.json(result);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      msg: "Server Error",
    });

  }
}
export async function getCrushActivity(
  req: Request,
  res: Response
) {
  try {

    const userId =
      (req as any).user.id;

    const crushes =
      await Crush.find({
        receiver: userId,
      })
      .populate(
        "sender",
        "name avatar"
      )
      .sort({
        createdAt: -1,
      });

    return res.json(crushes);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      msg: "Server Error",
    });

  }
}