"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, GitBranch } from "lucide-react";
import { PORTRAIT_CONFIG } from "@/lib/constants";

interface PortraitProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function Portrait({ containerRef }: PortraitProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const portraitRef = useRef<HTMLDivElement>(null);

  // Mouse normalized values (-1 to 1) for 3D parallax & tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics configuration for organic fluid response
  const springConfig = { damping: 22, stiffness: 140, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Parallax translation: X: ±14px, Y: ±8px
  const translateX = useTransform(
    smoothX,
    [-1, 1],
    [-PORTRAIT_CONFIG.SHIFT_MAX_X, PORTRAIT_CONFIG.SHIFT_MAX_X]
  );
  const translateY = useTransform(
    smoothY,
    [-1, 1],
    [-PORTRAIT_CONFIG.SHIFT_MAX_Y, PORTRAIT_CONFIG.SHIFT_MAX_Y]
  );

  // Subtle 3D tilt: rotateX: ±3.5 deg, rotateY: ±4.5 deg
  const rotateX = useTransform(
    smoothY,
    [-1, 1],
    [PORTRAIT_CONFIG.TILT_MAX_X, -PORTRAIT_CONFIG.TILT_MAX_X]
  );
  const rotateY = useTransform(
    smoothX,
    [-1, 1],
    [-PORTRAIT_CONFIG.TILT_MAX_Y, PORTRAIT_CONFIG.TILT_MAX_Y]
  );

  // Terminal parallax layer offset for enhanced depth
  const terminalTranslateX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const terminalTranslateY = useTransform(smoothY, [-1, 1], [-4, 4]);

  // Ambient aura parallax offset
  const auraX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const auraY = useTransform(smoothY, [-1, 1], [-15, 15]);

  // Virtual studio light position across the portrait (percentage 0 to 100)
  const [lightPos, setLightPos] = useState({ x: 50, y: 35 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    const checkReducedMotion = () => {
      setIsReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile || isReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      mouseX.set(normX);
      mouseY.set(normY);

      // Track cursor relative to portrait for virtual studio lighting
      if (portraitRef.current) {
        const pRect = portraitRef.current.getBoundingClientRect();
        const pX = ((e.clientX - pRect.left) / pRect.width) * 100;
        const pY = ((e.clientY - pRect.top) / pRect.height) * 100;

        const isNear =
          e.clientX >= pRect.left - 80 &&
          e.clientX <= pRect.right + 80 &&
          e.clientY >= pRect.top - 80 &&
          e.clientY <= pRect.bottom + 80;

        setIsHovered(isNear);
        setLightPos({
          x: Math.max(10, Math.min(90, pX)),
          y: Math.max(10, Math.min(90, pY)),
        });
      }
    };

    const handlePointerLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
      setLightPos({ x: 50, y: 35 });
    };

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [containerRef, isMobile, isReducedMotion, mouseX, mouseY]);

  const handleLocalPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || isReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(normX);
    mouseY.set(normY);
    setIsHovered(true);

    const pX = ((e.clientX - rect.left) / rect.width) * 100;
    const pY = ((e.clientY - rect.top) / rect.height) * 100;
    setLightPos({
      x: Math.max(10, Math.min(90, pX)),
      y: Math.max(10, Math.min(90, pY)),
    });
  };

  const handleLocalPointerLeave = () => {
    if (isMobile || isReducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setLightPos({ x: 50, y: 35 });
  };

  return (
    <div
      ref={portraitRef}
      onPointerMove={handleLocalPointerMove}
      onPointerLeave={handleLocalPointerLeave}
      className="relative flex items-center justify-center w-full select-none py-2"
      style={{
        perspective: 1200,
      }}
    >
      {/* 3D Interactive Card Container */}
      <motion.div
        style={{
          x: translateX,
          y: translateY,
          rotateX: isReducedMotion ? 0 : rotateX,
          rotateY: isReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-[440px] sm:max-w-[480px] flex flex-col items-center justify-end"
      >
        {/* Ambient Backlight Glow that tracks cursor */}
        <motion.div
          style={{
            x: auraX,
            y: auraY,
          }}
          className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-indigo-600/20 blur-2xl pointer-events-none -z-10 transition-opacity duration-500"
          animate={{
            opacity: isHovered ? 0.85 : 0.45,
          }}
        />

        {/* Image Box with Bottom Cutout Engagement */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-cyan-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
          <Image
            src="/images/ganesh-png.webp"
            loading="eager"
            alt="Ganesh Wakchaure - Full Stack Developer"
            width={500}
            height={500}
            priority
            className="w-full h-auto object-cover select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />

          {/* Interactive virtual studio spotlight overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle 320px at ${lightPos.x}% ${lightPos.y}%, rgba(56, 189, 248, 0.14), transparent 70%)`,
              opacity: isHovered ? 1 : 0.4,
            }}
          />

          {/* Bottom gradient mask: Blends sharp horizontal cutoff into background seamlessly */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020814] via-[#020814]/85 to-transparent pointer-events-none z-10" />

          {/* Subtle bottom edge accent line to transition with the terminal bar */}
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none z-10" />
        </div>

        {/* Command Line Terminal UI Docked at the Bottom Edge */}
        <motion.div
          style={{
            x: terminalTranslateX,
            y: terminalTranslateY,
            transform: "translateZ(28px)",
          }}
          className="absolute bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-4 z-20 rounded-xl bg-[#030712]/92 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(6,182,212,0.18)] transition-all duration-300 group/term"
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-3 sm:px-3.5 py-1.5 sm:py-2 border-b border-slate-800/80 bg-slate-900/60 rounded-t-xl">
            {/* macOS-style Window Control Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 group-hover/term:bg-rose-500 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 group-hover/term:bg-amber-500 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 group-hover/term:bg-emerald-500 transition-colors" />
            </div>

            {/* Terminal Tab / Path Info */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-slate-400">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span className="text-slate-300">portfolio</span>
              <span className="text-slate-600">/</span>
              <div className="flex items-center gap-1 text-cyan-400/90 font-medium">
                <GitBranch className="w-2.5 h-2.5" />
                <span>main</span>
              </div>
            </div>

            {/* Right Status Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden xs:inline">live</span>
            </div>
          </div>

          {/* Terminal Command Content */}
          <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 font-mono flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
            <span className="text-emerald-400 font-bold select-none text-xs sm:text-sm">❯</span>
            <div className="flex items-center flex-nowrap whitespace-nowrap text-[11px] sm:text-xs md:text-[12.5px] tracking-tight">
              <span className="text-emerald-400 font-semibold">git</span>
              <span className="text-cyan-300 mx-1">commit</span>
              <span className="text-slate-400 mr-1">-m</span>
              <span className="text-amber-300 font-medium">
                &quot;Learn -&gt; Build -&gt; Grow -&gt; Repeat&quot;
              </span>
              <span className="inline-block w-1.5 sm:w-2 h-3.5 bg-cyan-400 ml-1.5 animate-pulse align-middle" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
