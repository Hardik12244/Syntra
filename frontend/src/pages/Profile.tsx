import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import type { User } from '../types/User'

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

  if (!user) return <div className="p-6">Loading...</div>;


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl p-8 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row gap-8">

            <div className="flex flex-col items-center md:w-1/3">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={user?.avatar || "https://via.placeholder.com/150"}
                className="w-32 h-32 rounded-3xl object-cover shadow-lg border"
              />

              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {user.name}
              </h2>

              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            <div className="flex-1 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <InputField label="Name" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} />
                <InputField label="Phone" name="phoneNo" value={formData.phoneNo || ""} onChange={handleChange} disabled={!isEditing} />
                <InputField label="College" name="college" value={formData.college} onChange={handleChange} disabled={!isEditing} />
                <InputField
                  label="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              

              {/* INTERESTS */}
              <div>
                <p className="label mb-2">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(formData.interests) &&
                    formData.interests.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              {/* BUTTON */}
              <div className="flex justify-end pt-4">
                <motion.button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 rounded-xl bg-red-400 text-white shadow-lg"
                >
                  {isEditing ? (loading ? "Saving..." : "Save") : "Edit Profile"}
                </motion.button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* styles */}
      <style>{`
      .input {
        @apply w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm outline-none focus:ring-2 focus:ring-indigo-400 transition;
      }
      .label {
        @apply text-sm text-gray-500 mb-1;
      }
    `}</style>
    </div>
  );
}
