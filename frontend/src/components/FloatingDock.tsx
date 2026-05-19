"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  socialLink?: boolean;
}

interface FloatingDockProps {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}

const playSound = () => {
  const audio = new Audio("/hover.mp3");
  audio.volume = 0.2;
  audio.play().catch(() => { });
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) => {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
      />

      <FloatingDockMobile
        items={items}
        className={mobileClassName}
      />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative block md:hidden ${className}`}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => {
              if (item.onClick) {
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      transition: {
                        delay: idx * 0.05,
                      },
                    }}
                    transition={{
                      delay:
                        (items.length - 1 - idx) *
                        0.05,
                    }}
                  >
                    <button
                      onClick={() => {
                        playSound();
                        item.onClick?.();
                      }}
                      className="
                        flex size-10 items-center
                        justify-center rounded-full
                        bg-slate-200/80 p-2.5
                      "
                    >
                      <div className="h-full w-full">
                        {item.icon}
                      </div>
                    </button>
                  </motion.div>
                );
              }

              const Wrapper: any = item.socialLink
                ? "a"
                : Link;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{
                    delay:
                      (items.length - 1 - idx) *
                      0.05,
                  }}
                >
                  <Wrapper
                    href={item.href}
                    to={item.href}
                    target={
                      item.socialLink
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      item.socialLink
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="
                      flex size-10 items-center
                      justify-center rounded-full
                      bg-slate-200/80 p-2.5
                    "
                  >
                    <div className="h-full w-full">
                      {item.icon}
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="
          flex size-10 items-center
          justify-center rounded-full
          bg-gray-50
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12h16" />
          <path d="M12 4v16" />
        </svg>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  let mouseX = useMotionValue(-9999);

  return (
    <motion.div
      onMouseMove={(e) =>
        mouseX.set(e.pageX)
      }
      onMouseLeave={() =>
        mouseX.set(-9999)
      }
      className={`
        mx-auto hidden h-16
  items-end gap-4 rounded-2xl
  bg-white/30
  px-4 pb-3
  backdrop-blur-2xl
  border border-white/40
  shadow-[0_8px_32px_rgba(31,38,135,0.12)]
  md:flex
        ${className}
      `}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          {...item}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
  socialLink,
}: {
  mouseX: any;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  socialLink?: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(
    mouseX,
    (val: number) => {

      const bounds =
        ref.current?.getBoundingClientRect();

      if (!bounds) return -9999;

      return (
        val -
        bounds.x -
        bounds.width / 2
      );
    }
  );

  let widthTransform = useTransform(
    distance,
    [-150, 0, 150],
    [40, 80, 40],
    {
      clamp: true,
    }
  );

  let heightTransform = useTransform(
    distance,
    [-150, 0, 150],
    [40, 80, 40],
    {
      clamp: true,
    }
  );

  let widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
    {
      clamp: true,
    }
  );

  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
    {
      clamp: true,
    }
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(
    widthTransformIcon,
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );

  let heightIcon = useSpring(
    heightTransformIcon,
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );

  const [hovered, setHovered] =
    useState(false);

  if (onClick) {
    return (
      <motion.div
        ref={ref}
        style={{
          width,
          height,
        }}
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() =>
          setHovered(false)
        }
        onClick={() => {
          playSound();
          onClick();
        }}
        className="
          relative flex aspect-square
          items-center justify-center
          rounded-full bg-white/60 backdrop-blur-xl border border-white/20
          cursor-pointer
        "
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                x: "-50%",
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: "-50%",
              }}
              exit={{
                opacity: 0,
                y: 2,
                x: "-50%",
              }}
              className="
                absolute -top-10 left-1/2
                w-fit rounded-md bg-slate-800
                px-2 py-0.5 text-xs
                font-medium text-white
              "
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{
            width: widthIcon,
            height: heightIcon,
          }}
          className="
            flex items-center justify-center
          "
        >
          {icon}
        </motion.div>
      </motion.div>
    );
  }

  const Wrapper: any = socialLink
    ? "a"
    : Link;

  return (
    <Wrapper
      href={href}
      to={href}
      target={
        socialLink ? "_blank" : undefined
      }
      rel={
        socialLink
          ? "noopener noreferrer"
          : undefined
      }
    >
      <motion.div
        ref={ref}
        style={{
          width,
          height,
        }}
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() =>
          setHovered(false)
        }
        className="
          relative flex aspect-square
          items-center justify-center
          rounded-full bg-white/60 backdrop-blur-xl border border-white/20
        "
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                x: "-50%",
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: "-50%",
              }}
              exit={{
                opacity: 0,
                y: 2,
                x: "-50%",
              }}
              className="
                absolute -top-10 left-1/2
                w-fit rounded-md bg-slate-800
                px-2 py-0.5 text-xs
                font-medium text-white
              "
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{
            width: widthIcon,
            height: heightIcon,
          }}
          className="
            flex items-center justify-center
          "
        >
          {icon}
        </motion.div>
      </motion.div>
    </Wrapper>
  );
}