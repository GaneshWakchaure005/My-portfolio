"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PORTRAIT_CONFIG, DEVELOPER_INFO } from "@/lib/constants";

interface PortraitProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function Portrait({ containerRef }: PortraitProps) {
  const [imageSrc, setImageSrc] = useState<string>(PORTRAIT_CONFIG.LOCAL_IMAGE);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const portraitRef = useRef<HTMLDivElement>(null);

  // Mouse normalized values (-1 to 1) for 3D parallax & tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics configuration for organic fluid response
  const springConfig = { damping: 24, stiffness: 130, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Parallax translation: X: ±8-14px, Y: ±5-8px
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

  // Subtle 3D tilt: rotateX: ±2.5-3.5 deg, rotateY: ±3-4.5 deg
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

  return (
    <div
      ref={portraitRef}
      className="relative flex items-center justify-center w-full select-none py-2"
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x: isReducedMotion || isMobile ? 0 : translateX,
          y: isReducedMotion || isMobile ? 0 : translateY,
          rotateX: isReducedMotion || isMobile ? 0 : rotateX,
          rotateY: isReducedMotion || isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[460px] will-change-transform flex items-center justify-center"
      >
        {/* 1. Atmospheric Backlighting Bloom behind the rounded frame */}
        <div
          aria-hidden="true"
          className="absolute -inset-3 sm:-inset-4 rounded-3xl transition-opacity duration-700 ease-out pointer-events-none filter blur-2xl -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(0, 240, 255, 0.3) 0%, rgba(0, 102, 255, 0.18) 50%, transparent 75%)",
            opacity: isHovered ? 1.0 : 0.65,
            transform: "translateZ(-20px)",
          }}
        />

        {/* 2. Secondary ambient glow ring */}
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-3xl transition-all duration-500 pointer-events-none filter blur-md -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.25) 0%, rgba(0, 140, 255, 0.1) 60%, transparent 80%)",
            opacity: isHovered ? 0.9 : 0.5,
            transform: "translateZ(-10px)",
          }}
        />

        {/* 3. Rounded Developer Portrait Card with Color-Changing Small Border */}
        <div
          className="relative w-full aspect-[0.87] rounded-2xl sm:rounded-3xl color-changing-border overflow-hidden bg-slate-950/70 shadow-2xl backdrop-blur-sm"
        >
          {/* Main Image */}
          <Image
            src={imageSrc}
            alt={`${DEVELOPER_INFO.name} - Full Stack Developer Portrait`}
            fill
            priority
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 460px"
            className="object-cover object-center filter contrast-[1.05] brightness-[0.98] transition-transform duration-700 ease-out"
            onError={() => {
              if (imageSrc !== PORTRAIT_CONFIG.FALLBACK_IMAGE) {
                setImageSrc(PORTRAIT_CONFIG.FALLBACK_IMAGE);
              }
            }}
          />

          {/* 4. Soft Vignette Overlay for Seamless Cinematic Integration */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 65%, rgba(2, 8, 20, 0.65) 90%, rgba(2, 8, 20, 0.9) 100%)",
            }}
          />

          {/* 5. Virtual Studio Light Overlay (Reacts subtly to cursor) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 260px at ${lightPos.x}% ${lightPos.y}%, rgba(0, 240, 255, 0.22) 0%, rgba(0, 102, 255, 0.08) 45%, transparent 75%)`,
              opacity: isHovered ? 0.85 : 0.45,
            }}
          />

          {/* 6. Subtle inner rim gloss */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl border border-cyan-400/20 shadow-inner"
          />
        </div>

        {/* 7. Subtle Technical Status Badge */}
        <div
          className="hidden sm:flex absolute -bottom-3.5 right-6 items-center gap-2 px-3 py-1 rounded-full bg-[#020814]/90 border border-cyan-400/40 backdrop-blur-md text-[11px] font-mono text-cyan-300 shadow-xl shadow-black/80 transition-all duration-300 z-10"
          style={{
            transform: "translateZ(30px)",
            opacity: isHovered ? 1 : 0.85,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>GW // DEV WORKSTATION</span>
        </div>
      </motion.div>
    </div>
  );
}
