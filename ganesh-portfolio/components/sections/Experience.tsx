"use client";

import React from "react";
import { Terminal, Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { EXPERIENCES } from "@/lib/constants";

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Professional Experience & History"
      className="relative w-full py-28 px-6 sm:px-10 lg:px-16 border-t border-slate-900 bg-[#020814]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>04 // CAREER TELEMETRY & IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Work history, systems built & roles.
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base mt-1">
            Track record of shipping production code, optimizing critical paths, and mentoring engineering teams.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 sm:before:left-8 before:w-[1px] before:bg-gradient-to-b before:from-cyan-500/40 before:via-slate-800 before:to-transparent">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="relative pl-12 sm:pl-20 group"
            >
              {/* Timeline Node Point */}
              <div className="absolute left-3 sm:left-6 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020814] border-2 border-cyan-400/80 group-hover:border-cyan-300 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Card Container */}
              <div className="rounded-2xl p-6 sm:p-8 glass-panel glass-panel-hover flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-cyan-400 font-mono mt-0.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{exp.company}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 text-xs">{exp.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="space-y-2 mt-1">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                    KEY MILESTONES:
                  </span>
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/60">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
