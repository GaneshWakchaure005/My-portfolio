export const AURORA_CONFIG = {
  PARTICLE_COUNT: 42,
  MOBILE_PARTICLE_COUNT: 16,
  STREAK_COUNT: 4,
  CURSOR_FIELD_RADIUS: 220, // in pixels
  PARALLAX: {
    BACKGROUND: 3,
    AURORA: 8,
    PARTICLES: 12,
    PORTRAIT: 12,
    FOREGROUND: 2,
  },
  COLORS: {
    CYAN_LIGHT: '#00BFFF',
    BLUE_VIBRANT: '#008CFF',
    BLUE_DEEP: '#0066FF',
    NAVY_DEEP: '#020814',
    WHITE_BLUE: '#e0f2fe',
    AMBIENT_GLOW: 'rgba(0, 191, 255, 0.22)',
  },
};

export const PORTRAIT_CONFIG = {
  LOCAL_IMAGE: '/images/ganesh-profile.png',
  FALLBACK_IMAGE: 'https://res.cloudinary.com/did8mktr3/image/upload/v1791113757/ganesh-photo_zi5zvw.webp',
  TILT_MAX_X: 3.5, // degrees
  TILT_MAX_Y: 4.5, // degrees
  SHIFT_MAX_X: 14, // pixels
  SHIFT_MAX_Y: 8,  // pixels
};

export const DEVELOPER_INFO = {
  name: "Ganesh Wakchaure",
  initials: "GW",
  role: "FULL STACK DEVELOPER",
  tagline: "Building scalable, intelligent and user-focused web applications.",
  bio: "Full stack developer specializing in modern web architecture, real-time backend services, and scalable cloud-connected applications. Experienced in developing full-stack systems from database design to reactive, responsive frontends.",
  status: "Available for opportunities",
  location: "Nashik / Pune, India",
  email: "ganeshwakchaure801@gmail.com",
  phone: "+91 8010072112",
  github: "https://github.com/GaneshWakchaure005",
  linkedin: "https://www.linkedin.com/in/ganesh-wakchaure-dev",
  instagram: "https://www.instagram.com/ganesh_wakchaure_005/",
  siteUrl: "https://ganeshwakchaure.dev",
  metadataTags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Next.js"],
};

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#experience" },
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
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "geo-intelligence",
    title: "Geo Intelligence Platform",
    category: "AI-Powered Lead Generation",
    description:
      "AI-powered industrial lead generation platform that helps businesses discover and analyse potential customers within specific locations.",
    longDescription:
      "Built a scalable full-stack application that collects industrial and business information using the Google Places API. The platform validates and deduplicates collected data, calculates lead scores to identify high-potential opportunities, and uses AI to generate concise business summaries and insights on demand.",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
      "Google Places API",
    ],
    isPrimary: true,
    githubUrl: "https://github.com/GaneshWakchaure005/geo-intelligence",
    features: [
      "Industrial and business discovery using Google Places API",
      "Business information collection including category, address, contact details, website, ratings and location",
      "Data validation and deduplication",
      "Lead scoring for identifying high-potential prospects",
      "AI-generated business summaries and insights",
    ],
  },
  {
    id: "smart-transit",
    title: "SmartTransit",
    category: "Real-Time Public Transport",
    description:
      "Real-time public transport tracking platform for passengers and administrators to monitor vehicles and access transit information.",
    longDescription:
      "Designed the system architecture and backend services for a real-time public transport platform. Built backend APIs for vehicle tracking, route management and real-time data processing, together with a React admin dashboard and Flutter mobile application.",
    techStack: [
      "Flutter",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    isPrimary: false,
    githubUrl: "https://github.com/GaneshWakchaure005/smart-transit",
    features: [
      "Real-time public vehicle tracking",
      "Vehicle and route management",
      "Backend APIs for real-time data processing",
      "React-based administrator dashboard",
      "Flutter mobile application for passengers",
      "Architecture connecting vehicles, administrators and passengers",
    ],
  },
];

