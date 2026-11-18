"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioConfig } from "@/app/lib/usePortfolioConfig";

export type ResumeRegion = "india" | "dubai";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRegion?: ResumeRegion;
}

interface ResumeDetails {
  id: ResumeRegion;
  label: string;
  flag: string;
  badge: string;
  title: string;
  subtitle: string;
  path: string;
  downloadFilename: string;
}

const RESUMES: Record<ResumeRegion, ResumeDetails> = {
  india: {
    id: "india",
    label: "India Resume",
    flag: "🇮🇳",
    badge: "INDIA EDITION",
    title: "FIROZKHAN · India Production Resume",
    subtitle: "Associate Software Engineer · SODISYS & Srishti Technopark",
    path: "/resume-india.pdf",
    downloadFilename: "Firozkhan_India_Resume.pdf",
  },
  dubai: {
    id: "dubai",
    label: "Dubai / UAE Resume",
    flag: "🇦🇪",
    badge: "DUBAI / UAE EDITION",
    title: "FIROZKHAN · Dubai / UAE Production Resume",
    subtitle: "Dubai, UAE · +971 58 826 2511 · Visit Visa (Immediate Joiner)",
    path: "/resume-dubai.pdf",
    downloadFilename: "Firozkhan_Dubai_UAE_Resume.pdf",
  },
};

export default function ResumeModal({
  isOpen,
  onClose,
  initialRegion = "india",
}: ResumeModalProps) {
  const { config } = usePortfolioConfig();
  const [activeRegion, setActiveRegion] = useState<ResumeRegion>(initialRegion);
  const [isMobile, setIsMobile] = useState(false);

  const currentResume = RESUMES[activeRegion];
  const dynamicPath =
    activeRegion === "india"
      ? config.resumes?.india?.url || currentResume.path
      : config.resumes?.dubai?.url || currentResume.path;
  const dynamicFilename =
    activeRegion === "india"
      ? config.resumes?.india?.filename || currentResume.downloadFilename
      : config.resumes?.dubai?.filename || currentResume.downloadFilename;
  useEffect(() => {
    if (isOpen) {
      setActiveRegion(initialRegion);
    }
  }, [isOpen, initialRegion]);

  // Handle Escape key and disable background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Detect mobile viewport width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", checkMobile);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden select-none">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-[#141414] border border-[#2e2e2e] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 flex flex-col overflow-hidden"
        >
          {/* ========================================================
              MODAL HEADER & REGION SELECTOR
          ======================================================== */}
          <div className="flex-none px-4 sm:px-6 py-3.5 bg-[#181818] border-b border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Left: Brand & Title */}
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-black text-[#e50914] font-netflix-title">
                F
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#e50914] tracking-wider">
                    {currentResume.badge}
                  </span>
                  <span className="text-white text-xs font-semibold hidden sm:inline">
                    •
                  </span>
                  <span className="text-xs text-[#a3a3a3] font-mono hidden sm:inline">
                    Verified Document
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white font-netflix-title uppercase tracking-wide leading-tight">
                  {currentResume.title}
                </h3>
              </div>
            </div>

            {/* Center: Resume Region Switcher Tabs */}
            <div className="flex items-center bg-[#0a0a0a] p-1 rounded-lg border border-[#2a2a2a] self-start sm:self-center">
              <button
                onClick={() => setActiveRegion("india")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeRegion === "india"
                  ? "bg-[#e50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.5)]"
                  : "text-[#a3a3a3] hover:text-white"
                  }`}
              >
                <span>🇮🇳</span>
                <span>India Resume</span>
              </button>
              <button
                onClick={() => setActiveRegion("dubai")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeRegion === "dubai"
                  ? "bg-[#e50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.5)]"
                  : "text-[#a3a3a3] hover:text-white"
                  }`}
              >
                <span>🇦🇪</span>
                <span>Dubai / UAE Resume</span>
              </button>
            </div>

            {/* Right: Actions & Close */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              {/* Download Action */}
              <a
                href={dynamicPath}
                download={dynamicFilename}
                className="px-3 py-1.5 rounded bg-[#222] hover:bg-[#2c2c2c] border border-[#3e3e3e] hover:border-[#e50914] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title={`Download ${currentResume.label}`}
              >
                <span>⬇</span>
                <span className="hidden md:inline">Download PDF</span>
              </a>

              {/* Open in New Tab Action */}
              <a
                href={dynamicPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-white hover:bg-neutral-200 text-black text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title="Open Full PDF in New Tab"
              >
                <span>↗</span>
                <span className="hidden md:inline">Open Full Tab</span>
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#e50914] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer ml-1"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* ========================================================
              PDF PREVIEW CANVAS / EMBED
          ======================================================== */}
          <div className="relative flex-1 bg-[#0a0a0a] w-full h-full overflow-hidden flex flex-col items-center justify-center">
            {/* Embedded Native PDF Viewer */}
            <iframe
              key={dynamicPath}
              src={`${dynamicPath}#toolbar=1&navpanes=0&scrollbar=1`}
              title={currentResume.title}
              className="w-full h-full border-0 bg-[#0a0a0a]"
            />

            {/* Mobile Fallback Banner (for browsers that don't inline PDF well) */}
            {isMobile && (
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#141414]/95 border border-[#333] shadow-2xl flex items-center justify-between gap-2 z-20 backdrop-blur">
                <div className="text-[11px] font-mono text-[#a3a3a3] leading-tight">
                  <span className="text-white font-bold block">Mobile PDF Viewing</span>
                  Tap to view with native zoom & full page rendering.
                </div>
                <a
                  href={currentResume.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#e50914] hover:bg-[#f40612] text-white font-bold text-xs uppercase tracking-wider flex-none flex items-center gap-1 shadow-md"
                >
                  <span>Open Full PDF ↗</span>
                </a>
              </div>
            )}
          </div>

          {/* ========================================================
              MODAL FOOTER STATUS BAR
          ======================================================== */}
          <div className="flex-none px-4 sm:px-6 py-2.5 bg-[#111] border-t border-[#262626] flex items-center justify-between text-xs font-mono text-[#737373]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-white font-semibold">{currentResume.label}</span>
              <span className="hidden sm:inline text-[#444]">•</span>
              <span className="hidden sm:inline text-[#888]">{currentResume.subtitle}</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="hidden md:inline">Press [Esc] to exit</span>
              <span className="text-white/60">File: {currentResume.downloadFilename}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

