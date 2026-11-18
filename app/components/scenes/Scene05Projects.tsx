"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Code2,
  CheckCircle,
  Clock,
  Layers,
  Database,
  Server,
  QrCode,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Globe,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { soundEngine } from "../../lib/sound";

type ProjectCategory = "priority" | "additional" | "all";

interface ProjectData {
  id: string;
  number: string;
  title: string;
  categoryTag: string;
  subtitle: string;
  logline: string;
  isPriority: boolean;
  techStack: string[];
  frontend: string;
  backend: string;
  database: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;

  modules?: {
    completed: string[];
    pending: string[];
  };
  workflowSteps?: {
    step: string;
    label: string;
    desc: string;
  }[];
  apiEndpoints?: {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    endpoint: string;
    desc: string;
  }[];
  architectureHighlights?: string[];
}

const projects: ProjectData[] = [
  // =========================================================================
  // 1. MAJ & SONS SHOP BUSINESS MANAGER
  // =========================================================================
  {
    id: "maj-and-sons",
    number: "01",
    title: "Maj & Sons — Shop Business Manager",
    categoryTag: "FLAGSHIP 3D SHOWCASE · RETAIL ERP & LEDGER SYSTEM",
    subtitle: "Offline-First Enterprise Retail Invoicing & Double-Entry Ledger Engine",
    logline:
      "Engineered for high-volume retail businesses to execute point-of-sale billing, supplier purchase invoices, real-time inventory reconciliation, and double-entry customer/supplier ledgers without cloud dependency.",
    isPriority: true,
    techStack: ["React", "NestJS", "TypeScript", "MySQL", "REST APIs", "Billing Engine", "Ledger Core"],
    frontend: "React & TypeScript Component Hierarchy",
    backend: "NestJS Modular Micro-architecture",
    database: "MySQL with local caching & ledger indexing",
    images: [
      "/Bananaa/1.png",
      "/Bananaa/2.png",
      "/Bananaa/3.png",
      "/Bananaa/4.png",
    ],
    githubUrl: "https://github.com/Firozkhan8590",
    modules: {
      completed: [
        "POS High-Speed Billing Terminal (Barcode lookup & instant receipt generation)",
        "Purchase Invoices & Vendor Batch Stock Intake",
        "Real-Time Inventory Stock Tracking & Minimum Level Alerts",
        "Customer Account Ledger with Credit-Debit Balance Auditing",
        "Supplier Ledger with Outstanding Payment Schedules",
        "Daily Sales, Cash Flow, and Tax Summary Reports",
      ],
      pending: [
        "Automated WhatsApp & SMS Invoice PDF Dispatch (Roadmap)",
        "Multi-Branch Cloud Data Synchronization & Master Sync",
        "Automated GST e-Way Bill & E-Invoice Generation Pipeline",
      ],
    },
    workflowSteps: [
      { step: "01", label: "POS Billing", desc: "Instant product lookup, custom pricing, and GST receipt creation." },
      { step: "02", label: "Purchase Intake", desc: "Log vendor invoices, update cost prices, and credit supplier ledger." },
      { step: "03", label: "Inventory Sync", desc: "Automatic deduction of stock levels and low-inventory telemetry." },
      { step: "04", label: "Ledger Reconciliation", desc: "Real-time debit-credit double entry balancing per party." },
    ],
    architectureHighlights: [
      "Sub-millisecond billing transaction execution under local SQLite/MySQL caches.",
      "Strict double-entry accounting model ensuring mathematical parity in customer and vendor balances.",
      "Clean separation between POS frontend view and NestJS business accounting service layers.",
    ],
  },

  // =========================================================================
  // 2. STUDENT SUPPORT TICKET MANAGEMENT SYSTEM
  // =========================================================================
  {
    id: "student-ticket-system",
    number: "02",
    title: "Student Support Ticket Management System",
    categoryTag: "FLAGSHIP 3D SHOWCASE · ENTERPRISE SLA DISPATCH",
    subtitle: "PostgreSQL-Powered Academic Helpdesk & Automated Ticket Routing Engine",
    logline:
      "Enterprise support ticket resolution pipeline built for academic institutions. Features structured ticket triage, strict SLA response escalations, role-based access control, and a real-time administrative telemetry dashboard.",
    isPriority: true,
    techStack: ["Python", "Django", "PostgreSQL", "REST APIs", "Tailwind CSS", "SLA Engine", "RBAC"],
    frontend: "Responsive Dashboard UI with Real-time Status Relays",
    backend: "Python / Django with Modular API Layer",
    database: "PostgreSQL on Neon DB (Normalized Schema & Audit Logs)",
    githubUrl: "https://github.com/Firozkhan8590",
    workflowSteps: [
      { step: "01", label: "Intake & Classification", desc: "Student creates ticket with department tagging (Academic, Hostel, Fees, Technical) and file attachments." },
      { step: "02", label: "SLA Matrix Routing", desc: "System assigns priority (Critical 24h, High 48h, Normal 72h) and routes to designated faculty queue." },
      { step: "03", label: "Status State Machine", desc: "Transitions across OPEN → IN REVIEW → IN PROGRESS → RESOLVED → CLOSED with audit logs." },
      { step: "04", label: "Telemetry & Closing", desc: "Staff closes ticket with resolution notes; SLA response duration logged to analytics table." },
    ],
    apiEndpoints: [
      { method: "POST", endpoint: "/api/v1/tickets", desc: "Submit ticket with category, priority, and file attachment payload." },
      { method: "GET", endpoint: "/api/v1/tickets/queue", desc: "Fetch assigned tickets filtered by role permissions and SLA status." },
      { method: "PATCH", endpoint: "/api/v1/tickets/:id/status", desc: "Enforce state machine transition with timestamped audit trail." },
      { method: "GET", endpoint: "/api/v1/dashboard/metrics", desc: "Aggregate resolution times, SLA compliance percentage, and department bottlenecks." },
    ],
    architectureHighlights: [
      "Relational PostgreSQL schema with foreign key constraints across Users, Categories, Tickets, and Reply Audits.",
      "Configurable SLA timer engine tracking response latency and flagging breached tickets.",
      "Role-Based Access Control (RBAC) separating Student viewports from Faculty resolvers and SuperAdmin analytics.",
    ],
  },

  // =========================================================================
  // 3. DINEFLOW — RESTAURANT QR ORDERING SAAS
  // =========================================================================
  {
    id: "dineflow-saas",
    number: "03",
    title: "DineFlow — Restaurant QR Ordering SaaS",
    categoryTag: "FLAGSHIP 3D SHOWCASE · MULTI-TENANT CLOUD SAAS",
    subtitle: "Cloud-Native Contactless Dining, Dynamic Tenant Provisioning & Kitchen Relays",
    logline:
      "High-scale SaaS platform engineered for multi-unit restaurant brands. Enables contactless table-side QR menu ordering, dynamic multi-tenant schema isolation, and instant WebSocket relays directly to Kitchen Display Systems (KDS).",
    isPriority: true,
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "WebSockets", "Multi-tenancy"],
    frontend: "Next.js App Router with Dynamic Subdomain Routing",
    backend: "Node.js & NestJS Microservices",
    database: "PostgreSQL Multi-Tenant Provisioned Database",
    githubUrl: "https://github.com/Firozkhan8590",
    workflowSteps: [
      { step: "01", label: "QR Scan & Subdomain", desc: "Customer scans table QR; browser routes to tenant subdomain with table identifier." },
      { step: "02", label: "Dynamic Menu Engine", desc: "Zero-latency menu rendering with live 86'd (out-of-stock) item synchronization." },
      { step: "03", label: "Cart & Payment Dispatch", desc: "Direct order dispatch via WebSocket pipeline to Kitchen Display System (KDS)." },
      { step: "04", label: "Kitchen Triage", desc: "Chefs mark dish states (Prepping → Plated → Served) updating customer screen in real time." },
    ],
    architectureHighlights: [
      "Multi-tenant isolation: Tenant identification via subdomains (`tenant.dineflow.app`) with isolated database provisioning.",
      "Zero-install web experience: Guests browse and order in seconds without downloading mobile apps.",
      "Real-time event stream: Instant order push to kitchen and billing counter terminals via WebSocket relay.",
    ],
  },

  // =========================================================================
  // 4. MAJ & SONS SHOP WEBSITE
  // =========================================================================
  {
    id: "maj-and-sons-website",
    number: "04",
    title: "Maj & Sons — Shop E-Commerce Website",
    categoryTag: "FLAGSHIP 3D SHOWCASE · DIGITAL STOREFRONT",
    subtitle: "Customer-Facing Online Catalog, Order Intake & Storefront Companion",
    logline:
      "Modern digital storefront developed as the public customer portal companion for Maj & Sons retail business. Enables retail consumers to browse live inventory, place advance pick-up orders, and view product promotions.",
    isPriority: true,
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API", "Responsive UX"],
    frontend: "Next.js & React Responsive E-Commerce Architecture",
    backend: "NestJS Product Catalog API Gateway",
    database: "MySQL Store Database Synchronized with POS Engine",
    images: [
      "/Bananaa/1.png",
      "/Bananaa/2.png",
      "/Bananaa/3.png",
    ],
    githubUrl: "https://github.com/Firozkhan8590",
    architectureHighlights: [
      "Real-time product inventory sync between the physical store POS and public web catalog.",
      "Optimized mobile browsing interface with instant category filtering and search index.",
      "Seamless customer advance booking and delivery enquiry pipeline.",
    ],
  },

  // =========================================================================
  // 5. MEDI AI
  // =========================================================================
  {
    id: "medi-ai",
    number: "05",
    title: "Medi AI — Healthcare Platform",
    categoryTag: "ADDITIONAL ARCHIVE · HEALTHCARE AI",
    subtitle: "AI-Integrated Patient Triage & Medical Administration Ecosystem",
    logline:
      "Comprehensive healthcare portal integrating AI diagnostic triage, doctor consultation schedules, patient prescription records, and an intelligent wellness assistant.",
    isPriority: false,
    techStack: ["Python", "Django", "JavaScript", "HTML5 & CSS3", "SQLite", "AI Integration"],
    frontend: "HTML5, CSS3, JavaScript Responsive Portal",
    backend: "Python & Django Backend Engine",
    database: "SQLite & Django ORM Schema",
    images: [
      "/mediaihome.png",
      "/aiinteraction.png",
      "/doctordashboard.png",
      "/eCommercePage.png",
    ],
    githubUrl: "https://github.com/Firozkhan8590",
    architectureHighlights: [
      "Role-based multi-user portal separating Admin, Doctor, and Patient access scopes.",
      "AI health conversation assistant providing immediate first-level guidance and symptoms triage.",
      "Doctor dashboard managing appointments, medical history, and clinical records.",
    ],
  },

  // =========================================================================
  // 6. BANANAA SHOP
  // =========================================================================
  {
    id: "bananaa-shop",
    number: "06",
    title: "Bananaa Shop — Business Platform",
    categoryTag: "ADDITIONAL ARCHIVE · BUSINESS SOFTWARE",
    subtitle: "Retail Ledger & Invoicing System for Commercial Stores",
    logline:
      "Real-world business management and billing application designed to streamline customer invoicing, catalog inventory, supplier ledgers, and revenue auditing.",
    isPriority: false,
    techStack: ["React", "NestJS", "TypeScript", "REST API", "Ledger Accounting", "Database"],
    frontend: "React & TypeScript Frontend",
    backend: "NestJS RESTful APIs",
    database: "Relational Database Management System",
    images: [
      "/Bananaa/1.png",
      "/Bananaa/2.png",
      "/Bananaa/3.png",
      "/Bananaa/4.png",
    ],
    githubUrl: "https://github.com/Firozkhan8590",
    architectureHighlights: [
      "Customer and vendor ledger tracking for commercial retail stores.",
      "Product cataloging with batch pricing, discounts, and tax computation.",
      "Built with NestJS backend architecture and responsive React frontend.",
    ],
  },

  // =========================================================================
  // 7. AEROTRACK
  // =========================================================================
  {
    id: "aerotrack-platform",
    number: "07",
    title: "AeroTrack — Flight & Travel Platform",
    categoryTag: "ADDITIONAL ARCHIVE · TRAVEL SYSTEM",
    subtitle: "Flight Discovery, Interactive Seat Matrix & Travel Reservation Portal",
    logline:
      "Travel platform offering dynamic flight search, live aircraft seat selection that dynamically adapts to cabin availability, booking flows, and passenger itineraries.",
    isPriority: false,
    techStack: ["Python", "Django", "JavaScript", "Tailwind CSS", "Flight APIs", "Seat Matrix"],
    frontend: "Interactive Seat Grid & Tailwind CSS",
    backend: "Python & Django Server Core",
    database: "SQLite Relational Data Storage",
    images: [
      "/Aerotrack/1.png",
      "/Aerotrack/2.png",
      "/Aerotrack/3.png",
    ],
    githubUrl: "https://github.com/Firozkhan8590",
    architectureHighlights: [
      "Dynamic visual seat map updating in real-time based on seat tier (Window, Aisle, Extra Legroom).",
      "Flight search query engine filtering departure hubs, arrival destinations, and fare categories.",
      "Complete booking and reservation confirmation lifecycle.",
    ],
  },
];

