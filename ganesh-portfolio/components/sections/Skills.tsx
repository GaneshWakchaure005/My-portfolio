"use client";

import React from "react";
import { Terminal, Layout, Server, Database, Cpu, CheckCircle2 } from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/constants";

const ICON_MAP = {
  Layout: Layout,
  Server: Server,
  Database: Database,
  Cpu: Cpu,
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Technical Skills & Competencies"
      className="relative w-full py-28 px-6 sm:px-10 lg:px-16 border-t border-slate-900 bg-[#020814]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>02 // TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Specialized toolsets & engineering domains.
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base mt-1">
            Carefully curated technologies honed through production environments, high-throughput systems, and performant web graphics.
          </p>
        </div>

        {/* 4 Category Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SKILL_CATEGORIES.map((category) => {
            const IconComponent =
              ICON_MAP[category.icon as keyof typeof ICON_MAP] || Terminal;

            return (
              <div
                key={category.title}
                className="rounded-2xl p-6 sm:p-8 glass-panel glass-panel-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-semibold text-white font-sans">
                        {category.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {category.skills.length} MODULES
                    </span>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm text-slate-200 font-sans flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                            {skill.name}
                          </span>
                          <span className="tech-mono text-[10px] uppercase px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 font-semibold border border-slate-700/60">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-normal pl-5">
                          {skill.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>PRODUCTION READY</span>
                  <span className="text-cyan-400/80">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
