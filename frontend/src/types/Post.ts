export type Post = {
    _id: string,
    caption: string,
    media: string,
    mediaType: string,
    likes: string[],
    user: {
        _id: string,
        name: string,
    }
}