export default function Scene05Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("priority");

  const filteredProjects = projects.filter((p) => {
    if (filter === "priority") return p.isPriority;
    if (filter === "additional") return !p.isPriority;
    return true;
  });

  return (
    <section
      id="scene-05"
      className="relative min-h-screen w-full overflow-hidden bg-[#030305] px-6 py-28 text-white preserve-3d"
    >
      {/* Background Volumetric Glows */}
      <div className="pointer-events-none absolute -left-48 top-1/4 h-[600px] w-[600px] rounded-full bg-[#d4af37]/6 blur-[190px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/3 h-[600px] w-[600px] rounded-full bg-[#785a14]/10 blur-[190px]" />

      <div className="relative z-10 mx-auto max-w-[1550px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-5 py-2 font-mono text-xs tracking-[0.35em] text-[#f3e5ab] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Sparkles size={12} className="text-[#d4af37]" />
            <span>SCENE 05 // 3D PROJECT SHOWCASES</span>
          </div>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            THE PROJECT{" "}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8214] bg-clip-text text-transparent">
              SHOWCASES
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl font-mono text-sm text-gray-400">
            Immersive 3D showcases of enterprise business management, academic ticketing, multi-tenant cloud SaaS, and live production platforms.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => {
                soundEngine.playTelemetry(700);
                setFilter("priority");
              }}
              className={`rounded-full px-6 py-2.5 font-mono text-xs font-bold tracking-wider transition-all duration-300 ${filter === "priority"
                  ? "bg-[#d4af37] text-black shadow-[0_0_25px_rgba(212,175,55,0.45)]"
                  : "border border-white/10 bg-[#121217]/80 text-gray-400 hover:text-white hover:border-[#d4af37]/40"
                }`}
            >
              ★ HIGHEST PRIORITY 3D SHOWCASES (4)
            </button>

            <button
              onClick={() => {
                soundEngine.playTelemetry(750);
                setFilter("additional");
              }}
              className={`rounded-full px-6 py-2.5 font-mono text-xs font-bold tracking-wider transition-all duration-300 ${filter === "additional"
                  ? "bg-[#d4af37] text-black shadow-[0_0_25px_rgba(212,175,55,0.45)]"
                  : "border border-white/10 bg-[#121217]/80 text-gray-400 hover:text-white hover:border-[#d4af37]/40"
                }`}
            >
              EXPANDED ARCHIVES (3)
            </button>

            <button
              onClick={() => {
                soundEngine.playTelemetry(800);
                setFilter("all");
              }}
              className={`rounded-full px-6 py-2.5 font-mono text-xs font-bold tracking-wider transition-all duration-300 ${filter === "all"
                  ? "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                  : "border border-white/10 bg-[#121217]/80 text-gray-400 hover:text-white hover:border-[#d4af37]/40"
                }`}
            >
              ALL SYSTEMS ({projects.length})
            </button>
          </div>
        </div>

        {/* 3D Approaching Project Cards Stream */}
        <div className="space-y-24 preserve-3d">
          {filteredProjects.map((project, index) => {
            const isPriority = project.isPriority;

            return (
              <Project3DCard
                key={project.id}
                project={project}
                index={index}
                isPriority={isPriority}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Sub-component with 3D Depth & Approaching Scroll Physics
function Project3DCard({
  project,
  index,
  isPriority,
}: {
  project: ProjectData;
  index: number;
  isPriority: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // 3D Dolly-in effect: As the visitor scrolls into the card, it rotates up from deep Z and scales to 1.0
  const zPosition = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [-180, 0, 0, -120]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [10, 0, 0, -8]);
  const cardScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.92, 1, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.2, 1, 1, 0.3]);

  return (
    <motion.article
      ref={cardRef}
      style={{ z: zPosition, rotateX, scale: cardScale, opacity }}
      className={`relative overflow-hidden rounded-3xl border ${isPriority
          ? "border-[#d4af37]/40 bg-gradient-to-b from-[#16161f]/95 via-[#101017]/95 to-[#08080c] shadow-[0_10px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.1)]"
          : "border-white/15 bg-[#121217]/90 shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
        } p-6 sm:p-10 backdrop-blur-2xl preserve-3d transition-colors duration-500`}
    >
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/10 font-mono text-xs font-bold text-[#f3e5ab]">
            {project.number}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            {project.categoryTag}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playTelemetry(880)}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-[#16161c] px-3.5 py-1.5 font-mono text-xs text-gray-300 hover:border-[#d4af37] hover:text-[#f3e5ab] transition-all"
            >
              <SiGithub size={14} /> Source Code
            </a>
          )}
          {isPriority && (
            <span className="rounded-full border border-[#d4af37]/50 bg-[#d4af37]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#f3e5ab] shadow-[0_0_12px_rgba(212,175,55,0.3)] font-bold">
              ★ FLAGSHIP
            </span>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Specs & Workflows (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="text-3xl font-black text-white sm:text-4xl md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-2.5 font-mono text-sm text-[#f3e5ab]">
              {project.subtitle}
            </p>
          </div>

          <p className="text-base leading-relaxed text-gray-300">
            {project.logline}
          </p>

          {/* Architecture Highlights */}
          {project.architectureHighlights && (
            <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/90 p-5 space-y-2">
              <p className="font-mono text-xs uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Layers size={14} className="text-[#d4af37]" />
                ARCHITECTURAL CAPABILITIES:
              </p>
              <ul className="space-y-1.5">
                {project.architectureHighlights.map((hi, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-gray-300">
                    <span className="text-[#d4af37] mt-0.5">•</span>
                    <span>{hi}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Workflows Steps (If provided) */}
          {project.workflowSteps && (
            <div className="space-y-3 pt-2">
              <p className="font-mono text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-2 font-bold">
                <Server size={14} className="text-[#d4af37]" />
                REAL BUSINESS WORKFLOW SEQUENCE:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.workflowSteps.map((ws) => (
                  <div key={ws.step} className="rounded-xl border border-white/10 bg-[#16161c]/80 p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#d4af37]">{ws.step}</span>
                      <h5 className="font-mono text-xs font-semibold text-white">{ws.label}</h5>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-gray-400">{ws.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Maj & Sons Modules (Completed vs Pending) */}
          {project.modules && (
            <div className="space-y-4 pt-2">
              <p className="font-mono text-xs uppercase tracking-wider text-gray-300 font-bold">
                BUSINESS MODULE BREAKDOWN:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Completed */}
                <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/[0.04] p-4">
                  <div className="flex items-center gap-2 text-emerald-400 mb-3 font-mono text-xs font-bold uppercase tracking-wider">
                    <CheckCircle size={15} />
                    <span>COMPLETED MODULES (PRODUCTION)</span>
                  </div>
                  <ul className="space-y-2">
                    {project.modules.completed.map((mod, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pending / Roadmap */}
                <div className="rounded-2xl border border-amber-500/35 bg-amber-500/[0.04] p-4">
                  <div className="flex items-center gap-2 text-amber-400 mb-3 font-mono text-xs font-bold uppercase tracking-wider">
                    <Clock size={15} />
                    <span>ROADMAP / PENDING MODULES</span>
                  </div>
                  <ul className="space-y-2">
                    {project.modules.pending.map((mod, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-amber-400 mt-0.5">⏳</span>
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Student Ticket APIs (If provided) */}
          {project.apiEndpoints && (
            <div className="space-y-3 pt-2">
              <p className="font-mono text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-2 font-bold">
                <Code2 size={14} className="text-[#d4af37]" />
                BACKEND RESTFUL ENDPOINTS & POSTGRESQL INTEGRATION:
              </p>
              <div className="rounded-xl border border-white/10 bg-[#0d0d12]/95 p-4 font-mono text-xs space-y-2.5">
                {project.apiEndpoints.map((api, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${api.method === "POST" ? "bg-emerald-500/20 text-emerald-300" :
                          api.method === "PATCH" ? "bg-amber-500/20 text-amber-300" : "bg-[#d4af37]/20 text-[#f3e5ab]"
                        }`}>
                        {api.method}
                      </span>
                      <span className="text-gray-200">{api.endpoint}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 sm:text-right">{api.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-[#d4af37]/25 bg-[#16161c] px-3 py-1 font-mono text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Scene / Real Screenshots (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {project.images && project.images.length > 0 ? (
            <div className="space-y-3">
              {/* Primary Image Viewport with 3D Float Shadow */}
              <div className="group/img relative h-[280px] sm:h-[350px] w-full overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-black/60 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)]">
                <Image
                  src={project.images[0]}
                  alt={`${project.title} real screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 rounded-lg border border-[#d4af37]/40 bg-[#121217]/90 px-3 py-1.5 font-mono text-[10px] tracking-wider text-[#f3e5ab] backdrop-blur-md">
                  PRIMARY SYSTEM SCREENSHOT
                </div>
              </div>

              {/* Additional Module Thumbnails */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2.5">
                  {project.images.slice(1, 4).map((img, i) => (
                    <div
                      key={i}
                      className="group/thumb relative h-24 overflow-hidden rounded-xl border border-white/10 bg-[#121217] transition-all hover:border-[#d4af37] shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} module ${i + 2}`}
                        fill
                        sizes="180px"
                        className="object-cover object-top transition-transform duration-500 group-hover/thumb:scale-110"
                      />
                      <div className="absolute bottom-1 left-1 rounded bg-black/85 px-1.5 py-0.5 font-mono text-[8px] text-gray-300">
                        MODULE 0{i + 2}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Architectural 3D Blueprint Frame when no direct image file is stored */
            <div className="relative flex flex-col justify-between rounded-2xl border border-[#d4af37]/40 bg-[#121217] p-6 min-h-[380px] shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.1)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-ping" />
                  <span className="font-mono text-xs uppercase text-[#f3e5ab] font-bold">
                    SYSTEM TELEMETRY BLUEPRINT
                  </span>
                </div>
                <span className="font-mono text-[10px] text-gray-400">v2.4.0 PROD</span>
              </div>

              {/* Interactive Blueprint Visual */}
              <div className="my-6 space-y-4">
                {project.id === "dineflow-saas" ? (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="rounded-xl border border-[#d4af37]/30 bg-[#16161c] p-3.5">
                      <div className="flex items-center gap-2 text-[#f3e5ab] font-bold mb-1">
                        <QrCode size={16} className="text-[#d4af37]" /> QR CONTACTLESS ORDERING FLOW
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Guest Device → Subdomain Router (`tenant.dineflow.app`) → Live WebSocket Stream → Kitchen Terminal
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#d4af37]/30 bg-[#16161c] p-3.5">
                      <div className="flex items-center gap-2 text-[#f3e5ab] font-bold mb-1">
                        <Database size={16} className="text-[#d4af37]" /> MULTI-TENANT ISOLATION
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Automated tenant schema provisioning & separate storage contexts preventing cross-tenant data bleed.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="rounded-xl border border-emerald-500/30 bg-[#16161c] p-3.5">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold mb-1">
                        <Database size={16} /> POSTGRESQL RELATIONAL ENGINE
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Tables: Users, Roles, Categories, Tickets, AuditLogs, SlaPolicies with ACID transactional guarantees.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#d4af37]/30 bg-[#16161c] p-3.5">
                      <div className="flex items-center gap-2 text-[#f3e5ab] font-bold mb-1">
                        <ShieldAlert size={16} className="text-[#d4af37]" /> SLA ESCALATION MATRIX
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Automated priority elevation, department assignment queues, and resolution compliance logs.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Status */}
              <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[11px] text-gray-400">
                <span>AUTHENTIC ARCHITECTURE</span>
                <span className="text-[#d4af37] font-bold">STATUS: VERIFIED</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
