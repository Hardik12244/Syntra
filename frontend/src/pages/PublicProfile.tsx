import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FloatingDock } from "../components/FloatingDock";

import { Home, MessageCircle, UserPlus, Star } from "lucide-react";
import { BoatAnimation } from "../components/BoatAnimation";

type User = {
  _id: string;
  name: string;
  avatar: string;
  college?: string;
  age?: string,
  dateOfBirth: string,
  gender?: string,
  interests: string[];
};

export default function PublicProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:3000/user/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) {
    return (
      <div className="p-10 text-center text-gray-500 ">
        Loading profile...
      </div>
    );
  }

  const dockItems = [
    {
      title: "Home",
      icon: <Home size={20} />,
      href: "/",
    },
    {
      title: "Chat",
      icon: <MessageCircle size={20} />,
      href: "#",
    },
    {
      title: "Follow",
      icon: <UserPlus size={20} />,
      href: "#",
    },
    {
      title: "Connect",
      icon: <Star size={20} />,
      href: "#",
    },
  ];

  function getAge(dobString?: string) {
    if (!dobString) return null;

    const dob = new Date(dobString);

    if (isNaN(dob.getTime())) return null;

    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() &&
        today.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      <div className="flex-1 p-6">

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

          <div className="flex gap-8 items-start">

            <div className="flex flex-col gap-y-3">

              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                className="w-40 h-40 rounded-2xl object-cover shadow"
              />


              <div className="text-center mt-2">
                <p className="text-gray-500 text-sm">Followers</p>
                <p className="text-2xl font-bold">120</p>
                <button className="px-6 rounded-xl 
              bg-red-400 
              text-white shadow hover:scale-105 transition">
                  Follow
                </button>
              </div>
            </div>

            <div className="flex-1">

              <h1 className="text-3xl font-bold mb-2">
                {user.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {user.interests?.map((i, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full 
                  bg-pink-100 text-pink-600"
                  >
                    {i}
                  </span>
                ))}
              </div>

              <div className="flex gap-10 mt-10">

                <div>
                  <p className="text-gray-500 text-sm">College</p>
                  <p className="text-lg font-medium">
                    {user.college || "Not added"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Age</p>
                  <p className="text-lg font-medium">
                    {getAge(user.dateOfBirth) ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Gender</p>
                  <p className="text-lg font-medium">
                    {user.gender || "—"}
                  </p>
                </div>

              </div>
            </div>




          </div>

          <div className="flex justify-end -mt-24">
            <BoatAnimation />
          </div>

        </div>

        <div className="pt-6 flex justify-center">
          <FloatingDock items={dockItems} />
        </div>

      </div>


    </div>
  );
}