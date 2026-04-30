export type Post = {
    _id: string,
    caption: string,
    media: string,
    mediaType: string,
    likes: string[],
    user: {
        _id: string,
        name: string,
        avatar:string,
    }
}


export type PostCardProps = {
  e: Post;
  onLike: (id: string) => void;
  userId: string;
};
