"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Play, Sparkles } from "lucide-react";
import { soundEngine } from "../../lib/sound";

interface Scene01Props {
  onSkipIntro: () => void;
}

export default function Scene01Opening({ onSkipIntro }: Scene01Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 3D Camera Zoom-Through on Scroll: scales from 1x to 2.2x, translates Z forward, rotates slightly in 3D
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0]);
  const zPosition = useTransform(scrollYProgress, [0, 1], [0, 450]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const handleStartExperience = () => {
    soundEngine.playChime(587.33, 0.35);
    const scene2 = document.getElementById("scene-02");
    if (scene2) {
      scene2.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="scene-01"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#030305] px-6 text-white preserve-3d"
    >
      {/* Hollywood Anamorphic Letterbox Bars */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-10 md:h-14 bg-black/90 border-b border-[#d4af37]/20 z-40 backdrop-blur-md" />
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-10 md:h-14 bg-black/90 border-t border-[#d4af37]/20 z-40 backdrop-blur-md" />

      {/* Volumetric Anamorphic Horizontal Golden Lens Flare */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1.4, 1], opacity: [0, 0.9, 0.65] }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        className="pointer-events-none absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_50px_#d4af37]"
      />

      {/* Atmospheric Radial Golden Backlight */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-[#d4af37]/10 blur-[180px]"
      />

      {/* 3D Zoom Container Tied to Scroll Progress */}
      <motion.div
        style={{ scale, opacity, z: zPosition, rotateX }}
        className="relative z-10 max-w-5xl text-center preserve-3d"
      >
        {/* Film Production Slate Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-5 py-2 font-mono text-xs tracking-[0.35em] text-[#f3e5ab] backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          <Sparkles size={13} className="text-[#d4af37]" />
          <span>HOLLYWOOD 3D CINEMATIC EXPERIENCE</span>
        </motion.div>

        {/* Studio Credits */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 0.85, letterSpacing: "0.45em" }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="font-mono text-xs uppercase text-gray-400 sm:text-sm"
        >
          AN INDEPENDENT ENGINEERING ODYSSEY · PRESENTS
        </motion.p>

        {/* Monumental Cinematic Film Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="bg-gradient-to-b from-[#fdfcf7] via-[#e8e4dc] to-[#8a867c] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.25)]">
            THE 3D
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8214] bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(212,175,55,0.45)]">
            ODYSSEY
          </span>
        </motion.h1>

        {/* Opening Logline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mx-auto mt-7 max-w-xl font-mono text-sm leading-relaxed text-gray-300 sm:text-base"
        >
          Enter the multi-dimensional engineering portfolio of Firozkhan.
          <br />
          <span className="text-[#f3e5ab] font-semibold">
            Full-stack systems, offline-first architectures, and high-concurrency cloud solutions.
          </span>
        </motion.p>

        {/* Interactive Controls: Commence & Skip Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleStartExperience}
            className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-[#d4af37] bg-gradient-to-r from-[#d4af37]/20 to-[#aa8214]/20 px-8 py-4 font-mono text-sm font-bold tracking-wider text-[#f3e5ab] backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-[#d4af37]/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]"
          >
            <Play size={15} className="text-[#d4af37] fill-[#d4af37]" />
            <span>COMMENCE 3D ODYSSEY</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          <button
            onClick={() => {
              soundEngine.playTelemetry(500);
              onSkipIntro();
            }}
            className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-4 font-mono text-xs tracking-wider text-gray-400 hover:text-white hover:border-[#d4af37]/40 transition-all"
          >
            SKIP INTRO [ESC]
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 z-20 flex flex-col items-center gap-2 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
        onClick={handleStartExperience}
      >
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#d4af37]">
          SCROLL TO NAVIGATE 3D SPACE
        </span>
        <ChevronDown size={18} className="text-[#d4af37]" />
      </motion.div>
    </section>
  );
}
