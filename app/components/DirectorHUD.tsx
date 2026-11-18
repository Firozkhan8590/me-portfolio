"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "../lib/sound";
import { Volume2, VolumeX, FileDown, Radio, Menu, X, ArrowUpRight, Film } from "lucide-react";

interface DirectorHUDProps {
  activeScene: string;
  scrollProgress: number;
}

const scenes = [
  { id: "scene-01", label: "01 CREDITS", title: "Opening" },
  { id: "scene-02", label: "02 TITLE", title: "Main Title" },
  { id: "scene-03", label: "03 IDENTITY", title: "Dossier" },
  { id: "scene-04", label: "04 SYSTEMS", title: "Tech Matrix" },
  { id: "scene-05", label: "05 WORLDS", title: "Project Showcases" },
  { id: "scene-06", label: "06 JOURNEY", title: "Timeline" },
  { id: "scene-07", label: "07 TRANSMIT", title: "The Next Chapter" },
];

export default function DirectorHUD({ activeScene, scrollProgress }: DirectorHUDProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(soundEngine.getMuted());
  }, []);

  const handleSoundToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (id: string) => {
    soundEngine.playTelemetry(820);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Convert scroll progress (0 to 1) into cinematic film timecode
  const totalFrames = Math.floor(scrollProgress * 2400); // 24 FPS standard
  const mins = String(Math.floor(totalFrames / (24 * 60))).padStart(2, "0");
  const secs = String(Math.floor((totalFrames % (24 * 60)) / 24)).padStart(2, "0");
  const frames = String(totalFrames % 24).padStart(2, "0");
  const timecode = `00:${mins}:${secs}:${frames}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top Glass Telemetry Bar */}
      <div className="mx-auto max-w-[1650px] px-4 py-3.5 sm:px-6">
        <div className="pointer-events-auto flex items-center justify-between rounded-2xl border border-white/10 bg-[#09090d]/85 px-4 py-2.5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick("scene-01")}
              className="flex items-center gap-2.5 text-left group"
              aria-label="Return to scene 01"
            >
              <span className="flex h-2.5 w-2.5 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37] animate-pulse" />
              </span>
              <span className="font-mono text-sm font-bold tracking-widest text-[#fdfcf7] group-hover:text-[#f3e5ab] transition-colors">
                FIROZKHAN
              </span>
              <span className="hidden sm:inline rounded border border-[#d4af37]/30 bg-[#d4af37]/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-[#f3e5ab]">
                3D CINEMA CUT
              </span>
            </button>

            {/* Timecode readout */}
            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4 font-mono text-xs text-gray-400">
              <span className="text-[10px] uppercase text-[#d4af37]/80">TIMECODE:</span>
              <span className="text-[#f3e5ab] font-semibold">{timecode}</span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Scene navigation">
            {scenes.map((scene) => {
              const isActive = activeScene === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => handleNavClick(scene.id)}
                  className={`relative rounded-lg px-2.5 py-1.5 font-mono text-xs tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-[#f3e5ab] bg-[#d4af37]/15 shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {scene.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeSceneIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#d4af37] shadow-[0_0_8px_#d4af37]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Sound, Resume, Contact & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs tracking-wider transition-all duration-300 ${
                isMuted
                  ? "border-white/15 bg-white/5 text-gray-400 hover:border-[#d4af37]/40 hover:text-gray-200"
                  : "border-[#d4af37]/60 bg-[#d4af37]/20 text-[#f3e5ab] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
              }`}
              title={isMuted ? "Enable Cinematic Atmosphere" : "Mute Audio"}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="animate-pulse text-[#d4af37]" />}
              <span className="hidden sm:inline">{isMuted ? "SOUND: OFF" : "SOUND: ON"}</span>
            </button>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              download
              onClick={() => soundEngine.playTelemetry(900)}
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1.5 font-mono text-xs text-[#f3e5ab] transition-all duration-300 hover:bg-[#d4af37]/25 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <FileDown size={14} />
              <span>DOSSIER / CV</span>
            </a>

            {/* Contact Trigger */}
            <button
              onClick={() => handleNavClick("scene-07")}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#aa8214] px-3.5 py-1.5 font-mono text-xs font-semibold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
            >
              <Radio size={13} className="animate-ping" />
              <span>TRANSMIT</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                soundEngine.playTelemetry(600);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-gray-300"
              aria-label="Open Scene Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Global Cinematic Timeline Scrollbar Progress */}
        <div className="pointer-events-none mt-1 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#785a14] via-[#d4af37] to-[#f3e5ab] shadow-[0_0_10px_#d4af37]"
            style={{ width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%` }}
          />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pointer-events-auto mx-4 mt-2 rounded-2xl border border-[#d4af37]/30 bg-[#0a0a0f]/95 p-5 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.95)] lg:hidden"
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#d4af37]">
                SCENE SELECTOR // 3D TIMELINE
              </span>
              <span className="font-mono text-xs text-gray-400">TC: {timecode}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => handleNavClick(scene.id)}
                  className={`flex flex-col rounded-xl border p-2.5 text-left transition-all ${
                    activeScene === scene.id
                      ? "border-[#d4af37] bg-[#d4af37]/20 text-[#f3e5ab]"
                      : "border-white/10 bg-white/[0.02] text-gray-300 hover:border-[#d4af37]/40"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#d4af37]/80">{scene.label}</span>
                  <span className="text-xs font-semibold mt-0.5">{scene.title}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex gap-3 border-t border-white/10 pt-4">
              <a
                href="/resume.pdf"
                download
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 py-2.5 text-xs font-medium text-[#f3e5ab]"
              >
                <FileDown size={14} /> Download CV
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=firoznissar@gmail.com&su=Project%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-2.5 text-xs font-medium text-white"
              >
                Email Direct <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
