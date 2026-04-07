import axios from 'axios';
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import type { Post } from "../types/Post";

type Props = {
    userId: string;
};

function Feed({ userId }: Props) {

    const [posts, setPosts] = useState<Post[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>("")

    useEffect(() => {
        axios.get("http://localhost:3000/post")
            .then((res) => {
                console.log(res.data);
                setPosts(res.data)
            })
    }, [])

    function likeButton(id: string) {
        console.log("clicked", id);

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

    function addPost() {
        const formData = new FormData();
        formData.append("user",userId);
        formData.append("caption",caption);
        if (!file) return;
        formData.append("media",file)
        axios.post(`http://localhost:3000/post/`,formData)
        .then((res) => {
            console.log("post uploaded")
            setIsOpen(false);
            axios.get("http://localhost:3000/post")
                .then((res) => {
                    console.log(res.data);
                    setPosts(res.data)
                })
        })

    }


    return (
        <div className={`flex grid grid-cols-3 justify-center align-middle min-h-screen`}>
            <div className={`${isOpen ? "block" : "hidden"} flex col-start-2 mt-24 rounded-2xl border border-neutral-200 justify-center align-middle`}>
                <div className='flex flex-col gap-4 mt-8 mb-4 '>
                    <button className='ml-auto mb-auto' onClick={() => setIsOpen(false)}>X</button>
                    <input onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                            setFile(files[0]);
                        }
                    }} className='bg-neutral-200 w-64 rounded-xl p-2' type="file" placeholder='File' />
                    <input value={caption} onChange={(e) => setCaption(e.target.value)} className='bg-neutral-200 w-64 rounded-xl p-2' type="text" placeholder='caption' />
                    <button onClick={() => addPost()}>Upload</button>
                </div>
            </div>

            <div className={`${isOpen ? "blur-sm" : ""} col-start-2 justify-center align-middle mt-24 bg-[#FFF7F9] rounded-3xl flex flex-col gap-6 border border-neutral-200`}>

                {posts.map((e) => {
                    return (
                        <PostCard key={e._id} e={e} onLike={likeButton} userId={userId} />
                    )
                })}
            </div>
            <div className='fixed bottom-30 right-100'>
                <button onClick={() => setIsOpen(true)}>Post</button>
            </div>


        </div>
    )
}

export default Feed