export const NETWORK_CONFIG = {
  NODE_COUNT: 75,
  MOBILE_NODE_COUNT: 28,
  MAJOR_NODE_COUNT: 8,
  MAX_CONNECTION_DISTANCE: 2.3,
  CURSOR_RADIUS: 2.1, // in 3D world units (mapped to ~180-220px)
  NODE_PULL_STRENGTH: 0.32,
  NODE_GLOW_STRENGTH: 0.9,
  DATA_PACKET_COUNT: 5,
  PARALLAX_STRENGTH: 0.35,
  AMBIENT_PARTICLE_COUNT: 90,
  MOBILE_PARTICLE_COUNT: 30,
  PACKET_SPEED_MIN: 0.5,
  PACKET_SPEED_MAX: 1.1,
  COLORS: {
    NODE_BASE: '#0f2942',
    NODE_MAJOR: '#0284c7',
    NODE_ACTIVE: '#38bdf8',
    NODE_HIGHLIGHT: '#00f0ff',
    LINE_BASE: '#091c2e',
    LINE_ACTIVE: '#38bdf8',
    LINE_HIGHLIGHT: '#67e8f9',
    PACKET: '#00f0ff',
    AMBIENT_PARTICLE: '#38bdf8',
  },
};

export const DEVELOPER_INFO = {
  name: "Ganesh Wakchaure",
  initials: "GW",
  role: "FULL STACK DEVELOPER",
  tagline: "Building scalable, intelligent and user-focused web applications.",
  bio: "Full stack engineer specializing in robust web architecture, real-time distributed systems, and modern AI-enhanced user interfaces. Experienced in taking products from high-level system design to pixel-perfect, low-latency execution.",
  status: "Available for opportunities",
  location: "Pune / Remote",
  email: "ganeshwakchaure.dev@gmail.com",
  github: "https://github.com/ganeshwakchaure",
  linkedin: "https://linkedin.com/in/ganeshwakchaure",
  twitter: "https://x.com/ganesh_dev",
  metadataTags: ["MERN", "Next.js", "Node.js", "MongoDB", "AI", "TypeScript"],
};

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  metrics?: string;
  isPrimary?: boolean;
  githubUrl: string;
  liveUrl?: string;
  features: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "geo-intelligence",
    title: "Geo Intelligence Platform",
    category: "AI & Geospatial Intelligence",
    description: "Enterprise geospatial processing system rendering large-scale spatial analytics with sub-second raster queries and automated satellite anomaly detection.",
    longDescription: "Engineered an end-to-end intelligence engine capable of streaming multi-gigabyte shapefiles, point-clouds, and GIS layers in real time. Features GPU-accelerated spatial clustering, vector overlay queries, and custom machine learning pipelines for predictive land-use changes.",
    techStack: ["Next.js", "TypeScript", "Three.js / WebGL", "Python / FastAPI", "PostGIS", "Docker"],
    metrics: "40% faster raster tile rendering · 50k+ spatial nodes streamed",
    isPrimary: true,
    githubUrl: "https://github.com/ganeshwakchaure/geo-intelligence",
    liveUrl: "https://geointel.ganeshdev.me",
    features: [
      "Custom WebGL viewport for rendering massive spatial point clouds at 60 FPS",
      "Vector tile indexing pipeline handling high-throughput geo-queries",
      "Automated anomaly classification using fine-tuned spatial computer vision models",
      "Multi-tenant role-based access control with audited telemetry"
    ],
  },
  {
    id: "smart-transit",
    title: "SmartTransit",
    category: "Real-time Distributed IoT",
    description: "Intelligent fleet tracking and commuter network delivering real-time vehicle telemetry, dynamic ETA prediction algorithms, and route optimization.",
    longDescription: "A distributed IoT event-driven architecture ingesting GPS signals from transit fleets every 800ms. Implements Kalman-filter smoothed vehicle positioning and predictive delay alerts calculated via historical traffic bottlenecks.",
    techStack: ["React", "Node.js", "Socket.io", "Redis", "MongoDB", "Tailwind CSS"],
    metrics: "98.2% ETA accuracy · 12,000+ daily commuter updates",
    isPrimary: false,
    githubUrl: "https://github.com/ganeshwakchaure/smart-transit",
    liveUrl: "https://transit.ganeshdev.me",
    features: [
      "Sub-second WebSockets broadcast cluster backed by Redis pub/sub",
      "Predictive machine learning arrival calculations accounting for live traffic",
      "Driver companion PWA with offline queueing and turn telemetry",
      "City planner administrative dashboards with fleet health analytics"
    ],
  },
  {
    id: "donor-track",
    title: "DonorTrack",
    category: "Healthcare Infrastructure",
    description: "Decentralized, audit-ready blood donation management and emergency supply matching network with cryptographic supply-chain verification.",
    longDescription: "Engineered to eliminate supply shortfalls in emergency medical centers. Features automated geolocation-based donor dispatching, verified inventory ledgering, and urgent SMS alert pipelines to critical donors.",
    techStack: ["Next.js", "TypeScript", "Express.js", "PostgreSQL", "Prisma", "WebSockets"],
    metrics: "Zero spoilage rate for tracked batches · 150+ hospital units linked",
    isPrimary: false,
    githubUrl: "https://github.com/ganeshwakchaure/donor-track",
    liveUrl: "https://donortrack.ganeshdev.me",
    features: [
      "Real-time urgent donor dispatching within a 15km emergency radius",
      "Complete chain-of-custody tracking with temperature logging audits",
      "Responsive hospital bed and blood type reservation system",
      "Strict HIPAA-compliant encrypted patient and donor data storage"
    ],
  },
  {
    id: "om-arts",
    title: "Om Arts",
    category: "High-Performance E-Commerce & 3D",
    description: "Bespoke digital showroom for high-end artisanal craftsmanship featuring real-time 3D product previews, fluid micro-interactions, and global payments.",
    longDescription: "A custom commerce platform built to celebrate heritage craftsmanship. Integrates interactive Three.js 360-degree artifact inspection, sub-100ms page transitions, and streamlined checkout workflows.",
    techStack: ["Next.js", "Three.js", "Framer Motion", "Stripe API", "Sanity CMS", "Tailwind CSS"],
    metrics: "99/100 Lighthouse performance · 3.2x higher interactive engagement",
    isPrimary: false,
    githubUrl: "https://github.com/ganeshwakchaure/om-arts",
    liveUrl: "https://omarts.ganeshdev.me",
    features: [
      "Interactive 3D model inspector with physically based materials and lighting",
      "Zero-layout-shift image optimization with custom WebP progressive loading",
      "Edge-cached product catalog with global CDN delivery",
      "Accessible checkout flow with instant Apple Pay and Google Pay integration"
    ],
  },
];

