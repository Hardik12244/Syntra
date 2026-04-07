import type { Post } from "../types/Post";

type PostCardProps = {
  e: Post;
  onLike: (id: string) => void;
  userId: string;
};

export default function PostCard({ e, onLike, userId }: PostCardProps) {
  const isLiked = e.likes.includes(userId);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
          {e.user.name[0]}
        </div>
        <div className="font-medium text-gray-800">
          {e.user.name}
        </div>
      </div>

      {/* Media */}
      {e.mediaType?.startsWith("image/") ? (
        <img
          src={`http://localhost:3000/${e.media}`}
          className="w-full h-64 object-cover rounded-lg mb-3"
          alt=""
        />
      ) : e.mediaType?.startsWith("video/") ? (
        <video
          src={`http://localhost:3000/${e.media}`}
          controls
          className="w-full h-64 object-cover rounded-lg mb-3"
        />
      ) : null}

      {/* Actions */}
      <div className="flex items-center gap-6 text-gray-600 mb-2 text-sm">

        <button
          onClick={() => onLike(e._id)}
          className={`flex items-center gap-1 transition ${
            isLiked ? "text-pink-500" : "hover:text-pink-500"
          }`}
        >
          {isLiked ? "❤️" : "♡"}
          <span>{e.likes.length}</span>
        </button>

        <button className="flex items-center gap-1 hover:text-pink-500 transition">
          💬 <span>0</span>
        </button>

        <button className="flex items-center gap-1 hover:text-pink-500 transition">
          🔁 
        </button>

      </div>

      {/* Caption */}
      {e.caption && (
        <p className="text-gray-700 text-sm leading-relaxed">
          {e.caption}
        </p>
      )}

    </div>
  );
}
