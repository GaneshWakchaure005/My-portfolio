import React from "react";
import { DEVELOPER_INFO, PROJECTS } from "@/lib/constants";

export function JsonLd() {
  const baseUrl = DEVELOPER_INFO.siteUrl || "https://ganeshwakchaure.dev";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DEVELOPER_INFO.name,
    alternateName: ["Ganesh", "Ganesh Wakchaure Dev"],
    url: baseUrl,
    image: `${baseUrl}/images/ganesh-profile.png`,
    jobTitle: DEVELOPER_INFO.role,
    description: DEVELOPER_INFO.bio,
    email: `mailto:${DEVELOPER_INFO.email}`,
    telephone: DEVELOPER_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nashik",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Sir Visvesvaraya Institute of Technology (SVIT), Nashik",
      sameAs: "https://www.svitnashik.in",
    },
    sameAs: [
      DEVELOPER_INFO.github,
      DEVELOPER_INFO.linkedin,
      DEVELOPER_INFO.instagram,
    ],
    knowsAbout: [
      "Full Stack Web Development",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MERN Stack",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "RESTful APIs",
      "Three.js",
      "Interactive Web Applications",
      "Geospatial Systems",
      "Distributed Systems",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${DEVELOPER_INFO.name} — Full Stack Developer`,
    alternateName: "Ganesh Wakchaure Portfolio",
    url: baseUrl,
    description: DEVELOPER_INFO.tagline,
    author: {
      "@type": "Person",
      name: DEVELOPER_INFO.name,
    },
    inLanguage: "en-US",
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00+05:30",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: DEVELOPER_INFO.name,
      description: DEVELOPER_INFO.bio,
      image: `${baseUrl}/images/ganesh-profile.png`,
      sameAs: [
        DEVELOPER_INFO.github,
        DEVELOPER_INFO.linkedin,
        DEVELOPER_INFO.instagram,
      ],
    },
  };

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PROJECTS.map((proj, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "SoftwareApplication",
        name: proj.title,
        description: proj.description,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        author: {
          "@type": "Person",
          name: DEVELOPER_INFO.name,
        },
        url: proj.githubUrl || baseUrl,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
    </>
  );
}
