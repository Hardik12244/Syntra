import { useState } from "react";
import type { Post, PostCardProps } from "../types/Post";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";


export default function PostCard({ post, userId }: PostCardProps) {
    const [likes, setLikes] = useState(post.likes || []);

  const isLiked = likes.includes(userId);
  const navigate = useNavigate();

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);

  const handleComment = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/post/${post._id}/comment`,
        {
          text: commentText
        }, {
        withCredentials: true,
      })

      setComments(response.data.comments);
      setCommentText("");

    } catch (error) {
      console.log(error);

    }
  }

const handleLike = async () => {

  const alreadyLiked = likes.includes(userId);

  const updatedLikes = alreadyLiked
    ? likes.filter((id) => id !== userId)
    : [...likes, userId];

  setLikes(updatedLikes);

  try {

    const res = await axios.post(
      `http://localhost:3000/post/${post._id}/like`,
      {},
      {
        withCredentials: true
      }
    );

    setLikes(res.data.likes);

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
          <img src={post.user.avatar} onClick={() => navigate(`/profile/${post.user._id}`)} alt="" />
        </div>
        <div className="font-medium text-gray-800">
          {post.user.name}
        </div>
      </div>

      {/* Media */}
      {post.mediaType?.startsWith("image/") ? (
        <img
          src={`http://localhost:3000/${post.media}`}
          className="w-full h-64 object-cover rounded-lg mb-3"
          alt=""
        />
      ) : post.mediaType?.startsWith("video/") ? (
        <video
          src={`http://localhost:3000/${post.media}`}
          controls
          className="w-full h-64 object-cover rounded-lg mb-3"
        />
      ) : null}


      {/* Caption */}
      {post.caption && (
        <p className="text-gray-700 text-sm leading-relaxed">
          {post.caption}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 mt-3 text-xl">

        <button
          onClick={handleLike}
          className={`transition ${isLiked
            ? "text-pink-500"
            : "hover:text-pink-500"
            }`}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>

        <span className="text-sm text-gray-600">
          {likes.length}
        </span>

        <button
          onClick={() => setShowComments(true)}
          className="hover:text-pink-500 transition ml-3"
        >
          💬
        </button>

      </div>


      {/* PopUp */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 flex justify-end"
          >

            <motion.div
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full sm:w-[430px] h-full bg-white/80 backdrop-blur-xl border-l border-white/20 shadow-2xl flex flex-col"
            >

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/50">

                <div>
                  <h2 className="font-semibold text-lg text-gray-800">
                    Comments
                  </h2>

                  <p className="text-sm text-gray-500">
                    {comments.length} interactions
                  </p>
                </div>

                <button
                  onClick={() => setShowComments(false)}
                  className="w-9 h-9 rounded-full bg-white/70 hover:bg-gray-100 transition flex items-center justify-center text-lg shadow-sm"
                >
                  ✕
                </button>

              </div>

              {/* Comments */}
              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">

                {comments.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                    <div className="text-5xl mb-3">💬</div>

                    <p className="font-medium">
                      No comments yet
                    </p>

                    <p className="text-sm">
                      Start the conversation.
                    </p>
                  </div>
                )}

                {comments.map((comment, index) => (
                  <motion.div
                    key={comment._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-4 shadow-sm"
                  >

                    <div className="flex items-start gap-3">

                      <img
                        src={comment.user.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div className="flex-1">

                        <div className="flex items-center gap-2 mb-1">

                          <p className="font-semibold text-sm text-gray-800">
                            {comment.user.name}
                          </p>

                          <span className="text-xs text-gray-400">
                            now
                          </span>

                        </div>

                        <p className="text-sm text-gray-700 leading-relaxed">
                          {comment.text}
                        </p>

                      </div>

                    </div>

                  </motion.div>
                ))}

              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200/50 bg-white/60 backdrop-blur-xl">

                <div className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2 shadow-sm border">

                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />

                  <button
                    onClick={handleComment}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium hover:scale-105 transition"
                  >
                    Send
                  </button>

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>)
};
