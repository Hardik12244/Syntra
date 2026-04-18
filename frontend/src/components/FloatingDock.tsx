import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"; 

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  socialLink?: boolean;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </motion.div>
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

  const playSound = () => {
    const audio = new Audio("/Users/hardik/Coding/Projects/Syntra/frontend/src/sounds/pop.mp3");
    audio.play().catch(() => {}); 
  };

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 right-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => {
              const Wrapper: any = item.socialLink ? "a" : Link;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: { delay: idx * 0.05 },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <Wrapper
                    to={!item.socialLink ? item.href : undefined}
                    href={item.socialLink ? item.href : undefined}
                    {...(item.socialLink
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onClick={playSound}
                    className="flex size-10 items-center justify-center rounded-full bg-slate-200/80 p-2.5 "
                  >
                    <div className="h-full w-full">{item.icon}</div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          setOpen(!open);
          playSound();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/80 "
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-slate-600 " />
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
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-slate-100 px-4 pb-3 md:flex ",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  socialLink,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  socialLink?: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  let widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);
  const Wrapper: any = socialLink ? "a" : Link;

  const playSound = () => {
    const audio = new Audio("/sounds/pop.mp3");
    audio.play().catch(() => {});
  };

  return (
    <Wrapper
      to={!socialLink ? href : undefined}
      href={socialLink ? href : undefined}
      {...(socialLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={playSound}
        className="relative flex aspect-square items-center justify-center rounded-full bg-[#93d1d8] "
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-10 left-1/2 w-fit rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-white "
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Wrapper>
  );
}