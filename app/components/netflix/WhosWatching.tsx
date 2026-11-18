"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export type ProfileRole = "main" | "recruiter" | "developer" | "client";

interface WhosWatchingProps {
  onSelectProfile: (role: ProfileRole) => void;
  onDirectEnter: () => void;
}

interface ProfileOption {
  id: ProfileRole;
  name: string;
  badge?: string;
  tagline: string;
  avatarType: "image" | "icon";
  avatarBg: string;
  borderColor: string;
  icon?: string;
}

const PROFILES: ProfileOption[] = [
  {
    id: "main",
    name: "FIROZKHAN",
    badge: "MAIN",
    tagline: "The full series, in order",
    avatarType: "image",
    avatarBg: "bg-red-950/40",
    borderColor: "hover:border-[#e50914]",
  },
  {
    id: "recruiter",
    name: "Recruiter",
    tagline: "Resume, achievements & skills first",
    avatarType: "icon",
    icon: "R",
    avatarBg: "bg-gradient-to-br from-sky-600 to-blue-900",
    borderColor: "hover:border-sky-400",
  },
  {
    id: "developer",
    name: "Developer",
    tagline: "Projects, stack & GitHub first",
    avatarType: "icon",
    icon: "</>",
    avatarBg: "bg-gradient-to-br from-emerald-600 to-teal-950",
    borderColor: "hover:border-emerald-400",
  },
  {
    id: "client",
    name: "Client",
    tagline: "Services, deliverables & enquiry first",
    avatarType: "icon",
    icon: "✦",
    avatarBg: "bg-gradient-to-br from-amber-600 to-orange-950",
    borderColor: "hover:border-amber-400",
  },
];

export default function WhosWatching({
  onSelectProfile,
  onDirectEnter,
}: WhosWatchingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#080808] px-4 py-8 overflow-y-auto select-none"
    >
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-950/15 blur-[160px] pointer-events-none" />

      {/* Top right direct bypass / skip */}
      <button
        onClick={onDirectEnter}
        className="absolute top-6 right-6 sm:top-8 sm:right-10 text-xs sm:text-sm font-semibold tracking-wider text-[#a3a3a3] uppercase border border-[#2e2e2e] bg-[#141414]/90 px-4 py-2 rounded hover:text-white hover:border-[#e50914] transition-all flex items-center gap-2 group"
      >
        <span>Enter Directly</span>
        <span className="text-[#e50914] group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </button>

      {/* Headline */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f5f5]">
          Who&apos;s watching?
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[#a3a3a3] font-medium tracking-wide">
          Select a viewing profile to customize your portfolio experience.
        </p>
      </motion.div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl w-full z-10 px-2">
        {PROFILES.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
            onClick={() => onSelectProfile(profile.id)}
            className="group flex flex-col items-center cursor-pointer text-center"
          >
            {/* Avatar Box */}
            <div
              className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${profile.borderColor} ${profile.avatarBg} flex items-center justify-center`}
            >
              {profile.badge && (
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#e50914] text-white rounded">
                  {profile.badge}
                </div>
              )}

              {profile.avatarType === "image" ? (
                <Image
                  src="/profile.jpeg"
                  alt="FIROZKHAN"
                  fill
                  sizes="(max-width: 768px) 144px, 160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              ) : (
                <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white drop-shadow-md group-hover:scale-110 transition-transform">
                  {profile.icon}
                </span>
              )}

              {/* Hover overlay sheen */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
            </div>

            {/* Profile Label */}
            <span className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-[#a3a3a3] group-hover:text-white transition-colors tracking-wide">
              {profile.name}
            </span>

            {/* Subtitle Intent */}
            <span className="mt-1 text-[11px] sm:text-xs text-[#6e6e6e] group-hover:text-[#a3a3a3] transition-colors leading-tight max-w-[140px]">
              {profile.tagline}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Subtext description from reference video */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-10 sm:mt-14 text-center text-xs sm:text-sm text-[#737373] max-w-md px-4 font-mono leading-relaxed"
      >
        Every profile watches the same true story of{" "}
        <span className="text-white font-semibold">FIROZKHAN</span> — it only
        changes what plays first.
      </motion.p>

      {/* Circular Play Button */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        onClick={onDirectEnter}
        className="mt-6 w-12 h-12 rounded-full bg-[#e50914] hover:bg-[#f40612] text-white flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-110 transition-all cursor-pointer"
        title="Start Streaming"
      >
        <span className="translate-x-0.5 text-lg">▶</span>
      </motion.button>
    </motion.div>
  );
}

