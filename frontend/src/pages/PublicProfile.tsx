import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FloatingDock } from "../components/FloatingDock";
import { Home, MessageCircle, Heart, LayoutGrid } from "lucide-react";
import { BoatAnimation } from "../components/BoatAnimation";
import { motion, AnimatePresence } from "framer-motion";
import type { Post } from "../types/Post";
import PostCard from "../components/PostCard";

type User = {
  _id: string;
  name: string;
  avatar: string;
  college?: string;
  age?: string;
  dateOfBirth: string;
  gender?: string;
  interests: string[];
};

type Props = {
  currentUserId: string;
};

export default function PublicProfile({ currentUserId }: Props) {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [crushed, setCrushed] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!id) return;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/post/user/${id}`,
          { withCredentials: true }
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/user/${id}`)
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchCrushStatus = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/crush/status/${id}`,
          { withCredentials: true }
        );
        setCrushed(res.data.crushed);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCrushStatus();
  }, [id]);

  if (!user) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  const handleCrush = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/crush/toggle`,
        { receiver: user._id },
        { withCredentials: true }
      );

      setCrushed(res.data.crushed);
      if (res.data.matched) {
        setShowMatch(true);
        setTimeout(() => {
          setShowMatch(false);
        }, 3500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChat = () => {
    navigate("/messages", {
      state: {
        selectedUser: user,
      },
    });
  };

  const dockItems = [
    {
      title: "Home",
      icon: <Home size={20} />,
      href: "/",
    },
    {
      title: "Crush",
      icon: (
        <div className="relative flex items-center justify-center">
          {crushed && (
            <div className="absolute w-11 h-11 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-500 blur-md opacity-50 animate-pulse" />
          )}
          {crushed && (
            <div
              className="absolute w-10 h-10 rounded-full border border-pink-400/50 animate-spin"
              style={{ animationDuration: "6s" }}
            />
          )}
          <div
            className={`relative z-10 rounded-full p-2 transition-all duration-500 ${
              crushed
                ? "bg-white/20 backdrop-blur-xl scale-110 shadow-lg shadow-pink-500/20"
                : ""
            }`}
          >
            <Heart
              size={20}
              className={`transition-all duration-300 ${
                crushed
                  ? "text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                  : "text-gray-600"
              }`}
            />
          </div>
        </div>
      ),
      onClick: handleCrush,
    },
    {
      title: "Chat",
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="absolute w-3 h-3 rounded-full bg-emerald-400 top-0 right-0 animate-ping" />
          <div className="relative z-10 p-2 rounded-full bg-emerald-500/10 backdrop-blur-xl">
            <MessageCircle
              size={20}
              className="text-black drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
            />
          </div>
        </div>
      ),
      onClick: handleChat,
    },
    {
      title: "View Posts",
      icon: (
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-md animate-pulse" />
          <div className="relative z-10 p-2 rounded-full bg-yellow-500/10">
            <LayoutGrid
              size={20}
              className="text-black drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
            />
          </div>
        </div>
      ),
      onClick: () => setShowPosts((prev) => !prev),
    },
  ];

  function getAge(dobString?: string) {
    if (!dobString) return null;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() &&
        today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  }

  return (
    <>
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[999] px-6 sm:px-8 py-4 sm:py-5 rounded-3xl bg-white/40 backdrop-blur-2xl border border-pink-200/50 shadow-[0_8px_40px_rgba(236,72,153,0.25)] flex items-center gap-4 max-w-[90vw]"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/10 to-fuchsia-400/10" />
            <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-pink-500/15 flex items-center justify-center shrink-0">
              <Heart
                className="text-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]"
                fill="rgba(236,72,153,0.25)"
              />
            </div>
            <div className="relative z-10 min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                It’s a Match ✨
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                You both crushed each other
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col min-h-screen bg-gray-50 text-black overflow-x-hidden">
        <div className="flex-1 p-3 sm:p-6">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-5 sm:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              <div className="flex flex-col gap-y-3 items-center shrink-0">
                <img
                  src={user.avatar || "https://via.placeholder.com/150"}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow"
                  alt=""
                />

                <div className="text-center mt-2">
                  <p className="text-gray-500 text-sm">Followers</p>
                  <p className="text-2xl font-bold">120</p>
                  <button className="px-6 py-1.5 rounded-xl bg-red-400 text-white shadow hover:scale-105 transition mt-1">
                    Follow
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full min-w-0 text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 truncate">
                  {user.name}
                </h1>

                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {user.interests?.map((i, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-600"
                    >
                      {i}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 sm:gap-10 mt-6 sm:mt-10 justify-center md:justify-start">
                  <div>
                    <p className="text-gray-500 text-sm">College</p>
                    <p className="text-lg font-medium">
                      {user.college || "Not added"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Age</p>
                    <p className="text-lg font-medium">
                      {getAge(user.dateOfBirth) ?? "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Gender</p>
                    <p className="text-lg font-medium">
                      {user.gender || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-4 md:-mt-24">
              <BoatAnimation />
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <FloatingDock items={dockItems} />
          </div>
        </div>

        <AnimatePresence>
          {showPosts && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="mt-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-3 sm:px-6 w-full"
            >
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  userId={currentUserId}
                  setPosts={setPosts}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}