import axios from "axios";
import { useEffect, useState } from "react";

export default function CommentsActivity() {
  const [comments, setComments] =
    useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/activity/comments`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setComments(res.data);
      });
  }, []);

  return (
    <div className="space-y-3">
      {comments.length === 0 && (
        <div className="text-gray-500">
          No comments yet
        </div>
      )}

      {comments.map((comment, i) => (
        <div
          key={i}
          className="
            p-4
            rounded-3xl
            bg-cyan-50
            border
            border-cyan-100
          "
        >
          <div className="flex items-start gap-3">
            <img
              src={comment.user.avatar}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <div className="font-semibold">
                {comment.user.name}
              </div>

              <div className="text-gray-700 mt-1">
                "{comment.text}"
              </div>

              <div className="text-xs text-cyan-600 mt-2">
                on {comment.caption}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}