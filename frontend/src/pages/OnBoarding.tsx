import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

const INTEREST_OPTIONS = [
    "Music",
    "Gym",
    "Coding",
    "Travel",
    "Movies",
    "Gaming",
    "Art",
    "Photography",
    "Reading",
    "Sports",
];

export default function OnBoarding({ user, setUser }: any) {
    const [formData, setFormData] = useState({
        name: "",
        avatar: null as File | null,
        phoneNo: "",
        college: "",
        gender: "",
        dateOfBirth: "",
        interests: [] as string[],
    });

    const toggleInterest = (interest: string) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const handleSubmit = async () => {
  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("phoneNo", formData.phoneNo);
    data.append("college", formData.college);

    if (formData.gender) data.append("gender", formData.gender);
    if (formData.dateOfBirth) data.append("dateOfBirth", formData.dateOfBirth);

    formData.interests.forEach((i) =>
      data.append("interests[]", i)
    );

    if (formData.avatar) {
      data.append("avatar", formData.avatar); // 👈 THIS is the file
    }

    const res = await axios.put(
      "http://localhost:3000/user/profile",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setUser(res.data);

  } catch (err) {
    console.error(err);
  }
};
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-gray-200"
            >
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Complete your profile
                </h1>

                <div className="space-y-6">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center mb-6"
                    >
                        <div className="flex flex-col items-center mb-4">

                            <label className="cursor-pointer group relative">

                                <img
                                    src={
                                        formData.avatar
                                            ? URL.createObjectURL(formData.avatar)
                                            : user?.avatar || "https://via.placeholder.com/150"
                                    }
                                    className="w-24 h-24 rounded-2xl object-cover shadow-md border border-gray-200 group-hover:opacity-80 transition"
                                />

                                {/* overlay */}
                                <div className="absolute inset-0 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition bg-black/30 rounded-2xl">
                                    Change
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setFormData({ ...formData, avatar: file });
                                        }
                                    }}
                                />
                            </label>

                        </div>

                        {/* Name */}
                        <input
                            value={formData.name || user?.name || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Your name"
                            className="mt-3 text-center text-lg font-semibold bg-transparent outline-none border-b border-gray-300 focus:border-indigo-500 transition"
                        />
                    </motion.div>

                    <input
                        type="tel"
                        placeholder="Phone"
                        className="input"
                        onChange={(e) =>
                            setFormData({ ...formData, phoneNo: e.target.value })
                        }
                    />

                    <input
                        type="date"
                        className="input"
                        onChange={(e) =>
                            setFormData({ ...formData, dateOfBirth: e.target.value })
                        }
                    />

                    <select
                        className="input"
                        onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                        }
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>

                    <input
                        placeholder="College"
                        className="input"
                        onChange={(e) =>
                            setFormData({ ...formData, college: e.target.value })
                        }
                    />

                    {/* 🔥 INTEREST CHIPS */}
                    <div>
                        <p className="text-sm text-gray-600 mb-2">
                            Select your interests
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {INTEREST_OPTIONS.map((item) => {
                                const isSelected = formData.interests.includes(item);

                                return (
                                    <motion.button
                                        key={item}
                                        type="button"
                                        whileTap={{ scale: 0.9 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => toggleInterest(item)}
                                        className={`px-3 py-1 text-xs rounded-full border transition shadow-sm
                      ${isSelected
                                                ? "bg-indigo-500 text-white border-indigo-500 shadow-md"
                                                : "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200"
                                            }
                    `}
                                    >
                                        {item}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.03 }}
                        onClick={handleSubmit}
                        className="w-full py-2 mt-2  rounded-xl bg-[#ff4359] text-white font-medium shadow-lg"
                    >
                        Continue →
                    </motion.button>
                </div>
            </motion.div>

            <style>{`
        .input {
          @apply w-full px-4 py-2 rounded-xl border border-gray-200 bg-white/60 backdrop-blur-sm outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-gray-400;
        }
      `}</style>
        </div>
    );
}