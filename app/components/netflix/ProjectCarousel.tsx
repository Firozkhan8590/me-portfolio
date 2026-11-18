"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ProjectData } from "./ProjectDetailModal";

interface ProjectCarouselProps {
  onOpenProject: (project: ProjectData) => void;
}

export const FEATURED_SOFTWARE: ProjectData[] = [
  {
    id: "maj-and-sons-business-manager",
    title: "Maj & Sons Shop Business Manager",
    categoryTag: "OFFLINE-FIRST · ERP SUITE",
    badge: "Flagship Software",
    statusBadge: "Active Production Engine",
    shortDesc:
      "Enterprise offline-first retail ERP: instant billing, purchase invoices, inventory registers, and customer/supplier balance ledgers.",
    fullDesc:
      "Engineered for high-throughput counter billing and deep retail accounting. Features real-time stock deductions, multi-supplier invoice matching, PDF receipts, customer debit/credit ledgers, cash register balancing, and robust data integrity even when network connection drops.",
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
  {
    id: "student-ticket-management",
    title: "Student Support Ticket System",
    categoryTag: "ENTERPRISE HELPDESK · API ENGINE",
    badge: "Full-Stack System",
    statusBadge: "Completed Architecture",
    shortDesc:
      "Enterprise support ticket resolution system with multi-role access control, PostgreSQL schema, and real-time SLA metrics.",
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
  {
    id: "dineflow-restaurant-saas",
    title: "DineFlow Restaurant SaaS",
    categoryTag: "MULTI-TENANT SAAS · QR ORDERING",
    badge: "SaaS Architecture",
    statusBadge: "Multi-Tenant Platform",
    shortDesc:
      "Multi-tenant restaurant operating platform: QR table ordering, dynamic schema isolation, digital menus, and live kitchen orders.",
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
];

export const WEBSITE_ORIGINALS: ProjectData[] = [
  {
    id: "maj-and-sons-website",
    title: "Maj & Sons Shop Website",
    categoryTag: "E-COMMERCE · BRAND STORE",
    badge: "Web Production",
    statusBadge: "Live Website",
    shortDesc:
      "Customer-facing storefront featuring dynamic product catalogues, inquiry dispatch, and responsive modern branding.",
    fullDesc:
      "The dedicated consumer web presence for Maj & Sons retail operations. Designed for high visual appeal, quick product discoverability, brand storytelling, and direct WhatsApp / email customer ordering.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    keyFeatures: [
      "Interactive product showcases and high-res image galleries",
      "Direct customer WhatsApp ordering workflow",
      "Optimized Core Web Vitals with sub-second page loads",
      "Fully responsive mobile-first storefront",
    ],
    screenshots: [
      "/maj-sons-website.png",
      "/maj-sons-products.png",
    ],
  },
  {
    id: "medi-ai",
    title: "Medi AI Healthcare Platform",
    categoryTag: "HEALTHCARE AI · TELEMEDICINE",
    badge: "AI Web Application",
    statusBadge: "Production Ready",
    shortDesc:
      "Next-generation AI consultation interface, doctor scheduling portal, and clinical diagnostic dashboards.",
    fullDesc:
      "Medi AI bridges preliminary patient triage with clinical healthcare administration. Integrates AI consultation dialogs, patient diagnostic records, physician availability schedules, and doctor appointment management.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "REST APIs",
    ],
    keyFeatures: [
      "Interactive AI symptom checker and diagnostic triage",
      "Doctor administrative scheduling dashboard",
      "Patient health card records and appointment management",
      "Secure encrypted consultation histories",
    ],
    screenshots: [
      "/mediaihome.png",
      "/aiinteraction.png",
      "/doctordashboard.png",
    ],
  },
  {
    id: "bananaa-shop",
    title: "Bananaa E-Commerce Store",
    categoryTag: "E-COMMERCE · CART & CHECKOUT",
    badge: "Commercial Web App",
    statusBadge: "Live Build",
    shortDesc:
      "Full-featured e-commerce platform with catalog filters, persistent shopping cart, and streamlined multi-step checkout.",
    fullDesc:
      "High-conversion e-commerce platform built for lifestyle apparel. Features instantaneous category filtering, product variation selection (sizes, colors), persistent local cart state, order summary generation, and responsive checkout flows.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux / Context",
    ],
    keyFeatures: [
      "Instant faceted search and multi-category filtering",
      "Dynamic shopping bag with quantity and discount updates",
      "Multi-step checkout validation flow",
      "Mobile-optimized responsive catalog grid",
    ],
    screenshots: [
      "/Bananaa/1.png",
      "/Bananaa/2.png",
      "/Bananaa/3.png",
      "/Bananaa/4.png",
    ],
  },
  {
    id: "aerotrack",
    title: "AeroTrack Flight Monitor",
    categoryTag: "TELEMETRY · REAL-TIME RADAR",
    badge: "Aviation Platform",
    statusBadge: "Production Build",
    shortDesc:
      "Real-time aviation tracking interface displaying flight telemetry, waypoint routes, altitude profiles, and radar maps.",
    fullDesc:
      "High-precision flight tracking portal engineered for real-time aerospace monitoring. Features dynamic vector map overlays, live altitude profiles, speed metrics, airport departures/arrivals, and flight status tracking.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Mapbox / Leaflet",
      "REST APIs",
    ],
    keyFeatures: [
      "Real-time geospatial flight tracking radar",
      "Live altitude, airspeed, and heading telemetry dials",
      "Airport arrival and departure schedule monitors",
      "Interactive route waypoint projection",
    ],
    screenshots: [
      "/Aerotrack/1.png",
      "/Aerotrack/2.png",
      "/Aerotrack/3.png",
    ],
  },
];

