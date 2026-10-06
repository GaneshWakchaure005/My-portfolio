"use client";

import React from "react";
import { Terminal, Briefcase, Rocket, Layers } from "lucide-react";
import { DEVELOPER_INFO } from "@/lib/constants";

export function About() {
  const highlights = [
    {
      icon: Briefcase,
      badge: "EXPERIENCE",
      badgeColor: "text-cyan-400 bg-cyan-950/50 border-cyan-500/30",
      iconColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_16px_rgba(34,211,238,0.3)]",
      value: "1 Year",
      label: "Professional Experience",
      description:
        "Actively engineering scalable web apps, writing maintainable code, and delivering freelance client solutions.",
    },
    {
      icon: Rocket,
      badge: "DELIVERED",
      badgeColor: "text-amber-400 bg-amber-950/50 border-amber-500/30",
      iconColor: "text-amber-400 bg-amber-400/10 border-amber-400/30 group-hover:border-amber-400 group-hover:shadow-[0_0_16px_rgba(251,191,36,0.3)]",
      value: "10+ Projects",
      label: "Completed & Counting",
      description:
        "Architected end-to-end web products, production systems, client portals, and robust zero-to-one MVPs.",
    },
    {
      icon: Layers,
      badge: "CORE STACK",
      badgeColor: "text-sky-400 bg-sky-950/50 border-sky-500/30",
      iconColor: "text-sky-400 bg-sky-400/10 border-sky-400/30 group-hover:border-sky-400 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.3)]",
      value: "MERN Stack",
      label: "Primary Tech Stack",
      description:
        "Specialized across MongoDB, Express.js, React.js, and Node.js with Next.js, TypeScript & cloud hosting.",
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Ganesh Wakchaure"
      className="relative w-full py-28 px-4 sm:px-10 lg:px-16 border-t border-slate-900 bg-[#020814] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">
            <span className="w-6 h-[2px] bg-amber-400" />
            <span>ARCHITECTURAL PROFILE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-sans text-white">
            Turning ideas into{" "}
            <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              reality.
            </span>
          </h2>
        </div>

        {/* Narrative Bio */}
        <div className="mb-14 px-4 sm:px-12 lg:px-20">
          <div className="flex flex-col gap-6 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              I am <span className="text-white font-medium">{DEVELOPER_INFO.name}</span>, a full stack software engineer and freelance developer dedicated to building software that operates reliably in real-world conditions. My work spans the entire stack—from distributed backend queues and spatial indexing engines to highly polished, responsive frontends.
            </p>
            <p className="text-slate-400">
              Alongside core engineering, I actively take on <span className="text-amber-300 font-medium">freelance client projects and contract development</span>. Whether collaborating with startups on zero-to-one MVPs, building RESTful backend microservices, or engineering modern reactive web apps, I prioritize rapid delivery, architectural clarity, and production uptime.
            </p>
            <p className="text-slate-400">
              My engineering philosophy revolves around simplicity, modular decoupling, and verifiable performance. When I design a system, it is built to scale gracefully, withstand traffic spikes, and deliver exceptional developer and end-user experiences.
            </p>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-12 lg:px-20">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.value}
                className="rounded-2xl p-[1.5px] sm:p-[2px] bg-gradient-to-r from-pink-300 via-rose-400 via-yellow-200 via-sky-300 to-white transition-all duration-300 hover:shadow-[0_0_35px_rgba(244,114,182,0.3),0_0_30px_rgba(56,189,248,0.3)] hover:-translate-y-1 flex flex-col group overflow-hidden"
              >
                <div className="rounded-[14.5px] p-6 sm:p-7 bg-[#030917]/95 backdrop-blur-xl flex flex-col justify-between h-full w-full">
                  <div>
                    {/* Top Row: Icon + Badge
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${item.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div> */}

                    {/* Metric Value & Label */}
                    <div className="space-y-1 mb-3">
                      <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono tracking-tight group-hover:text-amber-200 transition-colors">
                        {item.value}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                        {item.label}
                      </div>
                    </div>

                    {/* Description */}
                    {/* <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                      {item.description}
                    </p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
