import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import type { User } from '../types/User';
import type { Post } from "../types/Post";
import PostCard from "../components/PostCard";

type Props = {
  user: any;
  setUser: (user: any) => void;
};

type FormDataType = Partial<User>;

const InputField = ({ label, value, onChange, ...props }: any) => (
  <div>
    <p className="label font-semibold">{label}</p>
    <input
      {...props}
      value={value ?? ""}
      onChange={onChange}
      className="input bg-pink-100 p-2 rounded-2xl"
    />
  </div>
);

export default function Profile({ user, setUser }: Props) {
  const [formData, setFormData] = useState<FormDataType>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/auth/me`, {
          withCredentials: true,
        });

        const userData = {
          ...res.data,
          dateOfBirth: res.data.dateOfBirth
            ? res.data.dateOfBirth.split("T")[0]
            : "",
        };

        setUser(userData);
        setFormData(userData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:3000/user/profile",
        formData,
        { withCredentials: true }
      );

      setUser(res.data);
      setFormData({
        ...res.data,
        dateOfBirth: res.data.dateOfBirth
          ? res.data.dateOfBirth.split("T")[0]
          : "",
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/post/user/${user._id}`,
          {
            withCredentials: true,
          }
        );

        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [user]);

  if (!user) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f8f8fa] px-3 sm:px-6 py-6 sm:py-8 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[32px] border border-black/5 bg-white/80 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.05)] p-5 sm:p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
            {/* LEFT */}
            <div className="flex flex-col items-center w-full md:w-[280px] shrink-0 text-center">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <img
                  src={user?.avatar || "https://via.placeholder.com/150"}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-[28px] object-cover shadow-xl border border-black/5"
                  alt=""
                />
              </motion.div>

              <h2 className="mt-5 text-xl sm:text-2xl font-semibold tracking-tight text-[#111] truncate max-w-full">
                {user.name}
              </h2>

              <p className="mt-2 text-sm text-black/45 break-all max-w-[220px]">
                {user.email}
              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3 w-full mt-6 sm:mt-8">
                <div className="rounded-2xl border border-black/5 bg-[#fafafa] p-3 sm:p-4">
                  <p className="text-xs text-black/45">Posts</p>
                  <h3 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight">
                    {posts?.length || 0}
                  </h3>
                </div>

                <div className="rounded-2xl border border-black/5 bg-[#fafafa] p-3 sm:p-4">
                  <p className="text-xs text-black/45">Interests</p>
                  <h3 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight">
                    {formData?.interests?.length || 0}
                  </h3>
                </div>
              </div>

              {/* posts button */}
              <motion.button
                onClick={() => setShowPosts(!showPosts)}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -1 }}
                className="mt-6 w-full h-11 rounded-2xl border border-black/10 bg-white text-sm font-medium text-[#111] hover:border-black/20 transition-all"
              >
                {showPosts ? "Hide Posts" : "View Posts"}
              </motion.button>
            </div>

            {/* RIGHT */}
            <div className="flex-1 w-full min-w-0">
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-black/40 font-medium">
                    Settings
                  </p>

                  <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-none text-[#111]">
                    Profile Details
                  </h1>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] leading-6 sm:leading-7 text-black/50 max-w-xl">
                    Update your personal information and preferences with a clean modern interface.
                  </p>
                </div>

                <motion.button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ y: -1 }}
                  className={`h-11 px-5 sm:px-6 rounded-2xl text-sm font-medium transition-all shadow-sm whitespace-nowrap self-start sm:self-auto
                ${
                  isEditing
                    ? "bg-black text-white"
                    : "bg-[#111] text-white"
                }`}
                >
                  {isEditing
                    ? loading
                      ? "Saving..."
                      : "Save Changes"
                    : "Edit Profile"}
                </motion.button>
              </div>

              {/* INPUTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <InputField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <InputField
                  label="Phone"
                  name="phoneNo"
                  value={formData.phoneNo || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <InputField
                  label="College"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* INTERESTS */}
              <div className="mt-8 sm:mt-12">
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <h3 className="text-lg font-semibold tracking-tight text-[#111]">
                    Interests
                  </h3>

                  <p className="text-sm text-black/40">
                    {formData?.interests?.length || 0} selected
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {Array.isArray(formData.interests) &&
                    formData.interests.map((tag: string, i: number) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -2 }}
                        className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-black/10 bg-white text-xs sm:text-sm font-medium text-black/75 hover:border-black/20 transition-all"
                      >
                        #{tag}
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* POSTS SECTION */}
        {showPosts && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8"
          >
            {/* sticky hide button */}
            <div className="sticky bottom-5 z-40 flex justify-end mb-5 pointer-events-none">
              <motion.button
                onClick={() => setShowPosts(false)}
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -2 }}
                className="pointer-events-auto h-12 px-6 rounded-full bg-black text-white text-sm font-medium shadow-2xl"
              >
                Hide Posts
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  userId={user._id}
                  setPosts={setPosts}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* styles */}
      <style>{`
      .input {
        @apply w-full h-12 sm:h-14 px-4 sm:px-5 rounded-2xl border border-black/10 bg-white outline-none text-[15px]
        transition-all duration-200
        focus:border-black/25
        focus:ring-4
        focus:ring-black/[0.03];
      }

      .label {
        @apply text-sm font-medium text-black/50 mb-1.5 sm:mb-2;
      }
    `}</style>
    </div>
  );
}

