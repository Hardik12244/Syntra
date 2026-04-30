import axios from "axios";
import React, { useEffect, useState } from "react";
import type { User } from "../types/User";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard"; 
import { useNavigate } from "react-router-dom";
import type { Post,PostCardProps } from "../types/Post";


type Props = {
  query: string;
    userId: string;

};

function SearchResults({ query ,userId}: Props) {


  const [results, setResults] = useState<{
    users: User[];
    posts: Post[];
  }>({
    users: [],
    posts: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          "http://localhost:3000/search/result",
          {
            params: { q: query },
          }
        );

        setResults(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

const LikeButton = (id: string) => {
  // optimistic update
  setResults((prev) => ({
    ...prev,
    posts: prev.posts.map((p) => {
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
    }),
  }));

  // API call
  axios
    .post(`http://localhost:3000/post/${id}/like`, { userId })
    .then((res) => {
      setResults((prev) => ({
        ...prev,
        posts: prev.posts.map((p) =>
          p._id === id ? res.data : p
        ),
      }));
    })
    .catch((err) => {
      console.error("Like failed", err);
    });
};
  return (
    <section className="py-16 px-6 bg-slate-50/50">
      {loading && <p className="text-center">Loading...</p>}

      {/* USERS */}
      <h2 className="text-2xl font-semibold mb-6 text-center">People</h2>

      <div className="flex flex-wrap gap-8 justify-center">
        {results.users.map((user) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -10,
              rotateZ: Math.random() > 0.5 ? 1 : -1
            }} className="w-[320px] bg-white p-6 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100"
          >
            {/* IMAGE */}
            <div className="h-48 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 mb-6 relative overflow-hidden flex items-center justify-center">
              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                alt=""
                className="h-full w-full object-cover"
              />

              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow">
                Match
              </div>
            </div>

            {/* INFO */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500">
                {user.college} • {user.gender}
              </p>

              {/* INTERESTS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {user.interests?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-pink-50 text-pink-600 border border-pink-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* POSTS */}
     <h2 className="text-2xl font-semibold mt-16 mb-6 text-center">
  Posts
</h2>

<div className="grid grid-cols-2 gap-6 w-225 pb-10">
        {results.posts.map((e) => (
          <PostCard
            key={e._id}
            e={e}
            onLike={LikeButton}
            userId={userId}
          />
        ))}
        
      </div>

    </section>
  );
}

export default SearchResults;