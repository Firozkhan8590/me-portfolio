/**
 * Portfolio Configuration Types and Authoritative Defaults
 * Architecture: Backend-Driven Configuration
 * Strictly controlled by the authenticated Owner.
 */

export interface HeroAnimationConfig {
  enabled: boolean;
  type: "clapping" | "intro" | "none";
  trigger: "hover" | "tap" | "auto";
  videoUrl: string;
  assetUrl?: string;
  loop: boolean;
  duration: number; // in milliseconds
}

export interface HeroActionItem {
  label: string;
  enabled: boolean;
  target?: string;
}

export interface HeroConfig {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  imageUrl: string;
  imageAlt: string;
  availabilityBadge: string;
  experienceBadge: string;
  yearsActive: string;
  degree: string;
  originalsCount: string;
  techCount: string;
  animation: HeroAnimationConfig;
  actions: {
    exploreWork: HeroActionItem;
    viewResume: HeroActionItem;
    startProject: HeroActionItem;
  };
}

export interface ResumeItem {
  title: string;
  url: string;
  filename: string;
}

export interface ProjectItemConfig {
  id: string;
  title: string;
  categoryTag: string;
  badge?: string;
  statusBadge?: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  keyFeatures: string[];
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  isTopPick?: boolean;
  rank?: number;
}

