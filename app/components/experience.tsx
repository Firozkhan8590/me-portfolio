"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Bug,
  Code2,
  Database,
  GitBranch,
  Search,
  Server,
  TestTube2,
} from "lucide-react";

const experiences = [
  {
    period: "Mar 2026 — Present",
    role: "Associate Software Engineer",
    company: "SODISYS Pvt Ltd",
    location: "Technopark Phase 1, Thiruvananthapuram",
    icon: BriefcaseBusiness,
    current: true,

    description:
      "Developing and maintaining enterprise web applications while working on backend development, production support, debugging, feature development and API integrations.",

    technologies: [
      "PHP",
      "Node.js",
      "NestJS",
      "TypeScript",
      "MySQL",
      "REST APIs",
      "Git",
    ],

    responsibilities: [
      {
        icon: Bug,
        title: "Production Bug Fixing",
        text:
          "Investigate, troubleshoot and resolve production issues and live bugs while maintaining application stability.",
      },
      {
        icon: Search,
        title: "Debugging & Root Cause Analysis",
        text:
          "Trace application behavior across frontend, backend and database layers to identify the underlying cause of issues.",
      },
      {
        icon: Server,
        title: "Backend & API Development",
        text:
          "Develop and maintain server-side applications using Node.js and NestJS and build RESTful APIs for system integrations.",
      },
      {
        icon: Database,
        title: "Database Optimization",
        text:
          "Write optimized SQL queries and work with MySQL to improve data handling and application performance.",
      },
      {
        icon: Code2,
        title: "Feature Development",
        text:
          "Implement new features and enhancements based on business requirements and existing application architecture.",
      },
      {
        icon: GitBranch,
        title: "Team Collaboration",
        text:
          "Work with Git, participate in code reviews and collaborate with cross-functional teams to deliver software solutions.",
      },
    ],
  },

  {
    period: "Sep 2025 — Mar 2026",
    role: "Software Engineer Intern — Backend Developer",
    company: "SODISYS Pvt Ltd",
    location: "Technopark Phase 1, Thiruvananthapuram",
    icon: Server,
    current: false,

    description:
      "Worked as part of the core backend team on live project development, focusing on NestJS, MySQL, REST APIs, debugging and application optimization.",

    technologies: [
      "NestJS",
      "TypeScript",
      "MySQL",
      "REST APIs",
      "Git",
    ],

    responsibilities: [
      {
        icon: Code2,
        title: "Backend Development",
        text:
          "Participated in live project development and developed server-side functionality using the NestJS framework.",
      },
      {
        icon: Server,
        title: "REST API Development",
        text:
          "Implemented RESTful APIs to support frontend functionality and application business logic.",
      },
      {
        icon: Database,
        title: "MySQL Database",
        text:
          "Designed and managed MySQL database operations for efficient data storage and retrieval.",
      },
      {
        icon: Bug,
        title: "Debugging & Optimization",
        text:
          "Performed debugging, testing and optimization to maintain application performance and reliability.",
      },
    ],
  },

  {
    period: "Jan 2025 — Sep 2025",
    role: "Python Full Stack Developer Intern",
    company: "Srishti Innovative Technopark",
    location: "Technopark",
    icon: Code2,
    current: false,

    description:
      "Built and maintained web applications using Python and Django while contributing to frontend development, REST API integration, testing and Agile development workflows.",

    technologies: [
      "Python",
      "Django",
      "HTML",
      "CSS",
      "JavaScript",
      "SQLite",
      "PyTest",
      "Git",
    ],

    responsibilities: [
      {
        icon: Code2,
        title: "Full-Stack Development",
        text:
          "Built and maintained web applications using Python, Django, HTML, CSS and JavaScript.",
      },
      {
        icon: Server,
        title: "Django Development",
        text:
          "Developed Django views, models, forms and serializers using clean and modular application code.",
      },
      {
        icon: TestTube2,
        title: "Testing & Debugging",
        text:
          "Conducted unit testing with PyTest, debugged application issues and worked on improving application reliability.",
      },
      {
        icon: GitBranch,
        title: "Agile & Git Workflow",
        text:
          "Worked in Agile/Scrum teams, participated in daily stand-ups and used Git and GitHub for version control and feature branching.",
      },
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 mx-auto max-w-[1500px] px-6 py-32 sm:px-8"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mb-20 text-center"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-purple-400">
          Professional Journey
        </p>

        <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          Experience &{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Expertise
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
          My experience has involved building software, working with
          backend systems, solving production issues, debugging
          applications and turning business requirements into
          practical solutions.
        </p>
      </motion.div>

      {/* =====================================================
          EXPERIENCE TIMELINE
      ===================================================== */}

      <div className="relative">

        {/* Timeline */}

        <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-purple-500/0 via-purple-500/30 to-purple-500/0 md:left-1/2 md:block" />

        <div className="space-y-16">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            const isRight = index % 2 !== 0;

            return (
              <motion.div
                key={`${experience.company}-${experience.period}`}
                initial={{
                  opacity: 0,
                  x: isRight ? 50 : -50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.1,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                className="relative"
              >
                {/* =================================================
                    TIMELINE DOT
                ================================================= */}

                <div className="absolute left-5 top-8 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-purple-500/40 bg-[#090313] text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.25)] md:left-1/2 md:flex">
                  <Icon size={20} />
                </div>

                {/* =================================================
                    EXPERIENCE CARD
                ================================================= */}

                <div
                  className={`w-full md:w-[46%] ${
                    isRight
                      ? "md:ml-auto"
                      : "md:mr-auto"
                  }`}
                >
                  <motion.div
                    whileHover={{
                      y: -5,
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-purple-500/15 bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_60px_rgba(168,85,247,0.10)] sm:p-8"
                  >
                    {/* Glow */}

                    <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-purple-500/10 blur-[80px] transition-all duration-500 group-hover:bg-purple-500/20" />

                    {/* =================================================
                        TOP
                    ================================================= */}

                    <div className="relative">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
                          {experience.period}
                        </span>

                        {experience.current && (
                          <span className="flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[10px] uppercase tracking-wider text-purple-300">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                            Current Role
                          </span>
                        )}
                      </div>

                      {/* Role */}

                      <h3 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                        {experience.role}
                      </h3>

                      {/* Company */}

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="font-medium text-purple-300">
                          {experience.company}
                        </span>

                        <span className="text-gray-700">
                          •
                        </span>

                        <span className="text-sm text-gray-500">
                          {experience.location}
                        </span>
                      </div>

                      {/* Description */}

                      <p className="mt-5 text-sm leading-7 text-gray-400">
                        {experience.description}
                      </p>
                    </div>

                    {/* =================================================
                        TECHNOLOGIES
                    ================================================= */}

                    <div className="relative mt-7">
                      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gray-600">
                        Technologies
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map(
                          (technology) => (
                            <span
                              key={technology}
                              className="rounded-lg border border-purple-500/15 bg-purple-500/5 px-3 py-1.5 text-xs text-gray-400 transition-all duration-300 hover:border-purple-500/40 hover:text-purple-300"
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* =================================================
                        RESPONSIBILITIES
                    ================================================= */}

                    <div className="relative mt-8 border-t border-white/5 pt-7">
                      <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-gray-600">
                        What I Worked On
                      </p>

                      <div className="space-y-5">
                        {experience.responsibilities.map(
                          (item) => {
                            const ItemIcon = item.icon;

                            return (
                              <div
                                key={item.title}
                                className="flex gap-4"
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-purple-500/15 bg-purple-500/5 text-purple-400">
                                  <ItemIcon size={16} />
                                </div>

                                <div>
                                  <h4 className="text-sm font-semibold text-gray-300">
                                    {item.title}
                                  </h4>

                                  <p className="mt-1 text-xs leading-6 text-gray-500">
                                    {item.text}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          HOW I SOLVE PROBLEMS
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
        }}
        className="mt-24"
      >
        <div className="mx-auto max-w-5xl rounded-3xl border border-purple-500/15 bg-purple-500/[0.025] p-8 backdrop-blur-xl sm:p-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-purple-400">
              My Problem-Solving Process
            </p>

            <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              From Problem to Solution
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500">
              When I face a development problem, I focus on
              understanding the issue first, finding the root cause,
              designing a logical solution and validating the result.
            </p>
          </div>

          {/* Process */}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Understand",
                text: "Understand the requirement or reproduce the issue.",
              },
              {
                number: "02",
                title: "Analyze",
                text: "Trace the application flow and identify the root cause.",
              },
              {
                number: "03",
                title: "Implement",
                text: "Design the solution and write clean, maintainable code.",
              },
              {
                number: "04",
                title: "Validate",
                text: "Test the solution and check for regression issues.",
              },
            ].map((step) => (
              <motion.div
                key={step.number}
                whileHover={{
                  y: -4,
                }}
                className="rounded-2xl border border-white/5 bg-black/20 p-5 transition-all duration-300 hover:border-purple-500/25"
              >
                <span className="font-mono text-xs text-purple-500">
                  {step.number}
                </span>

                <h4 className="mt-3 font-semibold text-gray-200">
                  {step.title}
                </h4>

                <p className="mt-2 text-xs leading-6 text-gray-600">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          BOTTOM STATEMENT
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
        }}
        className="mt-16 text-center"
      >
        <p className="text-lg leading-8 text-gray-500">
          I focus on building solutions that work in the real world —
          not just solutions that work on my screen.
        </p>
      </motion.div>
    </section>
  );
}