import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Card = ({ children, className = "" }) => (
    <motion.div
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        className={`bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[32px] ${className}`}
    >
        {children}
    </motion.div>
);

const Reveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
        {children}
    </motion.div>
);

export default function LandingPage() {
    const googleRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll();
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    const features = [
        { title: "Daily Curated Matches", desc: "Get one meaningful connection every day based on your interests." },
        { title: "Interest-Based Matching", desc: "Connect with people who actually share your vibe and hobbies." },
        { title: "Guided Conversations", desc: "Never run out of things to say with smart AI-driven prompts." },
        { title: "Campus-Only Network", desc: "Meet verified students from your college — safe and relevant." },
    ];
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        const yOffset = -80;
        const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
    };
    return (
        <div className="bg-[#f8fafc] min-h-screen text-slate-900 font-sans selection:bg-pink-100 selection:text-pink-600">

            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-200/30 blur-[120px] rounded-full -z-10" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <motion.div
                    style={{ scale: heroScale }}
                    className="relative rounded-[48px] border border-white/40 bg-white/40 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.04)] overflow-hidden"
                >

                    <nav className="flex items-center justify-between px-10 py-6">
                        <motion.img
                            whileHover={{ rotate: -2 }}
                            src="ff.png"
                            className="h-16 w-40 cursor-pointer"
                        />

                        <div className="hidden md:flex gap-8 text-md font-semibold tracking-tight text-slate-600">
                            {["Home", "Testimonials", "Features", "Discover", "Stats", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    onClick={() => scrollTo(item)}
                                    className="hover:text-pink-500 transition-colors cursor-pointer"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        <motion.button
                            onClick={() => {
                                googleRef.current?.querySelector("div[role=button]")?.click();
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-2.5 rounded-full bg-pink-500 text-white text-md font-bold shadow-xl shadow-slate-200"
                        >
                            Get Started
                        </motion.button>

                        {/* hidden google button */}
                        <div ref={googleRef} className="hidden">
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    try {
                                        const res = await axios.post("http://localhost:3000/auth/google", {
                                            token: credentialResponse.credential,
                                        });

                                        localStorage.setItem("token", res.data.token);
                                        window.location.reload();
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                                onError={() => console.log("Login Failed")}
                            />
                        </div>
                    </nav>

                    <section id="Home" className="text-center pt-20 pb-10 px-6">
                        <Reveal>
                            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                                Find your vibe <br />
                                <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">across campus.</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="mt-6 text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                                The only dating app designed exclusively for students. Safe, verified, and actually fun.
                            </p>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)" }}
                                className="mt-10 bg-pink-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg"
                                onClick={() => {
                                googleRef.current?.querySelector("div[role=button]")?.click();
                            }}
                            >
                                Join the Waitlist
                            </motion.button>
                        </Reveal>

                        <Reveal delay={0.6}>
                            <div className="mt-16 flex justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="w-full max-w-4xl rounded-t-[40px] overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.1)] border-x border-t border-white"
                                >
                                    <img src="image.png" className="w-full h-full object-cover" alt="App Preview" />
                                </motion.div>
                            </div>
                        </Reveal>
                    </section>

                    <section id="Testimonials" className="py-24 px-10 bg-slate-50/50">
                        <div className="flex flex-wrap gap-8 justify-center">
                            {[1, 2, 3].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -15, rotateZ: i % 2 === 0 ? 1 : -1 }}
                                    className="w-[340px] bg-white p-6 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-slate-100"
                                >
                                    <div className="h-48 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 mb-6 relative overflow-hidden">
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                            Top Match
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-4 w-24 bg-slate-100 rounded-full" />
                                        <div className="h-2 w-full bg-slate-50 rounded-full" />
                                        <div className="flex gap-2">
                                            {[1, 2, 3].map(t => <div key={t} className="h-8 w-16 bg-pink-50 rounded-lg border border-pink-100" />)}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <section
                        id="features"
                        className="relative py-32 px-10 overflow-hidden bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/image copy 7.png')",
                            backgroundSize: "600px",
                        }}
                    >

                        {/* 🔥 overlay for readability */}
                        <div className="absolute inset-0 bg-white/80" />

                        {/* 🔥 floating glow */}
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-pink-200/30 blur-3xl rounded-full" />

                        <div className="relative z-10">

                            {/* HEADING */}
                            <Reveal>
                                <motion.h2
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="text-center text-5xl md:text-6xl font-bold mb-20 tracking-tight 
        bg-gradient-to-r from-slate-900 via-pink-500 to-rose-400 
        bg-clip-text text-transparent"
                                >
                                    Why Syntra?
                                </motion.h2>
                            </Reveal>

                            {/* GRID */}
                            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

                                {features.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: i * 0.15, duration: 0.6 }}
                                        whileHover={{ y: -12, scale: 1.02 }}
                                        className="bg-white/80 backdrop-blur-xl border border-white/20 
          shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[32px] p-10"
                                    >

                                        {/* ICON */}
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="w-12 h-12 bg-pink-500/10 rounded-2xl mb-6 flex items-center justify-center"
                                        >
                                            <div className="w-5 h-5 bg-pink-500 rounded-full" />
                                        </motion.div>

                                        {/* TITLE */}
                                        <h3 className="text-2xl font-bold mb-3">
                                            {item.title}
                                        </h3>

                                        {/* DESC */}
                                        <p className="text-slate-500 leading-relaxed font-medium">
                                            {item.desc}
                                        </p>

                                    </motion.div>
                                ))}

                            </div>
                        </div>
                    </section>

                    <section id="Stats" className="py-32 relative bg-slate-900 text-white overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[150px]" />
                        </div>

                        <div className="relative z-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
                            {[
                                { val: "100+", label: "Colleges" },
                                { val: "50k+", label: "Matches" },
                                { val: "24/7", label: "Moderation" }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <h4 className="text-6xl font-bold mb-2 text-pink-400">{stat.val}</h4>
                                    <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <footer id="Contact" className="bg-white border-t border-slate-100 p-12">
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                            <div className="max-w-xs">
                                <h2 className="text-3xl font-black italic text-pink-500 mb-4">Syntra.</h2>
                                <p className="text-slate-500 font-medium">Making campus life a bit more romantic and a lot more connected.</p>
                            </div>

                            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 flex-1 max-w-sm ml-auto">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Built by Hardik</p>
                                <div className="flex flex-col gap-3 space-y-3">
                                    <a href="https://x.com/Silent_twt_" target="_blank"><motion.button whileHover={{ x: 5 }} className="w-full flex text-xl text-left font-bold text-slate-700 hover:text-pink-500 transition"><img src="image copy 5.png" className="w-10 mr-1" alt="" /><span className="mt-1">Twitter</span></motion.button></a>
                                    <a href="https://www.linkedin.com/in/hardik-garg-837665244/" target="_blank"><motion.button whileHover={{ x: 5 }} className="w-full text-xl flex gap-x-2 text-left font-bold text-slate-700 hover:text-pink-500 transition"><img src="image copy 3.png" className="w-10" alt="" /><span className="mt-2">LinkedIn</span></motion.button></a>
                                    <a href="https://github.com/Hardik12244" target="_blank"><motion.button whileHover={{ x: 5 }} className="w-full flex text-xl text-left font-bold text-slate-700 hover:text-pink-500 transition"><img src="image copy 6.png" className="w-10 mr-2 " alt="" /><span className="mt-2">Github</span></motion.button></a>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 mt-10 pt-6">
                            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">

                                {/* LEFT */}
                                <p>
                                    © 2026 Syntra. All meeting links are encrypted and secure.
                                </p>

                                {/* RIGHT */}
                                <div className="flex items-center gap-6">

                                    <a href="#" className="hover:text-black transition">
                                        Privacy Policy
                                    </a>

                                    <a href="#" className="hover:text-black transition">
                                        Terms of Service
                                    </a>

                                    {/* STATUS BADGE */}
                                    <div className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs font-medium">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Systems Normal
                                    </div>

                                </div>

                            </div>
                        </div>
                    </footer>

                </motion.div>
            </div>
        </div>
    );
}