export const SKILL_CATEGORIES = [
  {
    title: "Frontend Engineering",
    icon: "Layout",
    skills: [
      { name: "React / Next.js 15+", level: "Expert", detail: "App Router, SSR, Server Actions, RSC" },
      { name: "TypeScript", level: "Expert", detail: "Strict typing, generics, AST, component architecture" },
      { name: "Three.js / R3F", level: "Advanced", detail: "Shaders, custom geometries, instanced meshes, 60fps WebGL" },
      { name: "Tailwind CSS", level: "Expert", detail: "Custom design systems, responsive layouts, v4 theme engines" },
      { name: "Framer Motion", level: "Advanced", detail: "Layout transitions, gestures, physics springs, micro-interactions" },
    ],
  },
  {
    title: "Backend & Systems",
    icon: "Server",
    skills: [
      { name: "Node.js / Express", level: "Expert", detail: "High-concurrency microservices, streams, clustering" },
      { name: "Python / FastAPI", level: "Proficient", detail: "Async APIs, geospatial processing, ML inference endpoints" },
      { name: "WebSockets / Realtime", level: "Advanced", detail: "Socket.io, WebRTC channels, binary protocol streaming" },
      { name: "REST & GraphQL", level: "Expert", detail: "Schema design, DataLoader batching, contract-driven APIs" },
      { name: "Auth & Security", level: "Advanced", detail: "OAuth2, JWT, RBAC, encrypted sessions, OWASP standards" },
    ],
  },
  {
    title: "Databases & Cloud",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: "Expert", detail: "Aggregation pipelines, indexing strategies, replica sets" },
      { name: "PostgreSQL / PostGIS", level: "Advanced", detail: "Spatial queries, complex joins, ACID transactions, Prisma" },
      { name: "Redis", level: "Advanced", detail: "In-memory caching, pub/sub messaging, rate limiting" },
      { name: "Docker & Containerization", level: "Proficient", detail: "Multi-stage builds, compose networks, microservices" },
      { name: "AWS & Cloudflare", level: "Proficient", detail: "S3, CloudFront, Lambda, Workers edge caching, CI/CD" },
    ],
  },
  {
    title: "Architecture & Practices",
    icon: "Cpu",
    skills: [
      { name: "System Design", level: "Advanced", detail: "Distributed event-driven architecture, caching tiers, scalability" },
      { name: "AI Integration", level: "Proficient", detail: "LLM agents, vector embeddings, LangChain, semantic search" },
      { name: "Performance Optimization", level: "Expert", detail: "Core Web Vitals, memory profiling, bundle minimization" },
      { name: "Testing & CI/CD", level: "Advanced", detail: "Vitest, Playwright E2E, GitHub Actions pipelines" },
    ],
  },
];

