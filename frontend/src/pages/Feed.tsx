import axios from 'axios';
import React, { useEffect, useState } from 'react'

type Post = {
    _id: string,
    caption: string,
    image: string,
    likes: string[],
    user: {
        _id: string,
        name: string,
    }
}

function Feed() {


    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3000/post")
            .then((res) => {
                console.log(res.data);
                setPosts(res.data)
            })
    }, [])

    function likeButton(id: string) {
        console.log("clicked", id);

        const userId = "69bfa985637c6b49b02cbb05";

        const udpatedPost = posts.map((e) => {
            if (e._id === id) {
                const alreadyLiked = e.likes.includes(userId);
                if (alreadyLiked) {
                    return {
                        ...e,
                        likes: e.likes.filter((l) => l !== userId)
                    };
                } else {
                    return {
                        ...e,
                        likes:[...e.likes,userId],
                    }
                }
            }
            return e;
        })
        setPosts(udpatedPost);

        axios.post(`http://localhost:3000/post/${id}/like`, {
            userId,
        })
    }

    return (
        <div>
            <div>
                {posts.map((e, index) => {
                    return (
                        <div key={index}>
                            <div>{e.user.name}</div>
                            <div>{e.caption}</div>
                            <div>{e.image}</div>
                            <div> <button onClick={() => likeButton(e._id)}>Like</button>
                                {e.likes.length}</div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default Feed