"use client";

import React, { useEffect, useRef, useState } from "react";

interface CursorGlowProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function CursorGlow({ containerRef }: CursorGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    // Detect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updatePosition = () => {
      // Smooth interpolation for fluid lagging glow
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef, isVisible]);

  if (isTouch) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full will-change-transform transition-opacity duration-500 ease-out z-10"
      style={{
        opacity: isVisible ? 1 : 0,
        background:
          "radial-gradient(circle 250px at center, rgba(0, 220, 255, 0.08) 0%, rgba(56, 189, 248, 0.03) 45%, transparent 70%)",
      }}
    />
  );
}
