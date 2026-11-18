"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Award, User, Sparkles, Briefcase, CheckCircle2 } from "lucide-react";

export default function Scene03Dossier() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3D Parallax & Depth transforms
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const avatarRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 18]);
  const avatarTranslateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-120, 0, 80]);

  const freelanceServices = [
    {
      title: "Full-Stack Web Development",
      desc: "Custom enterprise web applications built with Next.js, React, Node.js, and TypeScript.",
      badge: "END-TO-END",
    },
    {
      title: "Backend APIs & Microservices",
      desc: "High-concurrency RESTful APIs engineered with NestJS, Express.js, and Python/Django.",
      badge: "HIGH-THROUGHPUT",
    },
    {
      title: "Database Modeling & Query Tuning",
      desc: "Complex schema designs, indexing, and query performance optimization for MySQL & PostgreSQL.",
      badge: "OPTIMIZATION",
    },
    {
      title: "Retail ERP & Offline-First POS",
      desc: "Point-of-sale billing systems, inventory ledgers, and double-entry accounting engines.",
      badge: "BUSINESS CORE",
    },
    {
      title: "Production Bug Triage & Support",
      desc: "Fast root-cause identification and defect resolution across live production stacks.",
      badge: "SLA SUPPORT",
    },
    {
      title: "System Integration & Workflows",
      desc: "Webhooks, transactional notification pipelines, and third-party API connectivity.",
      badge: "AUTOMATION",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="scene-03"
      className="relative min-h-screen w-full overflow-hidden bg-[#050508] px-6 py-28 text-white preserve-3d"
    >
      {/* Background Volumetric Gold Glow */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-[550px] w-[550px] rounded-full bg-[#d4af37]/6 blur-[180px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[550px] w-[550px] rounded-full bg-[#785a14]/10 blur-[180px]" />

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
            <span>SCENE 03 // CHARACTER IDENTIFICATION</span>
          </div>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            PERSONNEL{" "}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8214] bg-clip-text text-transparent">
              DOSSIER
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-gray-400">
            The engineering profile, academic qualifications, and systems philosophy of FIROZKHAN.
          </p>
        </motion.div>

        {/* 3D Grid: Avatar & Profile Manifesto */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Holographic 3D Avatar Scanner */}
          <motion.div
            style={{ rotateY: avatarRotateY, z: avatarTranslateZ }}
            className="lg:col-span-5 flex flex-col items-center justify-center preserve-3d"
          >
            <div className="relative flex items-center justify-center">
              {/* Outer Golden Gyro Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="absolute h-[380px] w-[380px] sm:h-[430px] sm:w-[430px] rounded-full border border-[#d4af37]/35 border-dashed"
              />

              {/* Counter-Rotating Inner Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute h-[340px] w-[340px] sm:h-[390px] sm:w-[390px] rounded-full border border-[#f3e5ab]/30 shadow-[0_0_35px_rgba(212,175,55,0.25)]"
              />

              {/* Golden Ambient Aura */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] rounded-full bg-[#d4af37]/15 blur-[70px]"
              />

              {/* Authentic Photo Viewport */}
              <div className="relative h-[290px] w-[290px] sm:h-[340px] sm:w-[340px] overflow-hidden rounded-full border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.45),0_0_80px_rgba(0,0,0,0.9)]">
                <Image
                  src="/profile.jpeg"
                  alt="FIROZKHAN - Full Stack Developer | Backend Engineer"
                  fill
                  priority
                  sizes="(max-width: 640px) 290px, 340px"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050508]/75 via-transparent to-transparent" />
              </div>

              {/* Tactical ID Badge Tag */}
              <div className="absolute -bottom-4 rounded-full border border-[#d4af37]/60 bg-[#121217] px-6 py-2 font-mono text-xs font-semibold text-[#f3e5ab] shadow-[0_0_20px_rgba(212,175,55,0.3)] backdrop-blur-md">
                ID // FIROZKHAN · 8590219012
              </div>
            </div>

            {/* Engineer Bio Details */}
            <div className="mt-9 text-center">
              <h3 className="text-3xl font-black text-white tracking-wide">FIROZKHAN</h3>
              <p className="font-mono text-xs uppercase tracking-widest text-[#d4af37] mt-1.5 font-bold">
                FULL STACK DEVELOPER | BACKEND ENGINEER
              </p>
              <p className="font-mono text-xs text-gray-500 mt-1">
                TECHNOPARK PHASE 1 · KERALA
              </p>
            </div>
          </motion.div>

          {/* Dossier Specifications & Narrative Bio */}
          <motion.div
            style={{ scale: cardScale }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Mission Statement Box */}
            <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-[#121217]/90 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f3e5ab]">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#d4af37]">
                    PROFESSIONAL PROFILE
                  </p>
                  <h4 className="text-xl font-bold text-white">Who Am I?</h4>
                </div>
              </div>

              <p className="leading-relaxed text-gray-300 sm:text-base text-sm">
                I am <span className="text-[#f3e5ab] font-bold">FIROZKHAN</span>, a Full Stack Developer & Backend Engineer dedicated to engineering practical, mission-critical software solutions. My core background centers on building robust server architectures, offline-first business management systems, and high-performance relational databases.
              </p>

              <p className="mt-4 leading-relaxed text-gray-400 sm:text-base text-sm">
                Having resolved live production issues and engineered enterprise applications in Technopark, I specialize in tracing root causes across stack boundaries and shipping resilient, scalable digital products that solve genuine operational challenges.
              </p>

              <div className="mt-6 border-t border-white/10 pt-4">
                <blockquote className="font-mono text-xs italic text-[#f3e5ab]/90">
                  "I don't just write code. I understand the problem behind it and engineer software that works in the real world."
                </blockquote>
              </div>
            </div>

            {/* Academic Credentials (MCA & B.Sc CS) */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* MCA Degree */}
              <div className="rounded-2xl border border-[#d4af37]/35 bg-[#16161c]/90 p-6 backdrop-blur-xl hover:border-[#d4af37]/70 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f3e5ab]">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#d4af37] tracking-wider font-bold">
                      POSTGRADUATE DEGREE
                    </span>
                    <p className="font-mono text-xs text-gray-400">2023 — 2025</p>
                  </div>
                </div>

                <h5 className="text-base font-bold text-white">Master of Computer Applications</h5>
                <p className="mt-1 text-xs text-gray-400">
                  Sree Narayana Institute of Technology, Kollam
                </p>
                <p className="mt-1 font-mono text-[11px] text-[#f3e5ab]">
                  University of Kerala · Graduated July 2025
                </p>
              </div>

              {/* B.Sc CS Degree */}
              <div className="rounded-2xl border border-white/15 bg-[#16161c]/90 p-6 backdrop-blur-xl hover:border-[#d4af37]/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-[#f3e5ab]">
                    <Award size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-gray-400 tracking-wider font-bold">
                      UNDERGRADUATE DEGREE
                    </span>
                    <p className="font-mono text-xs text-gray-400">2020 — 2023</p>
                  </div>
                </div>

                <h5 className="text-base font-bold text-white">B.Sc in Computer Science</h5>
                <p className="mt-1 text-xs text-gray-400">
                  UIT Mulamkadakam, Kollam
                </p>
                <p className="mt-1 font-mono text-[11px] text-[#f3e5ab]">
                  University of Kerala · Graduated May 2023
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Freelance Services & Core Capabilities */}
        <div className="mt-28">
          <div className="mb-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#d4af37]">
              FREELANCE & ENTERPRISE SERVICES
            </p>
            <h3 className="mt-2 text-3xl font-extrabold sm:text-5xl text-white">
              Full-Stack Solutions for Real-World Problems
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {freelanceServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ y: -6, borderColor: "#d4af37" }}
                className="group rounded-2xl border border-white/10 bg-[#121217]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-[#16161c]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30 bg-[#d4af37]/10 px-2 py-0.5 rounded">
                    {service.badge}
                  </span>
                  <CheckCircle2 size={16} className="text-[#d4af37] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-[#f3e5ab] transition-colors">
                  {service.title}
                </h4>
                <p className="mt-2.5 text-xs leading-relaxed text-gray-400">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
