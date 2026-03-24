export type Post = {
    _id: string,
    caption: string,
    image: string,
    likes: string[],
    user: {
        _id: string,
        name: string,
    }
}
