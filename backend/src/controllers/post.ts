import Post from "../models/post";
import { Request, Response } from "express";
import mongoose from "mongoose";

async function createPost(req: Request, res: Response) {
    try {
        const { user, caption, image } = req.body;
        const media = req.file?.path;
        const mediaType = req.file?.mimetype;

        if (!user || !caption) return res.status(400).json({ msg: "caption required" });
        const post = await Post.create({
            user,
            caption,
            media,
            mediaType
        })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ msg: "error aagya jiiii" })
    }
}

async function getPost(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const post = await Post.findOne({
            _id: id,
        })
        if (!post) {
            return res.status(404).json({ msg: "Post does not exist" })
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

async function updatePost(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const data = req.body;
        const post = await Post.findByIdAndUpdate(
            id,
            data,
            { new: true },
        );
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

async function deletePost(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndDelete(
            id,
        );
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json({ msg: "Post Deleted" })
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

async function getPosts(req: Request, res: Response) {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("user");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}


async function toggleLike(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const alreadyLiked = post.likes.some((like) =>
      like.equals(userObjectId)
    );

    let updatedPost;

    if (alreadyLiked) {
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: userObjectId } },
        { new: true }
      ).populate("user");
    } else {
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { $addToSet: { likes: userObjectId } },
        { new: true }
      ).populate("user");
    }

    return res.status(200).json(updatedPost);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
}

export { getPost, createPost, updatePost, deletePost, getPosts, toggleLike }