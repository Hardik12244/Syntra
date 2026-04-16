import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
type User = {
  _id: string;
  name: string;
  email: string;
  phoneno?: string;
  college?: string;
  bio?: string;
  dob?: string;
  avatar?: string;
  interests: string[];
};
type Props = {
    user: any;
    setUser: (user: any) => void;
};

type FormDataType = Partial<User>;
export default function Profile({user,setUser}:Props) {
  const [formData, setFormData] = useState<FormDataType>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
                const res = await axios.get(`http://localhost:3000/auth/me`, {
  withCredentials: true,
});
      // console.log(res.data);
        setUser(res.data);
        setFormData(res.data);
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
        "/user/profile",
        formData,
        { withCredentials: true }
      );

      setUser(res.data);
      setFormData(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="flex">
        <div className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto rounded-3xl bg-white shadow-xl p-6"
          >
            <div className="flex flex-col md:flex-row gap-6">

              {/* Image */}
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={user?.avatar || "https://via.placeholder.com/150"}
                className="w-32 h-32 rounded-2xl object-cover shadow"
              />

              {/* Info */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input"
                />

                <input
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input"
                />

                <input
                  name="phoneno"
                  value={formData.phoneno || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input"
                />

                <input
                  name="college"
                  value={formData.college || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input"
                />

                <div className="flex flex-wrap gap-2 col-span-2">
                  {Array.isArray(formData.interests) &&
                    formData.interests.map((tag: string, i: number) => (
                      <span key={i}>{tag}</span>
                    ))}
                </div>

                <input
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input col-span-2"
                />

                <input
                  type="date"
                  name="dob"
                  value={formData.dob || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <motion.button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow"
              >
                {isEditing ? (loading ? "Saving..." : "Save") : "Edit"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .input {
          @apply w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400;
        }
      `}</style>
    </div>
  );
}