export interface SkillItem {
  name: string;
  level: string;
  detail?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "Layout",
    skills: [
      { name: "HTML5", level: "Proficient", detail: "Semantic markup, accessibility, modern standards" },
      { name: "CSS3", level: "Proficient", detail: "Responsive layouts, flexbox, grid, animations" },
      { name: "Tailwind CSS", level: "Proficient", detail: "Modern utility-first responsive styling" },
      { name: "JavaScript", level: "Proficient", detail: "ES6+, async/await, DOM manipulation" },
      { name: "React.js", level: "Proficient", detail: "Hooks, state management, component architecture" },
      { name: "Next.js", level: "Familiar", detail: "App Router, SSR, modern React framework" },
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js", level: "Proficient", detail: "Event-driven runtime, asynchronous architecture" },
      { name: "Express.js", level: "Proficient", detail: "Middleware, RESTful routing, API design" },
      { name: "OOPs", level: "Familiar", detail: "Object-oriented design patterns, modular code" },
      { name: "REST API Development", level: "Proficient", detail: "Endpoints, status codes, JSON contracts" },
      { name: "MVC Architecture", level: "Familiar", detail: "Clean separation of models, views & controllers" },
      { name: "Authentication & Authorization", level: "Proficient", detail: "JWT, bcrypt, secure session handling" },
    ],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: "Proficient", detail: "Document modeling, aggregation, Mongoose schemas" },
      { name: "MySQL", level: "Familiar", detail: "Relational queries, tables, basic indexing" },
    ],
  },
  {
    title: "Tools & Practices",
    icon: "Cpu",
    skills: [
      { name: "Git", level: "Proficient", detail: "Version control, branching, merge workflows" },
      { name: "GitHub", level: "Proficient", detail: "Repository management, collaboration" },
      { name: "Postman", level: "Proficient", detail: "API testing, collections, endpoint debugging" },
      { name: "JWT Authentication", level: "Proficient", detail: "Stateless security tokens, claim verification" },
      { name: "Responsive Web Design", level: "Proficient", detail: "Mobile-first layouts, multi-device UX" },
      { name: "SEO Optimization", level: "Familiar", detail: "Meta tags, sitemaps, web performance" },
      { name: "Cloudflare", level: "Familiar", detail: "DNS, CDN delivery, basic security" },
    ],
  },
];

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "2023 — 2027",
    role: "BE Computer Engineering",
    company: "Sir Visvesvaraya Institute of Technology (SVIT), Nashik",
    type: "Engineering Degree",
    description:
      "Pursuing Computer Engineering with active specialization in Full Stack Web Development, distributed systems, and real-time backend API design. Building impactful applications and leading hackathon development teams.",
    achievements: [
      "Winner of State/National Hackathon with SmartTransit (real-time public transport tracking platform).",
      "Engineered full stack systems using React, Node.js, Express.js, MongoDB, and Tailwind CSS.",
      "Implemented secure JWT authentication, data validation, and real-time telemetry processing pipelines."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Flutter", "Tailwind CSS", "REST APIs"]
  }
];

export const ACHIEVEMENTS = [
  {
    title: "Hackathon Winner — SmartTransit",
    issuer: "Tech Innovation Hackathon",
    year: "2026",
    description:
      "Built SmartTransit, a real-time public transport tracking and management system. The project won the hackathon and secured access to an accelerator program.",
  },
];

export const EDUCATION = {
  degree: "BE Computer Engineering",
  institution: "Sir Visvesvaraya Institute of Technology (SVIT), Nashik",
  graduation: "2027",
};

export const CONTACT_INFO = {
  email: "ganeshwakchaure801@gmail.com",
  phone: "+91 8010072112",
  github: "https://github.com/GaneshWakchaure005",
  linkedin: "https://www.linkedin.com/in/ganesh-wakchaure-dev",
  instagram: "https://www.instagram.com/ganesh_wakchaure_005/",
};