"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProfileRole } from "./WhosWatching";
import { usePortfolioConfig } from "@/app/lib/usePortfolioConfig";

interface BillboardHeroProps {
  currentProfile: ProfileRole;
  onExploreWork: () => void;
  onStartProject: () => void;
  onOpenResume: (region?: "india" | "dubai") => void;
}

export default function BillboardHero({
  currentProfile,
  onExploreWork,
  onStartProject,
  onOpenResume,
}: BillboardHeroProps) {
  // Authoritative Backend-driven configuration
  const { config } = usePortfolioConfig();
  const { hero } = config;

  // Zoom-Out Hover Interaction State
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanHover(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  const handleMouseEnter = () => {
    if (canHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (canHover) setIsHovered(false);
  };

  const getProfileToast = () => {
    switch (currentProfile) {
      case "recruiter":
        return "Now watching as Recruiter — resume, achievements & skills first";
      case "developer":
        return "Now watching as Developer — architecture, schemas & GitHub first";
      case "client":
        return "Now watching as Client — freelance services & project enquiry first";
      case "main":
      default:
        return `Now watching as ${hero.name} — the complete series in chronological order`;
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Background cinematic radial spotlight */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#e50914]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Netflix Billboard Typography & CTAs (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Top Series Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-black text-[#e50914] font-netflix-title">
              F
            </span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#a3a3a3] uppercase font-netflix-title">
              SERIES
            </span>
          </div>

          {/* Main Display Title (Backend-driven) */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#f5f5f5] tracking-tight uppercase font-netflix-title leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {hero.name}
          </h1>

          {/* Sub-series Red Tag */}
          <div className="mt-2 text-sm sm:text-base font-extrabold tracking-[0.3em] text-[#e50914] uppercase font-netflix-title">
            THE SERIES
          </div>

          {/* Metadata Chips Bar (Backend-driven) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 text-xs font-semibold text-[#a3a3a3]">
            <span className="px-2 py-0.5 rounded border border-[#e50914] bg-[#e50914]/10 text-white font-mono font-bold text-[10px] sm:text-xs tracking-wider">
              {hero.availabilityBadge}
            </span>
            <span className="text-[#565656]">•</span>
            <span className="text-white font-medium">{hero.yearsActive}</span>
            <span className="text-[#565656]">•</span>
            <span className="px-1.5 py-0.5 rounded border border-[#3e3e3e] bg-[#1a1a1a] text-white text-[10px] font-mono font-bold">
              {hero.degree}
            </span>
            <span className="text-[#565656]">•</span>
            <span className="text-white font-medium">{hero.originalsCount}</span>
            <span className="text-[#565656]">•</span>
            <span className="text-[#a3a3a3]">{hero.techCount}</span>
          </div>

          {/* Professional Title (Backend-driven) */}
          <h2 className="mt-4 text-sm sm:text-base md:text-lg font-bold text-white tracking-wide uppercase font-mono">
            {hero.title}
          </h2>

          {/* Authentic Bio (Backend-driven) */}
          <p className="mt-3 text-sm sm:text-base text-[#a3a3a3] leading-relaxed max-w-2xl font-normal">
            {hero.bio}
          </p>

          {/* Action CTAs (Backend-driven) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
            {/* Play Intro / Explore Work */}
            {hero.actions?.exploreWork?.enabled && (
              <button
                onClick={onExploreWork}
                className="px-6 py-2.5 sm:px-8 sm:py-3 rounded bg-white hover:bg-[#e6e6e6] text-[#080808] font-bold text-sm sm:text-base tracking-wide flex items-center gap-2.5 shadow-lg shadow-white/10 hover:scale-105 transition-all cursor-pointer"
              >
                <span className="text-lg">▶</span>
                <span>{hero.actions.exploreWork.label}</span>
              </button>
            )}

            {/* View Resume Button (Opens Modal) */}
            {hero.actions?.viewResume?.enabled && (
              <button
                onClick={() => onOpenResume()}
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded bg-[#1f1f1f]/90 hover:bg-[#2a2a2a] border border-[#3e3e3e] text-[#f5f5f5] font-semibold text-sm sm:text-base tracking-wide flex items-center gap-2 transition-all hover:border-[#e50914] cursor-pointer group"
              >
                <span className="text-[#e50914] group-hover:scale-110 transition-transform">
                  📄
                </span>
                <span>{hero.actions.viewResume.label}</span>
              </button>
            )}

            {/* Start a Project Button */}
            {hero.actions?.startProject?.enabled && (
              <button
                onClick={onStartProject}
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded bg-[#e50914] hover:bg-[#f40612] text-white font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:scale-105 transition-all cursor-pointer"
              >
                <span>✉</span>
                <span>{hero.actions.startProject.label}</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Right Column: Hero Portrait as Completely Standalone Cinematic Photograph (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Subtle cinematic red lighting / aura directly behind the standalone portrait */}
          <div className="absolute w-[380px] h-[440px] sm:w-[480px] sm:h-[540px] lg:w-[520px] lg:h-[580px] bg-gradient-to-tr from-[#e50914]/20 via-[#e50914]/5 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />

          {/* Standalone Photograph Container — Zero Card Styling, Zero Borders, Zero Overlays */}
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] aspect-[1199/1312] flex items-center justify-center select-none cursor-pointer"
          >
            {/* Smooth Zoom-Out Motion Wrapper (700ms ease-in-out) */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{ scale: canHover && isHovered ? 0.92 : 1.08 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Primary High-Resolution Standalone Professional Portrait */}
              <Image
                src={hero.imageUrl || "/images/firozkhan-hero.png"}
                alt={hero.imageAlt || `${hero.name} - ${hero.title}`}
                fill
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 520px"
                priority
                className="object-contain object-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] pointer-events-none select-none"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Bottom Toast indicating active profile focus */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-4 right-4 sm:right-8 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#141414]/90 border border-[#2e2e2e] text-xs text-[#a3a3a3] font-mono backdrop-blur-md shadow-xl"
      >
        <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
        <span>{getProfileToast()}</span>
      </motion.div>
    </section>
  );
}
