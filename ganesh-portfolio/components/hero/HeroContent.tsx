"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal, Sparkles } from "lucide-react";
import { DEVELOPER_INFO } from "@/lib/constants";
import { Portrait } from "./Portrait";

interface HeroContentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function HeroContent({ containerRef }: HeroContentProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="relative z-20 flex min-h-screen lg:h-full w-full flex-col justify-between px-5 sm:px-8 lg:px-16 pt-24 sm:pt-28 pb-8 lg:pt-24 lg:pb-8 max-w-7xl mx-auto">
      {/* Responsive Grid: Left typography & Right centered portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center my-auto w-full">
        {/* Left Column: Developer Identity & Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-1"
        >
          {/* Status Indicator */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/20 shadow-sm shadow-cyan-950/40 backdrop-blur-md mb-5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tech-mono text-xs font-medium tracking-wide text-slate-300">
              {DEVELOPER_INFO.status}
            </span>
          </motion.div>

          {/* Developer Name */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase font-sans mb-3"
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              {DEVELOPER_INFO.name}
            </span>
          </motion.h1>

          {/* Professional Title */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-start gap-3 mb-5"
          >
            <div className="h-[2px] w-6 sm:w-8 bg-cyan-400/80" />
            <h2 className="tech-mono text-xs sm:text-sm md:text-base font-semibold tracking-wider text-cyan-400 uppercase">
              {DEVELOPER_INFO.role}
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-lg text-slate-300/90 leading-relaxed max-w-xl font-normal mb-6"
          >
            {DEVELOPER_INFO.tagline}
          </motion.p>

          {/* Centered Portrait for Mobile View (shows in-flow between text & CTAs on <lg) */}
          <div className="block lg:hidden w-full my-3">
            <Portrait containerRef={containerRef} />
          </div>

          {/* Technical Metadata Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 mb-8 text-xs text-slate-400 font-mono"
          >
            <span className="flex items-center gap-1.5 text-cyan-400/90 mr-1">
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase tracking-wider text-slate-400">
                Stack:
              </span>
            </span>
            {DEVELOPER_INFO.metadataTags.map((tech, idx) => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-slate-900/60 border border-slate-800/80 text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-300 text-[11px] sm:text-xs"
              >
                {tech}
                {idx < DEVELOPER_INFO.metadataTags.length - 1 && (
                  <span className="text-slate-600 ml-2">/</span>
                )}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
          >
            <a
              href="#projects"
              id="hero-cta-projects"
              className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-medium text-xs sm:text-sm transition-all duration-300 hover:bg-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:text-white active:scale-[0.98]"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#contact"
              id="hero-cta-contact"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 font-medium text-xs sm:text-sm transition-all duration-300 hover:bg-slate-800/80 hover:text-white hover:border-slate-700 active:scale-[0.98]"
            >
              <span>Let&apos;s Connect</span>
              <Sparkles className="w-4 h-4 text-slate-400 transition-colors duration-300 group-hover:text-cyan-400" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Centered Developer Portrait on Desktop */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-center w-full order-2">
          <Portrait containerRef={containerRef} />
        </div>
      </div>

      {/* Scroll to Explore indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="flex items-center justify-between pt-6 border-t border-slate-800/40 text-slate-500 mt-6 lg:mt-0"
      >
        <a
          href="#about"
          className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors hover:text-cyan-400"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 group-hover:scale-125 transition-transform" />
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400/80" />
        </a>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-slate-500">
          <span>LATENCY: &lt;16MS</span>
          <span>•</span>
          <span>GPU ACCELERATED</span>
        </div>
      </motion.div>
    </div>
  );
}
