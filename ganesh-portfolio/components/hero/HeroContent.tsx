"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal, Sparkles } from "lucide-react";
import { DEVELOPER_INFO } from "@/lib/constants";

export function HeroContent() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.8, // System initialization sequence timing
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
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="relative z-20 flex h-full min-h-[700px] w-full flex-col justify-between px-6 sm:px-10 lg:px-16 pt-32 pb-12 max-w-7xl mx-auto">
      {/* Main hero typography & CTAs */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mt-8 sm:mt-16 lg:mt-20"
      >
        {/* Status Indicator */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/20 shadow-sm shadow-cyan-950/40 backdrop-blur-md mb-6">
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
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase font-sans mb-3"
        >
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {DEVELOPER_INFO.name}
          </span>
        </motion.h1>

        {/* Professional Title */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <div className="h-[2px] w-8 bg-cyan-400/80" />
          <h2 className="tech-mono text-sm sm:text-base font-semibold tracking-wider text-cyan-400 uppercase">
            {DEVELOPER_INFO.role}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-xl font-normal mb-8"
        >
          {DEVELOPER_INFO.tagline}
        </motion.p>

        {/* Technical Metadata Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 text-xs text-slate-400 font-mono"
        >
          <span className="flex items-center gap-1.5 text-cyan-400/90 mr-1">
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Stack:</span>
          </span>
          {DEVELOPER_INFO.metadataTags.map((tech, idx) => (
            <span
              key={tech}
              className="inline-flex items-center px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800/80 text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
            >
              {tech}
              {idx < DEVELOPER_INFO.metadataTags.length - 1 && (
                <span className="text-slate-600 ml-2">/</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            id="hero-cta-projects"
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-medium text-sm transition-all duration-300 hover:bg-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:text-white active:scale-[0.98]"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#contact"
            id="hero-cta-contact"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 font-medium text-sm transition-all duration-300 hover:bg-slate-800/80 hover:text-white hover:border-slate-700 active:scale-[0.98]"
          >
            <span>Let&apos;s Connect</span>
            <Sparkles className="w-4 h-4 text-slate-400 transition-colors duration-300 group-hover:text-cyan-400" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll to Explore indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="flex items-center justify-between pt-8 border-t border-slate-800/40 text-slate-500"
      >
        <a
          href="#about"
          className="group inline-flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase transition-colors hover:text-cyan-400"
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
