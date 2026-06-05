import {
  AnimatePresence,
  motion,
} from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function ActivitySheet({
  open,
  onClose,
  title,
  children,
}: Props) {
  return (
    <AnimatePresence>

      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              bg-black/30
              backdrop-blur-sm
              z-50
            "
          />

          <motion.div
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 100,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
            }}
            className="
              fixed
              bottom-0
              left-1/2
              -translate-x-1/2
              w-full
              max-w-xl
              h-[75vh]
              bg-white
              rounded-t-[40px]
              z-50
              overflow-y-auto
              p-6
            "
          >
            <h2 className="
              text-xl
              font-bold
              mb-6
            ">
              {title}
            </h2>

            {children}
          </motion.div>
        </>
      )}

    </AnimatePresence>
  );
}