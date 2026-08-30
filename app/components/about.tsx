"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    icon: "🌐",
    title: "Web Applications",
    description:
      "Build modern, responsive web applications designed around real business requirements.",
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    description:
      "Develop APIs, backend logic and application services that connect different parts of a system.",
  },
  {
    icon: "🗄️",
    title: "Database Solutions",
    description:
      "Work with structured data and build database solutions that support application requirements.",
  },
  {
    icon: "💼",
    title: "Business Software",
    description:
      "Turn manual business processes into practical software that makes everyday work easier.",
  },
  {
    icon: "🔗",
    title: "API Integration",
    description:
      "Connect applications and external services through reliable API integrations.",
  },
  {
    icon: "🤖",
    title: "Automation",
    description:
      "Create automated workflows that reduce repetitive tasks and improve business processes.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    text: "Understand the business problem and requirements.",
  },
  {
    number: "02",
    title: "Plan",
    text: "Design the solution and choose the right approach.",
  },
  {
    number: "03",
    title: "Build",
    text: "Develop the application with maintainability in mind.",
  },
  {
    number: "04",
    title: "Test",
    text: "Test the solution and identify issues before delivery.",
  },
  {
    number: "05",
    title: "Deliver",
    text: "Deliver the solution and support the next steps.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-[1500px] px-8 py-32"
    >
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-purple-400">
          Get to know me
        </p>

        <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          About{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Me
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-gray-400">
          A little about who I am, what I have learned, and
          the kind of software solutions I enjoy building.
        </p>
      </motion.div>

      {/* Who I Am + Education */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Who Am I */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          whileHover={{
            y: -5,
            boxShadow: "0 0 40px rgba(168,85,247,0.12)",
          }}
          className="rounded-3xl border border-purple-500/20 bg-white/[0.025] p-8 backdrop-blur-xl"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-xl">
              👨‍💻
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-purple-400">
                Who am I?
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                FIROZKHAN
              </h3>
            </div>
          </div>

          <p className="leading-8 text-gray-400">
            I&apos;m a Full-Stack Developer who enjoys turning
            ideas and real-world problems into practical
            software solutions.
          </p>

          <p className="mt-5 leading-8 text-gray-400">
            I enjoy working across the application stack,
            understanding how different parts of a system work
            together, and continuously improving my development
            skills through real projects.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />

            <span className="text-sm text-gray-500">
              Always learning. Always building.
            </span>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{
            y: -5,
            boxShadow: "0 0 40px rgba(168,85,247,0.12)",
          }}
          className="rounded-3xl border border-purple-500/20 bg-white/[0.025] p-8 backdrop-blur-xl"
        >
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-xl">
              🎓
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-purple-400">
                My Journey
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                Education
              </h3>
            </div>
          </div>

          <div className="relative border-l border-purple-500/30 pl-6">
            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />

            <p className="text-sm text-purple-400">
                2023 — 2025
            </p>

            <h4 className="mt-2 text-lg font-semibold">
                Master of Computer Applications
            </h4>

            <p className="mt-2 text-sm text-gray-400">
                Sree Narayana Institute of Technology, Kollam
            </p>

            <p className="mt-1 text-sm text-gray-500">
                University of Kerala
            </p>

            <p className="mt-3 text-xs text-purple-300/70">
                Two-Year Postgraduate Programme
            </p>
            </div>

          {/* BSc Computer Science */}
<div className="relative mt-10 border-l border-purple-500/30 pl-6">
  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_12px_#8b5cf6]" />

  <p className="text-sm text-purple-400">
    2020 — 2023
  </p>

  <h4 className="mt-2 text-lg font-semibold text-white">
    Bachelor of Science in Computer Science
  </h4>

  <p className="mt-2 text-sm leading-6 text-gray-400">
    UIT Mulamkadakam, Kollam
  </p>

  <p className="mt-3 text-xs text-purple-300/70">
    Three-Year Undergraduate Programme
  </p>
</div>
        </motion.div>
      </div>

      {/* What I Can Do */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="mt-24"
      >
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.4em] text-purple-400">
            What I can do
          </p>

          <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
            Turning problems into{" "}
            <span className="text-purple-400">
              solutions.
            </span>
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
              }}
              whileHover={{
                y: -8,
                borderColor: "rgba(168,85,247,0.6)",
                boxShadow: "0 0 30px rgba(168,85,247,0.08)",
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300"
            >
              <div className="mb-5 text-3xl">
                {item.icon}
              </div>

              <h4 className="text-xl font-semibold">
                {item.title}
              </h4>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How I Work */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="mt-24"
      >
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.4em] text-purple-400">
            My Process
          </p>

          <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
            How I work
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-purple-500/40"
            >
              <div className="text-3xl font-bold text-purple-500/50">
                {step.number}
              </div>

              <h4 className="mt-5 text-lg font-semibold">
                {step.title}
              </h4>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Closing Statement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-24 rounded-3xl border border-purple-500/20 bg-purple-500/[0.04] p-10 text-center shadow-[0_0_60px_rgba(168,85,247,0.06)]"
      >
        <p className="mx-auto max-w-3xl text-xl leading-9 text-gray-300 sm:text-2xl">
          &quot;I don&apos;t just write code. I try to understand
          the problem behind it and build a solution that is
          actually useful.&quot;
        </p>

        <motion.a
          href="#contact"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(168,85,247,0.4)",
          }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 inline-flex rounded-full bg-gradient-to-r from-purple-600 to-violet-500 px-8 py-3.5 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        >
          Let&apos;s Work Together →
        </motion.a>
      </motion.div>
    </section>
  );
}