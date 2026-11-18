"use client";

import React from "react";
import Image from "next/image";
import { ProjectData } from "./ProjectDetailModal";

interface TopPicksBillboardProps {
  onOpenProject: (project: ProjectData) => void;
  onNavigate: (sectionId: string) => void;
}

interface RankedItem {
  rank: number;
  id: string;
  type: "project" | "experience";
  title: string;
  categoryTag: string;
  badge: string;
  shortDesc: string;
  technologies: string[];
  gradient: string;
  projectPayload?: ProjectData;
  targetId?: string;
  image?: string;
}

export const TOP_PICKS: RankedItem[] = [
  {
    rank: 1,
    id: "maj-and-sons-manager",
    type: "project",
    title: "MAJ & SONS SHOP MANAGER",
    categoryTag: "OFFLINE-FIRST · BUSINESS SUITE",
    badge: "PRODUCTION CORE",
    shortDesc:
      "Complete offline-first retail ERP: instant billing, purchase invoices, inventory registers, and customer/supplier balance ledgers.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    gradient: "from-amber-950/80 via-stone-900 to-[#121212]",
    projectPayload: {
      id: "maj-and-sons-manager",
      title: "Maj & Sons Shop Business Manager",
      categoryTag: "OFFLINE-FIRST · RETAIL ERP",
      badge: "Flagship Software",
      statusBadge: "Active Production Engine",
      shortDesc:
        "Full-fledged business management suite crafted for real-world retail workflows with offline resilience.",
      fullDesc:
        "Engineered for high-throughput counter billing and deep retail accounting. Features real-time stock deductions, multi-supplier invoice matching, PDF receipts, customer debit/credit ledgers, cash register balancing, and robust data integrity.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Tailwind CSS",
        "IndexedDB Sync",
      ],
      keyFeatures: [
        "Instant POS Counter Billing with thermal invoice generation",
        "Supplier Purchase Invoice registry with tax & item breakdown",
        "Real-time Inventory & Low-Stock Alerts",
        "Customer & Supplier Khata/Ledger balance reconciliation",
        "Cash Drawer day-closing registers with debit/credit audits",
      ],
    },
  },
  {
    rank: 2,
    id: "ticket-system",
    type: "project",
    title: "STUDENT SUPPORT TICKET SYSTEM",
    categoryTag: "ENTERPRISE HELPDESK · API ENGINE",
    badge: "WORKFLOW ENGINE",
    shortDesc:
      "Enterprise support ticket resolution system with multi-role access control, PostgreSQL schema, and real-time SLA metrics.",
    technologies: ["Node.js", "Express.js", "PostgreSQL", "JWT", "Prisma"],
    gradient: "from-sky-950/80 via-slate-900 to-[#121212]",
    projectPayload: {
      id: "ticket-system",
      title: "Student Support Ticket Management System",
      categoryTag: "ENTERPRISE HELPDESK · API ENGINE",
      badge: "Full-Stack System",
      statusBadge: "Completed Architecture",
      shortDesc:
        "A multi-tiered ticket lifecycle platform ensuring rapid dispute and query resolutions for academic institutions.",
      fullDesc:
        "Built to replace messy email threads with structured, auditable ticketing. Implements strict role-based access control (Students, Department Admins, Support Agents), automatic ticket assignment, priority queues, and audit log histories in PostgreSQL.",
      technologies: [
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Prisma ORM",
        "JWT / RBAC",
        "REST APIs",
      ],
      keyFeatures: [
        "Role-Based Access Control (Admin, Agent, Student)",
        "Lifecycle state machine (Open, In Progress, Escalate, Closed)",
        "Automated priority tagging and SLA countdown timers",
        "Department-level ticket queue filtering & assignment",
        "Comprehensive PostgreSQL audit trail for dispute transparency",
      ],
    },
  },
  {
    rank: 3,
    id: "dineflow",
    type: "project",
    title: "DINEFLOW RESTAURANT SAAS",
    categoryTag: "MULTI-TENANT SAAS · QR ORDERING",
    badge: "SAAS ORIGINAL",
    shortDesc:
      "Multi-tenant restaurant operating platform: QR table ordering, dynamic schema isolation, digital menus, and live kitchen orders.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Docker", "Tailwind CSS"],
    gradient: "from-red-950/80 via-stone-900 to-[#121212]",
    projectPayload: {
      id: "dineflow",
      title: "DineFlow Restaurant SaaS",
      categoryTag: "MULTI-TENANT SAAS · QR ORDERING",
      badge: "SaaS Architecture",
      statusBadge: "Multi-Tenant Platform",
      shortDesc:
        "Scalable restaurant management SaaS supporting instantaneous QR-code menu browsing and order dispatch.",
      fullDesc:
        "Architected with multi-tenancy in mind, allowing individual restaurant operators to manage digital menus, dine-in tables, and kitchen display feeds. Built with tenant database provisioning, real-time WebSocket ordering, and Stripe/Razorpay payment readiness.",
      technologies: [
        "Next.js",
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "Docker Compose",
        "WebSockets",
      ],
      keyFeatures: [
        "Dynamic Multi-Tenant isolation & tenant database routing",
        "Table-specific QR code instant web ordering (zero app download)",
        "Live Kitchen Display System (KDS) order sync",
        "Menu category, modifiers, tax & inventory toggle engine",
        "Manager analytics for revenue, table turnover & order velocity",
      ],
    },
  },
  {
    rank: 4,
    id: "sodisys-experience",
    type: "experience",
    title: "SODISYS ENGINEERING EXPERIENCE",
    categoryTag: "ASSOCIATE SOFTWARE ENGINEER",
    badge: "CAREER CHAPTER",
    shortDesc:
      "Associate Software Engineer (Mar 2026 – Sep 2026) & Backend Intern (Sep 2025 – Mar 2026): High-scale REST APIs, microservices, and DB optimizations.",
    technologies: ["Node.js", "Express.js", "NestJS", "PostgreSQL", "Docker", "Git"],
    gradient: "from-emerald-950/80 via-slate-900 to-[#121212]",
    targetId: "experience",
  },
  {
    rank: 5,
    id: "srishti-experience",
    type: "experience",
    title: "SRISHTI TECHNOPARK INTERNSHIP",
    categoryTag: "PYTHON FULL STACK DEVELOPER INTERN",
    badge: "CAREER CHAPTER",
    shortDesc:
      "Full-stack development at Technopark (Jan 2025 – Sep 2025): Python, Django backend systems, API integration, and database workflows.",
    technologies: ["Python", "Django", "PostgreSQL", "REST APIs", "JavaScript"],
    gradient: "from-indigo-950/80 via-neutral-900 to-[#121212]",
    targetId: "experience",
  },
];