export default function ProjectCarousel({
  onOpenProject,
}: ProjectCarouselProps) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const scrollRow = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ========================================================
          ROW 1: FEATURED SOFTWARE
      ======================================================== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-0.5 bg-[#e50914]" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#e50914] uppercase">
                ORIGINAL ARCHITECTURES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-netflix-title tracking-tight">
              FEATURED SOFTWARE
            </h2>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollRow(row1Ref, "left")}
              className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#333] hover:border-[#e50914] text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => scrollRow(row1Ref, "right")}
              className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#333] hover:border-[#e50914] text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Next"
            >
              ›
            </button>
          </div>
        </div>

        {/* Horizontal Row */}
        <div
          ref={row1Ref}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 pt-2 scroll-smooth"
        >
          {FEATURED_SOFTWARE.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onOpenProject(proj)}
              className="group flex-none w-[280px] sm:w-[350px] md:w-[380px] rounded-xl overflow-hidden border border-[#262626] bg-[#141414] hover:bg-[#1a1a1a] p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-[#e50914] hover:shadow-[0_15px_30px_rgba(229,9,20,0.3)] z-10 hover:z-20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-[#e50914] uppercase tracking-wider">
                    {proj.categoryTag}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#a3a3a3] border border-[#333]">
                    {proj.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-white font-netflix-title uppercase tracking-wide group-hover:text-[#e50914] transition-colors leading-tight">
                  {proj.title}
                </h3>

                <p className="mt-2 text-xs text-[#a3a3a3] leading-relaxed line-clamp-3">
                  {proj.shortDesc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#262626]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-[#c2c2c2] border border-[#333]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span className="text-[11px] font-mono text-[#a3a3a3] group-hover:text-white">
                    Explore Details & Schema
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#e50914] flex items-center justify-center text-[10px] transition-colors">
                    ▶
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          ROW 2: WEBSITE ORIGINALS
      ======================================================== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-0.5 bg-[#e50914]" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#e50914] uppercase">
                PRODUCTION DEPLOYMENTS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-netflix-title tracking-tight">
              WEBSITE PROJECTS
            </h2>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollRow(row2Ref, "left")}
              className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#333] hover:border-[#e50914] text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => scrollRow(row2Ref, "right")}
              className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-[#333] hover:border-[#e50914] text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Next"
            >
              ›
            </button>
          </div>
        </div>

        {/* Horizontal Row */}
        <div
          ref={row2Ref}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 pt-2 scroll-smooth"
        >
          {WEBSITE_ORIGINALS.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onOpenProject(proj)}
              className="group flex-none w-[280px] sm:w-[320px] md:w-[360px] rounded-xl overflow-hidden border border-[#262626] bg-[#141414] hover:bg-[#1a1a1a] cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:border-[#e50914] hover:shadow-[0_15px_35px_rgba(229,9,20,0.35)] z-10 hover:z-20 flex flex-col justify-between"
            >
              {/* Screenshot Banner with Netflix Cinematic Treatment & Zoom */}
              <div className="relative h-48 sm:h-52 w-full bg-[#0a0a0a] overflow-hidden">
                {proj.screenshots && proj.screenshots[0] ? (
                  <Image
                    src={proj.screenshots[0]}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 320px, 360px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-950/40 via-stone-900 to-[#141414] text-white/20 font-black text-2xl uppercase font-netflix-title">
                    {proj.title}
                  </div>
                )}
                {/* Netflix-style cinematic gradient vignette & hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-black/30 opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white bg-black/80 px-2 py-0.5 rounded border border-white/20 backdrop-blur-sm">
                    {proj.badge}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#e50914] uppercase tracking-wider">
                    {proj.categoryTag}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white font-netflix-title uppercase tracking-wide group-hover:text-[#e50914] transition-colors leading-tight mt-1">
                    {proj.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#a3a3a3] leading-relaxed line-clamp-2">
                    {proj.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs font-semibold text-white">
                  <span className="text-[11px] font-mono text-[#a3a3a3] group-hover:text-white">
                    View Project & Gallery
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#e50914] flex items-center justify-center text-[10px] transition-colors">
                    ▶
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

