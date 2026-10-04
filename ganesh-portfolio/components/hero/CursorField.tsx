"use client";

import React, { useEffect, useRef, useState } from "react";
import { AURORA_CONFIG } from "@/lib/constants";

interface CursorFieldProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onCursorMove?: (data: {
    normX: number;
    normY: number;
    pixelX: number;
    pixelY: number;
    isActive: boolean;
  }) => void;
}

export function CursorField({ containerRef, onCursorMove }: CursorFieldProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsReducedMotion(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const pixelX = e.clientX - rect.left;
      const pixelY = e.clientY - rect.top;

      targetX = pixelX;
      targetY = pixelY;

      const normX = (pixelX / rect.width) * 2 - 1;
      const normY = -((pixelY / rect.height) * 2 - 1);

      if (!isActive) setIsActive(true);

      if (onCursorMove) {
        onCursorMove({
          normX,
          normY,
          pixelX,
          pixelY,
          isActive: true,
        });
      }
    };

    const handlePointerLeave = () => {
      setIsActive(false);
      if (onCursorMove) {
        onCursorMove({
          normX: 0,
          normY: 0,
          pixelX: 0,
          pixelY: 0,
          isActive: false,
        });
      }
    };

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }

      rafId = requestAnimationFrame(updateGlow);
    };

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerleave", handlePointerLeave);
    rafId = requestAnimationFrame(updateGlow);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef, isActive, onCursorMove]);

  if (isTouch || isReducedMotion) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full will-change-transform transition-opacity duration-700 ease-out z-10"
      style={{
        opacity: isActive ? 1 : 0,
        background: `radial-gradient(circle 240px at center, ${AURORA_CONFIG.COLORS.AMBIENT_GLOW} 0%, rgba(0, 140, 255, 0.05) 45%, transparent 70%)`,
      }}
    />
  );
}
