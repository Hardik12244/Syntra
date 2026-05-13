import mongoose, { Document } from "mongoose";

interface Comment {
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
}

interface Post extends Document {
    user: mongoose.Types.ObjectId,
    caption: string,
    media: string,
    mediaType: string,
    likes: mongoose.Types.ObjectId[],
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
}

const postSchema = new mongoose.Schema<Post>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    media: {
        type: String,
    },
    mediaType: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    comments: [
        {user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }}
    ],
}, { timestamps: true })

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;