import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../types/User";
import type { Post } from "../types/Post";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/search/result`, {
          params: { q: query },
        });
        setResults(res.data);
      } catch {
        // ignore search error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const setPosts: React.Dispatch<React.SetStateAction<Post[]>> = (action) => {
    setResults((prev) => {
      const nextPosts = typeof action === "function" ? action(prev.posts) : action;
      return { ...prev, posts: nextPosts };
    });
  };

  const sortedPosts = [...results.posts].sort((a, b) => {
    if (sort === "popular") return b.likes.length - a.likes.length;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <section className="w-full max-w-4xl mx-auto space-y-8 pb-12 px-2 sm:px-0 overflow-x-hidden">
      {/* SEARCH INPUT */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search people, colleges, interests..."
          defaultValue={query}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/search?q=${e.currentTarget.value}`);
            }
          }}
          className="w-full px-5 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-sm sm:text-base"
        />
      </div>

      {/* FILTER & SORT BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* TABS */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "users", "posts"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium capitalize transition ${
                type === t
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* SORT */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="text-xs sm:text-sm bg-gray-100 rounded-lg px-3 py-1.5 border-none outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
            <option value="relevant">Relevant</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500 py-10">Searching...</p>}

      {/* USERS */}
      {(type === "all" || type === "users") && (
        <div>
          <h2 className="text-xl font-semibold mb-4">People</h2>

          {results.users.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No users found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.users.map((user) => (
                <motion.div
                  key={user._id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition"
                >
                  <img
                    src={user.avatar || "https://via.placeholder.com/150"}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                    alt=""
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {user.name}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">{user.college}</p>

                    <div className="flex gap-1 mt-2 flex-wrap">
                      {user.interests?.slice(0, 3).map((i, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
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
            <p className="text-gray-500 text-center py-6">No posts found</p>
          ) : (
            <div className="flex flex-col gap-6">
              {sortedPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  setPosts={setPosts}
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