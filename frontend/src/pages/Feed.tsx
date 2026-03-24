import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

import type { Post } from "../types/Post";

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
                        likes: [...e.likes, userId],
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
        <div className='flex grid grid-cols-3 justify-center align-middle min-h-screen '>
            <div className='col-start-2 justify-center align-middle mt-24 bg-[#FFF7F9] rounded-3xl flex flex-col gap-6'>
                {posts.map((e) => {
                    return(
                        <PostCard e={e} onLike={likeButton}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Feed