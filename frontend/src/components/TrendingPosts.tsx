import axios from 'axios';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import type { Post } from '../types/Post';

type TrendingPostsProps = {
  userId: string;
};

function TrendingPosts({ userId }: TrendingPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/search/trending`);
        setPosts(res.data);
      } catch {
        // ignore error
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-6xl flex justify-center px-2 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full pb-10">
        {posts.map((e) => (
          <PostCard
            key={e._id}
            post={e}
            setPosts={setPosts}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}

export default TrendingPosts;