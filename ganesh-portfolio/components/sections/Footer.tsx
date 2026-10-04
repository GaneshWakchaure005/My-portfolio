"use client";

import React from "react";
import { Terminal, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon } from "@/components/ui/Icons";
import { DEVELOPER_INFO } from "@/lib/constants";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-900 bg-[#020713] py-12 px-6 sm:px-10 lg:px-16 text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-semibold text-slate-300">
              {DEVELOPER_INFO.name.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              FULL STACK SOFTWARE ARCHITECTURE
            </span>
          </div>
        </div>

        {/* System telemetry indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ALL CLUSTERS OPERATIONAL</span>
          <span className="text-slate-600">•</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <a
              href={DEVELOPER_INFO.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-1.5 rounded hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={DEVELOPER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-1.5 rounded hover:text-cyan-400 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={DEVELOPER_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="p-1.5 rounded hover:text-cyan-400 transition-colors"
            >
              <TwitterXIcon className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors ml-2"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
