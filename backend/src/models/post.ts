import mongoose, { Document} from "mongoose";

interface Post extends Document {
    user: mongoose.Types.ObjectId,
    caption: string,
    media: string,
    mediaType: string,
    likes:mongoose.Types.ObjectId[],
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
    mediaType:{
        type:String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
}, { timestamps: true })

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;