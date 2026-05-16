import PostCard from './PostCard'
import axios from "axios";
import { useEffect, useState } from "react";
// import type { User } from "../types/User";
import type { Post } from "../types/Post";

type SelfpostProps = {
  userId: string;
};

function Selfpost({ userId }: SelfpostProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {

    const fetchPosts = async () => {

      try {
        const response = await axios.get(
          `http://localhost:3000/post/user/${userId}`,
          {
            withCredentials: true
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();

  }, []);

  return (
    <div className="w-full max-w-6xl flex justify-center">
    
          <div className="grid grid-cols-2 gap-6 w-225 pb-10">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                userId={userId}
              />
            ))}
            
          </div>
    
        </div>
  )
}

export default Selfpost