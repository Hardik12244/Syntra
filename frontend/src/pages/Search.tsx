import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TrendingPosts from "../components/TrendingPosts";
import PeopleYouMayLike from "../components/PeopleYouMayLike";
import SearchResults from "../components/SearchResults";
import axios from "axios";

function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [user, setUser] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/me", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/search/suggestions?q=${query}`
        );

        setSuggestions(res.data);
      } catch (error) {
        console.log(error);
      }
    }, 250);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = () => {
    setActiveSearch(query);
    setSuggestions([]);
  };

  return (
    <div className="w-full min-h-screen px-6 py-6">

      <div className="max-w-3xl mx-auto relative">

        <motion.div
          animate={{
            scale: focused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="relative"
        >

          <input
            type="text"
            placeholder="Search people..."
            value={query}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full h-14 px-6 pr-14 rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-sm outline-none text-[15px] transition focus:shadow-xl"
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                setActiveSearch("");
                setSuggestions([]);
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
            >
              ✕
            </button>
          )}

        </motion.div>

        <AnimatePresence>
          {suggestions.length > 0 && focused && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute top-16 w-full bg-white/80 backdrop-blur-2xl border border-gray-200 rounded-3xl shadow-2xl overflow-hidden z-50"
            >

              {suggestions.map((item: any) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/profile/${item._id}`)}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-100/70 transition cursor-pointer"
                >

                  <img
                    src={item.avatar}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div className="flex flex-col">

                    <span className="text-sm font-medium text-gray-800">
                      {item.name}
                    </span>

                    <span className="text-xs text-gray-500">
                      @{item.username}
                    </span>

                  </div>

                </div>
              ))}

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div className="mt-8">

        {activeSearch.trim() === "" ? (
          <>
            {user && <TrendingPosts userId={user._id} />}
            <PeopleYouMayLike />
          </>
        ) : (
          <>
            {user && (
              <SearchResults
                query={activeSearch}
                userId={user._id}
              />
            )}
          </>
        )}

      </div>

    </div>
  );
}

export default Search;