import axios from 'axios';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import type { Post } from '../types/Post';
import ActivityCenter from '../components/ActivityCenter';

type Props = {
  userId: string;
};

function Feed({ userId }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/post`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  function addPost() {
    const formData = new FormData();
    formData.append('user', userId);
    formData.append('caption', caption);
    if (!file) return;
    formData.append('media', file);

    axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/post`, formData, {
      withCredentials: true,
    })
      .then(() => {
        setIsOpen(false);
        setCaption('');
        setFile(null);

        axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/post`)
          .then((res) => {
            setPosts(res.data);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg w-full max-w-xs sm:max-w-sm">
            <button
              className="ml-auto block mb-4 text-gray-500 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <div className="flex flex-col gap-4">
              <input
                type="file"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setFile(files[0]);
                  }
                }}
                className="bg-gray-100 rounded-lg p-2 text-xs sm:text-sm w-full"
              />

              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="bg-gray-100 rounded-lg p-2 text-sm w-full outline-none focus:ring-2 focus:ring-pink-400"
              />

              <button
                onClick={addPost}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 font-medium transition"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center py-6 px-3 sm:px-6 lg:px-4">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex justify-center min-w-0">
            <div className="w-full max-w-[480px] space-y-4 pb-10 min-w-0">
              {posts.map((e) => (
                <PostCard
                  key={e._id}
                  post={e}
                  userId={userId}
                  setPosts={setPosts}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[300px] shrink-0">
            <div className="sticky top-6">
              <ActivityCenter />
            </div>
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-6 right-6 z-40 bg-purple-500 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg hover:scale-105 transition text-2xl"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>
    </div>
  );
}

export default Feed;

