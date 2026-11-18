"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Server, Layout, Terminal, Sparkles, Cpu } from "lucide-react";
import { soundEngine } from "../../lib/sound";

interface TechItem {
  name: string;
  level: "Production Core" | "Enterprise" | "Advanced" | "Intermediate";
  role: string;
  highlight?: boolean;
}

const techSystems: {
  title: string;
  sector: string;
  icon: typeof Server;
  items: TechItem[];
}[] = [
    {
      title: "BACKEND ARCHITECTURES & SERVER ENGINES",
      sector: "SECTOR 01",
      icon: Server,
      items: [
        {
          name: "NestJS",
          level: "Production Core",
          role: "Enterprise architectural modules, dependency injection, guards, and high-concurrency microservices at SODISYS.",
          highlight: true,
        },
        {
          name: "Node.js",
          level: "Enterprise",
          role: "Event-driven asynchronous backend services, high-throughput REST APIs, and runtime execution pipelines.",
          highlight: true,
        },
        {
          name: "Express.js",
          level: "Advanced",
          role: "Lightweight middleware pipelines, modular API routers, and microservice endpoints.",
        },
        {
          name: "Python & Django",
          level: "Enterprise",
          role: "Full-stack development, Django ORM, views, models, forms, and PyTest suites at Srishti.",
          highlight: true,
        },
        {
          name: "PHP",
          level: "Advanced",
          role: "Enterprise web application development, production support, and root-cause bug fixing at SODISYS.",
        },
      ],
    },
    {
      title: "FRONTEND MATRICES & CLIENT INTERFACES",
      sector: "SECTOR 02",
      icon: Layout,
      items: [
        {
          name: "Next.js",
          level: "Production Core",
          role: "App Router, Server Components, server actions, dynamic routing, and high-performance web applications.",
          highlight: true,
        },
        {
          name: "React",
          level: "Production Core",
          role: "Component-driven interactive user interfaces, custom hooks, and complex state management.",
          highlight: true,
        },
        {
          name: "TypeScript",
          level: "Enterprise",
          role: "Strict type safety, domain interfaces, and scalable, maintainable application architecture.",
          highlight: true,
        },
        {
          name: "Tailwind CSS",
          level: "Advanced",
          role: "GPU-accelerated responsive styling, custom utility design systems, and rapid prototyping.",
        },
        {
          name: "HTML5 & CSS3",
          level: "Advanced",
          role: "Semantic DOM architecture, cross-device accessibility, and 3D CSS perspective transforms.",
        },
      ],
    },
    {
      title: "DATA PERSISTENCE & RELATIONAL SCHEMAS",
      sector: "SECTOR 03",
      icon: Database,
      items: [
        {
          name: "PostgreSQL",
          level: "Enterprise",
          role: "Relational persistence, Neon cloud integration, complex indexes, and support ticket schema modeling.",
          highlight: true,
        },
        {
          name: "MySQL",
          level: "Production Core",
          role: "Enterprise relational database design, query optimization, joins, and indexing at SODISYS.",
          highlight: true,
        },
        {
          name: "Prisma ORM",
          level: "Advanced",
          role: "Type-safe database client, schema migrations, and relational modeling across serverless environments.",
        },
        {
          name: "SQLite",
          level: "Advanced",
          role: "Embedded local database caching for offline-first retail desktop and web applications.",
        },
        {
          name: "RESTful APIs",
          level: "Production Core",
          role: "Clean endpoint contracts, HTTP status conventions, JSON serialization, and external integrations.",
          highlight: true,
        },
      ],
    },
    {
      title: "DEVELOPMENT INFRASTRUCTURE & LIFECYCLE",
      sector: "SECTOR 04",
      icon: Terminal,
      items: [
        {
          name: "Git & GitHub",
          level: "Enterprise",
          role: "Version control, feature branching, pull requests, and collaborative code review workflows.",
        },
        {
          name: "Docker",
          level: "Intermediate",
          role: "Containerized environments ensuring consistency between local development and production.",
        },
        {
          name: "Postman",
          level: "Advanced",
          role: "API testing, environment management, automated assertion suites, and integration validation.",
        },
        {
          name: "PyTest",
          level: "Advanced",
          role: "Unit testing, integration assertions, and regression prevention for Python/Django systems.",
        },
        {
          name: "Agile & Scrum",
          level: "Enterprise",
          role: "Sprint planning, daily standups, backlog grooming, and cross-functional team delivery.",
        },
      ],
    },
  ];

