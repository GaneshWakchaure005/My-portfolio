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
    "id": "geo-intelligence",
    "number": "01",
    "title": "Geo Intelligence Platform",
    "category": "AI-Powered Lead Generation & Sales Automation",
    "shortDescription": "A lead generation platform I built to help businesses find and reach potential customers faster. It searches targeted industrial areas, collects and cleans business data, scores leads, generates AI-powered insights, extracts emails from company websites, and lets users turn those leads into targeted email campaigns.",
    "techStack": [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Google Places API",
      "OpenAI",
      "JWT",
      "Nodemailer"
    ],
    "keyFeature": "From finding a business to sending the first email — discovery, data enrichment, validation, deduplication, lead scoring, AI insights, email extraction, and outreach are connected into one workflow.",
    "githubUrl": "https://github.com/om-patil-builds/geo-intelligence-platform.git",
    "liveUrl": "https://geointel-five.vercel.app/",
    "imageUrl": ""
  },
  {
  "id": "smart-transit",
  "number": "02",
  "title": "SmartTransit System",
  "category": "Real-Time Public Transit & Fleet Tracking",
  "shortDescription": "A real-time public transportation system built during a hackathon to make bus tracking more transparent and accessible. The system streams live GPS locations from vehicles to a backend, allowing passengers to track buses while admins monitor and manage the fleet through dedicated dashboards.",
  "techStack": [
    "Flutter",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "WebSockets"
  ],
  "keyFeature": "Hackathon-winning system with real-time GPS tracking, live vehicle location streaming, passenger tracking, and an admin dashboard for fleet monitoring and management.",
  "githubUrl": "https://github.com/GaneshWakchaure005/smart-transit",
  "liveUrl": "https://github.com/GaneshWakchaure005/smart-transit",
  "imageUrl": ""
},
{
  "id": "om-arts",
  "number": "03",
  "title": "Om Arts",
  "category": "Business Website & E-Commerce Management",
  "shortDescription": "A full-featured digital platform built for a Ganpati idol manufacturing business, combining a dynamic product catalog, online booking, lead generation, and business management tools. The catalog is managed through a custom admin dashboard using Supabase, allowing the business to update products and availability without changing the code.",
  "techStack": [
    "React.js",
    "Node.js",
    "Express.js",
    "Supabase",
    "Tailwind CSS",
    "Cloudinary"
  ],
  "keyFeature": "Dynamic admin-managed catalog with online idol booking, automated bill generation, customer lead capture, and centralized product management for wholesale and retail operations.",
  "githubUrl": "https://github.com/GaneshWakchaure005/Om-Arts-business-project.git",
  "liveUrl": "https://om-arts.in/",
  "imageUrl": ""
},
{
  "id": "inventoprocess",
  "number": "04",
  "title": "Invento Process",
  "category": "Industrial Manufacturing & Business Website",
  "shortDescription": "A modern business website built for an industrial pump manufacturing company to showcase its products, capabilities, and applications online. The site is designed to give potential customers a clear view of the company's product range while providing a direct channel for enquiries and lead generation.",
  "techStack": [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "Cloudinary"
  ],
  "keyFeature": "Responsive industrial product catalog with structured product information, enquiry-driven lead generation, and a professional digital presence tailored for B2B customers.",
  "githubUrl": "https://github.com/GaneshWakchaure005/invento-process-solutions-project.git",
  "liveUrl": "https://inventoprocess.com",
  "imageUrl": ""
},
{
  "id": "kavachx",
  "number": "05",
  "title": "KavachX",
  "category": "Gym Management & Membership SaaS",
  "shortDescription": "A gym management platform designed to simplify how fitness centers manage members, attendance, memberships, and payments. Gym owners can manage their operations from a centralized dashboard, while members can join their gym through a QR-based registration flow and track their attendance and membership status.",
  "techStack": [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "JWT",
    "QR Code"
  ],
  "keyFeature": "QR-based member onboarding with owner approval, digital attendance tracking, membership management, payment tracking, and a centralized gym owner dashboard.",
  "githubUrl": "https://github.com/chetan3625/kavachx.git",
  "liveUrl": "https://github.com/chetan3625/kavachx.git",
  "imageUrl": ""
}

];
