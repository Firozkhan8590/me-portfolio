"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  title: string;
  category: string;
  description: string;
  backend: string;
  frontend: string;
  technologies: string[];
  status: string;
  color: string;
  images?: string[];
};

const projects: Project[] = [
  {
    title: "Bananaa Shop",
    category: "Business Management System",
    description:
      "A real-world billing and business management application designed to simplify customer management, invoicing, products, expenses and customer and supplier ledger operations for a retail business.",
    backend: "Nest.js",
    frontend: "React",
    technologies: [
      "React",
      "Nest.js",
      "TypeScript",
      "REST API",
      "Database",
      "Billing",
      "Ledger Management",
    ],
    status: "Real-world Project",
    color: "green",
    images: [
      "/Bananaa/1.png",
      "/Bananaa/2.png",
      "/Bananaa/3.png",
      "/Bananaa/4.png",
    ],
  },

  {
    title: "Medi AI",
    category: "AI-Powered Healthcare Platform",
    description:
      "An AI-integrated healthcare platform combining patient services, doctor management, skincare recommendations and an AI health assistant.",
    backend: "Python & Django",
    frontend: "HTML, CSS & JavaScript",
    technologies: [
      "Python",
      "Django",
      "JavaScript",
      "HTML",
      "CSS",
      "AI Integration",
    ],
    status: "AI Integration",
    color: "blue",
    images: [
      "/mediaihome.png",
      "/aiinteraction.png",
      "/doctordashboard.png",
      "/eCommercePage.png",
    ],
  },

  {
    title: "AeroTrack",
    category: "Flight & Travel Platform",
    description:
      "A travel platform designed for flight discovery, booking and real-time flight tracking. The platform includes flight search, travel management and a dynamic seat-selection experience where the interface changes according to seat availability during booking.",
    backend: "Python & Django",
    frontend: "HTML, CSS & JavaScript",
    technologies: [
      "Python",
      "Django",
      "JavaScript",
      "HTML",
      "CSS",
      "Flight APIs",
      "Booking System",
    ],
    status: "Featured Project",
    color: "purple",
    images: [
      "/Aerotrack/1.png",
      "/Aerotrack/2.png",
      "/Aerotrack/3.png",
    ],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
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
        className="mb-16 text-center"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-purple-400">
          Selected Work
        </p>

        <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          Projects &{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-gray-400">
          A selection of applications and software solutions I have
          designed and developed using modern technologies.
        </p>
      </motion.div>

      {/* =====================================================
          PROJECT LIST
      ===================================================== */}

      <div className="space-y-12">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
            }}
            className="group overflow-hidden rounded-3xl border border-purple-500/15 bg-white/[0.025] backdrop-blur-xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_60px_rgba(168,85,247,0.10)]"
          >
            <div className="grid lg:grid-cols-[1fr_0.9fr]">

              {/* =================================================
                  PROJECT INFORMATION
              ================================================= */}

              <div className="flex flex-col justify-center p-7 sm:p-8 lg:p-12">
                
                {/* Status + Number */}

                <div className="mb-5 flex items-center gap-3">
                  <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs uppercase tracking-wider text-purple-400">
                    {project.status}
                  </span>

                  <span className="text-sm text-gray-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Category */}

                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-purple-400">
                  {project.category}
                </p>

                {/* Title */}

                <h3 className="text-3xl font-bold text-white sm:text-4xl">
                  {project.title}
                </h3>

                {/* Description */}

                <p className="mt-5 max-w-xl text-base leading-7 text-gray-400">
                  {project.description}
                </p>

                {/* =================================================
                    FRONTEND / BACKEND
                ================================================= */}

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* Frontend */}

                  <div className="rounded-xl border border-white/5 bg-black/20 p-4 transition-all duration-300 hover:border-purple-500/20">
                    <p className="text-xs uppercase tracking-wider text-gray-600">
                      Frontend
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-300">
                      {project.frontend}
                    </p>
                  </div>

                  {/* Backend */}

                  <div className="rounded-xl border border-white/5 bg-black/20 p-4 transition-all duration-300 hover:border-purple-500/20">
                    <p className="text-xs uppercase tracking-wider text-gray-600">
                      Backend
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-300">
                      {project.backend}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    TECHNOLOGIES
                ================================================= */}

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-purple-500/15 bg-purple-500/5 px-3 py-1.5 text-xs text-gray-400 transition-all duration-300 hover:border-purple-500/40 hover:text-purple-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* =================================================
                  PROJECT SCREENSHOTS
              ================================================= */}

              <div className="relative border-t border-white/5 bg-black/30 lg:border-l lg:border-t-0">

                {project.images && project.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 p-5">

                    {/* =================================================
                        MAIN SCREENSHOT
                    ================================================= */}

                    <motion.div
                      whileHover={{
                        scale: 1.015,
                      }}
                      className="relative col-span-2 h-[250px] overflow-hidden rounded-2xl border border-purple-500/20 bg-black/40"
                    >
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} main screenshot`}
                        fill
                        priority={index === 0}
                        sizes="700px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      />

                      {/* Gradient */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Screenshot label */}

                      <div className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-wider text-gray-300 backdrop-blur-md">
                        Main Screen
                      </div>
                    </motion.div>

                    {/* =================================================
                        SECONDARY SCREENSHOTS
                    ================================================= */}

                    {project.images.slice(1).map((image, imageIndex) => (
                      <motion.div
                        key={`${project.title}-${imageIndex}`}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: imageIndex * 0.08,
                        }}
                        whileHover={{
                          scale: 1.03,
                          y: -4,
                        }}
                        className={`
                          relative
                          h-[150px]
                          overflow-hidden
                          rounded-2xl
                          border
                          border-purple-500/20
                          bg-black/40
                          ${
                            project.images &&
                            project.images.length > 4 &&
                            imageIndex === project.images.length - 2
                              ? "col-span-2"
                              : ""
                          }
                        `}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${
                            imageIndex + 2
                          }`}
                          fill
                          sizes="350px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        />

                        {/* Hover overlay */}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />

                        {/* Number */}

                        <div className="absolute bottom-2 left-2 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[9px] text-gray-300 backdrop-blur-md">
                          {String(imageIndex + 2).padStart(2, "0")}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* =================================================
                      NO SCREENSHOT
                  ================================================= */

                  <div className="flex min-h-[450px] items-center justify-center p-10">
                    <div className="text-center">

                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-3xl text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.12)]"
                      >
                        ◈
                      </motion.div>

                      <p className="text-sm text-gray-600">
                        Project Preview
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* =====================================================
          BOTTOM STATEMENT
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
        }}
        transition={{
          duration: 0.7,
        }}
        className="mt-16 text-center"
      >
        <p className="text-gray-500">
          Building software with a focus on solving real-world problems.
        </p>
      </motion.div>
    </section>
  );
}