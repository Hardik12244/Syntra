import axios from "axios";
import { useEffect, useState } from "react";

export default function CrushActivity() {
  const [crushes, setCrushes] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/activity/crushes`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setCrushes(res.data);
      });
  }, []);

  return (
    <div className="space-y-3">
      {crushes.length === 0 && (
        <div className="text-gray-500">
          No crushes yet
        </div>
      )}

      {crushes.map((crush) => (
        <div
          key={crush._id}
          className="
            p-4
            rounded-3xl
            bg-pink-50
            border
            border-pink-100
          "
        >
          <div className="flex items-center gap-3">
            <img
              src={crush.sender.avatar}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <div className="font-semibold">
                {crush.sender.name}
              </div>

              <div className="text-sm text-gray-500">
                crushed on you ❤️
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}