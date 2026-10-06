"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Layout,
  Server,
  Cloud,
  Wrench,
  Sparkles,
} from "lucide-react";

// ==========================================
// Authentic Technology Logo SVGs & Brand Colors
// ==========================================

interface SkillDefinition {
  name: string;
  pill?: string;
  tag: string;
  brandColor: string;
  icon: React.ReactNode;
}

interface SkillRow {
  id: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  skills: SkillDefinition[];
}

// 1. Frontend Logos
const ReactLogo = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.8" fill={color} />
  </svg>
);

const NextjsLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
    <circle cx="12" cy="12" r="10" fill="#000" stroke="#333" strokeWidth="1" />
    <path
      d="M8.5 7.5v9h2V12.2l4.8 6.3c.3-.2.6-.4.9-.6L9.8 8.8h-.3v-.3h-1v-1z"
      fill="#fff"
    />
    <path d="M14.5 7.5h2v6.2l-2-2.7z" fill="#fff" />
  </svg>
);

const JavaScriptLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect width="20" height="20" x="2" y="2" rx="4" fill="#F7DF1E" />
    <path
      d="M9.5 17.5c.6.4 1.2.6 2 .6 1.3 0 2.1-.7 2.1-2.1v-6h-2v6c0 .4-.2.6-.6.6-.3 0-.6-.1-.9-.3l-.6 1.2zm6.2-.2c.8.5 1.8.8 2.8.8 1.8 0 2.8-1 2.8-2.5 0-1.4-.8-2.1-2.3-2.7l-.7-.3c-.9-.4-1.3-.7-1.3-1.3 0-.6.5-1.1 1.3-1.1.7 0 1.3.2 1.8.5l.6-1.3c-.6-.4-1.4-.6-2.4-.6-1.8 0-2.8 1-2.8 2.4 0 1.3.8 2.1 2.2 2.6l.7.3c.9.4 1.4.8 1.4 1.4 0 .7-.6 1.2-1.5 1.2-.9 0-1.7-.4-2.2-.8l-.7 1.3z"
      fill="#000"
    />
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect width="20" height="20" x="2" y="2" rx="4" fill="#3178C6" />
    <path d="M5.5 10.5h5v2h-1.5v6.5h-2V12.5H5.5v-2z" fill="#fff" />
    <path
      d="M12.5 17.5c.7.4 1.5.6 2.3.6 1.5 0 2.4-.8 2.4-2.1 0-1.2-.7-1.8-1.9-2.3l-.6-.3c-.8-.3-1.1-.6-1.1-1.1 0-.5.4-.9 1.1-.9.6 0 1.1.2 1.5.4l.5-1.2c-.5-.3-1.2-.5-2-.5-1.5 0-2.4.9-2.4 2.1 0 1.1.7 1.8 1.9 2.3l.6.3c.8.3 1.2.6 1.2 1.1 0 .6-.5 1-1.2 1-.7 0-1.4-.3-1.8-.6l-.5 1.2z"
      fill="#fff"
    />
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" fill="#38BDF8" className="w-full h-full">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.914.228 1.568.892 2.292 1.627C13.666 10.6 15.114 12 18.4 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.567-.892-2.291-1.627C16.735 6.2 15.287 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.914.228 1.568.892 2.292 1.627C7.666 17.8 9.114 19.2 12.4 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.567-.892-2.291-1.627C10.735 13.4 9.287 12 6.001 12z" />
  </svg>
);

const Html5Logo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M4 3l1.5 16.5L12 21.5l6.5-2L20 3H4z" fill="#E34F26" />
    <path d="M12 4.5v15.3l5.2-1.6L18.4 4.5H12z" fill="#EF652A" />
    <path d="M7.5 7h9l-.2 2.2H9.6l.2 2.3h6.8l-.5 5.5-4.1 1.2-4.1-1.2-.3-3H9.4l.2 1.6 2.4.7 2.4-.7.2-2.3H7.2L7.5 7z" fill="#fff" />
  </svg>
);

