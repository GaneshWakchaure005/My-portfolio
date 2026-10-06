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
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">
            <span className="w-6 h-[2px] bg-amber-400" />
            <span>HONORS & RECOGNITION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-sans text-white">
            Engineering milestones &{" "}
            <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              distinctions.
            </span>
          </h2>

          <p className="text-slate-400 max-w-2xl text-sm sm:text-base mt-4 leading-relaxed font-normal">
            Competitive hackathons, open source packages, and verified industry credentials.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {ACHIEVEMENTS.map((item, idx) => {
            const IconComponent = ICONS[idx % ICONS.length];
            return (
              <div
                key={item.title}
                className="rounded-2xl p-6 glass-panel glass-panel-hover flex flex-col justify-between group border-amber-500/20 hover:border-amber-400/40"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-amber-400/90 font-medium">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white font-sans mb-2 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-amber-400/90 mb-3">
                    {item.issuer}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[10px] font-mono text-amber-400/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>WINNER DISTINCTION</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
