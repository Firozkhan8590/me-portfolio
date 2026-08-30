"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Frontend",
    subtitle: "Building modern interfaces",
    icon: "◈",
    skills: [
      {
        name: "Next.js",
        level: "Advanced",
        description: "Modern React applications and full-stack web experiences.",
      },
      {
        name: "React",
        level: "Advanced",
        description: "Component-based and interactive user interfaces.",
      },
      {
        name: "JavaScript",
        level: "Advanced",
        description:
          "Interactive web applications and application logic.",
      },
      {
        name: "TypeScript",
        level: "Advanced",
        description: "Type-safe and maintainable application development.",
      },
      {
        name: "HTML & CSS",
        level: "Advanced",
        description: "Responsive and accessible web interfaces.",
      },
    ],
  },
  {
    title: "Backend",
    subtitle: "Building application logic",
    icon: "⚙",
    skills: [
      {
        name: "Node.js",
        level: "Advanced",
        description: "Server-side applications and backend services.",
      },
      {
        name: "REST APIs",
        level: "Advanced",
        description: "Designing and integrating application APIs.",
      },
      {
        name: "NestJs",
        level: "Intermediate",
        description: "Backend APIs and web application services.",
      },
    ],
  },
  {
    title: "Database",
    subtitle: "Managing application data",
    icon: "◇",
    skills: [
      {
        name: "MySQL",
        level: "Advanced",
        description: "Relational database development and queries.",
      },
      {
        name: "SQL",
        level: "Advanced",
        description: "Queries, joins, data manipulation and database logic.",
      },
       {
        name: "PostgreSQL",
        level: "Begginer",
        description: "Relational database design and application data.",
      },
    ],
  },
   {
    title: "Tools & DevOps",
    subtitle: "Development workflow",
    icon: "⌘",
    skills: [
      {
        name: "Git",
        level: "Advanced",
        description:
          "Version control and collaborative development.",
      },
      {
        name: "GitHub",
        level: "Advanced",
        description:
          "Source control, repositories and project collaboration.",
      },
      {
        name: "Docker",
        level: "Intermediate",
        description:
          "Containerizing applications and creating consistent development environments.",
      },
      {
        name: "API Integration",
        level: "Intermediate",
        description:
          "Connecting applications with external services.",
      },
      {
        name: "Automation",
        level: "Learning",
        description:
          "Building workflows that reduce repetitive work.",
      },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 mx-auto max-w-[1500px] px-8 py-32"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-purple-400">
          My Toolkit
        </p>

        <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          Skills &{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Technologies
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-gray-400">
          Technologies and tools I use to design, develop and
          build practical software solutions.
        </p>
      </motion.div>

      {/* =====================================================
          SKILL GROUPS
      ===================================================== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: groupIndex * 0.1,
            }}
            className="group rounded-3xl border border-purple-500/15 bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.08)]"
          >
            {/* Group header */}
            <div className="mb-7 flex items-center gap-4">
              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.08,
                }}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-xl text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.12)]"
              >
                {group.icon}
              </motion.div>

              <div>
                <h3 className="text-xl font-bold">
                  {group.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {group.subtitle}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              {group.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: groupIndex * 0.1 + skillIndex * 0.06,
                  }}
                  whileHover={{
                    x: 5,
                    borderColor: "rgba(168,85,247,0.35)",
                  }}
                  className="rounded-xl border border-white/5 bg-black/20 p-4 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-gray-200">
                        {skill.name}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        {skill.description}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1 text-[10px] uppercase tracking-wider text-purple-400">
                      {skill.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* =====================================================
          TECHNOLOGY MARQUEE
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 overflow-hidden rounded-2xl border border-purple-500/10 bg-purple-500/[0.02] py-5"
      >
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max gap-12 whitespace-nowrap"
        >
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "MySQL",
            "REST APIs",
            "Git",
            "GitHub",
            "Next.js",
            "React",
            "TypeScript",
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "MySQL",
            "REST APIs",
            "Git",
            "GitHub",
          ].map((technology, index) => (
            <div
              key={`${technology}-${index}`}
              className="flex items-center gap-3 text-sm text-gray-500"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
              {technology}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* =====================================================
          BOTTOM STATEMENT
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-20 text-center"
      >
        <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-500">
          I believe the right technology should serve the
          problem — not the other way around.
        </p>
      </motion.div>
    </section>
  );
}