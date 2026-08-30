"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import About from "./components/about";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Experience from "./components/experience";
import Contact from "./components/contact";
import Footer from "./components/footer";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const technologies = [
  "Next.js",
  "Node.js",
  "TypeScript",
  "MySQL",
];

export default function Home() {
  return (
    <main
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#05010d] text-white"
    >
      {/* =========================================================
          BACKGROUND NEON GLOW
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[150px]"
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-40 top-40 h-[600px] w-[600px] rounded-full bg-violet-600/15 blur-[170px]"
          animate={{
            x: [0, -70, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/5 blur-[120px]" />
      </div>

      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-50 mx-auto flex max-w-[1500px] items-center justify-between px-8 py-7"
      >
        {/* Logo - KEEP FIROZ.DEV */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.03 }}
          className="text-2xl font-bold tracking-tight"
        >
          FIROZ
          <span className="text-purple-500">.DEV</span>
        </motion.a>

        {/* Navigation - RIGHT SIDE */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + index * 0.08,
                duration: 0.4,
              }}
              className="group relative text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white"
            >
              {item.name}

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-purple-500 shadow-[0_0_10px_#a855f7] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}

          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(168,85,247,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-purple-500/70 px-6 py-2.5 text-sm font-medium text-purple-300 transition-all duration-300 hover:bg-purple-500/10"
          >
            Let's Talk
          </motion.a>
        </div>
      </motion.nav>

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-[1500px] items-center px-8 pb-16">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_1fr]">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
          >
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-500/5 px-5 py-2.5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7]" />
              </span>

              <span className="text-sm text-gray-300">
                Open to opportunities
              </span>
            </motion.div>

            {/* Small heading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mb-5 text-sm font-medium uppercase tracking-[0.45em] text-purple-400"
            >
              Full-Stack Developer
            </motion.p>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
              }}
              className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl"
            >
              Building{" "}
              <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                Digital
              </span>
              <br />
              Experiences.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.7,
              }}
              className="mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg"
            >
              I build modern web applications, backend systems and
              real-world software solutions using modern technologies.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              {/* View Work */}
              <motion.a
                href="#projects"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 35px rgba(168,85,247,0.65)",
                }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-gradient-to-r from-purple-600 to-violet-500 px-8 py-3.5 font-semibold shadow-[0_0_25px_rgba(168,85,247,0.3)]"
              >
                View My Work →
              </motion.a>

              {/* Resume */}
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(168,85,247,0.8)",
                }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full border border-white/15 bg-white/[0.03] px-8 py-3.5 font-semibold text-gray-200 backdrop-blur"
              >
                Download Resume ↓
              </motion.a>
            </motion.div>

            {/* =================================================
                TECHNOLOGY CARDS
                Replaces unverified statistics
            ================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
                duration: 0.6,
              }}
              className="mt-12 border-t border-white/10 pt-7"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-600">
                Working With
              </p>

              <div className="flex flex-wrap gap-3">
                {technologies.map((technology, index) => (
                  <motion.div
                    key={technology}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 1.1 + index * 0.1,
                    }}
                    whileHover={{
                      y: -4,
                      borderColor: "rgba(168,85,247,0.7)",
                      boxShadow:
                        "0 0 20px rgba(168,85,247,0.18)",
                    }}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition-colors"
                  >
                    {technology}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="relative flex min-h-[600px] items-center justify-center"
          >

            {/* =================================================
                OUTER ROTATING RING
            ================================================= */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[430px] w-[430px] rounded-full border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            />

            {/* =================================================
                SECOND ROTATING RING
            ================================================= */}
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[500px] w-[500px] rounded-full border border-purple-400/10 border-dashed"
            />

            {/* =================================================
                RING GLOW
            ================================================= */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-[390px] w-[390px] rounded-full bg-purple-600/20 blur-[80px]"
            />

            {/* =================================================
                PROFILE PHOTO
            ================================================= */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-[400px] w-[400px] overflow-hidden rounded-full border-2 border-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.55),0_0_100px_rgba(168,85,247,0.25)]"
            >
              <Image
                src="/profile.jpeg"
                alt="FirozKhan - Full-Stack Developer"
                fill
                priority
                sizes="400px"
                className="object-cover object-center"
              />

              {/* Purple overlay */}
              <div className="pointer-events-none absolute inset-0 bg-purple-500/5 mix-blend-screen" />
            </motion.div>

            {/* =================================================
                DEVELOPER CODE CARD
            ================================================= */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-2 left-0 z-20 w-[360px] rounded-2xl border border-purple-500/40 bg-[#0b0612]/95 p-5 shadow-[0_0_40px_rgba(168,85,247,0.18)] backdrop-blur-xl"
            >
              {/* Card Header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-gray-500">
                  developer.ts
                </span>

                <div className="flex gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-400" />
                  <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                </div>
              </div>

              {/* Code */}
              <div className="font-mono text-sm leading-7">

                <p>
                  <span className="text-purple-400">
                    const
                  </span>{" "}
                  <span className="text-cyan-300">
                    developer
                  </span>{" "}
                  = {"{"}
                </p>

                {/* NAME */}
                <p className="pl-5 text-gray-400">
                  name:{" "}
                  <span className="text-green-400">
                    "FIROZKHAN"
                  </span>
                  ,
                </p>

                {/* ROLE */}
                <p className="pl-5 text-gray-400">
                  role:{" "}
                  <span className="text-green-400">
                    "Full-Stack Developer"
                  </span>
                  ,
                </p>

                {/* PASSION */}
                <p className="pl-5 text-gray-400">
                  passion:{" "}
                  <span className="text-green-400">
                    "Building Solutions"
                  </span>
                  ,
                </p>

                {/* TECHNOLOGIES */}
                <p className="pl-5 text-gray-400">
                  tech: [
                  <span className="text-green-400">
                    "Next.js"
                  </span>
                  ,{" "}
                  <span className="text-green-400">
                    "Node.js"
                  </span>
                  ,{" "}
                  <span className="text-green-400">
                    "MySQL"
                  </span>
                  ]
                </p>

                <p className="text-purple-400">
                  {"};"}
                </p>

                {/* Terminal */}
                <p className="mt-3 text-gray-600">
                  // Let's build something great.
                </p>

                <p>
                  <span className="text-purple-400">
                    $
                  </span>{" "}
                  <span className="animate-pulse text-gray-300">
                    _
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          TEMPORARY SECTIONS
          We'll replace these with real sections later.
      ========================================================= */}

      <About/>

      <Skills/>

      <Projects/>

      <Experience/>

      <Contact/>

      <Footer/>

    </main>
  
  );
}