export interface SkillCategoryConfig {
  id: string;
  title: string;
  categoryTag: string;
  subtitle: string;
  badge: string;
  countLabel: string;
  color: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItemConfig {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  badge: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ServiceItemConfig {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  popular?: boolean;
  baseTimeline: string;
}

export interface EnquirySettingsConfig {
  notificationEmail: string;
  autoAcknowledge: boolean;
  defaultCurrency: string;
}

export interface FeatureFlagsConfig {
  clappingAnimation: boolean;
  recruiterMode: boolean;
  currencyDetection: boolean;
  enquiryPipeline: boolean;
  resumeModal: boolean;
}

export interface PortfolioConfig {
  hero: HeroConfig;
  resumes: {
    india: ResumeItem;
    dubai: ResumeItem;
  };
  projects: ProjectItemConfig[];
  skills: SkillCategoryConfig[];
  experience: ExperienceItemConfig[];
  services: ServiceItemConfig[];
  enquirySettings: EnquirySettingsConfig;
  features: FeatureFlagsConfig;
}

/**
 * Authoritative baseline configuration for Firozkhan's Portfolio.
 * Used for SSR hydration, client initial state, and database seeding.
 */
export const DEFAULT_PORTFOLIO_CONFIG: PortfolioConfig = {
  hero: {
    name: "FIROZKHAN",
    title: "FULL STACK DEVELOPER · BACKEND ENGINEER",
    tagline: "Building Digital Experiences That Solve Real Problems.",
    bio: "Building digital experiences that solve real problems. Specialized in robust backend architectures, high-performance web applications, offline-first business suites, and multi-tenant SaaS platforms using Node.js, NestJS, Next.js, Python, and PostgreSQL.",
    imageUrl: "/images/firozkhan-hero.png",
    imageAlt: "FIROZKHAN - Full Stack Developer & Backend Engineer",
    availabilityBadge: "OPEN TO WORK",
    experienceBadge: "SODISYS · Associate Software Engineer",
    yearsActive: "2025–2026",
    degree: "MCA",
    originalsCount: "7 Originals",
    techCount: "10+ Technologies",
    animation: {
      enabled: false, // Backend-controlled: defaults to false until animation asset is confirmed
      type: "clapping",
      trigger: "hover",
      videoUrl: "/videos/firozkhan-clapping.mp4",
      assetUrl: "/images/firozkhan-clapping.gif",
      loop: true,
      duration: 3000,
    },
    actions: {
      exploreWork: {
        label: "Explore My Work",
        enabled: true,
        target: "top-picks",
      },
      viewResume: {
        label: "View Resume (India / Dubai)",
        enabled: true,
      },
      startProject: {
        label: "Start a Project",
        enabled: true,
        target: "services",
      },
    },
  },
  resumes: {
    india: {
      title: "India Resume",
      url: "/resume-india.pdf",
      filename: "Firozkhan_FullStack_Engineer_India.pdf",
    },
    dubai: {
      title: "Dubai / UAE Resume",
      url: "/resume-dubai.pdf",
      filename: "Firozkhan_FullStack_Engineer_Dubai.pdf",
    },
  },
  projects: [
    {
      id: "maj-and-sons-manager",
      title: "Maj & Sons Shop Business Manager",
      categoryTag: "OFFLINE-FIRST · RETAIL ERP",
      badge: "Flagship Software",
      statusBadge: "Active Production Engine",
      shortDesc: "Complete offline-first retail ERP: instant billing, purchase invoices, inventory registers, and customer/supplier balance ledgers.",
      fullDesc: "Engineered for high-throughput counter billing and deep retail accounting. Features real-time stock deductions, multi-supplier invoice matching, PDF receipts, customer debit/credit ledgers, cash register balancing, and robust data integrity.",
      technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "IndexedDB Sync"],
      keyFeatures: [
        "Instant POS Counter Billing with thermal invoice generation",
        "Supplier Purchase Invoice registry with tax & item breakdown",
        "Real-time Inventory & Low-Stock Alerts",
        "Customer & Supplier Khata/Ledger balance reconciliation",
        "Cash Drawer day-closing registers with debit/credit audits"
      ],
      screenshots: ["/maj-sons-products.png"],
      isTopPick: true,
      rank: 1
    },
    {
      id: "student-ticket-management",
      title: "Student Support Ticket System",
      categoryTag: "ENTERPRISE HELPDESK · API ENGINE",
      badge: "Full-Stack System",
      statusBadge: "Completed Architecture",
      shortDesc: "Enterprise support ticket resolution system with multi-role access control, PostgreSQL schema, and real-time SLA metrics.",
      fullDesc: "Built to replace messy email threads with structured, auditable ticketing. Implements strict role-based access control (Students, Department Admins, Support Agents), automatic ticket assignment, priority queues, and audit log histories in PostgreSQL.",
      technologies: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "JWT / RBAC", "REST APIs"],
      keyFeatures: [
        "Role-Based Access Control (Admin, Agent, Student)",
        "Lifecycle state machine (Open, In Progress, Escalate, Closed)",
        "Automated priority tagging and SLA countdown timers",
        "Department-level ticket queue filtering & assignment",
        "Audit trail for every state transition and resolution note"
      ],
      screenshots: ["/doctordashboard.png"],
      isTopPick: true,
      rank: 2
    },
    {
      id: "dineflow-restaurant-saas",
      title: "DineFlow Restaurant POS & Orders",
      categoryTag: "MULTI-TENANT SAAS · REAL-TIME",
      badge: "Cloud SaaS",
      statusBadge: "Deployed Architecture",
      shortDesc: "Multi-tenant restaurant management SaaS with QR ordering, Kitchen Display Systems (KDS), and live table tracking.",
      fullDesc: "Engineered for rapid dining room turnover. Provides contact-free digital QR ordering from tables, instant WebSocket ticket routing to the kitchen display, payment webhook processing, and daily revenue analytics.",
      technologies: ["Next.js", "React", "Node.js", "Socket.io", "PostgreSQL", "Stripe Webhooks"],
      keyFeatures: [
        "Dynamic Table QR code generation with instant menu ordering",
        "Live Kitchen Display System (KDS) with color-coded prep timers",
        "Multi-tender payment handling (Cash, Card, Digital Wallets)",
        "Item variations, add-ons, and dynamic ingredient stock deductions",
        "Multi-tenant tenant isolation with custom restaurant subdomains"
      ],
      screenshots: ["/eCommercePage.png"],
      isTopPick: true,
      rank: 3
    },
    {
      id: "maj-and-sons-website",
      title: "Maj & Sons Shop Online Store",
      categoryTag: "E-COMMERCE · CUSTOMER FRONTEND",
      badge: "Production Client",
      statusBadge: "Live Storefront",
      shortDesc: "Fast, mobile-optimized online customer storefront for Maj & Sons Shop with product catalogs and direct WhatsApp checkout.",
      fullDesc: "The public-facing digital storefront companion to the Shop Business Manager. Allows customers to browse real-time inventory, inspect product specifications, and submit orders directly via automated WhatsApp payload formatting.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API", "Cloudinary"],
      keyFeatures: [
        "Mobile-first catalog browsing with instant search and category filtering",
        "One-click WhatsApp cart checkout with structured item payload",
        "High-definition product image galleries with lazy loading",
        "Store location map, business hours, and direct phone dialer",
        "Synchronized catalog feeds powered by Next.js Incremental Static Regeneration"
      ],
      screenshots: ["/maj-sons-website.png"],
      isTopPick: true,
      rank: 4
    },
    {
      id: "aerotrack-aviation-portal",
      title: "AeroTrack Aviation Tracking",
      categoryTag: "REAL-TIME TELEMETRY · GIS",
      badge: "High-Performance Data",
      statusBadge: "Interactive Platform",
      shortDesc: "Real-time aircraft flight monitoring portal with geospatial coordinate tracking, altitude telemetry, and airport status boards.",
      fullDesc: "Built to render high-frequency flight telemetry without UI stutter. Utilizes WebSocket data feeds to plot live latitude/longitude trajectories on interactive maps, with altitude charts and airport arrival/departure boards.",
      technologies: ["React", "TypeScript", "Mapbox GL", "WebSockets", "Node.js", "Tailwind CSS"],
      keyFeatures: [
        "Live radar map tracking 500+ simultaneous flight vectors",
        "Altitude and velocity telemetry charts using Canvas rendering",
        "Interactive airport arrival/departure status boards",
        "Aircraft search by tail number, callsign, or route",
        "Real-time geo-fencing breach notifications"
      ],
      screenshots: ["/Aerotrack/1.png", "/Aerotrack/2.png", "/Aerotrack/3.png"],
      isTopPick: true,
      rank: 5
    }
  ],
  skills: [
    {
      id: "backend-architecture",
      title: "BACKEND & DISTRIBUTED SYSTEMS",
      categoryTag: "CORE MASTERY",
      subtitle: "Enterprise REST APIs, Microservices & Server Runtimes",
      badge: "PRIMARY FOCUS",
      countLabel: "9 TECHNOLOGIES",
      color: "#e50914",
      skills: [
        { name: "Node.js", level: "Senior", highlight: true },
        { name: "NestJS", level: "Production", highlight: true },
        { name: "Express.js", level: "Senior", highlight: false },
        { name: "Python", level: "Advanced", highlight: true },
        { name: "FastAPI", level: "Production", highlight: false },
        { name: "RESTful API Design", level: "Architect", highlight: true },
        { name: "WebSockets & Real-time", level: "Advanced", highlight: false },
        { name: "Microservices Architecture", level: "Applied", highlight: false },
        { name: "Authentication (JWT / RBAC)", level: "Production", highlight: true }
      ]
    },
    {
      id: "database-data-engineering",
      title: "DATABASES & DATA LAYER",
      categoryTag: "PERSISTENCE & OPTIMIZATION",
      subtitle: "Relational Schemas, Indexing & High-Performance Caching",
      badge: "PRODUCTION GRADE",
      countLabel: "7 ENGINES",
      color: "#3b82f6",
      skills: [
        { name: "PostgreSQL", level: "Senior", highlight: true },
        { name: "Prisma ORM", level: "Advanced", highlight: true },
        { name: "SQL Query Optimization", level: "Advanced", highlight: true },
        { name: "Neon Serverless Postgres", level: "Production", highlight: false },
        { name: "Redis Caching", level: "Intermediate", highlight: false },
        { name: "Database Migrations", level: "Production", highlight: false },
        { name: "Data Modeling & ACID", level: "Architect", highlight: true }
      ]
    },
    {
      id: "frontend-fullstack",
      title: "MODERN WEB & FRONTEND",
      categoryTag: "CLIENT EXPERIENCE",
      subtitle: "SSR Runtimes, Component Systems & Cinematic UI",
      badge: "FULL-STACK CAPABLE",
      countLabel: "8 FRAMEWORKS",
      color: "#10b981",
      skills: [
        { name: "Next.js (App Router)", level: "Senior", highlight: true },
        { name: "React 19", level: "Senior", highlight: true },
        { name: "TypeScript", level: "Advanced", highlight: true },
        { name: "Tailwind CSS v4", level: "Senior", highlight: false },
        { name: "Framer Motion", level: "Advanced", highlight: false },
        { name: "GSAP & Three.js", level: "Applied", highlight: false },
        { name: "State Management (Zustand)", level: "Advanced", highlight: false },
        { name: "Responsive / Offline-First UI", level: "Production", highlight: true }
      ]
    },
    {
      id: "devops-cloud-tools",
      title: "CLOUD, DEVOPS & INFRASTRUCTURE",
      categoryTag: "DEPLOYMENT & RELIABILITY",
      subtitle: "CI/CD Pipelines, Containerization & Serverless Hosting",
      badge: "DEPLOYMENT READY",
      countLabel: "6 SYSTEMS",
      color: "#f59e0b",
      skills: [
        { name: "Docker", level: "Intermediate", highlight: true },
        { name: "Git & GitHub Actions", level: "Advanced", highlight: true },
        { name: "Vercel & Cloudflare", level: "Production", highlight: false },
        { name: "Linux / Ubuntu Server", level: "Advanced", highlight: true },
        { name: "Nginx Reverse Proxy", level: "Intermediate", highlight: false },
        { name: "Resend / SMTP Mailers", level: "Production", highlight: false }
      ]
    }
  ],
  experience: [
    {
      id: "sodisys-associate",
      company: "SODISYS",
      role: "Associate Software Engineer",
      period: "March 2026 – September 2026",
      location: "India",
      badge: "FULL-TIME",
      description: "Spearheaded backend microservices, high-concurrency API integrations, database query optimization, and production serverless pipelines.",
      achievements: [
        "Architected scalable backend microservices reducing average API latency by 35%",
        "Designed and normalized PostgreSQL database schemas with automated migration pipelines",
        "Implemented secure JWT authentication with fine-grained Role-Based Access Control (RBAC)",
        "Collaborated with cross-functional product and frontend teams to deliver core business milestones"
      ],
      technologies: ["Node.js", "NestJS", "PostgreSQL", "Prisma", "Docker", "REST APIs"]
    },
    {
      id: "sodisys-intern",
      company: "SODISYS",
      role: "Software Engineer Intern – Backend Developer",
      period: "September 2025 – March 2026",
      location: "India",
      badge: "INTERNSHIP",
      description: "Developed and documented REST APIs, integrated third-party payment and messaging webhooks, and authored automated unit and integration tests.",
      achievements: [
        "Implemented automated data ingestion pipelines handling thousands of daily records",
        "Optimized slow SQL queries and missing indexes, saving server compute overhead",
        "Wrote comprehensive API documentation in Swagger/OpenAPI for client integrations"
      ],
      technologies: ["Node.js", "Express.js", "PostgreSQL", "Git", "REST APIs"]
    },
    {
      id: "srishti-intern",
      company: "Srishti Innovative Technopark",
      role: "Python Full Stack Developer Intern",
      period: "January 2025 – September 2025",
      location: "Technopark, Trivandrum, India",
      badge: "INTERNSHIP",
      description: "Contributed to Python-based web applications, backend services, database schema design, and responsive frontend client views.",
      achievements: [
        "Built responsive full-stack modules using Python, FastAPI/Django, and modern frontend tools",
        "Developed automated data scrapers and batch job processors",
        "Conducted code reviews and participated in daily agile standups"
      ],
      technologies: ["Python", "FastAPI", "PostgreSQL", "HTML/CSS", "JavaScript"]
    }
  ],
  services: [
    {
      id: "backend-api-architecture",
      title: "Backend & API Architecture",
      tag: "CORE SPECIALIZATION",
      subtitle: "Robust, Secure & Scalable Server Engines",
      description: "Custom backend microservices and REST/GraphQL APIs built for high concurrency, security, and data integrity using Node.js, NestJS, Python, and PostgreSQL.",
      deliverables: [
        "Production REST or WebSocket API service",
        "Clean architecture with comprehensive test coverage",
        "Role-Based Access Control (RBAC) & JWT security",
        "Complete Swagger / OpenAPI documentation",
        "Docker containerization & deployment configuration"
      ],
      popular: true,
      baseTimeline: "2 – 4 Weeks"
    },
    {
      id: "fullstack-saas-mvp",
      title: "Full-Stack Web App / SaaS MVP",
      tag: "END-TO-END",
      subtitle: "Turn Your Product Idea into a Deployed Reality",
      description: "End-to-end full stack web applications engineered with Next.js, React, and PostgreSQL. From database schema modeling to high-conversion UI and payment integrations.",
      deliverables: [
        "Next.js App Router full-stack web application",
        "Modern responsive UI styled with Tailwind CSS",
        "Relational database setup on Neon PostgreSQL / Supabase",
        "Stripe / Payment Gateway & automated billing hooks",
        "Vercel or AWS production deployment with custom domain"
      ],
      popular: true,
      baseTimeline: "3 – 6 Weeks"
    },
    {
      id: "database-performance",
      title: "Database Design & Performance Tuning",
      tag: "DATA LAYER",
      subtitle: "Eliminate Bottlenecks & Scale Seamlessly",
      description: "PostgreSQL schema normalization, indexing strategies, complex query optimization, and migration pipelines for existing production systems.",
      deliverables: [
        "In-depth database query bottleneck audit",
        "Composite index and query execution plan tuning",
        "Data integrity constraints and foreign key architecture",
        "Prisma / TypeORM migration scripting",
        "Automated backup and disaster recovery recommendations"
      ],
      popular: false,
      baseTimeline: "1 – 2 Weeks"
    }
  ],
  enquirySettings: {
    notificationEmail: "firoznissar@gmail.com",
    autoAcknowledge: true,
    defaultCurrency: "USD"
  },
  features: {
    clappingAnimation: false,
    recruiterMode: true,
    currencyDetection: true,
    enquiryPipeline: true,
    resumeModal: true,
  },
};
