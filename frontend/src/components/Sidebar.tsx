import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const linkBase =
    "relative flex items-center justify-between px-4 py-2 rounded-xl text-md font-medium transition";

  return (
    <div className="h-screen sticky top-0 w-[260px] p-4 bg-[#f8fafc]">

      <div className="h-full rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-5 flex flex-col">

        {/* LOGO */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-pink-500">Syntra</h1>
        </div>

        {/* FEED */}
        <NavLink to="/" className={({ isActive }) =>
          `${linkBase} ${isActive ? "text-black" : "text-gray-500"}`
        }>
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-gray-100 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10 flex gap-2">Feed</span>
            </>
          )}
        </NavLink>

        {/* CONNECTIONS */}
        <div className="mt-6">

          {/* HEADER */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between cursor-pointer px-2 "
          >
            <div className="flex gap-2 font-semibold text-gray-500">
              Connections
            </div>

            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ⌄
            </motion.span>
          </div>

          {/* SUB MENU */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-3 overflow-hidden relative"
              >

                {/* vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100" />

                <div className="pl-4 flex flex-col gap-2">

                  {[
                    { name: "Search", path: "/search" },
                    { name: "Matches", path: "/matches", badge: "3" },
                    { name: "Messages", path: "/messages", badge: "8" },
                  ].map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `${linkBase} ${
                          isActive ? "text-black" : "text-gray-500"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.div
                              layoutId="active-pill"
                              className="absolute inset-0 bg-gray-100 rounded-xl"
                            />
                          )}

                          <div className="relative z-10 flex items-center justify-between w-full">

                            {/* TEXT */}
                            <span>{item.name}</span>

                            {/* BADGE */}
                            {item.badge && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-md ${
                                  item.name === "Matches"
                                    ? "bg-pink-200 text-pink-700"
                                    : "bg-green-200 text-green-700"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </NavLink>
                  ))}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* OTHER LINKS */}
        <div className="mt-6 flex flex-col gap-2">

          <NavLink
  to="/profile"
  className={({ isActive }) =>
    `${linkBase} ${isActive ? "text-black" : "text-gray-500"}`
  }
>
  {({ isActive }) => (
    <>
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 bg-gray-100 rounded-xl"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      <span className="relative z-10">Profile</span>
    </>
  )}
</NavLink>

<NavLink
  to="/settings"
  className={({ isActive }) =>
    `${linkBase} ${isActive ? "text-black" : "text-gray-500"}`
  }
>
  {({ isActive }) => (
    <>
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 bg-gray-100 rounded-xl"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      <span className="relative z-10">Settings</span>
    </>
  )}
</NavLink>

        </div>

      </div>
    </div>
  );
}