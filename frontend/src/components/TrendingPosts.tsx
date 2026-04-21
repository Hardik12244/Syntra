import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import type { Post } from '../types/Post';



type TrendingPostsProps = {
  userId: string;
};

function TrendingPosts({ userId }: TrendingPostsProps) {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3000/search/trending");
      console.log(res.data);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  function likeButton(id: string) {
  setPosts((prev) =>
    prev.map((p) => {
      if (p._id === id) {
        const isLiked = p.likes.includes(userId);
        return {
          ...p,
          likes: isLiked 
            ? p.likes.filter((uid) => uid !== userId) 
            : [...p.likes, userId],                   
        };
      }
      return p;
    })
  );

  axios.post(`http://localhost:3000/post/${id}/like`, { userId })
    .then((res) => {
      setPosts((prev) =>
        prev.map((p) => (p._id === id ? res.data : p))
      );
    })
    .catch((err) => {
      console.error("Like failed", err);
    });
}


  return (
    <div className="w-full max-w-6xl flex justify-center">

      <div className="grid grid-cols-2 gap-6 w-225 pb-10">
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
  )
}

export default TrendingPosts