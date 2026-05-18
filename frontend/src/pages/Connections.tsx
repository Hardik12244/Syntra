import { useEffect, useState } from "react";
import axios from "axios";
import {
  Heart,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

type UserCard = {
  _id: string;
  name: string;
  avatar: string;
  college?: string;
};

export default function Connections() {

  const [activeTab, setActiveTab] = useState<
    "crushes" | "matches"
  >("crushes");

  const [crushes, setCrushes] = useState<
    UserCard[]
  >([]);

  const [matches, setMatches] = useState<
    UserCard[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchConnections =
      async () => {

        try {

          const [crushRes, matchRes] =
            await Promise.all([

              axios.get(
                "http://localhost:3000/crush/get",
                {
                  withCredentials: true,
                }
              ),

              axios.get(
                "http://localhost:3000/match/get",
                {
                  withCredentials: true,
                }
              ),
            ]);

          setCrushes(crushRes.data);

          setMatches(matchRes.data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchConnections();

  }, []);

  const currentData =
    activeTab === "crushes"
      ? crushes
      : matches;

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading connections...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50 p-6 overflow-x-hidden">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 mb-8"
        >

          <h1 className="text-4xl font-bold text-gray-800">
            Connections
          </h1>

          <p className="text-gray-500 mt-2">
            Your crushes and matches
          </p>

          {/* TABS */}

          <div className="mt-8 flex items-center gap-4">

            <button
              onClick={() =>
                setActiveTab("crushes")
              }
              className={`
                px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300
                ${
                  activeTab === "crushes"
                    ? "bg-pink-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-pink-50"
                }
              `}
            >
              <Heart size={18} />

              Crushes
            </button>

            <button
              onClick={() =>
                setActiveTab("matches")
              }
              className={`
                px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300
                ${
                  activeTab === "matches"
                    ? "bg-cyan-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-cyan-50"
                }
              `}
            >
              <Sparkles size={18} />

              Matches
            </button>

          </div>

        </motion.div>

        {/* EMPTY STATE */}

        {currentData.length === 0 && (

          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-16 text-center shadow-xl">

            <h2 className="text-2xl font-semibold text-gray-700">

              No {
                activeTab === "crushes"
                  ? "Crushes"
                  : "Matches"
              } Yet

            </h2>

            <p className="text-gray-500 mt-2">
              Start connecting with people
            </p>

          </div>
        )}

        {/* CARDS */}

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

          {currentData.map((user, idx) => (

            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.08,
              }}
              className="min-w-[320px] max-w-[320px] bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0"
            >

              {/* USER */}

              <div className="flex items-center gap-4">

                <img
                  src={user.avatar}
                  className="w-16 h-16 rounded-2xl object-cover"
                />

                <div>

                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {user.college}
                  </p>

                </div>

              </div>

              {/* BADGE */}

              <div className="mt-5">

                {activeTab === "crushes" ? (

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-medium">

                    <Heart size={14} />

                    Crush Sent

                  </div>

                ) : (

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-600 text-sm font-medium">

                    <Sparkles size={14} />

                    Matched

                  </div>

                )}

              </div>

              {/* ACTION */}

              <button className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-medium shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">

                <MessageCircle size={18} />

                Message

              </button>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
}