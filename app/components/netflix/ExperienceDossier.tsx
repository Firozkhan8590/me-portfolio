"use client";

import React from "react";

interface ExperienceDossierProps {
  onOpenResume?: (region?: "india" | "dubai") => void;
}

export default function ExperienceDossier({
  onOpenResume,
}: ExperienceDossierProps) {
  return (
    <section id="experience" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top series badge & Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#262626]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-0.5 bg-[#e50914]" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#e50914] uppercase">
              EXECUTIVE BRIEFING · DOSSIER
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-netflix-title tracking-tight">
            FIROZKHAN
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#a3a3a3] uppercase mt-1">
            FULL STACK DEVELOPER · BACKEND ENGINEER
          </p>
        </div>

        {/* Stats chips matching frame 06 */}
        <div className="flex items-center gap-3 font-mono">
          <div className="px-3 py-2 rounded-lg bg-[#141414] border border-[#2e2e2e] text-center">
            <span className="block text-base sm:text-lg font-bold text-white font-netflix-title">
              MCA
            </span>
            <span className="text-[9px] text-[#737373] uppercase">
              Completed 2025
            </span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-[#141414] border border-[#2e2e2e] text-center">
            <span className="block text-base sm:text-lg font-bold text-[#e50914] font-netflix-title">
              7
            </span>
            <span className="text-[9px] text-[#737373] uppercase">
              Originals
            </span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-[#141414] border border-[#2e2e2e] text-center">
            <span className="block text-base sm:text-lg font-bold text-white font-netflix-title">
              10+
            </span>
            <span className="text-[9px] text-[#737373] uppercase">
              Technologies
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Netflix Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Experience & Education (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* WORK EXPERIENCE */}
          <div>
            <h3 className="text-sm font-black text-[#e50914] uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
              <span>WORK EXPERIENCE</span>
              <span className="h-px flex-1 bg-[#262626]" />
            </h3>

            <div className="space-y-6">
              {/* Role 1: SODISYS - Associate Software Engineer */}
              <div className="relative pl-5 border-l-2 border-[#e50914] space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">
                    SODISYS — Associate Software Engineer
                  </h4>
                  <span className="text-[11px] font-mono text-[#e50914] font-bold">
                    March 2026 – September 2026
                  </span>
                </div>
                <p className="text-xs font-mono text-[#a3a3a3]">
                  Production Backend Engineering · REST APIs · Database Systems
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-[#b3b3b3]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#e50914] mt-0.5">▸</span>
                    <span>
                      Engineered robust backend services, business logic, and API endpoints for production platforms.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#e50914] mt-0.5">▸</span>
                    <span>
                      Optimized PostgreSQL schema models, indexing strategies, and relational transaction workflows.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#e50914] mt-0.5">▸</span>
                    <span>
                      Implemented role-based security, input sanitization, and automated integration pipelines.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Role 2: SODISYS - Software Engineer Intern */}
              <div className="relative pl-5 border-l-2 border-[#333] space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">
                    SODISYS — Software Engineer Intern (Backend Developer)
                  </h4>
                  <span className="text-[11px] font-mono text-[#a3a3a3]">
                    September 2025 – March 2026
                  </span>
                </div>
                <p className="text-xs font-mono text-[#a3a3a3]">
                  Backend API Development · Server Architecture · Testing
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-[#b3b3b3]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#e50914] mt-0.5">▸</span>
                    <span>
                      Developed server-side modules and REST endpoints using Node.js and Express.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#e50914] mt-0.5">▸</span>
                    <span>
                      Authored comprehensive Postman test suites and maintained API documentation.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Role 3: Srishti Innovative Technopark */}
              <div className="relative pl-5 border-l-2 border-[#333] space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">
                    Srishti Innovative Technopark — Python Full Stack Developer Intern
                  </h4>
                  <span className="text-[11px] font-mono text-[#a3a3a3]">
                    January 2025 – September 2025
                  </span>
                </div>
                <p className="text-xs font-mono text-[#a3a3a3]">
                  Python · Django Web Framework · Technopark Campus
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-[#b3b3b3]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#e50914] mt-0.5">▸</span>
                    <span>
                      Built responsive full-stack web applications utilizing Python and Django.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#e50914] mt-0.5">▸</span>
                    <span>
                      Structured relational database models, views, templates, and RESTful service interfaces.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <h3 className="text-sm font-black text-[#e50914] uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
              <span>EDUCATION</span>
              <span className="h-px flex-1 bg-[#262626]" />
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#141414] border border-[#2e2e2e]">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">
                    Master of Computer Applications (MCA)
                  </h4>
                  <span className="text-xs font-mono font-bold text-[#e50914]">
                    Completed 2025
                  </span>
                </div>
                <p className="text-xs text-[#a3a3a3] mt-1 font-mono">
                  Advanced Software Engineering, Distributed Systems, Database Architecture & Algorithms.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141414] border border-[#2e2e2e]">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">
                    Bachelor of Science in Computer Science (BSc CS)
                  </h4>
                  <span className="text-xs font-mono font-bold text-[#a3a3a3]">
                    Completed 2023
                  </span>
                </div>
                <p className="text-xs text-[#a3a3a3] mt-1 font-mono">
                  Core Computer Science Fundamentals, Data Structures, Operating Systems & Programming.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skills Summary, Milestones & Direct Resume Download (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* TECHNICAL SKILLS OVERVIEW */}
          <div>
            <h3 className="text-sm font-black text-[#e50914] uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
              <span>CORE ARCHITECTURE SKILLS</span>
              <span className="h-px flex-1 bg-[#262626]" />
            </h3>

            <div className="p-4 sm:p-5 rounded-xl bg-[#141414] border border-[#2e2e2e] space-y-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#e50914]">
                  Backend Engineering
                </span>
                <p className="text-xs text-white mt-0.5">
                  Node.js, NestJS, Express.js, Python, Django, REST APIs, Microservices
                </p>
              </div>
              <div className="pt-2 border-t border-[#262626]">
                <span className="text-[10px] font-mono font-bold uppercase text-[#e50914]">
                  Frontend Engineering
                </span>
                <p className="text-xs text-white mt-0.5">
                  React, Next.js (App Router), TypeScript, Tailwind CSS, Responsive UI
                </p>
              </div>
              <div className="pt-2 border-t border-[#262626]">
                <span className="text-[10px] font-mono font-bold uppercase text-[#e50914]">
                  Databases & Storage
                </span>
                <p className="text-xs text-white mt-0.5">
                  PostgreSQL, MySQL, Prisma ORM, IndexedDB, Database Normalization
                </p>
              </div>
              <div className="pt-2 border-t border-[#262626]">
                <span className="text-[10px] font-mono font-bold uppercase text-[#e50914]">
                  DevOps & Tooling
                </span>
                <p className="text-xs text-white mt-0.5">
                  Docker Compose, Git, GitHub Actions, Postman, Linux CLI
                </p>
              </div>
            </div>
          </div>

          {/* KEY PRODUCTION MILESTONES */}
          <div>
            <h3 className="text-sm font-black text-[#e50914] uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
              <span>KEY PRODUCTION MILESTONES</span>
              <span className="h-px flex-1 bg-[#262626]" />
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-[#141414] border border-[#2e2e2e] flex items-start gap-2.5">
                <span className="text-[#e50914] text-xs font-bold mt-0.5">✔</span>
                <div className="text-xs text-[#cfcfcf]">
                  <strong className="text-white">Multi-Tenant Isolation:</strong> Engineered DineFlow SaaS with tenant-level DB provisioning and dynamic routing.
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#141414] border border-[#2e2e2e] flex items-start gap-2.5">
                <span className="text-[#e50914] text-xs font-bold mt-0.5">✔</span>
                <div className="text-xs text-[#cfcfcf]">
                  <strong className="text-white">Offline Retail ERP:</strong> Designed Maj & Sons Shop Manager for zero-latency local billing and asynchronous server sync.
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#141414] border border-[#2e2e2e] flex items-start gap-2.5">
                <span className="text-[#e50914] text-xs font-bold mt-0.5">✔</span>
                <div className="text-xs text-[#cfcfcf]">
                  <strong className="text-white">Role-Based Support Engine:</strong> Architected student ticket lifecycle with auditable PostgreSQL history.
                </div>
              </div>
            </div>
          </div>

          {/* OFFICIAL RESUME MODAL TRIGGER CARD */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-red-950/40 via-[#181818] to-[#121212] border border-[#e50914]/40 flex flex-col items-start gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#e50914] tracking-wider">
                DOCUMENTATION & CV
              </span>
              <h4 className="text-base font-black text-white font-netflix-title uppercase tracking-wide">
                OFFICIAL RESUME · CURRICULUM VITAE
              </h4>
              <p className="text-xs text-[#a3a3a3] mt-1">
                Preview and download the verified PDF documents customized for India and Dubai/UAE engineering opportunities.
              </p>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => onOpenResume?.("india")}
                className="py-2.5 px-3 rounded bg-[#e50914] hover:bg-[#f40612] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
              >
                <span>🇮🇳</span>
                <span>India Resume</span>
              </button>

              <button
                onClick={() => onOpenResume?.("dubai")}
                className="py-2.5 px-3 rounded bg-[#1f1f1f] hover:bg-[#282828] border border-[#3e3e3e] hover:border-[#e50914] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>🇦🇪</span>
                <span>Dubai / UAE Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
