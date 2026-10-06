"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HeroContent } from "./HeroContent";
import { CursorField } from "./CursorField";
import { AURORA_CONFIG } from "@/lib/constants";

// Dynamically import Three.js Digital Aurora canvas with SSR disabled
const DigitalAurora = dynamic(
  () => import("./DigitalAurora").then((mod) => mod.DigitalAurora),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#020814]" />,
  }
);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseDataRef = useRef({
    normX: 0,
    normY: 0,
    pixelX: 0,
    pixelY: 0,
    isActive: false,
  });

  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(isReduced);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isReduced || isTouch) return;

    const hero = heroRef.current;
    if (!hero) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Background parallax target (2 to 3px)
      targetX = -normX * AURORA_CONFIG.PARALLAX.BACKGROUND;
      targetY = -normY * AURORA_CONFIG.PARALLAX.BACKGROUND;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setBgOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateParallax);
    };

    hero.addEventListener("mousemove", handleMouseMove, { passive: true });
    hero.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleCursorMove = (data: {
    normX: number;
    normY: number;
    pixelX: number;
    pixelY: number;
    isActive: boolean;
  }) => {
    mouseDataRef.current = data;
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction & Interactive Digital Aurora"
      className="relative w-full max-w-full min-h-screen lg:h-screen lg:min-h-[720px] lg:max-h-[1100px] overflow-hidden bg-[#020814] flex items-center justify-center selection:bg-cyan-500/20"
    >
      {/* 1. Atmospheric Background Image Layer with Subtle Parallax (2-3px) */}
      <div
        className="absolute inset-[-20px] bg-cover bg-center transition-transform duration-75 ease-out will-change-transform opacity-75 filter contrast-110 brightness-95 pointer-events-none"
        style={{
          backgroundImage: `url('/images/hero-background.png')`,
          transform: reducedMotion
            ? "none"
            : `translate3d(${bgOffset.x}px, ${bgOffset.y}px, 0)`,
        }}
      />

      {/* 2. Deep Navy Gradients & Vignette for Contrast & Focus */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020814]/95 via-[#020814]/70 to-[#020814]/25 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020814]/65 via-transparent to-[#020814]/85 pointer-events-none z-[1]" />

      {/* 3. Subtle fine tech grid overlay */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none z-[2]" />

      {/* 4. Interactive 3D Digital Aurora WebGL Canvas & Floating Particles */}
      <DigitalAurora
        containerRef={heroRef}
        mouseDataRef={mouseDataRef}
      />

      {/* 5. Subtle Cursor Energy Field Glow */}
      <CursorField
        containerRef={heroRef}
        onCursorMove={handleCursorMove}
      />

      {/* 6. Accessible Responsive Hero Content & Centered Developer Portrait */}
      <HeroContent containerRef={heroRef} />
    </section>
  );
}
