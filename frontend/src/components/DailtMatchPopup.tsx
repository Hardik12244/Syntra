import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function DailyMatchPopup() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-8  top-1/2 -translate-y-1/2 z-50">

      <div className="relative flex items-center">

        <motion.div
          onClick={() => setOpen(!open)}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-4 h-4 rounded-full bg-pink-500 cursor-pointer z-20 relative"
        >
          <div className="absolute inset-0 rounded-full bg-pink-400 blur-md opacity-70" />
          <div className="absolute w-10 h-10 -left-3 -top-3 rounded-full bg-pink-500/20 blur-xl" />
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 12, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="absolute right-full mr-4 w-[300px]"
            >

              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-pink-400/20 to-rose-400/10 blur-2xl" />

              <div className="relative bg-white/90 backdrop-blur-xl rounded-[32px] 
              shadow-[0_30px_80px_rgba(0,0,0,0.15)] border border-white/40 overflow-hidden">

                <div className="h-48 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-pink-500">
                    💖 Daily Match
                  </div>
                </div>

                <div className="p-5 space-y-4">

                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">Ananya</h3>
                    <span className="text-sm text-gray-400">19</span>
                  </div>



<div className="flex flex-wrap gap-3">
  {["Music", "Tech", "Reading"].map((tag, i) => (
    <motion.button
      key={tag}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08 }}

      whileHover={{
        y: -2,
        scale: 1.04,
      }}

      whileTap={{ scale: 0.96 }}

      className="
        px-4 py-1.5 text-xs font-medium rounded-full
        
        bg-white/20 backdrop-blur-xl
        border border-white/30
        
        text-slate-700
        
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_8px_20px_rgba(0,0,0,0.08)]
        
        hover:bg-white/30
        hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_12px_25px_rgba(0,0,0,0.12)]
        
        transition-all duration-200
      "
    >
      {tag}
    </motion.button>
  ))}
</div>

                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold">
                    Start Conversation
                  </button>

                  <button
                    onClick={() => setOpen(false)}
                    className="w-full text-xs text-gray-400"
                  >
                    Maybe later
                  </button>

                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}