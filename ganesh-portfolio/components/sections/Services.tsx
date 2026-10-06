"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Rocket, ArrowUpRight, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/constants";

// Icon mapping matching the reference design
const SERVICE_ICONS = {
  Code2: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="20" height="8" x="2" y="3" rx="2" />
      <rect width="20" height="8" x="2" y="13" rx="2" />
      <line x1="6" x2="6.01" y1="7" y2="7" />
      <line x1="6" x2="6.01" y1="17" y2="17" />
    </svg>
  ),
  Rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
};

export function Services() {
  return (
    <section
      id="services"
      aria-label="Services & Freelance Expertise"
      className="relative w-full py-28 px-6 sm:px-10 lg:px-16 border-t border-slate-900 bg-[#020814] overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - matches image layout and typography */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          {/* Top Label with mini line */}
          <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">
            <span className="w-6 h-[2px] bg-amber-400" />
            <span>WHAT I OFFER</span>
          </div>

          {/* Heading: Services & Expertise */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-sans text-white">
            Services &{" "}
            <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>

          {/* Freelancer Subtitle */}
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base mt-4 leading-relaxed font-normal">
            Available for <span className="text-slate-200 font-medium">freelance projects</span>, end-to-end application development, and technical consulting. Transforming product concepts into scalable, production-grade digital experiences.
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {SERVICES.map((service, index) => {
            const icon =
              SERVICE_ICONS[service.iconName as keyof typeof SERVICE_ICONS] || (
                <Code2 className="w-5 h-5 text-amber-400" />
              );

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl p-7 sm:p-8 bg-[#030816]/80 backdrop-blur-xl border border-slate-800/80 hover:border-amber-400/50 hover:shadow-[0_20px_45px_rgba(245,158,11,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Box with amber border matching reference */}
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(245,158,11,0.3)] transition-all duration-300 mb-6">
                    {icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight mb-3 group-hover:text-amber-200 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-normal mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Tags / Deliverables */}
                <div className="pt-4 border-t border-slate-800/70 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 group-hover:border-amber-400/30 group-hover:text-amber-300/90 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
