"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProfileRole } from "./WhosWatching";

interface NetflixNavbarProps {
  currentProfile: ProfileRole;
  onSwitchProfile: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume: (region?: "india" | "dubai") => void;
}

export default function NetflixNavbar({
  currentProfile,
  onSwitchProfile,
  onNavigate,
  onOpenResume,
}: NetflixNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Top Picks", id: "top-picks" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  const getProfileBadge = () => {
    switch (currentProfile) {
      case "recruiter":
        return {
          label: "Recruiter",
          icon: "R",
          bg: "from-sky-600 to-blue-900",
        };
      case "developer":
        return {
          label: "Developer",
          icon: "</>",
          bg: "from-emerald-600 to-teal-950",
        };
      case "client":
        return {
          label: "Client",
          icon: "✦",
          bg: "from-amber-600 to-orange-950",
        };
      case "main":
      default:
        return {
          label: "FIROZKHAN",
          icon: "F",
          bg: "from-red-600 to-red-950",
        };
    }
  };

  const profile = getProfileBadge();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled
          ? "bg-[#080808]/95 backdrop-blur-md shadow-lg shadow-black/60 border-b border-[#1f1f1f]/50 py-3"
          : "bg-gradient-to-b from-[#080808]/90 via-[#080808]/40 to-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Netflix-Style Brand Logo */}
        <div className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => onNavigate("hero")}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="text-2xl sm:text-3xl font-black text-[#e50914] tracking-tighter uppercase font-netflix-title drop-shadow-[0_0_15px_rgba(229,9,20,0.6)] group-hover:scale-105 transition-transform">
              F
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-sm sm:text-base font-extrabold text-white tracking-widest uppercase font-netflix-title">
                SERIES
              </span>
              <span className="text-[8px] font-mono tracking-wider text-[#a3a3a3] uppercase">
                FIROZKHAN
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-[#a3a3a3] hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            {/* Resume Trigger in Navigation */}
            <button
              onClick={() => onOpenResume()}
              className="text-[#e50914] hover:text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>📄</span>
              <span>Resume</span>
            </button>
          </div>
        </div>

        {/* Right: CTAs and Profile Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Quick Resume Button */}
          <button
            onClick={() => onOpenResume()}
            className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-semibold tracking-wider text-white bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-[#3e3e3e] hover:border-[#e50914] rounded transition-all cursor-pointer"
          >
            <span>📄</span>
            <span className="ml-1.5">Resume (India / Dubai)</span>
          </button>

          <button
            onClick={() => onNavigate("services")}
            className="hidden lg:inline-flex items-center px-3.5 py-1.5 text-xs font-semibold tracking-wider text-white bg-[#e50914] hover:bg-[#f40612] rounded shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
          >
            Start a Project
          </button>

          {/* Profile Switcher Capsule */}
          <button
            onClick={onSwitchProfile}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#141414] border border-[#2e2e2e] hover:border-[#e50914] transition-all cursor-pointer group"
            title="Click to Switch Profile"
          >
            <div
              className={`w-7 h-7 rounded overflow-hidden relative flex items-center justify-center bg-gradient-to-br ${profile.bg} text-white font-mono font-bold text-xs shadow-inner`}
            >
              {currentProfile === "main" ? (
                <Image
                  src="/profile.jpeg"
                  alt="Profile"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              ) : (
                profile.icon
              )}
            </div>
            <div className="hidden lg:flex flex-col text-left leading-none">
              <span className="text-[10px] text-[#737373] uppercase tracking-wider">
                Watching as
              </span>
              <span className="text-xs font-bold text-white group-hover:text-[#e50914] transition-colors">
                {profile.label}
              </span>
            </div>
            <span className="text-[10px] text-[#737373] group-hover:text-white transition-colors">
              ▼
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#a3a3a3] hover:text-white focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0e0e] border-b border-[#2e2e2e] px-4 pt-3 pb-5 mt-2 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-[#a3a3a3] hover:text-white hover:pl-2 transition-all font-medium border-b border-[#1a1a1a]"
            >
              {link.label}
            </button>
          ))}

          {/* Mobile Resume Link */}
          <button
            onClick={() => {
              onOpenResume();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-[#e50914] hover:text-white hover:pl-2 transition-all font-bold border-b border-[#1a1a1a]"
          >
            📄 View Resumes (India & Dubai)
          </button>

          <button
            onClick={() => {
              onNavigate("services");
              setMobileMenuOpen(false);
            }}
            className="w-full mt-3 py-2 text-xs font-bold uppercase tracking-wider text-center text-white bg-[#e50914] rounded"
          >
            Start a Project
          </button>
        </div>
      )}
    </nav>
  );
}
