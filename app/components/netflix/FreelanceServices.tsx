"use client";

import React, { useState, useEffect } from "react";
import {
  CurrencyInfo,
  DEFAULT_GEO,
  getBudgetOptions,
  detectVisitorLocation,
} from "@/app/lib/currency";

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  desc: string;
  deliverables: string[];
  icon: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    badge: "FRONTEND & SSR",
    desc: "Production-ready, highly responsive web apps built with Next.js, React, TypeScript, and modern Tailwind design systems.",
    deliverables: ["Responsive UI", "Server Components", "SEO & Core Web Vitals", "State Architecture"],
    icon: "💻",
  },
  {
    id: "backend",
    title: "Backend & Scalable APIs",
    badge: "SERVER & MICROSERVICES",
    desc: "High-throughput RESTful APIs, modular NestJS/Express services, and secure Python/Django architectures.",
    deliverables: ["RESTful Endpoints", "JWT / RBAC Security", "Rate Limiting", "API Docs & Tests"],
    icon: "⚙️",
  },
  {
    id: "database",
    title: "Database Modeling & ORM",
    badge: "POSTGRESQL & MYSQL",
    desc: "Normalized relational schemas, query optimization, Prisma migrations, and rock-solid ACID transactions.",
    deliverables: ["Schema Design", "PostgreSQL / MySQL", "Prisma Integration", "Query Tuning"],
    icon: "🗄️",
  },
  {
    id: "saas",
    title: "Multi-Tenant SaaS Platforms",
    badge: "SAAS ARCHITECTURE",
    desc: "Scalable multi-tenant infrastructures with tenant database provisioning, QR workflows, and subscription readiness.",
    deliverables: ["Tenant Isolation", "QR Code Engine", "Admin Dashboards", "Billing Pipelines"],
    icon: "🚀",
  },
  {
    id: "offline",
    title: "Offline-First Business Systems",
    badge: "RETAIL ERP & BILLING",
    desc: "Zero-latency retail ERPs, point-of-sale billing, local-first IndexedDB storage, and fault-tolerant server synchronization.",
    deliverables: ["POS Billing Flow", "Inventory Control", "Customer Ledgers", "Zero-Data-Loss Sync"],
    icon: "🏪",
  },
];

