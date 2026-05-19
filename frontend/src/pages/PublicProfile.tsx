import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FloatingDock } from "../components/FloatingDock";
import { Home, MessageCircle, UserPlus, Star, Heart } from "lucide-react";
import { BoatAnimation } from "../components/BoatAnimation";
import { motion, AnimatePresence } from "framer-motion";

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
  const [crushed, setCrushed] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showMatch, setShowMatch] = useState(false);

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


  const handleCrush = async () => {
    try {

      const res = await axios.post(
        `http://localhost:3000/crush/toggle`,
        { receiver: user._id },
        {
          withCredentials: true,
        }
      );

      setCrushed(res.data.crushed);
      if (res.data.matched) {
        setShowMatch(true);

        setTimeout(() => {
          setShowMatch(false);
        }, 3500);
      }
    } catch (error) {
      console.log(error);
    }

  }

  const dockItems = [
    {
      title: "Home",
      icon: <Home size={20} />,
      href: "/",
    },
    {
      title: "Crush",
      icon: (
        <div className="relative flex items-center justify-center">
          {crushed && (
            <div
              className="
          absolute
          w-11 h-11
          rounded-full
          bg-gradient-to-r
          from-pink-400
          to-fuchsia-500
          blur-md
          opacity-50
          animate-pulse
        "
            />
          )}

          {crushed && (
            <div
              className="
          absolute
          w-10 h-10
          rounded-full
          border
          border-pink-400/50
          animate-spin
        "
              style={{
                animationDuration: "6s",
              }}
            />
          )}

          <div
            className={`
        relative z-10
        rounded-full
        p-2
        transition-all duration-500

        ${crushed
                ? `
              bg-white/20
              backdrop-blur-xl
              scale-110
              shadow-lg shadow-pink-500/20
            `
                : ""
              }
      `}
          >
            <Heart
              size={20}
              className={`
          transition-all duration-300

          ${crushed
                  ? `
                text-pink-500
                drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]
              `
                  : "text-gray-600"
                }
        `}
            />
          </div>

        </div>
      ),
      onClick: handleCrush,
    },
    {
      title: "Chat",
      icon: <UserPlus size={20} />,
      // onClick: handleChat,
    },
    {
      title: "View Posts",
      icon: <Star size={20} />,
      onClick: () => setShowPosts((prev) => !prev),
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
    <>

      <AnimatePresence>

        {showMatch && (

          <motion.div

            initial={{
              opacity: 0,
              y: -40,
              scale: 0.8,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              y: -20,
              scale: 0.8,
            }}

            className="
        fixed top-8 left-1/2
        -translate-x-1/2
        z-[999]

        px-8 py-5
        rounded-3xl

        bg-white/40
        backdrop-blur-2xl

        border border-pink-200/50

        shadow-[0_8px_40px_rgba(236,72,153,0.25)]

        flex items-center gap-4
      "
          >

            {/* GLOW */}

            <div className="
        absolute inset-0
        rounded-3xl
        bg-gradient-to-r
        from-pink-400/10
        to-fuchsia-400/10
      " />

            {/* HEART */}

            <div className="
        relative z-10
        w-14 h-14
        rounded-full
        bg-pink-500/15
        flex items-center
        justify-center
      ">

              <Heart
                className="
            text-pink-500
            drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]
          "
                fill="rgba(236,72,153,0.25)"
              />

            </div>

            {/* TEXT */}

            <div className="relative z-10">

              <h2 className="
          text-xl font-semibold
          text-gray-800
        ">
                It’s a Match ✨
              </h2>

              <p className="
          text-sm text-gray-500 mt-1
        ">
                You both crushed each other
              </p>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

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
    </>

  );
}