"use client";

import React, { useState } from "react";
import IntroHook from "./components/netflix/IntroHook";
import WhosWatching, { ProfileRole } from "./components/netflix/WhosWatching";
import NetflixNavbar from "./components/netflix/NetflixNavbar";
import BillboardHero from "./components/netflix/BillboardHero";
import EpisodeExplorer from "./components/netflix/EpisodeExplorer";
import TopPicksBillboard from "./components/netflix/TopPicksBillboard";
import ProjectCarousel from "./components/netflix/ProjectCarousel";
import SkillsUniverse from "./components/netflix/SkillsUniverse";
import ExperienceDossier from "./components/netflix/ExperienceDossier";
import FreelanceServices from "./components/netflix/FreelanceServices";
import ToBeContinued from "./components/netflix/ToBeContinued";
import ProjectDetailModal, {
  ProjectData,
} from "./components/netflix/ProjectDetailModal";
import ResumeModal, { ResumeRegion } from "./components/netflix/ResumeModal";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [showProfilePicker, setShowProfilePicker] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<ProfileRole>("main");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );

  // Resume Modal State
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeRegion, setResumeRegion] = useState<ResumeRegion>("india");

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handlers for Intro and Profile Selection
  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowProfilePicker(true);
  };

  const handleSkipDirectly = () => {
    setShowIntro(false);
    setShowProfilePicker(false);
    setCurrentProfile("main");
  };

  const handleSelectProfile = (role: ProfileRole) => {
    setCurrentProfile(role);
    setShowProfilePicker(false);
    setShowIntro(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Resume modal open handler
  const handleOpenResume = (region: ResumeRegion = "india") => {
    setResumeRegion(region);
    setResumeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] selection:bg-[#e50914] selection:text-white">
      {/* 1. Intro Teaser Hook ("A FIROZKHAN ORIGINAL") */}
      {showIntro && (
        <IntroHook
          onComplete={handleIntroComplete}
          onSkip={handleSkipDirectly}
        />
      )}

      {/* 2. "Who's Watching?" Full Screen Profile Selector (Skippable) */}
      {showProfilePicker && (
        <WhosWatching
          onSelectProfile={handleSelectProfile}
          onDirectEnter={handleSkipDirectly}
        />
      )}

      {/* 3. Sticky Netflix Navigation Bar */}
      <NetflixNavbar
        currentProfile={currentProfile}
        onSwitchProfile={() => setShowProfilePicker(true)}
        onNavigate={scrollToSection}
        onOpenResume={handleOpenResume}
      />

      {/* 4. Main Streaming Viewport */}
      <main className="relative z-10">
        {/* Billboard Hero always anchors the series */}
        <BillboardHero
          currentProfile={currentProfile}
          onExploreWork={() => scrollToSection("top-picks")}
          onStartProject={() => scrollToSection("services")}
          onOpenResume={handleOpenResume}
        />

        {/* ========================================================
            PROFILE-AWARE DYNAMIC VIEWING ORDER
        ======================================================== */}

        {/* --- RECRUITER MODE: Resume, Experience Dossier & Top Picks First --- */}
        {currentProfile === "recruiter" && (
          <>
            {/* Quick Recruiter Resume Callout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/70 via-[#181818] to-[#121212] border border-sky-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider block">
                      Recruiter Priority Access
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      Instant verified document review for India and Dubai/UAE engineering roles.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenResume("india")}
                    className="px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    🇮🇳 India Resume
                  </button>
                  <button
                    onClick={() => handleOpenResume("dubai")}
                    className="px-3.5 py-1.5 rounded bg-[#e50914] hover:bg-[#f40612] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    🇦🇪 Dubai Resume
                  </button>
                </div>
              </div>
            </div>

            <ExperienceDossier onOpenResume={handleOpenResume} />
            <TopPicksBillboard
              onOpenProject={(proj) => setSelectedProject(proj)}
              onNavigate={scrollToSection}
            />
            <SkillsUniverse />
            <ProjectCarousel
              onOpenProject={(proj) => setSelectedProject(proj)}
            />
            <FreelanceServices />
          </>
        )}

        {/* --- DEVELOPER MODE: Architecture, Top Picks & Code Projects First --- */}
        {currentProfile === "developer" && (
          <>
            <TopPicksBillboard
              onOpenProject={(proj) => setSelectedProject(proj)}
              onNavigate={scrollToSection}
            />
            <ProjectCarousel
              onOpenProject={(proj) => setSelectedProject(proj)}
            />
            <SkillsUniverse />
            <ExperienceDossier onOpenResume={handleOpenResume} />
            <FreelanceServices />
          </>
        )}

        {/* --- CLIENT MODE: Freelance Services, Deliverables & Enquiry First --- */}
        {currentProfile === "client" && (
          <>
            <FreelanceServices />
            <TopPicksBillboard
              onOpenProject={(proj) => setSelectedProject(proj)}
              onNavigate={scrollToSection}
            />
            <ProjectCarousel
              onOpenProject={(proj) => setSelectedProject(proj)}
            />
            <ExperienceDossier onOpenResume={handleOpenResume} />
            <SkillsUniverse />
          </>
        )}

        {/* --- MAIN MODE (FIROZKHAN): Master Chronological Series Order --- */}
        {currentProfile === "main" && (
          <>
            <EpisodeExplorer onSelectEpisode={scrollToSection} />
            <TopPicksBillboard
              onOpenProject={(proj) => setSelectedProject(proj)}
              onNavigate={scrollToSection}
            />
            <ProjectCarousel
              onOpenProject={(proj) => setSelectedProject(proj)}
            />
            <SkillsUniverse />
            <ExperienceDossier onOpenResume={handleOpenResume} />
            <FreelanceServices />
          </>
        )}
      </main>

      {/* 5. Finale: To Be Continued */}
      <ToBeContinued
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onStartProject={() => scrollToSection("services")}
        onOpenResume={handleOpenResume}
      />

      {/* 6. Netflix Project Detail Modal Overlay */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 7. Resume Preview Modal (India & Dubai) */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        initialRegion={resumeRegion}
      />
    </div>
  );
}
