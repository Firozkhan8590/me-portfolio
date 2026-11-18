"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Briefcase,
  Server,
  Code2,
  Bug,
  Database,
  Search,
  Sparkles,
  MapPin,
  Calendar,
} from "lucide-react";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  isCompleted: boolean;
  summary: string;
  technologies: string[];
  responsibilities: {
    icon: typeof Bug;
    title: string;
    desc: string;
  }[];
}

const missionHistory: ExperienceItem[] = [
  {
    period: "Mar 2026 — Sep 2026",
    role: "Associate Software Engineer",
    company: "SODISYS Pvt Ltd",
    location: "Technopark Phase 1, Thiruvananthapuram",
    type: "Previous Experience",
    isCompleted: true,
    summary:
      "Engineered enterprise web applications, delivered mission-critical production support, resolved live bugs, conducted root cause analysis across stack layers, and developed scalable backend APIs.",
    technologies: ["Node.js", "NestJS", "PHP", "TypeScript", "MySQL", "REST APIs", "Git"],
    responsibilities: [
      {
        icon: Bug,
        title: "Production Bug Resolution",
        desc: "Investigated, debugged, and resolved live production issues and bugs, maintaining rock-solid system stability.",
      },
      {
        icon: Search,
        title: "Root Cause Diagnostics",
        desc: "Traced complex application behavior across frontend, server-side services, and database layers to isolate defect origins.",
      },
      {
        icon: Server,
        title: "Backend & REST API Architecture",
        desc: "Built and maintained modular server-side applications with Node.js and NestJS, engineering high-throughput REST APIs.",
      },
      {
        icon: Database,
        title: "MySQL Query Optimization",
        desc: "Wrote optimized SQL queries, restructured schema relationships, and tuned data access performance.",
      },
      {
        icon: Code2,
        title: "Feature Engineering & Code Reviews",
        desc: "Developed new application enhancements based on enterprise specifications and participated in peer code reviews.",
      },
    ],
  },
  {
    period: "Sep 2025 — Mar 2026",
    role: "Software Engineer Intern — Backend Developer",
    company: "SODISYS Pvt Ltd",
    location: "Technopark Phase 1, Thiruvananthapuram",
    type: "Engineering Internship",
    isCompleted: true,
    summary:
      "Worked as part of the core backend team on live client systems, focusing on NestJS microservices, MySQL database management, authentication guards, and API integrations.",
    technologies: ["NestJS", "TypeScript", "MySQL", "REST APIs", "JWT", "Git"],
    responsibilities: [
      {
        icon: Server,
        title: "NestJS Microservice Development",
        desc: "Developed core server-side modules, controller endpoints, and dependency-injected services using NestJS.",
      },
      {
        icon: Database,
        title: "Database Modeling & Persistence",
        desc: "Designed and managed relational MySQL tables for fast and reliable enterprise data storage and retrieval.",
      },
      {
        icon: Bug,
        title: "Optimization & Quality Assurance",
        desc: "Conducted systematic debugging, integration testing, and latency optimization on live application endpoints.",
      },
    ],
  },
  {
    period: "Jan 2025 — Sep 2025",
    role: "Python Full Stack Developer Intern",
    company: "Srishti Innovative Technopark",
    location: "Technopark, Thiruvananthapuram",
    type: "Engineering Internship",
    isCompleted: true,
    summary:
      "Engineered responsive full-stack web applications using Python and Django, integrated RESTful APIs, wrote PyTest suites, and collaborated within Agile/Scrum sprint cycles.",
    technologies: ["Python", "Django", "HTML5 & CSS3", "JavaScript", "SQLite", "PyTest", "Git"],
    responsibilities: [
      {
        icon: Code2,
        title: "Django Full-Stack Engineering",
        desc: "Built Django views, models, forms, and serializers adhering to clean, modular architectural patterns.",
      },
      {
        icon: Search,
        title: "Automated Testing with PyTest",
        desc: "Created unit test suites using PyTest, verified endpoint assertions, and prevented code regressions.",
      },
      {
        icon: Server,
        title: "Agile Feature Branching",
        desc: "Collaborated in daily Scrum standups, delivered sprint deliverables, and maintained disciplined Git workflows.",
      },
    ],
  },
];

