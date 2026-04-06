export type Post = {
    _id: string,
    caption: string,
    file: string,
    likes: string[],
    user: {
        _id: string,
        name: string,
    }
}
