"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroHookProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function IntroHook({ onComplete, onSkip }: IntroHookProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Automatically advance after 2.8 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setVisible(false);
    onSkip();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] text-[#f5f5f5] select-none"
        >
          {/* Subtle ambient red spotlight */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#e50914]/10 blur-[140px] pointer-events-none" />

          {/* Skip Intro Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-8 z-10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#a3a3a3] uppercase border border-[#2e2e2e] bg-[#141414]/80 backdrop-blur hover:text-white hover:border-[#e50914] transition-all rounded"
          >
            Skip Intro ✕
          </button>

          {/* Glowing Netflix-style hook */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center px-4"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-[0.35em] text-[#e50914] uppercase mb-4 drop-shadow-[0_0_15px_rgba(229,9,20,0.8)]">
              A FIROZKHAN ORIGINAL
            </p>

            <motion.h1
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.35em", opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-[0.25em] drop-shadow-[0_2px_30px_rgba(255,255,255,0.15)] font-netflix-title"
            >
              FIROZKHAN
            </motion.h1>

            <p className="mt-4 text-xs sm:text-sm text-[#a3a3a3] tracking-[0.2em] uppercase font-mono">
              FULL STACK DEVELOPER · BACKEND ENGINEER
            </p>
          </motion.div>

          {/* Audio / visual pulse ring */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 w-12 h-12 rounded-full border border-[#e50914]/40 flex items-center justify-center"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#e50914] shadow-[0_0_12px_#e50914]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

