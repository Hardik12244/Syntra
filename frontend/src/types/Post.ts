
export type Comment = {
    _id: string;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
    text: string;
    createdAt: string;
};

export type Post = {
    _id: string,
    caption: string,
    media: string,
    mediaType: string,
    likes: string[],
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    user: {
        _id: string,
        name: string,
        avatar: string,
    }
}


export type PostCardProps = {
    post: Post;
    onLike: (id: string) => void;
    userId: string;
};
