import axios from "axios";
import React, { useEffect, useState } from "react";
import type { User } from "../types/User";
import type { Post } from "../types/Post";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";

type Props = {
  query: string;
  userId: string;
};

function SearchResults({ query, userId }: Props) {
  const [results, setResults] = useState<{
    users: User[];
    posts: Post[];
  }>({
    users: [],
    posts: [],
  });

  const [loading, setLoading] = useState(false);

  const [type, setType] = useState<"all" | "users" | "posts">("all");
  const [sort, setSort] = useState<"latest" | "popular" | "relevant">("latest");

  // 🔍 Fetch data
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:3000/search/result",
          { params: { q: query } }
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

  const onLike = (id: string) => {
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
      .catch((err) => console.error(err));
  };


  let sortedPosts = [...results.posts];

  if (sort === "latest") {
    sortedPosts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }

  if (sort === "popular") {
    sortedPosts.sort((a, b) => b.likes.length - a.likes.length);
  }

  if (sort === "relevant") {
    sortedPosts.sort((a, b) => b.likes.length - a.likes.length);
  }

  return (
    <section className="py-1 px-4 max-w-6xl mx-auto">

      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">

        <div className="flex gap-2 bg-white p-1 rounded-full shadow">
          {["all", "users", "posts"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t as any)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize ${type === t
                ? "bg-indigo-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {type === "posts" && (
          <div className="flex gap-2 bg-white p-1 rounded-full shadow">
            {["latest", "popular", "relevant"].map((s) => (
              <button
                key={s}
                onClick={() => setSort(s as any)}
                className={`px-4 py-1.5 rounded-full text-sm capitalize ${sort === s
                  ? "bg-pink-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {/* PEOPLE */}
      {(type === "all" || type === "users") && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">People</h2>

          {results.users.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No people found
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {results.users.map((user) => (
                <motion.div
                  key={user._id}
                  whileHover={{ y: -8 }}
                  className="bg-white p-4 rounded-xl shadow"
                >
                  <img
                    src={user.avatar}
                    className="w-full h-36 object-cover rounded-lg mb-2"
                  />
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">
                    {user.college}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* POSTS */}
      {(type === "all" || type === "posts") && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Posts</h2>

          {sortedPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No posts found
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {sortedPosts.map((post) => (
                <PostCard
                  key={post._id}
                  e={post}
                  onLike={onLike}
                  userId={userId}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default SearchResults;