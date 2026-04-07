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
        formData.append("user", userId);
        formData.append("caption", caption);
        if (!file) return;
        formData.append("media", file)
        axios.post(`http://localhost:3000/post/`, formData)
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
  <div className="min-h-screen bg-gray-50">

    {/* Modal */}
    {isOpen && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 shadow-lg w-80">
          
          <button
            className="ml-auto block mb-4 text-gray-500 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <div className="flex flex-col gap-4">
            <input
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setFile(files[0]);
                }
              }}
              className="bg-gray-100 rounded-lg p-2"
            />

            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="bg-gray-100 rounded-lg p-2"
            />

            <button
              onClick={addPost}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90"
            >
              Upload
            </button>
          </div>

        </div>
      </div>
    )}

    {/* Feed */}
    <div className="flex justify-center pt-24">
      
      <div className="w-[33%] space-y-4">

        {posts.map((e) => (
          <PostCard
            key={e._id}
            e={e}
            onLike={likeButton}
            userId={userId}
          />
        ))}

      </div>

    </div>

    {/* Floating Button */}
    <button
      className="fixed bottom-6 right-6 z-40 
      bg-gradient-to-r from-pink-500 to-purple-500 
      text-white rounded-full w-14 h-14 
      flex items-center justify-center shadow-lg hover:scale-105 transition"
      onClick={() => setIsOpen(true)}
    >
      +
    </button>

  </div>
);
}

export default Feed
