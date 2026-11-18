"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  FileDown,
  ArrowUpRight,
  ArrowUp,
  Radio,
  Sparkles,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { soundEngine } from "../../lib/sound";

export default function Scene07Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const gmailComposeLink =
    "https://mail.google.com/mail/?view=cm&fs=1&to=firoznissar@gmail.com&su=Project%20Enquiry";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      soundEngine.playTelemetry(800);
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to transmit enquiry.");
      }

      soundEngine.playChime(587.33, 0.4);
      setSubmitted(true);
      form.reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 7000);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Transmission failed. Please check connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    soundEngine.playTelemetry(950);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="scene-07"
      className="relative min-h-screen w-full overflow-hidden bg-[#030305] px-6 py-28 text-white preserve-3d"
    >
      {/* Background Volumetric Glows */}
      <div className="pointer-events-none absolute -left-48 top-1/4 h-[600px] w-[600px] rounded-full bg-[#d4af37]/6 blur-[190px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[600px] w-[600px] rounded-full bg-[#785a14]/12 blur-[190px]" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* Climax Headline */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-5 py-2 font-mono text-xs tracking-[0.35em] text-[#f3e5ab] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Radio size={12} className="animate-ping text-[#d4af37]" />
            <span>SCENE 07 // THE NEXT CHAPTER</span>
          </div>

          <h2 className="mt-6 text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl leading-none">
            LET'S BUILD{" "}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8214] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(212,175,55,0.4)]">
              SOMETHING
            </span>
            <br />
            EXTRAORDINARY.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-mono text-sm leading-relaxed text-gray-300 sm:text-base">
            Have an idea, an offline-first retail vision, or a high-concurrency backend challenge?
            <br />
            Transmit your specifications directly into the system.
          </p>
        </motion.div>

        {/* Transmission Grid: Coordinates & Enquiry Console */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Direct Coordinates & Social Relays (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 rounded-3xl border border-[#d4af37]/35 bg-[#121217]/90 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_8px_#d4af37]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#f3e5ab] font-bold">
                COMMUNICATIONS CONSOLE
              </span>
            </div>

            <h3 className="text-2xl font-black text-white sm:text-3xl">
              Initiate Contact
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Whether you need scalable web systems, backend API architectures, database optimization, or full-stack software development, I am open to discussing your objectives.
            </p>

            {/* Direct Channel Links */}
            <div className="mt-8 space-y-3.5">
              {/* Email */}
              <a
                href={gmailComposeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playTelemetry(850)}
                className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#16161c] p-4 transition-all duration-300 hover:border-[#d4af37] hover:bg-[#1a1a24]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#f3e5ab]">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase text-gray-400">EMAIL TRANSMISSION</p>
                  <p className="truncate text-sm font-semibold text-gray-200 group-hover:text-[#f3e5ab] transition-colors">
                    firoznissar@gmail.com
                  </p>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-gray-500 group-hover:text-[#d4af37]" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918590219012?text=Hi%20Firoz%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playTelemetry(880)}
                className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#16161c] p-4 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/35 bg-emerald-500/10 text-emerald-300">
                  <MessageCircle size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase text-gray-400">WHATSAPP DIRECT</p>
                  <p className="text-sm font-semibold text-gray-200 group-hover:text-emerald-300 transition-colors">
                    +91 8590219012
                  </p>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-gray-500 group-hover:text-emerald-400" />
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#16161c] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f3e5ab]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-gray-400">PHYSICAL COORDINATES</p>
                  <p className="text-sm font-semibold text-gray-200">Kerala, India · Technopark Vicinity</p>
                </div>
              </div>
            </div>

            {/* Resume Download CTA */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <a
                href="/resume.pdf"
                download
                onClick={() => soundEngine.playTelemetry(920)}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-[#d4af37]/50 bg-gradient-to-r from-[#d4af37]/20 via-[#e5c158]/20 to-[#aa8214]/20 py-4 font-mono text-xs font-bold text-[#f3e5ab] hover:bg-[#d4af37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-all"
              >
                <FileDown size={16} />
                <span>DOWNLOAD COMPLETE CURRICULUM VITAE [PDF]</span>
              </a>
            </div>

            {/* Social Nodes */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                EXTERNAL NETWORKS:
              </span>
              <div className="flex gap-2.5">
                <a
                  href="https://github.com/Firozkhan8590"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] text-gray-300 hover:border-[#d4af37] hover:text-[#f3e5ab] transition-all"
                  aria-label="GitHub Profile"
                >
                  <SiGithub size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/firoz-khan-686308313/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] text-gray-300 hover:border-[#d4af37] hover:text-[#f3e5ab] transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Project Enquiry Form (Preserved Neon DB & Resend) (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-3xl border border-[#d4af37]/35 bg-[#121217]/95 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_10px_60px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                  TRANSMISSION FORM // NEON DB & RESEND RELAY
                </p>
                <h4 className="text-2xl font-bold text-white mt-1">Submit Project Specifications</h4>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 rounded font-bold">
                API ACTIVE
              </span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center p-6"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d4af37] bg-[#d4af37]/15 text-[#f3e5ab] shadow-[0_0_35px_rgba(212,175,55,0.4)]">
                  <CheckCircle2 size={32} />
                </div>
                <h5 className="mt-6 text-2xl font-bold text-white">Transmission Successful</h5>
                <p className="mt-2 max-w-md font-mono text-xs text-gray-300">
                  Your project enquiry has been logged to Neon PostgreSQL and dispatched via Resend to firoznissar@gmail.com.
                </p>
                <p className="mt-4 font-mono text-[11px] text-[#f3e5ab]">
                  Estimated response time: Under 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="mb-2 block font-mono text-xs text-gray-300 font-semibold">
                      Your Name <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full rounded-xl border border-white/10 bg-[#16161c] px-4 py-3.5 font-mono text-xs text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:bg-[#1a1a24] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-2 block font-mono text-xs text-gray-300 font-semibold">
                      Email Address <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      className="w-full rounded-xl border border-white/10 bg-[#16161c] px-4 py-3.5 font-mono text-xs text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:bg-[#1a1a24] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="mb-2 block font-mono text-xs text-gray-300 font-semibold">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      className="w-full rounded-xl border border-white/10 bg-[#16161c] px-4 py-3.5 font-mono text-xs text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:bg-[#1a1a24] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="mb-2 block font-mono text-xs text-gray-300 font-semibold">
                      Project Domain <span className="text-[#d4af37]">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-white/10 bg-[#16161c] px-4 py-3.5 font-mono text-xs text-gray-200 focus:border-[#d4af37] focus:outline-none transition-all"
                    >
                      <option value="" disabled>Select project scope</option>
                      <option value="Enterprise Web Application">Enterprise Web Application</option>
                      <option value="Backend System / REST APIs">Backend System / REST APIs</option>
                      <option value="Retail ERP / Billing Software">Retail ERP / Billing Software</option>
                      <option value="SaaS Architecture">SaaS Architecture</option>
                      <option value="Production Bug Fixing & Support">Production Bug Fixing & Support</option>
                      <option value="Other Requirements">Other Requirements</option>
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="mb-2 block font-mono text-xs text-gray-300 font-semibold">
                    Estimated Budget Tier (Optional)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    defaultValue=""
                    className="w-full rounded-xl border border-white/10 bg-[#16161c] px-4 py-3.5 font-mono text-xs text-gray-200 focus:border-[#d4af37] focus:outline-none transition-all"
                  >
                    <option value="" disabled>Select budget bracket</option>
                    <option value="Under ₹25,000">Under ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="₹1,00,000+">₹1,00,000+</option>
                    <option value="Let's Discuss">To be evaluated</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block font-mono text-xs text-gray-300 font-semibold">
                    Project Requirements / Problem Context <span className="text-[#d4af37]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your software objectives, technical challenges, or requirements..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#16161c] px-4 py-3.5 font-mono text-xs text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:bg-[#1a1a24] focus:outline-none transition-all"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 font-mono text-xs text-red-300">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#aa8214] py-4 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.55)] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>TRANSMITTING TELEMETRY...</span>
                  ) : (
                    <>
                      <span>TRANSMIT SPECIFICATIONS</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Cinematic Credits Footer */}
        <div className="mt-28 border-t border-white/10 pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-sm font-bold text-white tracking-wider">
                FIROZKHAN <span className="text-[#d4af37]">· FULL STACK DEVELOPER | BACKEND ENGINEER</span>
              </p>
              <p className="font-mono text-xs text-gray-500 mt-1">
                Built with Next.js 16 · React 19 · TypeScript · Three.js · Tailwind CSS · Framer Motion
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#16161c] px-4 py-2.5 font-mono text-xs text-gray-400 hover:border-[#d4af37] hover:text-[#f3e5ab] transition-all"
            >
              <span>RETURN TO OPENING CREDITS</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