export default function Scene04TechUniverse() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sectionRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      id="scene-04"
      className="relative min-h-screen w-full overflow-hidden bg-[#030305] px-6 py-28 text-white preserve-3d"
    >
      {/* Background Volumetric Glows */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[550px] w-[550px] rounded-full bg-[#d4af37]/6 blur-[180px]" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 h-[550px] w-[550px] rounded-full bg-[#785a14]/10 blur-[180px]" />

      <motion.div
        style={{ rotateX: sectionRotateX, scale: sectionScale }}
        className="relative z-10 mx-auto max-w-[1500px] preserve-3d"
      >
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-5 py-2 font-mono text-xs tracking-[0.35em] text-[#f3e5ab] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Sparkles size={12} className="text-[#d4af37]" />
            <span>SCENE 04 // 3D TECHNOLOGY MATRIX</span>
          </div>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            ORBITAL{" "}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8214] bg-clip-text text-transparent">
              SYSTEMS MATRIX
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-gray-400">
            Node.js, NestJS, Express.js, TypeScript, React, Next.js, Python, Django, PostgreSQL, and MySQL arranged as mission-ready 3D systems.
          </p>
        </div>

        {/* 3D Systems Matrix Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {techSystems.map((system, systemIdx) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={system.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: systemIdx * 0.12 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121217]/90 p-8 backdrop-blur-2xl transition-all duration-500 hover:border-[#d4af37]/60 shadow-[0_4px_35px_rgba(0,0,0,0.8)]"
              >
                {/* Header of System */}
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f3e5ab]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-bold tracking-wider text-white">
                        {system.title}
                      </h3>
                      <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                        {system.sector}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#d4af37] border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-1 rounded">
                    ACTIVE
                  </span>
                </div>

                {/* Items in System */}
                <div className="space-y-3.5">
                  {system.items.map((item) => {
                    const isHovered = activeTech === item.name;
                    return (
                      <div
                        key={item.name}
                        onMouseEnter={() => {
                          soundEngine.playTelemetry(860);
                          setActiveTech(item.name);
                        }}
                        onMouseLeave={() => setActiveTech(null)}
                        className={`rounded-xl border p-4 transition-all duration-300 ${item.highlight
                            ? "border-[#d4af37]/30 bg-[#16161c] hover:border-[#d4af37] hover:bg-[#1a1a24]"
                            : "border-white/5 bg-[#0e0e13] hover:border-white/20 hover:bg-[#14141a]"
                          } ${isHovered ? "shadow-[0_0_25px_rgba(212,175,55,0.2)]" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`h-2 w-2 rounded-full ${item.highlight ? "bg-[#d4af37] shadow-[0_0_8px_#d4af37]" : "bg-gray-500"
                                }`}
                            />
                            <h4 className="font-mono text-sm font-bold text-gray-100">
                              {item.name}
                            </h4>
                          </div>

                          <span className="font-mono text-[10px] tracking-wider uppercase text-[#f3e5ab] border border-white/10 bg-white/5 px-2.5 py-0.5 rounded font-semibold">
                            {item.level}
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-gray-400 font-sans">
                          {item.role}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Technology Telemetry Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e13]/80 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-8 whitespace-nowrap font-mono text-xs text-gray-400"
          >
            {[
              "NODE.JS [ENTERPRISE]",
              "NESTJS [PRODUCTION CORE]",
              "TYPESCRIPT [STRICT TYPE-SAFETY]",
              "REACT 19 & NEXT.JS 16",
              "PYTHON & DJANGO [FULL-STACK]",
              "POSTGRESQL & NEON DB",
              "MYSQL [OPTIMIZED QUERIES]",
              "RESTFUL APIS [SECURE JWT GUARDS]",
              "PRISMA ORM",
              "GIT & GITHUB COLLABORATION",
              "NODE.JS [ENTERPRISE]",
              "NESTJS [PRODUCTION CORE]",
              "TYPESCRIPT [STRICT TYPE-SAFETY]",
              "REACT 19 & NEXT.JS 16",
              "PYTHON & DJANGO [FULL-STACK]",
              "POSTGRESQL & NEON DB",
              "MYSQL [OPTIMIZED QUERIES]",
              "RESTFUL APIS [SECURE JWT GUARDS]",
              "PRISMA ORM",
              "GIT & GITHUB COLLABORATION",
            ].map((token, idx) => (
              <span key={`${token}-${idx}`} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
                <span className="text-gray-300">{token}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