export const EXPERIENCES = [
  {
    period: "2024 — Present",
    role: "Senior Full Stack Software Engineer",
    company: "Autonomous Engineering & Innovation Lab",
    type: "Contract & Independent",
    description: "Architecting high-throughput data platforms, AI-assisted interfaces, and low-latency geospatial applications. Spearheading modern full-stack systems with Next.js, WebGL, Node.js, and distributed databases.",
    achievements: [
      "Engineered real-time telemetry pipelines handling 50k+ active data events per minute with sub-50ms latency.",
      "Optimized client-side rendering pipeline utilizing instanced WebGL geometry, reducing memory footprint by 45%.",
      "Built production-ready microservices integrated with Redis queues and PostgreSQL spatial engines."
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "Three.js", "PostgreSQL", "Redis", "Docker"]
  },
  {
    period: "2023 — 2024",
    role: "Full Stack Developer",
    company: "NextGen Software Systems",
    type: "Full-Time",
    description: "Developed enterprise SaaS web applications and data dashboard interfaces. Led the migration of legacy client components to React 18/Next.js server-first architecture.",
    achievements: [
      "Accelerated Largest Contentful Paint (LCP) from 3.8s to 0.9s across critical enterprise customer dashboards.",
      "Implemented role-based access control and OAuth2 SSO authentication for 10,000+ business users.",
      "Created reusable design system components adopted across 4 core organizational products."
    ],
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Jest"]
  },
  {
    period: "2022 — 2023",
    role: "Frontend Engineer",
    company: "Digital Edge Technologies",
    type: "Full-Time",
    description: "Crafted interactive web experiences, bespoke commerce applications, and real-time visualization widgets for international clients.",
    achievements: [
      "Delivered 12+ production client web projects on schedule with 100% responsive cross-browser compatibility.",
      "Integrated payment processing pipelines handling thousands in transaction volume with zero downtime.",
      "Mentored junior developers on TypeScript best practices and state management architecture."
    ],
    technologies: ["JavaScript", "React", "Node.js", "Tailwind CSS", "REST APIs", "Git"]
  }
];

export const ACHIEVEMENTS = [
  {
    title: "1st Place — National Innovation Hackathon",
    issuer: "TechFest Innovation Summit",
    year: "2024",
    description: "Built an offline-first emergency disaster relief routing algorithm with decentralized peer-to-peer data syncing."
  },
  {
    title: "Top Open Source Contributor",
    issuer: "Developer Ecosystem Initiative",
    year: "2023",
    description: "Authored and maintained high-performance TypeScript utility libraries with over 25,000+ monthly downloads."
  },
  {
    title: "50+ Systems Designed & Shipped",
    issuer: "Engineering Portfolio",
    year: "2022 — 2025",
    description: "Consistently delivered robust web apps, microservices, and interactive experiences with verified 99.9% uptime."
  },
  {
    title: "AWS Certified Solutions Specialist",
    issuer: "Cloud Architecture Standards",
    year: "2023",
    description: "Demonstrated technical mastery across scalable distributed cloud architectures, serverless computing, and database resiliency."
  }
];
