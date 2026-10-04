"use client";

import React from "react";
import { Terminal, Award, Trophy, Code, ShieldCheck } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/constants";

const ICONS = [Trophy, Code, ShieldCheck, Award];

export function Achievements() {
  return (
    <section
      id="achievements"
      aria-label="Awards & Milestones"
      className="relative w-full py-28 px-6 sm:px-10 lg:px-16 border-t border-slate-900 bg-[#020814]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>05 // HONORS & RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            Engineering milestones & distinctions.
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base mt-1">
            Competitive hackathons, open source packages, and verified industry credentials.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((item, idx) => {
            const IconComponent = ICONS[idx % ICONS.length];
            return (
              <div
                key={item.title}
                className="rounded-2xl p-6 glass-panel glass-panel-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/60 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white font-sans mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-cyan-400/90 mb-3">
                    {item.issuer}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <span className="w-1 h-1 rounded-full bg-cyan-400" />
                  <span>VERIFIED RECORD</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
