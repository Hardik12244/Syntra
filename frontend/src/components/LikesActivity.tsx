import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, getMediaUrl } from "../config/api";

export default function LikesActivity() {
  const [likes, setLikes] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/activity/likes`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLikes(res.data);
      });
  }, []);

  return (
    <div className="space-y-3">
      {likes.length === 0 && (
        <div className="text-gray-500">
          No likes yet
        </div>
      )}

      {likes.map((like, i) => (
        <div
          key={i}
          className="
            p-4
            rounded-3xl
            bg-orange-50
            border
            border-orange-100
          "
        >
          <div className="flex items-center gap-3">
            <img
              src={getMediaUrl(like.user.avatar)}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <div className="font-semibold">
                {like.user.name}
              </div>

              <div className="text-sm text-gray-500">
                liked your post
              </div>

              <div className="text-xs mt-1 text-orange-500">
                {like.caption || "Untitled Post"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}