const Css3Logo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M4 3l1.5 16.5L12 21.5l6.5-2L20 3H4z" fill="#1572B6" />
    <path d="M12 4.5v15.3l5.2-1.6L18.4 4.5H12z" fill="#33A9DC" />
    <path d="M7.5 7h9l-.2 2.2H9.6l.2 2.3h6.8l-.5 5.5-4.1 1.2-4.1-1.2-.3-3H9.4l.2 1.6 2.4.7 2.4-.7.2-2.3H7.2L7.5 7z" fill="#fff" />
  </svg>
);

// 2. Backend & Database Logos
const NodeLogo = () => (
  <svg viewBox="0 0 24 24" fill="#68A063" className="w-full h-full">
    <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2zm0 2.3L5.5 7.9v7.9L12 19.3l6.5-3.5V7.9L12 4.3z" />
    <path d="M10.5 8h3v5.5c0 1.2-.8 2-2 2s-2-.8-2-2h1.5c0 .4.2.6.5.6s.5-.2.5-.6V9.5h-1.5V8z" />
  </svg>
);

const ExpressLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-slate-200">
    <rect width="20" height="20" x="2" y="2" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />
    <text x="5" y="15" fill="#fff" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
      ex
    </text>
    <path d="M15.5 9l3 6M18.5 9l-3 6" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MongoLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M12 2C12 2 7 8.5 7 13.8c0 3.2 2.2 5.8 5 6.2v1.5h.5V20c2.8-.4 5-3 5-6.2C17.5 8.5 12 2 12 2z"
      fill="#47A248"
    />
    <path d="M12 2.5v17.5c2.6-.4 4.5-2.8 4.5-5.7 0-4.6-4.5-11.8-4.5-11.8z" fill="#499D4A" />
    <path d="M12 10.5c-.8 2.2-.2 4.5 0 6.5" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

const MySqlLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect width="20" height="20" x="2" y="2" rx="5" fill="#00758F" />
    <path
      d="M6 15c1.5-3 4-5 7-5s4 1.5 5 4c-.5-1.5-2-2.5-3.5-2.5-2 0-3.5 1.5-4.5 3.5-.8-.2-1.5-.2-2 0-.7.3-1.4 0-2 0z"
      fill="#F29111"
    />
    <circle cx="16" cy="11" r="1" fill="#fff" />
    <text x="6" y="19" fill="#fff" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif">
      SQL
    </text>
  </svg>
);

const RestApiLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-cyan-400">
    <rect x="3" y="4" width="18" height="16" rx="4" stroke="#06B6D4" strokeWidth="1.5" />
    <path d="M7 12h10M14 9l3 3-3 3M10 15l-3-3 3-3" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MvcLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-purple-400">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#A855F7" strokeWidth="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#A855F7" strokeWidth="1.5" />
    <rect x="8.5" y="14" width="7" height="7" rx="1.5" stroke="#A855F7" strokeWidth="1.5" />
    <path d="M6.5 10v2a2 2 0 002 2h3M17.5 10v2a2 2 0 01-2 2h-3" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const AuthJwtLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-pink-400">
    <path d="M12 3l7 3v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z" stroke="#EC4899" strokeWidth="1.5" />
    <circle cx="12" cy="11" r="2.5" stroke="#EC4899" strokeWidth="1.5" />
    <path d="M12 13.5v3" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 3. Deployment & Hosting Logos
const AwsLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M7.5 14.5c2.5 1.8 6.5 1.8 9 0"
      stroke="#FF9900"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path d="M17.5 13.5l.8 1.8-1.8.4" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
    <text x="4" y="10.5" fill="#fff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
      aws
    </text>
  </svg>
);

const VercelLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 4l9 16H3L12 4z" fill="#fff" />
  </svg>
);

const RenderLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect width="20" height="20" x="2" y="2" rx="5" fill="#141E28" stroke="#46E3B7" strokeWidth="1.2" />
    <path d="M6 14a4 4 0 014-4h4v4H6zM14 10a4 4 0 014 4h-4v-4z" fill="#46E3B7" />
  </svg>
);

const CloudflareLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M17.5 15.5H7.2a4 4 0 01-.7-7.9 5.5 5.5 0 0110.8-1.1 3.5 3.5 0 013.2 4.5 3.5 3.5 0 01-3 4.5z"
      fill="#F38020"
    />
    <path d="M14.5 15.5l1.5-3.5h-2.5l1.5-3.5-3 4h2l-1.5 3z" fill="#fff" />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" fill="#2496ED" className="w-full h-full">
    <path d="M4 11h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2z" />
    <path d="M22 13.5c-.5-.4-1.5-.5-2.2-.2-.2-.8-.8-1.5-1.6-1.8l-.5-.2-.3.5c-.3.6-.3 1.4 0 2-.8.5-2.2.5-3.4.5H3c-.6 2.2 1.3 5.7 6.5 5.7 6.2 0 10.3-3.6 11.2-5.7.5-.1 1.1-.3 1.3-.8z" />
  </svg>
);

const NginxLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" fill="#009639" />
    <path d="M8.5 7.5v9l7-9v9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 4. Tools & AI Logos
const GitLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <rect width="14" height="14" x="5" y="5" rx="2.5" transform="rotate(45 12 12)" fill="#F05032" />
    <circle cx="12" cy="8.5" r="1.5" fill="#fff" />
    <circle cx="8.5" cy="12" r="1.5" fill="#fff" />
    <circle cx="15.5" cy="15.5" r="1.5" fill="#fff" />
    <path d="M12 8.5v3.5l3.5 3.5M8.5 12l2 2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const PostmanLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="10" fill="#FF6C37" />
    <path
      d="M16 8l-6 4-3-2 9-2zm-6 4v4l2-2-2-2z"
      fill="#fff"
    />
    <circle cx="16" cy="8" r="1.5" fill="#fff" />
  </svg>
);

const OpenAiLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M12 3a4.5 4.5 0 00-4.1 2.7A4.4 4.4 0 004.5 9v.6A4.5 4.5 0 003 13.5a4.5 4.5 0 002.7 4.1 4.5 4.5 0 003.4 3.4 4.5 4.5 0 004.4 0 4.5 4.5 0 003.4-3.4 4.5 4.5 0 002.7-4.1 4.5 4.5 0 00-1.5-3.9v-.6a4.5 4.5 0 00-3.4-3.4A4.5 4.5 0 0012 3z"
      stroke="#10A37F"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="2" fill="#10A37F" />
  </svg>
);

const GeminiLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M12 2C12 7.52 7.52 12 2 12c5.48 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z"
      fill="url(#gemini-grad)"
    />
    <defs>
      <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4E86E4" />
        <stop offset="0.5" stopColor="#8AB4F8" />
        <stop offset="1" stopColor="#C58AF9" />
      </linearGradient>
    </defs>
  </svg>
);

const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" fill="#D97706" className="w-full h-full">
    <path d="M12 3l1.8 5.6H19l-4.5 3.4 1.7 5.5-4.2-3.3-4.2 3.3 1.7-5.5L4.5 8.6h5.2L12 3z" />
  </svg>
);

const VsCodeLogo = () => (
  <svg viewBox="0 0 24 24" fill="#007ACC" className="w-full h-full">
    <path d="M17.5 2.5l4 2v15l-4 2-10-9.5 10-9.5zm-3.5 9.5l-8-7.5-3.5 2 6.5 5.5-6.5 5.5 3.5 2 8-7.5z" />
  </svg>
);

// ==========================================
// Comprehensive 4-Row Master Skills Data
// ==========================================

