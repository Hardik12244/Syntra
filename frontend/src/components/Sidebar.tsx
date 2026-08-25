import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type SidebarProps = {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
};

export default function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const [open, setOpen] = useState(true);

  const linkBase =
    "relative flex items-center justify-between px-4 py-2 rounded-xl text-md font-medium transition";

  const renderContent = (onItemClick?: () => void) => (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold text-pink-500">Syntra</h1>
        {onItemClick && (
          <button
            onClick={onItemClick}
            className="lg:hidden text-gray-400 hover:text-black p-1"
          >
            ✕
          </button>
        )}
      </div>

      <NavLink
        to="/"
        onClick={onItemClick}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? "text-black" : "text-gray-500"}`
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <motion.div
                layoutId="active-pill-feed"
                className="absolute inset-0 bg-gray-100 rounded-xl"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10 flex gap-2">Feed</span>
          </>
        )}
      </NavLink>

      <div className="mt-6">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between cursor-pointer px-2"
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

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-3 overflow-hidden relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100" />
              <div className="pl-4 flex flex-col gap-2">
                {[
                  { name: "Search", path: "/search" },
                  { name: "Connections", path: "/matches"},
                  { name: "Messages", path: "/messages"},
                ].map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={onItemClick}
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
                            layoutId={`active-pill-${item.name}`}
                            className="absolute inset-0 bg-gray-100 rounded-xl"
                          />
                        )}
                        <div className="relative z-10 flex items-center justify-between w-full">
                          <span>{item.name}</span>
                          
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

      <div className="mt-6 flex flex-col gap-2">
        <NavLink
          to="/profile"
          onClick={onItemClick}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? "text-black" : "text-gray-500"}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="active-pill-profile"
                  className="absolute inset-0 bg-gray-100 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">Profile</span>
            </>
          )}
        </NavLink>
      </div>
    </>
  );

  return (
    <>
      <div className="hidden lg:block h-full shrink-0 w-[260px] p-4 bg-[#f8fafc]">
        <div className="h-full rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-5 flex flex-col overflow-y-auto">
          {renderContent()}
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative z-10 w-[280px] max-w-[85vw] h-full p-4 bg-[#f8fafc]"
            >
              <div className="h-full rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-5 flex flex-col overflow-y-auto">
                {renderContent(onCloseMobile)}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}