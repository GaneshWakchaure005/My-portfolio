export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  techStack: string[];
  keyFeature: string;
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string; // Keep empty string for now, user will populate with actual screenshots
}

export const PROJECTS: Project[] = [
  {
    id: "geo-intelligence",
    number: "01",
    title: "Geo Intelligence Platform",
    category: "AI-Powered Lead Generation & Spatial Analytics",
    shortDescription:
      "A high-throughput spatial discovery engine collecting and scoring industrial leads within target geographical radii. Validates, deduplicates, and generates AI-driven business intelligence on demand.",
    techStack: [
      "React.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Google Places API",
      "OpenAI",
    ],
    keyFeature:
      "Sub-100ms spatial query resolution with automated lead scoring and deduplication pipelines.",
    githubUrl: "https://github.com/GaneshWakchaure005/geo-intelligence",
    liveUrl: "https://github.com/GaneshWakchaure005/geo-intelligence",
    imageUrl: "",
  },
  {
    id: "smart-transit",
    number: "02",
    title: "SmartTransit System",
    category: "Real-Time Fleet Telemetry & Public Transit",
    shortDescription:
      "Award-winning distributed fleet management and real-time public transit tracking system. Powers bi-directional WebSocket telemetry between vehicle transponders, admin consoles, and passenger apps.",
    techStack: [
      "Flutter",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "WebSockets",
    ],
    keyFeature:
      "Won State/National Hackathon; live GPS coordinate streaming with sub-second latency.",
    githubUrl: "https://github.com/GaneshWakchaure005/smart-transit",
    liveUrl: "https://github.com/GaneshWakchaure005/smart-transit",
    imageUrl: "",
  },
  {
    id: "cloud-monitor",
    number: "03",
    title: "DevPulse - Cloud API Telemetry",
    category: "Distributed Uptime & Microservices Monitoring",
    shortDescription:
      "Modern serverless uptime monitoring platform that performs automated health checks across distributed edge regions, capturing SSL certificates, latency spikes, and automated incident alerts.",
    techStack: [
      "Next.js",
      "TypeScript",
      "MySQL",
      "Tailwind CSS",
      "Cloudflare",
      "REST APIs",
    ],
    keyFeature:
      "Global edge monitoring workers with real-time downtime alert webhooks and SLA tracking.",
    githubUrl: "https://github.com/GaneshWakchaure005",
    liveUrl: "https://github.com/GaneshWakchaure005",
    imageUrl: "",
  },
  {
    id: "omniflow-ai",
    number: "04",
    title: "OmniFlow AI Workflow Engine",
    category: "Autonomous Agentic Pipelines & Multimodal AI",
    shortDescription:
      "Visual orchestration platform for chaining AI models, custom API actions, and structured data extractors into deterministic, production-ready backend workflows.",
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Gemini AI",
      "Docker",
    ],
    keyFeature:
      "Dynamic prompt routing and node graph execution engine with zero-downtime deployment.",
    githubUrl: "https://github.com/GaneshWakchaure005",
    liveUrl: "https://github.com/GaneshWakchaure005",
    imageUrl: "",
  },
];
