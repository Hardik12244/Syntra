import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Flame } from "lucide-react";

import ActivitySheet from "./ActivitySheet";
import CrushActivity from "./CrushActivity";
import LikesActivity from "./LikesActivity";
import CommentsActivity from "./CommentsActivity";
import { API_URL } from "../config/api";

type ActivityData = {
  crushes: number;
  likes: number;
  comments: number;
};

export default function ActivityCenter() {
  const [data, setData] =
    useState<ActivityData | null>(null);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"likes" | "comments" | "crushes" | null>(null);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/activity`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <div
        className="
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          p-5
          border
          border-white
          shadow-xl
        "
      >
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-6 space-y-4">

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setType("crushes");
            setOpen(true);
          }}
          className="
            cursor-pointer
            bg-gradient-to-br
            from-pink-500
            to-rose-500
            text-white
            rounded-3xl
            p-5
            shadow-xl
            relative
            overflow-hidden
          "
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />

          <div className="flex items-center gap-3">
            <Heart size={24} fill="white" />
            <span className="font-semibold">
              Someone noticed you
            </span>
          </div>

          <p className="mt-3 text-sm text-white/90">
            {data.crushes > 0
              ? `${data.crushes} crushes received`
              : "Keep discovering people ❤️"}
          </p>

          <div className="mt-4 text-xs font-medium text-white/80">
            Tap to view →
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => {
            setType("likes");
            setOpen(true);
          }}
          className="
            cursor-pointer
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            p-4
            border
            border-gray-100
            shadow-lg
          "
        >
          <div className="flex items-center gap-3">
            <Flame
              className="text-orange-500"
              size={20}
            />
            <span className="font-medium">
              Popular Today
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {data.likes > 0
              ? `${data.likes} likes received`
              : "Post something today 🔥"}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => {
            setType("comments");
            setOpen(true);
          }}
          className="
            cursor-pointer
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            p-4
            border
            border-gray-100
            shadow-lg
          "
        >
          <div className="flex items-center gap-3">
            <MessageCircle
              className="text-cyan-500"
              size={20}
            />
            <span className="font-medium">
              Conversations
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {data.comments > 0
              ? `${data.comments} comments on your posts`
              : "Start conversations 💬"}
          </p>
        </motion.div>

      </div>

      <ActivitySheet
        open={open}
        onClose={() => setOpen(false)}
        title={
          type === "crushes"
            ? "❤️ Crushes"
            : type === "likes"
            ? "🔥 Likes"
            : "💬 Comments"
        }
      >
        {type === "crushes" && (
          <CrushActivity />
        )}

        {type === "likes" && (
          <LikesActivity />
        )}

        {type === "comments" && (
          <CommentsActivity />
        )}
      </ActivitySheet>
    </>
  );
}