export default function Scene06Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      ref={containerRef}
      id="scene-06"
      className="relative min-h-screen w-full overflow-hidden bg-[#050508] px-6 py-28 text-white preserve-3d"
    >
      {/* Background Volumetric Glows */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-[550px] w-[550px] rounded-full bg-[#d4af37]/6 blur-[180px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/3 h-[550px] w-[550px] rounded-full bg-[#785a14]/10 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-5 py-2 font-mono text-xs tracking-[0.35em] text-[#f3e5ab] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Sparkles size={12} className="text-[#d4af37]" />
            <span>SCENE 06 // MISSION CHRONOLOGY</span>
          </div>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            PROFESSIONAL{" "}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8214] bg-clip-text text-transparent">
              TRAJECTORY
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-gray-400">
            Verified production engineering tenures at SODISYS Pvt Ltd and Srishti Innovative Technopark.
          </p>
        </motion.div>

        {/* Vertical Timeline Path */}
        <div className="relative">
          {/* Glowing Golden Center Conduit (Desktop) */}
          <div className="pointer-events-none absolute left-6 top-0 hidden h-full w-[2px] bg-gradient-to-b from-[#d4af37] via-[#aa8214] to-[#d4af37]/20 md:left-1/2 md:-translate-x-1/2 md:block shadow-[0_0_15px_#d4af37]" />

          <div className="space-y-16">
            {missionHistory.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={`${item.company}-${item.period}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, z: -80 }}
                  whileInView={{ opacity: 1, x: 0, z: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, delay: index * 0.12 }}
                  className="relative preserve-3d"
                >
                  {/* Center Node Target */}
                  <div className="absolute left-6 top-8 z-20 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#121217] text-[#f3e5ab] shadow-[0_0_25px_#d4af37] md:left-1/2 md:flex">
                    <Briefcase size={16} />
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`w-full md:w-[47%] ${isEven ? "md:mr-auto" : "md:ml-auto"
                      }`}
                  >
                    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121217]/90 p-7 sm:p-9 backdrop-blur-2xl transition-all duration-500 hover:border-[#d4af37]/60 hover:shadow-[0_10px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)]">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
                        <span className="flex items-center gap-2 font-mono text-xs font-bold text-[#f3e5ab]">
                          <Calendar size={13} className="text-[#d4af37]" />
                          {item.period}
                        </span>

                        <span className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#f3e5ab] font-bold">
                          {item.type}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <div>
                        <h3 className="text-2xl font-black text-white sm:text-3xl">
                          {item.role}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-sm">
                          <span className="text-[#d4af37] font-bold">{item.company}</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-400 flex items-center gap-1">
                            <MapPin size={13} /> {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="mt-4 text-sm leading-relaxed text-gray-300">
                        {item.summary}
                      </p>

                      {/* Tech Pills */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-white/10 bg-[#181822] px-2.5 py-1 font-mono text-xs text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Key Responsibilities */}
                      <div className="mt-8 border-t border-white/10 pt-6 space-y-4">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">
                          CORE MISSION DIRECTIVES
                        </p>
                        <div className="space-y-3">
                          {item.responsibilities.map((r, rIdx) => {
                            const RIcon = r.icon;
                            return (
                              <div key={rIdx} className="flex gap-3">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f3e5ab]">
                                  <RIcon size={13} />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-white">{r.title}</h4>
                                  <p className="text-[11px] leading-relaxed text-gray-400 mt-0.5">{r.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Problem-Solving Architectural Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28 rounded-3xl border border-[#d4af37]/35 bg-[#121217]/90 p-8 sm:p-12 shadow-[0_10px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.08)]"
        >
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]">
              METHODOLOGY PIPELINE
            </p>
            <h3 className="mt-2 text-2xl font-black sm:text-4xl text-white">
              Root-Cause Problem Resolution Protocol
            </h3>
            <p className="mt-2 font-mono text-xs text-gray-400">
              How enterprise bugs and feature requests are systematically analyzed, resolved, and shipped.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                label: "Reproduce & Isolate",
                desc: "Replicate reported production behavior and isolate failing boundaries across API or DB layers.",
              },
              {
                step: "02",
                label: "Trace Root Cause",
                desc: "Audit logs, trace execution paths, inspect query bottlenecks, and identify exact flaw logic.",
              },
              {
                step: "03",
                label: "Modular Resolution",
                desc: "Engineer a clean, maintainable solution using architectural best practices and strong type safety.",
              },
              {
                step: "04",
                label: "Regression Testing",
                desc: "Validate edge cases, test backward compatibility, and deploy safely without disrupting live users.",
              },
            ].map((st) => (
              <div key={st.step} className="rounded-2xl border border-white/10 bg-[#181822]/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <span className="font-mono text-xs font-bold text-[#d4af37]">{`${st.step} // PHASE`}</span>
                <h4 className="mt-2 font-bold text-white text-sm">{st.label}</h4>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">{st.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