export default function FreelanceServices() {
  const [geo, setGeo] = useState<CurrencyInfo>(DEFAULT_GEO);
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Full Stack Web Application",
    budget: "$1,000 – $3,000",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<{
    name: string;
    email: string;
    projectType: string;
    enquiryId?: number;
  } | null>(null);

  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  // Automatically detect visitor country & currency on client mount
  useEffect(() => {
    let active = true;
    detectVisitorLocation().then((detected) => {
      if (!active) return;
      setGeo(detected);
      const options = getBudgetOptions(detected);
      setFormData((prev) => {
        const defaultOpts = getBudgetOptions(DEFAULT_GEO);
        const matchIdx = defaultOpts.findIndex((o) => o.value === prev.budget);
        const targetIdx = matchIdx !== -1 ? matchIdx : selectedBudgetIndex;
        const newBudget = options[targetIdx]?.value || options[1].value;
        return {
          ...prev,
          budget: newBudget,
        };
      });
    });
    return () => {
      active = false;
    };
  }, [selectedBudgetIndex]);

  const validate = () => {
    const errors: Record<string, string> = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errors.name = "Please enter your full name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errors.email = "Please provide a valid email address (e.g., name@domain.com).";
    }

    if (trimmedPhone) {
      const phoneRegex = /^[\d\s+\-()]{7,20}$/;
      if (!phoneRegex.test(trimmedPhone)) {
        errors.phone = "Please enter a valid phone number or leave blank.";
      }
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      errors.message = "Please provide project requirements (at least 10 characters).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const options = getBudgetOptions(geo);
    const idx = options.findIndex((opt) => opt.value === val);
    if (idx !== -1) {
      setSelectedBudgetIndex(idx);
    }
    setFormData((prev) => ({ ...prev, budget: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setStatus({
        type: "error",
        message: "Please correct the highlighted fields before submitting.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message.trim(),
          country: geo.country,
          countryCode: geo.countryCode,
          currency: geo.currency,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit enquiry.");
      }

      setLastSubmission({
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType,
        enquiryId: result.enquiryId,
      });

      setIsSubmitted(true);
      setStatus({
        type: "success",
        message:
          "Thank you! Your project enquiry has been safely received, recorded in Neon PostgreSQL, and dispatched to Firozkhan.",
      });

      const defaultOpts = getBudgetOptions(geo);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "Full Stack Web Application",
        budget: defaultOpts[1].value,
        message: "",
      });
      setSelectedBudgetIndex(1);
      setFieldErrors({});
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Please try again or reach out directly.";
      setStatus({
        type: "error",
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStatus({ type: "idle", message: "" });
    setFieldErrors({});
    const options = getBudgetOptions(geo);
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "Full Stack Web Application",
      budget: options[1].value,
      message: "",
    });
    setSelectedBudgetIndex(1);
  };

  return (
    <section id="services" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header matching Netflix UI */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-0.5 bg-[#e50914]" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#e50914] uppercase">
            AVAILABLE FOR PRODUCTION & FREELANCE
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase font-netflix-title tracking-tight">
          SERVICES & PROJECT ENQUIRY
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#a3a3a3] max-w-2xl font-mono">
          Whether you need an enterprise backend, offline-first business suite, or end-to-end full-stack web platform, I turn technical complexity into clean, production software.
        </p>
      </div>

      {/* Services Grid (3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="group p-5 rounded-xl border border-[#262626] bg-[#141414] hover:bg-[#1a1a1a] hover:border-[#e50914] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(229,9,20,0.2)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{srv.icon}</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-[#a3a3a3] border border-[#333]">
                  {srv.badge}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white font-netflix-title uppercase tracking-wide group-hover:text-[#e50914] transition-colors">
                {srv.title}
              </h3>

              <p className="mt-2 text-xs text-[#a3a3a3] leading-relaxed">
                {srv.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#262626]">
              <span className="text-[10px] font-mono font-bold uppercase text-[#737373] block mb-2">
                Deliverables:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {srv.deliverables.map((item) => (
                  <span
                    key={item}
                    className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/50 text-[#c2c2c2] border border-[#2e2e2e]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Enquiry Section (Form + Direct Channels) */}
      <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24">
        {/* Left: Contact Channels & Credentials (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2e2e2e]">
            <span className="text-[10px] font-mono font-bold uppercase text-[#e50914] tracking-wider">
              DIRECT DISPATCH
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-netflix-title uppercase tracking-wide mt-1">
              LET&apos;S TALK ARCHITECTURE
            </h3>
            <p className="mt-2 text-xs text-[#a3a3a3] leading-relaxed">
              Have an urgent requirement or want to discuss technical contracts? Reach out directly via WhatsApp, email, or LinkedIn.
            </p>

            <div className="mt-6 space-y-3 font-mono text-xs">
              {/* WhatsApp */}
              <a
                href="https://wa.me/918590219012?text=Hi%20Firoz%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[#1f1f1f] hover:bg-[#252525] border border-[#333] hover:border-emerald-500/50 flex items-center justify-between text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 text-base">💬</span>
                  <div>
                    <span className="block text-[10px] text-[#737373] uppercase">
                      Instant Messaging
                    </span>
                    <span className="font-bold group-hover:text-emerald-400">
                      WhatsApp: +91 8590219012
                    </span>
                  </div>
                </div>
                <span className="text-[#a3a3a3] group-hover:text-white">↗</span>
              </a>

              {/* Email */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=firoznissar@gmail.com&su=Project%20Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[#1f1f1f] hover:bg-[#252525] border border-[#333] hover:border-[#e50914] flex items-center justify-between text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#e50914] text-base">✉</span>
                  <div>
                    <span className="block text-[10px] text-[#737373] uppercase">
                      Official Email
                    </span>
                    <span className="font-bold group-hover:text-[#e50914]">
                      firoznissar@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-[#a3a3a3] group-hover:text-white">↗</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/firoz-khan-686308313/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[#1f1f1f] hover:bg-[#252525] border border-[#333] hover:border-blue-500/50 flex items-center justify-between text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 text-base">🔗</span>
                  <div>
                    <span className="block text-[10px] text-[#737373] uppercase">
                      Professional Network
                    </span>
                    <span className="font-bold group-hover:text-blue-400">
                      LinkedIn: firoz-khan
                    </span>
                  </div>
                </div>
                <span className="text-[#a3a3a3] group-hover:text-white">↗</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Firozkhan8590"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[#1f1f1f] hover:bg-[#252525] border border-[#333] hover:border-white/50 flex items-center justify-between text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white text-base">🐙</span>
                  <div>
                    <span className="block text-[10px] text-[#737373] uppercase">
                      Code Repositories
                    </span>
                    <span className="font-bold group-hover:text-white">
                      GitHub: @Firozkhan8590
                    </span>
                  </div>
                </div>
                <span className="text-[#a3a3a3] group-hover:text-white">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Functional Neon DB / Resend Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#2e2e2e]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-[#e50914] tracking-wider">
                PRISMA + RESEND INTEGRATION
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Pipeline Active
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white font-netflix-title uppercase tracking-wide mt-1">
              SEND A PROJECT ENQUIRY
            </h3>
            <p className="mt-1 text-xs text-[#a3a3a3]">
              Fill out the form below. Your request will be directly stored in Neon PostgreSQL and dispatched via Resend to Firozkhan&apos;s verified inbox.
            </p>

            {/* Error Message with direct fallback buttons */}
            {status.type === "error" && (
              <div className="mt-4 p-4 rounded-lg bg-red-950/60 border border-red-600/40 text-red-300 text-xs font-mono space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-base">✖</span>
                  <span>{status.message}</span>
                </div>
                <div className="pt-2 border-t border-red-900/50 flex flex-wrap gap-2 text-[11px]">
                  <a
                    href="https://wa.me/918590219012?text=Hi%20Firoz%2C%20I%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-[#1f1f1f] text-white hover:text-emerald-400 border border-[#333] transition-colors"
                  >
                    💬 WhatsApp Instant Chat
                  </a>
                  <a
                    href="mailto:firoznissar@gmail.com"
                    className="px-2.5 py-1 rounded bg-[#1f1f1f] text-white hover:text-[#e50914] border border-[#333] transition-colors"
                  >
                    ✉ Email Directly
                  </a>
                </div>
              </div>
            )}

            {/* Confirmation State (Duplicate Submission Prevention) */}
            {isSubmitted && lastSubmission ? (
              <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-[#181818] via-emerald-950/20 to-[#121212] border border-emerald-500/40 text-left font-mono space-y-4">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm sm:text-base">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-xs">
                    ✔
                  </span>
                  <span>ENQUIRY DISPATCHED & LOGGED</span>
                </div>

                <p className="text-xs text-[#a3a3a3] leading-relaxed">
                  Thank you, <strong className="text-white">{lastSubmission.name}</strong>. Your enquiry for a <strong className="text-white">{lastSubmission.projectType}</strong> project has been successfully stored in Neon DB
                  {lastSubmission.enquiryId ? ` (Reference ID #${lastSubmission.enquiryId})` : ""} and forwarded to Firozkhan.
                </p>

                <div className="p-3 rounded-lg bg-[#0d0d0d] border border-[#262626] text-[11px] text-[#737373] space-y-1">
                  <div>Confirmation dispatched to: <span className="text-white">{lastSubmission.email}</span></div>
                  <div>Detected Location & Currency: <span className="text-white">{geo.country} ({geo.countryCode})</span> &bull; <span className="text-emerald-400 font-bold">{geo.currency}</span></div>
                  <div>Estimated reply time: <span className="text-emerald-400">Within 24 Hours</span></div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded bg-[#1f1f1f] hover:bg-[#282828] border border-[#3e3e3e] hover:border-[#e50914] text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Send Another Enquiry ↩
                  </button>
                </div>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#a3a3a3] mb-1.5 uppercase tracking-wider text-[10px]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      disabled={loading}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full px-3.5 py-2.5 rounded bg-[#1f1f1f] border text-white focus:outline-none transition-colors disabled:opacity-50 text-[13px] ${fieldErrors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#333] focus:border-[#e50914]"
                        }`}
                    />
                    {fieldErrors.name && (
                      <span className="block text-red-400 text-[10px] mt-1">
                        {fieldErrors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#a3a3a3] mb-1.5 uppercase tracking-wider text-[10px]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      disabled={loading}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className={`w-full px-3.5 py-2.5 rounded bg-[#1f1f1f] border text-white focus:outline-none transition-colors disabled:opacity-50 text-[13px] ${fieldErrors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#333] focus:border-[#e50914]"
                        }`}
                    />
                    {fieldErrors.email && (
                      <span className="block text-red-400 text-[10px] mt-1">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#a3a3a3] mb-1.5 uppercase tracking-wider text-[10px]">
                      Phone (Optional)
                    </label>
                    <input
                      type="text"
                      name="phone"
                      disabled={loading}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 58 826 2511"
                      className={`w-full px-3.5 py-2.5 rounded bg-[#1f1f1f] border text-white focus:outline-none transition-colors disabled:opacity-50 text-[13px] ${fieldErrors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#333] focus:border-[#e50914]"
                        }`}
                    />
                    {fieldErrors.phone && (
                      <span className="block text-red-400 text-[10px] mt-1">
                        {fieldErrors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#a3a3a3] mb-1.5 uppercase tracking-wider text-[10px]">
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      disabled={loading}
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded bg-[#1f1f1f] border border-[#333] text-white focus:outline-none focus:border-[#e50914] transition-colors disabled:opacity-50 text-[13px]"
                    >
                      <option value="Full Stack Web Application">
                        Full Stack Web Application
                      </option>
                      <option value="Multi-Tenant SaaS Platform">
                        Multi-Tenant SaaS Platform
                      </option>
                      <option value="Backend API & Database Engineering">
                        Backend API & Database Engineering
                      </option>
                      <option value="Offline-First Retail ERP">
                        Offline-First Retail ERP
                      </option>
                      <option value="Full-Time Engineering Role">
                        Full-Time Engineering Role
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[#a3a3a3] uppercase tracking-wider text-[10px]">
                      Estimated Budget / Scope
                    </label>
                    <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Auto-detected: <strong className="text-white font-bold">{geo.currency}</strong> ({geo.countryCode})
                    </span>
                  </div>
                  <select
                    name="budget"
                    disabled={loading}
                    value={formData.budget}
                    onChange={handleBudgetChange}
                    className="w-full px-3.5 py-2.5 rounded bg-[#1f1f1f] border border-[#333] text-white focus:outline-none focus:border-[#e50914] transition-colors disabled:opacity-50 text-[13px]"
                  >
                    {getBudgetOptions(geo).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#a3a3a3] mb-1.5 uppercase tracking-wider text-[10px]">
                    Project Details / Requirements *
                  </label>
                  <textarea
                    name="message"
                    required
                    disabled={loading}
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, and key requirements..."
                    className={`w-full px-3.5 py-2.5 rounded bg-[#1f1f1f] border text-white focus:outline-none transition-colors disabled:opacity-50 text-[13px] ${fieldErrors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#333] focus:border-[#e50914]"
                      }`}
                  />
                  {fieldErrors.message && (
                    <span className="block text-red-400 text-[10px] mt-1">
                      {fieldErrors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded bg-[#e50914] hover:bg-[#f40612] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Saving to Neon DB & Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <span>✉</span>
                      <span>Submit Project Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
