import Post from "../models/post";
import { Request, Response } from "express";
import mongoose from "mongoose";

async function createPost(req: Request, res: Response) {
    try {
        const { user, caption, image } = req.body;
        if (!user || !caption) return res.status(400).json({ msg: "caption required" });
        const post = await Post.create({
            user,
            caption,
            image
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
        const id = req.params.id;
        const { userId } = req.body;
        console.log(req.body)
        const post = await Post.findOne({
            _id: id,
        })
        console.log(post);

        if (!post) {
            return res.status(404).json({ msg: "Post does not exist" })
        }
        
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const alreadyLiked = post.likes.some((like) =>
            like?.equals(userObjectId));

         if (alreadyLiked) {
            post.likes = post.likes.filter(
                (like) => !like?.equals(userObjectId));
        } else {
            post.likes.push(userObjectId);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

export { getPost, createPost, updatePost, deletePost, getPosts, toggleLike }