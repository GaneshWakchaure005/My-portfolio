"use client";

import React from "react";
import { Terminal, Cpu, Database, Network, ShieldCheck, Zap } from "lucide-react";
import { DEVELOPER_INFO } from "@/lib/constants";

export function About() {
  const corePrinciples = [
    {
      icon: Network,
      title: "System-First Architecture",
      description:
        "Designing resilient distributed services that maintain sub-100ms response profiles under high concurrent loads.",
    },
    {
      icon: Zap,
      title: "GPU & Interactive Performance",
      description:
        "Pushing browser capabilities with Three.js, instanced rendering, and zero-jank frame budgets at solid 60 FPS.",
    },
    {
      icon: Database,
      title: "Data Integrity & Streaming",
      description:
        "Architecting event-driven pipelines with WebSockets, Redis pub/sub, and ACID-compliant relational and spatial models.",
    },
    {
      icon: ShieldCheck,
      title: "Production Discipline",
      description:
        "Zero-compromise engineering: comprehensive static typing, automated CI/CD suites, and audited security standards.",
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Ganesh Wakchaure"
      className="relative w-full py-28 px-6 sm:px-10 lg:px-16 border-t border-slate-900 bg-[#020814]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // ARCHITECTURAL PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Engineering robust software with high precision.
          </h2>
        </div>

        {/* Grid: Bio & System Spec card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              I am <span className="text-white font-medium">{DEVELOPER_INFO.name}</span>, a full stack software engineer dedicated to building software that operates reliably in real-world conditions. My work spans the entire stack—from distributed backend queues and spatial indexing engines to highly polished, responsive frontends.
            </p>
            <p className="text-slate-400">
              Rather than treating animations as superficial decoration, I view interactivity as a direct extension of user telemetry. Whether visualizing multi-gigabyte geospatial datasets at 60 frames per second or synchronizing live fleet coordinates over WebSockets, I focus on performance, clarity, and rock-solid architectural fundamentals.
            </p>
            <p className="text-slate-400">
              My engineering philosophy revolves around simplicity, modular decoupling, and verifiable uptime. When I design a system, it is built to scale gracefully, withstand traffic spikes, and deliver exceptional developer and end-user experiences.
            </p>
          </div>

          {/* System Spec Dashboard Card */}
          <div className="lg:col-span-5 rounded-2xl p-6 glass-panel border border-cyan-500/20 shadow-xl shadow-black/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 radial-glow-cyan opacity-40 pointer-events-none" />
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs text-slate-300 font-semibold uppercase tracking-wider">
                  SYSTEM TELEMETRY
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">ENGINEER:</span>
                <span className="text-slate-200">{DEVELOPER_INFO.name}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">DISCIPLINE:</span>
                <span className="text-cyan-400">{DEVELOPER_INFO.role}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-slate-200">{DEVELOPER_INFO.location}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-emerald-400">{DEVELOPER_INFO.status}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-400">SPECIALIZATION:</span>
                <span className="text-slate-200 text-right">MERN, Next.js, WebGL & Distributed Cloud</span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-lg font-bold text-cyan-400 font-mono">50+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-tight">Modules</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-lg font-bold text-cyan-400 font-mono">&lt;50ms</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-tight">Latency</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-lg font-bold text-cyan-400 font-mono">60 FPS</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-tight">Viewport</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePrinciples.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="rounded-xl p-6 glass-panel glass-panel-hover flex flex-col gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/60 group-hover:text-cyan-300 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white font-sans mt-1">
                  {principle.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
