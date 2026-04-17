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

export default function OnBoarding({ setUser }: any) {
  const [formData, setFormData] = useState({
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
      const res = await axios.put(
        "http://localhost:3000/user/profile",
        {
          phoneNo: formData.phoneNo,
          college: formData.college,
          gender: formData.gender || undefined,
          dateOfBirth: formData.dateOfBirth || undefined,
          interests: formData.interests,
        },
        { withCredentials: true }
      );

      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Complete your profile 
        </h1>

        <div className="space-y-6">

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
                      ${
                        isSelected
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