const SKILL_ROWS: SkillRow[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    tagline:
      "Crafting pixel-perfect, highly responsive, interactive & reactive user experiences with modern component architectures.",
    icon: Layout,
    skills: [
      {
        name: "React.js",
        pill: "v19",
        tag: "Hooks & Component Trees",
        brandColor: "#61DAFB",
        icon: <ReactLogo color="#61DAFB" />,
      },
      {
        name: "Next.js",
        pill: "App Router",
        tag: "SSR & Server Components",
        brandColor: "#FFFFFF",
        icon: <NextjsLogo />,
      },
      {
        name: "JavaScript",
        pill: "ES6+",
        tag: "Async/Await & DOM APIs",
        brandColor: "#F7DF1E",
        icon: <JavaScriptLogo />,
      },
      {
        name: "TypeScript",
        pill: "Strict",
        tag: "Static Typing & Generics",
        brandColor: "#3178C6",
        icon: <TypeScriptLogo />,
      },
      {
        name: "Tailwind CSS",
        pill: "Utility",
        tag: "Responsive Design & Tokens",
        brandColor: "#38BDF8",
        icon: <TailwindLogo />,
      },
      {
        name: "HTML5",
        pill: "Semantic",
        tag: "Accessibility & Structure",
        brandColor: "#E34F26",
        icon: <Html5Logo />,
      },
      {
        name: "CSS3",
        pill: "Styling",
        tag: "Flexbox, Grid & Keyframes",
        brandColor: "#1572B6",
        icon: <Css3Logo />,
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database Systems",
    tagline:
      "Architecting robust server runtimes, secure API endpoints, relational/NoSQL schemas & scalable MVC architectures.",
    icon: Server,
    skills: [
      {
        name: "Node.js",
        pill: "Runtime",
        tag: "Event Loop & Async I/O",
        brandColor: "#68A063",
        icon: <NodeLogo />,
      },
      {
        name: "Express.js",
        pill: "REST Core",
        tag: "Middleware & Routing Engine",
        brandColor: "#CBD5E1",
        icon: <ExpressLogo />,
      },
      {
        name: "MongoDB",
        pill: "NoSQL",
        tag: "Aggregations & Mongoose Models",
        brandColor: "#47A248",
        icon: <MongoLogo />,
      },
      {
        name: "MySQL",
        pill: "Relational",
        tag: "SQL Queries, Tables & Indexing",
        brandColor: "#00758F",
        icon: <MySqlLogo />,
      },
      {
        name: "REST API",
        pill: "Protocols",
        tag: "HTTP Contracts, CRUD & JSON",
        brandColor: "#06B6D4",
        icon: <RestApiLogo />,
      },
      {
        name: "MVC Architecture",
        pill: "Pattern",
        tag: "Clean Controllers & Data Layers",
        brandColor: "#A855F7",
        icon: <MvcLogo />,
      },
      {
        name: "JWT Authentication",
        pill: "Security",
        tag: "Stateless Tokens & Password Hash",
        brandColor: "#EC4899",
        icon: <AuthJwtLogo />,
      },
    ],
  },
  {
    id: "deployment",
    title: "Deployments, Cloud & Hosting",
    tagline:
      "Automating deployment lifecycles, hosting on global edge networks, managing DNS caching & serverless environments.",
    icon: Cloud,
    skills: [
      {
        name: "AWS",
        pill: "Cloud",
        tag: "Compute, S3 Storage & VPC",
        brandColor: "#FF9900",
        icon: <AwsLogo />,
      },
      {
        name: "Vercel",
        pill: "Edge CI/CD",
        tag: "Serverless & Next.js Hosting",
        brandColor: "#FFFFFF",
        icon: <VercelLogo />,
      },
      {
        name: "Render",
        pill: "PaaS",
        tag: "Web Services & Background Tasks",
        brandColor: "#46E3B7",
        icon: <RenderLogo />,
      },
      {
        name: "Cloudflare",
        pill: "Edge & CDN",
        tag: "DNS Routing, SSL & DDoS Shield",
        brandColor: "#F38020",
        icon: <CloudflareLogo />,
      },
      {
        name: "Docker",
        pill: "Containers",
        tag: "Images, Containerization & Isolation",
        brandColor: "#2496ED",
        icon: <DockerLogo />,
      },
      {
        name: "Nginx",
        pill: "Web Server",
        tag: "Reverse Proxy & Load Balancing",
        brandColor: "#009639",
        icon: <NginxLogo />,
      },
    ],
  },
  {
    id: "tools",
    title: "Tools, Workflows & AI Integration",
    tagline:
      "Accelerating engineering throughput with modern version control, API testing suites and state-of-the-art AI systems.",
    icon: Wrench,
    skills: [
      {
        name: "Git",
        pill: "VCS",
        tag: "Branching, Merging & Rebase",
        brandColor: "#F05032",
        icon: <GitLogo />,
      },
      {
        name: "GitHub",
        pill: "Collab",
        tag: "Pull Requests & Open Source",
        brandColor: "#FFFFFF",
        icon: <GitHubLogo />,
      },
      {
        name: "Postman",
        pill: "Testing",
        tag: "Collections, Mocking & API Debug",
        brandColor: "#FF6C37",
        icon: <PostmanLogo />,
      },
      {
        name: "OpenAI / ChatGPT",
        pill: "GenAI",
        tag: "LLM APIs & Prompt Engineering",
        brandColor: "#10A37F",
        icon: <OpenAiLogo />,
      },
      {
        name: "Google Gemini",
        pill: "Multimodal",
        tag: "Gemini APIs & Intelligence",
        brandColor: "#4E86E4",
        icon: <GeminiLogo />,
      },
      {
        name: "Claude AI",
        pill: "Synthesis",
        tag: "Advanced Reasoning & Prototyping",
        brandColor: "#D97706",
        icon: <ClaudeLogo />,
      },
      {
        name: "VS Code",
        pill: "Editor",
        tag: "Debuggers & Custom Toolchains",
        brandColor: "#007ACC",
        icon: <VsCodeLogo />,
      },
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Technical Skills & Competencies"
      className="relative w-full py-24 sm:py-28 px-4 sm:px-8 lg:px-12 border-t border-slate-900 bg-[#020814] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">
            <span className="w-6 h-[2px] bg-amber-400" />
            <span>TECHNICAL ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-sans text-white">
            Specialized stack &{" "}
            <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              arsenal.
            </span>
          </h2>
        </div>

        {/* Master Single Container with Multiple Ordered Rows */}
        <div className="relative rounded-3xl bg-slate-950/75 border border-slate-800/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-5 sm:p-8 lg:p-10 flex flex-col gap-8 sm:gap-10 divide-y divide-slate-800/70">
          {SKILL_ROWS.map((row, idx) => {
            const RowIcon = row.icon;

            return (
              <div
                key={row.id}
                className={idx > 0 ? "pt-8 sm:pt-10" : ""}
              >
                {/* Row Header & Tagline */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-5 sm:mb-6">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
                      <RowIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
                          0{idx + 1}.
                        </span>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white font-sans tracking-tight">
                          {row.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-2xl font-normal leading-relaxed">
                        {row.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Modules Badge */}
                  <span className="self-start sm:self-center font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 shrink-0">
                    {row.skills.length} MODULES
                  </span>
                </div>

                {/* Row Stack of Interactive Logo Cards */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 lg:gap-4">
                  {row.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{
                        scale: 1.1,
                        y: -4,
                        boxShadow: `0 14px 28px -4px ${skill.brandColor}38, 0 0 16px ${skill.brandColor}24`,
                        borderColor: `${skill.brandColor}80`,
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 18,
                      }}
                      className="group relative flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/70 border border-slate-800/80 cursor-pointer select-none transition-colors"
                    >
                      {/* Authentic Brand Logo */}
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center p-1.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${skill.brandColor}14`,
                        }}
                      >
                        {skill.icon}
                      </div>

                      {/* Brand Label & Tag */}
                      <div className="flex flex-col pr-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">
                            {skill.name}
                          </span>
                          {skill.pill && (
                            <span
                              className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-medium tracking-wide transition-all"
                              style={{
                                color: skill.brandColor,
                                backgroundColor: `${skill.brandColor}12`,
                                border: `1px solid ${skill.brandColor}35`,
                              }}
                            >
                              {skill.pill}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors whitespace-nowrap">
                          {skill.tag}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
