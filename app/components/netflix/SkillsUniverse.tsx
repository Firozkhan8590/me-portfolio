"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillItem {
  name: string;
  level: string;
  provenance: string;
  iconText: string;
}

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "backend",
    title: "BACKEND DEVELOPMENT",
    subtitle: "Node.js, NestJS, Express & Python Architecture",
    skills: [
      {
        name: "Node.js",
        level: "Production Core",
        provenance: "DineFlow, Maj & Sons & Ticket System",
        iconText: "JS",
      },
      {
        name: "NestJS",
        level: "Enterprise Architecture",
        provenance: "Scalable Microservices & SaaS",
        iconText: "NEST",
      },
      {
        name: "Express.js",
        level: "High-Throughput APIs",
        provenance: "REST API Endpoints & Middleware",
        iconText: "EX",
      },
      {
        name: "Python",
        level: "Full-Stack & Scripts",
        provenance: "Technopark Internship & Automation",
        iconText: "PY",
      },
      {
        name: "Django",
        level: "Web Framework",
        provenance: "Database models, ORM & Admin",
        iconText: "DJ",
      },
      {
        name: "RESTful APIs",
        level: "System Design",
        provenance: "Contract-first API Architecture",
        iconText: "API",
      },
    ],
  },
  {
    id: "frontend",
    title: "FRONTEND DEVELOPMENT",
    subtitle: "Modern React, Next.js & TypeScript Interfaces",
    skills: [
      {
        name: "React",
        level: "Advanced Interactive UI",
        provenance: "Medi AI, Bananaa & Storefronts",
        iconText: "RC",
      },
      {
        name: "Next.js",
        level: "App Router & SSR",
        provenance: "DineFlow, Maj & Sons Store",
        iconText: "NEXT",
      },
      {
        name: "TypeScript",
        level: "Strict Type Safety",
        provenance: "Enterprise codebases & schemas",
        iconText: "TS",
      },
      {
        name: "Tailwind CSS",
        level: "Design Systems",
        provenance: "Streaming UI & Responsive Layouts",
        iconText: "TW",
      },
      {
        name: "HTML5 / Modern CSS",
        level: "Foundational Standard",
        provenance: "Semantic accessible markup",
        iconText: "CSS",
      },
    ],
  },
  {
    id: "databases",
    title: "DATABASES & ORMS",
    subtitle: "PostgreSQL, MySQL & Relational Data Modeling",
    skills: [
      {
        name: "PostgreSQL",
        level: "Primary RDBMS",
        provenance: "Multi-tenant schemas & Neon DB",
        iconText: "PG",
      },
      {
        name: "MySQL",
        level: "Relational Modeling",
        provenance: "High-integrity transaction logs",
        iconText: "SQL",
      },
      {
        name: "Prisma ORM",
        level: "Schema & Migrations",
        provenance: "Enquiry pipeline & ticket schema",
        iconText: "PR",
      },
      {
        name: "IndexedDB / Offline",
        level: "Client-Side Cache",
        provenance: "Maj & Sons local bill sync",
        iconText: "IDB",
      },
    ],
  },
  {
    id: "infra",
    title: "INFRA & TOOLS",
    subtitle: "Docker, Git, Postman & Linux Environments",
    skills: [
      {
        name: "Docker",
        level: "Containerization",
        provenance: "Multi-service local & cloud compose",
        iconText: "DK",
      },
      {
        name: "Git & GitHub",
        level: "Version Control",
        provenance: "Branch workflows, PRs & CI/CD",
        iconText: "GIT",
      },
      {
        name: "Postman",
        level: "API Testing & Docs",
        provenance: "Automated regression testing",
        iconText: "PM",
      },
      {
        name: "Linux / Bash",
        level: "Server Operations",
        provenance: "Process monitoring & shell scripting",
        iconText: "SH",
      },
    ],
  },
  {
    id: "cs",
    title: "CS FUNDAMENTALS",
    subtitle: "System Architecture, DSA & Software Patterns",
    skills: [
      {
        name: "System Design",
        level: "Scalable Systems",
        provenance: "Multi-tenant SaaS & caching",
        iconText: "SYS",
      },
      {
        name: "Data Structures",
        level: "Algorithmic Efficiency",
        provenance: "Optimized indexing & data trees",
        iconText: "DSA",
      },
      {
        name: "RBAC Security",
        level: "Access Control",
        provenance: "Ticket system & admin permissions",
        iconText: "SEC",
      },
      {
        name: "Offline Resilience",
        level: "Fault Tolerance",
        provenance: "Maj & Sons background synchronization",
        iconText: "RES",
      },
    ],
  },
];

export default function SkillsUniverse() {
  const [activeCategory, setActiveCategory] = useState<string>("backend");

  const currentCategory =
    SKILL_CATEGORIES.find((c) => c.id === activeCategory) ||
    SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header matching reference video frame 08 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-0.5 bg-[#e50914]" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#e50914] uppercase">
            GENRES
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase font-netflix-title tracking-tight">
          MY SKILL UNIVERSE
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#a3a3a3] font-mono">
          Hover or tap a skill to see where it powers production systems across the portfolio.
        </p>
      </div>

      {/* Split layout: Left Categories, Right Horizontal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Genre Selector (4 cols) */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto no-scrollbar gap-2 pb-2 lg:pb-0">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-none lg:w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col ${isActive
                    ? "bg-[#1f1f1f] border-[#e50914] shadow-[0_0_15px_rgba(229,9,20,0.3)]"
                    : "bg-[#121212] border-[#262626] hover:border-[#3e3e3e] hover:bg-[#181818]"
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs sm:text-sm font-black font-netflix-title uppercase tracking-wide ${isActive ? "text-white" : "text-[#a3a3a3]"
                      }`}
                  >
                    {cat.title}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#e50914] shadow-[0_0_8px_#e50914]" />
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] text-[#666] line-clamp-1 mt-0.5 font-mono">
                  {cat.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Active Skills Grid (8 cols) */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {currentCategory.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group relative p-4 rounded-xl border border-[#262626] bg-[#141414] hover:bg-[#1e1e1e] hover:border-[#e50914] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(229,9,20,0.25)] flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-lg bg-black border border-[#333] flex items-center justify-center font-mono font-bold text-xs text-[#e50914] group-hover:border-[#e50914] group-hover:scale-105 transition-all">
                      {skill.iconText}
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#737373] group-hover:text-[#a3a3a3]">
                      {skill.level}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-base font-bold text-white group-hover:text-[#e50914] transition-colors">
                      {skill.name}
                    </h4>
                    <p className="mt-1 text-[11px] text-[#8e8e8e] font-mono leading-tight">
                      {skill.provenance}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#222] flex items-center justify-between text-[10px] font-mono text-[#666]">
                    <span>Verified Production</span>
                    <span className="text-emerald-500">● Active</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

