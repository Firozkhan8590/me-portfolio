"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileDown, Terminal, MapPin, Sparkles, Layers } from "lucide-react";
import { soundEngine } from "../../lib/sound";

export default function Scene02Title() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3D Camera Depth: Elements scale and move through Z-layers as visitor scrolls
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.15]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -10]);
  const zPosition = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  const handleScrollTo = (id: string) => {
    soundEngine.playTelemetry(740);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="scene-02"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030305] px-6 py-28 text-white preserve-3d"
    >
      {/* 3D Viewport Horizon Guidelines */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute top-16 left-16 h-10 w-10 border-t-2 border-l-2 border-[#d4af37]" />
        <div className="absolute top-16 right-16 h-10 w-10 border-t-2 border-r-2 border-[#d4af37]" />
        <div className="absolute bottom-16 left-16 h-10 w-10 border-b-2 border-l-2 border-[#d4af37]" />
        <div className="absolute bottom-16 right-16 h-10 w-10 border-b-2 border-r-2 border-[#d4af37]" />
      </div>

      {/* Volumetric Warm Cinematic Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-[#d4af37]/8 blur-[200px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/3 h-[600px] w-[600px] rounded-full bg-[#785a14]/12 blur-[200px]" />

      {/* 3D Main Stage Content */}
      <motion.div
        style={{ scale, rotateX, z: zPosition, opacity }}
        className="relative z-10 mx-auto max-w-5xl text-center preserve-3d"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[#d4af37]/35 bg-[#121217]/90 px-6 py-2.5 backdrop-blur-xl shadow-[0_0_25px_rgba(212,175,55,0.15)]"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-[#f3e5ab]">
            SYSTEM STATUS: ONLINE
          </span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-gray-400">
            <MapPin size={13} className="text-[#d4af37]" /> TECHNOPARK, TRIVANDRUM
          </span>
        </motion.div>

        {/* Small Scene Identifier */}
        <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.55em] text-[#d4af37] mb-4">
          ACT II // MAIN TITLE
        </p>

        {/* Grand Title Reveal: FIROZKHAN */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl lg:text-[10rem] leading-none"
        >
          <span className="bg-gradient-to-b from-[#fdfcf7] via-[#f5f2eb] to-[#999487] bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            FIROZKHAN
          </span>
        </motion.h1>

        {/* Professional Designation: FULL STACK DEVELOPER | BACKEND ENGINEER */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-xl font-bold uppercase tracking-[0.3em] text-[#d4af37] sm:text-2xl md:text-3xl drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
        >
          FULL STACK DEVELOPER | BACKEND ENGINEER
        </motion.h2>

        {/* Tagline: Building Digital Experiences That Solve Real Problems. */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl font-light"
        >
          Building Digital Experiences That Solve Real Problems.
        </motion.p>

        {/* 3D Telemetry Float Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-[#16161c]/80 p-4 text-left shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <p className="font-mono text-[10px] uppercase text-gray-400">Core Backend</p>
            <p className="mt-1 font-mono text-xs font-semibold text-[#f3e5ab]">NestJS · Node.js · Django</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#16161c]/80 p-4 text-left shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <p className="font-mono text-[10px] uppercase text-gray-400">Databases</p>
            <p className="mt-1 font-mono text-xs font-semibold text-[#d4af37]">PostgreSQL · MySQL</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-white/10 bg-[#16161c]/80 p-4 text-left shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <p className="font-mono text-[10px] uppercase text-gray-400">Qualifications</p>
            <p className="mt-1 font-mono text-xs font-semibold text-gray-200">MCA · Postgrad 2025</p>
          </div>
        </motion.div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => handleScrollTo("scene-05")}
            className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#aa8214] px-9 py-4 font-mono text-sm font-bold text-black shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_55px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105"
          >
            <span>EXPLORE 3D SHOWCASES</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href="/resume.pdf"
            download
            onClick={() => soundEngine.playTelemetry(920)}
            className="flex items-center gap-2.5 rounded-full border border-[#d4af37]/40 bg-[#16161c]/80 px-8 py-4 font-mono text-sm font-semibold text-[#f3e5ab] backdrop-blur hover:border-[#d4af37] hover:bg-[#d4af37]/15 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-all duration-300 hover:scale-105"
          >
            <FileDown size={16} className="text-[#d4af37]" />
            <span>DOWNLOAD DOSSIER / CV</span>
          </a>

          <button
            onClick={() => handleScrollTo("scene-03")}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-4 font-mono text-xs text-gray-400 hover:text-white hover:border-white/30 transition-all"
          >
            <Terminal size={14} />
            <span>EXAMINE BIO [ACT III]</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
