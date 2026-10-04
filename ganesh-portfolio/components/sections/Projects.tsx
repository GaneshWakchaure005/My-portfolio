"use client";

import React, { useState } from "react";
import { Terminal, ExternalLink, Sparkles, Layers, Activity, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PROJECTS, ProjectItem } from "@/lib/constants";

export function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const primaryProject = PROJECTS.find((p) => p.isPrimary);
  const secondaryProjects = PROJECTS.filter((p) => !p.isPrimary);

  return (
    <section
      id="projects"
      aria-label="Engineered Projects & Systems"
      className="relative w-full py-28 px-6 sm:px-10 lg:px-16 border-t border-slate-900 bg-[#020814]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>03 // FEATURED ENGINEERING SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Production systems, platforms & architectures.
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base mt-1">
            Real systems built to solve concrete performance, spatial data, and distributed synchronization challenges.
          </p>
        </div>

        {/* PRIMARY FEATURED PROJECT: Geo Intelligence Platform */}
        {primaryProject && (
          <div className="mb-14 rounded-3xl p-8 sm:p-10 lg:p-12 glass-panel border border-cyan-500/30 relative overflow-hidden group">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 radial-glow-cyan opacity-30 pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-300 bg-cyan-950/80 border border-cyan-400/40">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  PRIMARY SYSTEM HIGHLIGHT
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {primaryProject.category}
                </span>
              </div>

              {primaryProject.metrics && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{primaryProject.metrics}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-5">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
                  {primaryProject.title}
                </h3>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                  {primaryProject.longDescription}
                </p>

                {/* Key Architectural Highlights */}
                <div className="mt-2 space-y-2.5">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    ENGINEERING HIGHLIGHTS:
                  </span>
                  {primaryProject.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="text-cyan-400 font-mono mt-0.5">▸</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-4">
                  {primaryProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4">
                  {primaryProject.githubUrl && (
                    <a
                      href={primaryProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono font-medium transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>VIEW SOURCE</span>
                    </a>
                  )}
                  {primaryProject.liveUrl && (
                    <a
                      href={primaryProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-medium transition-all hover:bg-cyan-500/30 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Interactive Mock Schematic Preview */}
              <div className="lg:col-span-5 rounded-2xl bg-slate-950/80 border border-cyan-500/20 p-6 flex flex-col gap-4 relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[11px] font-mono text-slate-400 ml-2">
                      geo_viewport_pipeline.rs
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400">
                    60.2 FPS
                  </span>
                </div>

                {/* Spatial Grid Schematic */}
                <div className="h-56 rounded-lg bg-[#030914] border border-slate-800 relative flex items-center justify-center tech-grid-pattern overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020814] via-transparent to-transparent" />
                  
                  {/* Concentric radar rings */}
                  <div className="absolute w-44 h-44 rounded-full border border-cyan-500/20 animate-pulse" />
                  <div className="absolute w-28 h-28 rounded-full border border-cyan-500/30" />
                  <div className="absolute w-12 h-12 rounded-full border border-cyan-400/40 bg-cyan-500/10" />

                  {/* Pulsing spatial points */}
                  <div className="absolute top-1/4 left-1/3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/90 border border-cyan-400/40 text-[9px] font-mono text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    Cluster Alpha [14.2k pts]
                  </div>

                  <div className="absolute bottom-1/4 right-1/4 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[9px] font-mono text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Sector Bravo [38.1k pts]
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-400 pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px]">PIPELINE:</span>
                    <span className="text-slate-200">WebGL 2.0 / PostGIS</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">QUERY RESOLUTION:</span>
                    <span className="text-cyan-400">Sub-10ms Spatial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECONDARY PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {secondaryProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl p-6 sm:p-8 glass-panel glass-panel-hover flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-colors" />
                </div>

                <h4 className="text-xl font-bold text-white font-sans mb-3 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h4>

                <p className="text-sm text-slate-400 leading-relaxed font-normal mb-5">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="mb-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-300">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    <span>{project.metrics}</span>
                  </div>
                )}

                {/* Features bullet list */}
                <div className="space-y-1.5 mb-6 text-xs text-slate-400">
                  {project.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400/70 font-mono">›</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-800/60">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between pt-2">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>CODE</span>
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-600">IN DEVELOPMENT</span>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors group-hover:underline"
                    >
                      <span>LIVE DEMO</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
