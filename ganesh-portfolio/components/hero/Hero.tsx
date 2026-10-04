"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HeroContent } from "./HeroContent";
import { CursorGlow } from "./CursorGlow";

// Dynamically import Three.js Neural Network canvas with SSR disabled
const NeuralNetwork = dynamic(
  () => import("./NeuralNetwork").then((mod) => mod.NeuralNetwork),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#020814]" />,
  }
);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
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
      // Normalized between -1 and 1
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Background parallax target (2 to 5px)
      targetX = -normX * 4;
      targetY = -normY * 4;
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

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction & Interactive Neural Network"
      className="relative w-full min-h-[700px] h-screen max-h-[1100px] overflow-hidden bg-[#020814] flex items-center justify-center selection:bg-cyan-500/20"
    >
      {/* 1. Atmospheric Background Image Layer with Subtle Parallax */}
      <div
        className="absolute inset-[-20px] bg-cover bg-center transition-transform duration-75 ease-out will-change-transform opacity-40 mix-blend-luminosity filter contrast-125 brightness-75 pointer-events-none"
        style={{
          backgroundImage: `url('/images/hero-background.png')`,
          transform: reducedMotion
            ? "none"
            : `translate3d(${bgOffset.x}px, ${bgOffset.y}px, 0)`,
        }}
      />

      {/* 2. Deep Navy Gradients & Vignette Overlays for Maximum Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020814] via-[#020814]/90 to-[#020814]/40 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020814]/80 via-transparent to-[#020814] pointer-events-none z-[1]" />
      <div className="absolute inset-0 radial-glow-cyan opacity-40 pointer-events-none z-[1]" />

      {/* 3. Subtle fine tech grid overlay */}
      <div className="absolute inset-0 tech-grid-pattern opacity-60 pointer-events-none z-[2]" />

      {/* 4. Interactive Three.js Neural Network Canvas */}
      <NeuralNetwork containerRef={heroRef} />

      {/* 5. Smooth Cursor Radial Glow */}
      <CursorGlow containerRef={heroRef} />

      {/* 6. Accessible Foreground Hero Content & Typography */}
      <HeroContent />
    </section>
  );
}
