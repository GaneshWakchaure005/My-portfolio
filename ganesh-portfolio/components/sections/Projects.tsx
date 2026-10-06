"use client";

import React from "react";
import Image from "next/image";
import {
  Terminal,
  Sparkles,
  ArrowUpRight,
  ImageIcon,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PROJECTS, type Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

function ProjectCard({ project, index, total }: ProjectCardProps) {
  return (
    <div
      className="sticky w-full mb-20 sm:mb-28 lg:mb-36 last:mb-0"
      style={{
        // Each card stops slightly lower than the previous one, stacking in view
        top: `calc(4.75rem + ${index * 32}px)`,
        zIndex: 10 + index,
      }}
    >
      {/* Outer Card with Static Sharp Light-Color Gradient Border (pink, red, yellow, sky blue, white) */}
      <div className="relative w-full rounded-3xl p-[1.5px] sm:p-[2px] bg-gradient-to-r from-pink-300 via-rose-400 via-yellow-200 via-sky-300 to-white shadow-2xl overflow-hidden">
        {/* Inner Card Container - 100% full opacity, sharp border with no blur shadow */}
        <div className="relative w-full h-full rounded-[22px] bg-[#030917] p-6 sm:p-7 lg:p-8 overflow-hidden">
          {/* Subtle top inner highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none" />

          {/* Ambient subtle corner glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Card Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-3 py-1 rounded-full shadow-inner">
                PROJECT // {project.number}
              </span>
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider hidden sm:inline">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                {index + 1} OF {total}
              </span>
            </div>
          </div>

          {/* Card Main Grid: Left Details, Right Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column: Details & Live Links (No tech stack) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[11px] text-cyan-400/90 uppercase tracking-widest sm:hidden block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans tracking-tight">
                    {project.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
                  {project.shortDescription}
                </p>
              </div>

              {/* Only Live Links Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 text-xs sm:text-sm font-mono font-bold transition-all duration-200 hover:shadow-[0_0_28px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>LIVE DEMO</span>
                    <ArrowUpRight className="w-4 h-4 font-bold" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/60 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-mono font-medium transition-all duration-200 shadow-sm hover:text-white"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-200" />
                    <span>SOURCE CODE</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Large Project Screenshot / Visual Area */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#030914] via-[#050e1f] to-slate-950 border border-slate-800/90 shadow-inner flex flex-col">
                {/* Window Header Frame Bar */}
                <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md z-10 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                    <span className="text-cyan-400">sys://</span>
                    <span>{project.id}.prod</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-cyan-400/40" />
                </div>

                {/* Visual Body: If image set, render; else high-tech preview blueprint */}
                <div className="relative flex-1 w-full flex items-center justify-center p-4 overflow-hidden">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={`${project.title} Preview Screenshot`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 tech-grid-pattern">
                      {/* Concentric radar rings */}
                      <div className="absolute w-44 h-44 rounded-full border border-cyan-500/15 animate-pulse pointer-events-none" />
                      <div className="absolute w-28 h-28 rounded-full border border-cyan-500/25 pointer-events-none" />
                      <div className="absolute w-14 h-14 rounded-full border border-cyan-400/40 bg-cyan-500/10 pointer-events-none" />

                      {/* Central Preview Info */}
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-cyan-400 shadow-lg">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-xs font-semibold text-slate-200 mt-1">
                          Screenshot Preview
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 max-w-[200px]">
                          Add visual image URL in{" "}
                          <code className="text-cyan-300">lib/projects.ts</code>
                        </span>
                      </div>

                      {/* Bottom floating telemetry status */}
                      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[10px] font-mono text-slate-500 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          READY FOR ASSETS
                        </span>
                        <span className="text-slate-400">1920 × 1080</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Engineered Projects & Systems"
      className="relative w-full py-28 px-4 sm:px-8 lg:px-16 border-t border-slate-900 bg-[#020814]"
    >
      {/* Background ambient lighting - clipped in its own container so section sticky is unaffected */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">
            <span className="w-6 h-[2px] bg-amber-400" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-sans text-white">
            Things I&apos;ve{" "}
            <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              built.
            </span>
          </h2>
        </div>

        {/* Single Shared Sticky Stacking Container */}
        <div className="relative w-full pb-16">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
