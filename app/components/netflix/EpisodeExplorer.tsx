"use client";

import React from "react";
import { motion } from "framer-motion";

interface EpisodeExplorerProps {
  onSelectEpisode: (sectionId: string) => void;
}

interface EpisodeCard {
  number: string;
  title: string;
  subtitle: string;
  targetId: string;
  gradient: string;
  badge: string;
}

const EPISODES: EpisodeCard[] = [
  {
    number: "EPISODE 01",
    title: "THE ARCHITECT",
    subtitle: "Experience Dossier, SODISYS & MCA",
    targetId: "experience",
    gradient: "from-purple-900/60 via-slate-900 to-[#121212]",
    badge: "CAREER ARC",
  },
  {
    number: "EPISODE 02",
    title: "CORE PLATFORMS",
    subtitle: "Maj & Sons, Ticket System & DineFlow",
    targetId: "projects",
    gradient: "from-red-950/70 via-stone-900 to-[#121212]",
    badge: "FEATURED SOFTWARE",
  },
  {
    number: "EPISODE 03",
    title: "TECH UNIVERSE",
    subtitle: "Node, Nest, Python, PostgreSQL & Next",
    targetId: "skills",
    gradient: "from-sky-950/70 via-slate-900 to-[#121212]",
    badge: "SYSTEM GENRES",
  },
  {
    number: "EPISODE 04",
    title: "FREELANCE ENGINE",
    subtitle: "Production Solutions & Instant Enquiry",
    targetId: "services",
    gradient: "from-amber-950/70 via-stone-900 to-[#121212]",
    badge: "COLLABORATE",
  },
];

export default function EpisodeExplorer({
  onSelectEpisode,
}: EpisodeExplorerProps) {
  return (
    <section className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
          <span>Continue Exploring</span>
          <span className="text-xs font-mono text-[#a3a3a3] font-normal">
            (Select an Episode)
          </span>
        </h3>
        <span className="text-xs text-[#737373] font-mono hidden sm:inline">
          Season 1 · 4 Episodes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EPISODES.map((ep, idx) => (
          <motion.div
            key={ep.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.5 }}
            onClick={() => onSelectEpisode(ep.targetId)}
            className={`group relative rounded-xl overflow-hidden border border-[#2e2e2e] bg-gradient-to-br ${ep.gradient} p-4 sm:p-5 cursor-pointer hover:border-[#e50914] hover:shadow-[0_10px_25px_rgba(229,9,20,0.25)] transition-all duration-300 hover:-translate-y-1`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#e50914] uppercase">
                {ep.number}
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono uppercase rounded bg-black/50 text-[#a3a3a3] border border-[#3e3e3e]">
                {ep.badge}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-base sm:text-lg font-black text-white font-netflix-title uppercase tracking-wide group-hover:text-[#e50914] transition-colors">
              {ep.title}
            </h4>

            {/* Subtitle */}
            <p className="mt-1 text-xs text-[#a3a3a3] line-clamp-2 leading-relaxed">
              {ep.subtitle}
            </p>

            {/* Play preview cue */}
            <div className="mt-4 flex items-center justify-between text-xs text-[#737373] group-hover:text-white transition-colors">
              <span className="font-mono text-[11px]">Jump to scene</span>
              <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#e50914] flex items-center justify-center text-white text-[10px] transition-colors">
                ▶
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

