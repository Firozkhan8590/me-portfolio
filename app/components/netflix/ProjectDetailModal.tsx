"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectData {
  id: string;
  title: string;
  categoryTag: string;
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  keyFeatures: string[];
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  statusBadge?: string;
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#141414] border border-[#2e2e2e] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Banner / Primary Screenshot */}
          <div className="relative w-full h-56 sm:h-72 bg-[#080808] border-b border-[#2e2e2e] overflow-hidden">
            {project.screenshots && project.screenshots.length > 0 ? (
              <Image
                src={project.screenshots[0]}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover object-top opacity-90"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-950/40 via-stone-900 to-[#141414]">
                <span className="text-4xl sm:text-6xl font-black text-white/10 uppercase font-netflix-title">
                  {project.title}
                </span>
              </div>
            )}

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#e50914] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Title on Banner */}
            <div className="absolute bottom-4 left-6 right-6 z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#e50914] bg-black/60 px-2 py-0.5 rounded border border-[#e50914]/40">
                {project.categoryTag}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-netflix-title uppercase tracking-wide mt-1.5 drop-shadow-md">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Meta row & CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#262626]">
              <div className="flex items-center gap-2">
                {project.statusBadge && (
                  <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-emerald-950/60 border border-emerald-600/40 text-emerald-400">
                    {project.statusBadge}
                  </span>
                )}
                {project.badge && (
                  <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-red-950/60 border border-red-600/40 text-red-300">
                    {project.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 rounded flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span>▶</span>
                    <span>Live Preview</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#222] hover:bg-[#333] border border-[#3e3e3e] text-white rounded flex items-center gap-1.5 transition-all hover:border-[#e50914]"
                  >
                    <span>GitHub ↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-[#e50914] uppercase tracking-wider font-mono mb-2">
                Overview & Architecture
              </h3>
              <p className="text-sm sm:text-base text-[#cfcfcf] leading-relaxed">
                {project.fullDesc}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-sm font-bold text-[#e50914] uppercase tracking-wider font-mono mb-3">
                Core Production Workflows
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.keyFeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-[#a3a3a3] bg-[#1a1a1a] p-2.5 rounded border border-[#292929]"
                  >
                    <span className="text-[#e50914] font-bold mt-0.5">✔</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <h3 className="text-sm font-bold text-[#e50914] uppercase tracking-wider font-mono mb-3">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-[#1f1f1f] border border-[#333] text-white hover:border-[#e50914] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery Screenshots (if multiple exist) */}
            {project.screenshots && project.screenshots.length > 1 && (
              <div>
                <h3 className="text-sm font-bold text-[#e50914] uppercase tracking-wider font-mono mb-3">
                  Production Screenshots
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.screenshots.map((shot, idx) => (
                    <div
                      key={idx}
                      className="relative h-44 rounded-lg overflow-hidden border border-[#2e2e2e] bg-black"
                    >
                      <Image
                        src={shot}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

