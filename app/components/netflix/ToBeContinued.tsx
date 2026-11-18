"use client";

import React from "react";

interface ToBeContinuedProps {
  onScrollToTop: () => void;
  onStartProject: () => void;
  onOpenResume?: (region?: "india" | "dubai") => void;
}

export default function ToBeContinued({
  onScrollToTop,
  onStartProject,
  onOpenResume,
}: ToBeContinuedProps) {
  return (
    <footer className="relative bg-[#060606] border-t border-[#1a1a1a] pt-16 pb-12 overflow-hidden">
      {/* Background ambient red lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#e50914]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Next episode teaser */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#e50914] uppercase">
            THE NEXT EPISODE
          </span>
        </div>

        {/* Big Finale Typography */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase font-netflix-title tracking-tight leading-none">
          TO BE CONTINUED...
        </h2>

        <p className="mt-4 text-xl sm:text-2xl font-black text-[#a3a3a3] uppercase font-netflix-title tracking-wide">
          FIROZKHAN
        </p>

        <p className="mt-2 text-xs sm:text-sm text-[#737373] max-w-md mx-auto font-mono">
          Building Digital Experiences That Solve Real Problems. Ready to engineer the next milestone together.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={onStartProject}
            className="px-6 py-2.5 rounded bg-[#e50914] hover:bg-[#f40612] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-all cursor-pointer"
          >
            Start a Project ✉
          </button>

          {/* Open Resume Modal Button */}
          <button
            onClick={() => onOpenResume?.()}
            className="px-6 py-2.5 rounded bg-[#1c1c1c] hover:bg-[#252525] border border-[#333] hover:border-[#e50914] text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
          >
            <span>📄</span>
            <span>Resume (India / Dubai)</span>
          </button>

          <button
            onClick={onScrollToTop}
            className="px-4 py-2.5 rounded bg-transparent hover:bg-white/5 text-[#a3a3a3] hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Back to Top ▲
          </button>
        </div>

        {/* Social channels bar */}
        <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-[#1f1f1f] text-xs font-mono text-[#a3a3a3]">
          <a
            href="https://github.com/Firozkhan8590"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://www.linkedin.com/in/firoz-khan-686308313/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href="https://wa.me/918590219012?text=Hi%20Firoz%2C%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            WhatsApp
          </a>
          <span>•</span>
          <a
            href="mailto:firoznissar@gmail.com"
            className="hover:text-white transition-colors"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-[10px] font-mono text-[#525252]">
          © 2026 FIROZKHAN · ALL RIGHTS RESERVED · A NETFLIX-INSPIRED ORIGINAL
        </p>
      </div>
    </footer>
  );
}