export default function TopPicksBillboard({
  onOpenProject,
  onNavigate,
}: TopPicksBillboardProps) {
  const handleClick = (item: RankedItem) => {
    if (item.type === "project" && item.projectPayload) {
      onOpenProject(item.projectPayload);
    } else if (item.targetId) {
      onNavigate(item.targetId);
    }
  };

  return (
    <section id="top-picks" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section matching reference video */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-0.5 bg-[#e50914]" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#e50914] uppercase">
            TOP 5 — FROM THE RESUME
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase font-netflix-title tracking-tight">
          FIROZKHAN&apos;S TOP PICKS
        </h2>
      </div>

      {/* Ranked Row with giant outline numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {TOP_PICKS.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className="group relative flex flex-col justify-end min-h-[300px] sm:min-h-[340px] rounded-xl overflow-hidden border border-[#262626] bg-[#141414] p-4 cursor-pointer transition-all duration-300 hover:border-[#e50914] hover:shadow-[0_15px_30px_rgba(229,9,20,0.3)] hover:-translate-y-2 select-none"
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
            />

            {/* Giant Netflix Outline Rank Number */}
            <div className="absolute top-2 left-2 z-10">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black outline-number tracking-tighter opacity-80 group-hover:opacity-100 select-none pointer-events-none">
                {item.rank}
              </span>
            </div>

            {/* Top Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-black/70 text-[#a3a3a3] border border-[#3e3e3e]">
                {item.badge}
              </span>
            </div>

            {/* Content info aligned at bottom */}
            <div className="relative z-20 mt-auto pt-24">
              <span className="text-[10px] font-mono font-bold uppercase text-[#e50914] tracking-wider block">
                {item.categoryTag}
              </span>

              <h3 className="text-base sm:text-lg font-black text-white font-netflix-title uppercase tracking-wide mt-1 group-hover:text-white transition-colors leading-tight drop-shadow">
                {item.title}
              </h3>

              <p className="mt-2 text-xs text-[#a3a3a3] leading-relaxed line-clamp-3">
                {item.shortDesc}
              </p>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-[#c2c2c2] border border-[#333]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Click action indicator */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#a3a3a3] group-hover:text-white">
                <span className="font-mono text-[10px]">
                  {item.type === "project" ? "Inspect Architecture" : "View Experience"}
                </span>
                <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#e50914] flex items-center justify-center text-white text-[10px] transition-colors">
                  ▶
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

