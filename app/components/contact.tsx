"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     GMAIL COMPOSE
  ========================================================= */

  const gmailComposeLink =
    "https://mail.google.com/mail/?view=cm&fs=1&to=firoznissar@gmail.com&su=Project%20Enquiry";

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong."
        );
      }

      setSubmitted(true);
      form.reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error(
        "Enquiry submission error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-[1500px] px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 35,
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
        className="mb-12 text-center sm:mb-16"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-purple-400">
          Get In Touch
        </p>

        <h2 className="text-3xl font-bold text-white sm:text-5xl lg:text-6xl">
          Let's Build{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Something
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-lg sm:leading-8">
          Have an idea, a project or a problem that needs
          solving? Tell me about it. Let's turn your
          requirements into a practical software solution.
        </p>
      </motion.div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

        {/* ===================================================
            LEFT CONTACT INFORMATION
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative overflow-hidden rounded-3xl border border-purple-500/15 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-purple-500/10 blur-[90px]" />

          <div className="relative">

            {/* =================================================
                AVAILABILITY
            ================================================= */}

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-medium text-purple-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />

              Available for opportunities
            </div>

            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Have a project?
            </h3>

            <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
              Whether you need a web application, backend
              system, API integration, business software or
              help solving a technical problem, I'd be happy
              to hear about it.
            </p>

            {/* =================================================
                CONTACT DETAILS
            ================================================= */}

            <div className="mt-8 space-y-4">

              {/* EMAIL */}

              <a
                href={gmailComposeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/5 sm:gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                  <Mail size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-gray-200">
                    firoznissar@gmail.com
                  </p>
                </div>

                <ArrowUpRight
                  size={17}
                  className="ml-auto shrink-0 text-gray-500 transition-colors group-hover:text-purple-400"
                />
              </a>

              {/* WHATSAPP */}

              <a
                href="https://wa.me/918590219012?text=Hi%20Firoz%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/5 sm:gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                  <MessageCircle size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-200">
                    +91 8590219012
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="ml-auto shrink-0 text-gray-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-400"
                />
              </a>

              {/* LOCATION */}

              <a
                href="https://www.google.com/maps/search/?api=1&query=Kerala%2C%20India"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/5 sm:gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                  <MapPin size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-200">
                    Kerala, India
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="ml-auto shrink-0 text-gray-500 transition-colors group-hover:text-purple-400"
                />
              </a>

            </div>

            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            <div className="mt-8 border-t border-white/10 pt-7">

              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-gray-400">
                Find Me Online
              </p>

              <div className="flex gap-3">

                {/* GITHUB */}

                <a
                  href="https://github.com/Firozkhan8590"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-gray-400 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
                >
                  <SiGithub size={19} />
                </a>

                {/* LINKEDIN */}

                <a
                  href="https://www.linkedin.com/in/firoz-khan-686308313/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-gray-400 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
                >
                  <FaLinkedin size={19} />
                </a>

                {/* EMAIL */}

                <a
                  href={gmailComposeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-gray-400 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
                >
                  <Mail size={19} />
                </a>

              </div>
            </div>

          </div>
        </motion.div>

        {/* ===================================================
            RIGHT — PROJECT ENQUIRY FORM
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative overflow-hidden rounded-3xl border border-purple-500/15 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

          <div className="relative">

            {/* =================================================
                FORM HEADER
            ================================================= */}

            <div className="mb-8">

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
                Project Enquiry
              </p>

              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Tell me about your project
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Share a few details about what you want to
                build. I'll get back to you as soon as possible.
              </p>

            </div>

            {/* =================================================
                SUCCESS
            ================================================= */}

            {submitted ? (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="flex min-h-[450px] flex-col items-center justify-center px-2 text-center sm:min-h-[500px]"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  <CheckCircle2 size={30} />
                </div>

                <h4 className="mt-6 text-2xl font-bold text-white">
                  Thanks for connecting!
                </h4>

                <p className="mt-3 max-w-md text-sm leading-7 text-gray-400">
                  Your enquiry has been received successfully.
                  I will contact you as early as possible.
                </p>

                <p className="mt-5 text-xs font-medium text-purple-400">
                  I appreciate your interest.
                </p>

              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* =================================================
                    NAME
                ================================================= */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2.5 block text-sm font-semibold tracking-wide text-gray-200"
                  >
                    Your Name
                    <span className="ml-1 text-purple-400">
                      *
                    </span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all placeholder:text-gray-500 focus:border-purple-500/60 focus:bg-purple-500/[0.04] focus:ring-2 focus:ring-purple-500/20"
                  />

                </div>

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-sm font-semibold tracking-wide text-gray-200"
                  >
                    Email Address
                    <span className="ml-1 text-purple-400">
                      *
                    </span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all placeholder:text-gray-500 focus:border-purple-500/60 focus:bg-purple-500/[0.04] focus:ring-2 focus:ring-purple-500/20"
                  />

                </div>

                {/* =================================================
                    PHONE
                ================================================= */}

                <div>

                  <label
                    htmlFor="phone"
                    className="mb-2.5 block text-sm font-semibold tracking-wide text-gray-200"
                  >
                    Phone / WhatsApp
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      Optional
                    </span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all placeholder:text-gray-500 focus:border-purple-500/60 focus:bg-purple-500/[0.04] focus:ring-2 focus:ring-purple-500/20"
                  />

                </div>

                {/* =================================================
                    PROJECT TYPE
                ================================================= */}

                <div>

                  <label
                    htmlFor="projectType"
                    className="mb-2.5 block text-sm font-semibold tracking-wide text-gray-200"
                  >
                    What do you need?
                    <span className="ml-1 text-purple-400">
                      *
                    </span>
                  </label>

                  <div className="relative">

                    <select
                      id="projectType"
                      name="projectType"
                      required
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-purple-500/30 bg-[#10071c] px-4 py-3.5 pr-12 text-sm font-medium text-purple-100 outline-none transition-all duration-300 hover:border-purple-500/50 focus:border-purple-400/70 focus:bg-[#160a24] focus:ring-2 focus:ring-purple-500/20"
                    >

                      <option
                        value=""
                        disabled
                        className="bg-[#10071c] text-gray-400"
                      >
                        Select project type
                      </option>

                      <option
                        value="Web Application"
                        className="bg-[#10071c] text-white"
                      >
                        Web Application
                      </option>

                      <option
                        value="Backend / API"
                        className="bg-[#10071c] text-white"
                      >
                        Backend / API
                      </option>

                      <option
                        value="Business Software"
                        className="bg-[#10071c] text-white"
                      >
                        Business Software
                      </option>

                      <option
                        value="AI Integration"
                        className="bg-[#10071c] text-white"
                      >
                        AI Integration
                      </option>

                      <option
                        value="Mobile Application"
                        className="bg-[#10071c] text-white"
                      >
                        Mobile Application
                      </option>

                      <option
                        value="Bug Fixing / Maintenance"
                        className="bg-[#10071c] text-white"
                      >
                        Bug Fixing / Maintenance
                      </option>

                      <option
                        value="Other"
                        className="bg-[#10071c] text-white"
                      >
                        Other
                      </option>

                    </select>

                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-purple-400">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>

                  </div>
                </div>

                {/* =================================================
                    BUDGET
                ================================================= */}

                <div>

                  <label
                    htmlFor="budget"
                    className="mb-2.5 block text-sm font-semibold tracking-wide text-gray-200"
                  >
                    Estimated Budget
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      Optional
                    </span>
                  </label>

                  <div className="relative">

                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-purple-500/30 bg-[#10071c] px-4 py-3.5 pr-12 text-sm font-medium text-purple-100 outline-none transition-all duration-300 hover:border-purple-500/50 focus:border-purple-400/70 focus:bg-[#160a24] focus:ring-2 focus:ring-purple-500/20"
                    >

                      <option
                        value=""
                        disabled
                        className="bg-[#10071c] text-gray-400"
                      >
                        Select your budget
                      </option>

                      <option
                        value="Under ₹25,000"
                        className="bg-[#10071c] text-white"
                      >
                        Under ₹25,000
                      </option>

                      <option
                        value="₹25,000 - ₹50,000"
                        className="bg-[#10071c] text-white"
                      >
                        ₹25,000 - ₹50,000
                      </option>

                      <option
                        value="₹50,000 - ₹1,00,000"
                        className="bg-[#10071c] text-white"
                      >
                        ₹50,000 - ₹1,00,000
                      </option>

                      <option
                        value="₹1,00,000+"
                        className="bg-[#10071c] text-white"
                      >
                        ₹1,00,000+
                      </option>

                      <option
                        value="Let's Discuss"
                        className="bg-[#10071c] text-white"
                      >
                        Let's Discuss
                      </option>

                    </select>

                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-purple-400">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>

                  </div>
                </div>

                {/* =================================================
                    MESSAGE
                ================================================= */}

                <div>

                  <label
                    htmlFor="message"
                    className="mb-2.5 block text-sm font-semibold tracking-wide text-gray-200"
                  >
                    Project Details
                    <span className="ml-1 text-purple-400">
                      *
                    </span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project, requirements or the problem you want to solve..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm font-medium leading-6 text-white outline-none transition-all placeholder:text-gray-500 focus:border-purple-500/60 focus:bg-purple-500/[0.04] focus:ring-2 focus:ring-purple-500/20"
                  />

                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-medium text-red-400"
                  >
                    {error}
                  </motion.div>
                )}

                {/* =================================================
                    SUBMIT BUTTON
                ================================================= */}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{
                    scale: loading ? 1 : 1.01,
                  }}
                  whileTap={{
                    scale: loading ? 1 : 0.98,
                  }}
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-purple-400/40 bg-purple-500/10 px-6 py-4 text-sm font-semibold text-purple-200 transition-all duration-300 hover:border-purple-400/70 hover:bg-purple-500/20 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Sending Enquiry..."
                    : "Send Project Enquiry"}

                  {!loading && <Send size={17} />}
                </motion.button>

                <p className="text-center text-[11px] leading-5 text-gray-500">
                  Your information will only be used to
                  respond to your enquiry.
                </p>

              </form>
            )}

          </div>
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM EMAIL LINK
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
        className="mt-12 text-center sm:mt-16"
      >
        <p className="text-sm text-gray-500">
          Have a question?{" "}

          <a
            href={gmailComposeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            Send me an email →
          </a>
        </p>
      </motion.div>

    </section>
  );
}