"use client";

import {
  ArrowUpRight,
  Mail,
  ArrowUp,
} from "lucide-react";

import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative z-10 border-t border-purple-500/10 bg-black/20">
      {/* Purple glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 rounded-full bg-purple-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16">

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* =================================================
              BRAND
          ================================================= */}

          <div>
            <a
              href="#"
              className="inline-block text-2xl font-bold text-white transition-colors hover:text-purple-400"
            >
              Firoz<span className="text-purple-400">.</span>
            </a>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
              Full Stack Developer focused on building
              practical software solutions, scalable
              applications and real-world business systems.
            </p>

            {/* Social links */}

            <div className="mt-6 flex gap-3">

              {/* GitHub */}

              <a
                href="https://github.com/Firozkhan8590"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <SiGithub size={18} />
              </a>

              {/* LinkedIn */}

              <a
                href="https://www.linkedin.com/in/firoz-khan-686308313/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <FaLinkedin size={18} />
              </a>

              {/* Email */}

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=firoznissar@gmail.com&su=Project%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-gray-400 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <Mail size={18} />
              </a>

            </div>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
              Quick Links
            </p>

            <nav className="flex flex-col gap-3">

              <a
                href="#about"
                className="w-fit text-sm text-gray-500 transition-colors hover:text-purple-400"
              >
                About
              </a>

              <a
                href="#skills"
                className="w-fit text-sm text-gray-500 transition-colors hover:text-purple-400"
              >
                Skills
              </a>

              <a
                href="#projects"
                className="w-fit text-sm text-gray-500 transition-colors hover:text-purple-400"
              >
                Projects
              </a>

              <a
                href="#experience"
                className="w-fit text-sm text-gray-500 transition-colors hover:text-purple-400"
              >
                Experience
              </a>

              <a
                href="#contact"
                className="w-fit text-sm text-gray-500 transition-colors hover:text-purple-400"
              >
                Contact
              </a>

            </nav>
          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
              Let's Connect
            </p>

            <p className="max-w-xs text-sm leading-7 text-gray-500">
              Have a project idea or need help solving a
              technical problem? Let's talk.
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=firoznissar@gmail.com&su=Project%20Enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
            >
              Start a conversation

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            <p className="mt-4 text-sm text-gray-600">
              Kerala, India
            </p>
          </div>

        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div className="my-10 h-px bg-white/5" />

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Firoz Khan. All
              rights reserved.
            </p>

            <p className="mt-2 text-xs text-gray-700">
              Built with Next.js · TypeScript · Tailwind CSS
            </p>
          </div>

          {/* Back to top */}

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-gray-500 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
          >
            Back to top

            <ArrowUp
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </button>

        </div>

      </div>
    </footer>
  );
}