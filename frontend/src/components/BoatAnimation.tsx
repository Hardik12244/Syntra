import Lottie from "lottie-react";
import movingBoatAnimation from "../assets/moana.json"; 
import { motion, AnimatePresence } from "framer-motion";

export const BoatAnimation = () => {

    const LottiePlayer = (Lottie as any).default || Lottie;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ ease: "easeInOut", duration: 1.2, delay: 0.2 }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                className="w-full max-w-3xl mx-auto flex justify-center"
            >
                <LottiePlayer 
                    animationData={movingBoatAnimation} 
                    loop={true}
                    style={{ height: 200 }} 
                />
            </motion.div>
        </AnimatePresence >
    );
}