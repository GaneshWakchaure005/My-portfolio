"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { NETWORK_CONFIG } from "@/lib/constants";

interface ParticleFieldProps {
  isMobile: boolean;
  pointerPos: React.RefObject<THREE.Vector3>;
  isPointerActive: React.RefObject<boolean>;
}

export function ParticleField({ isMobile, pointerPos, isPointerActive }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const particleCount = isMobile
    ? NETWORK_CONFIG.MOBILE_PARTICLE_COUNT
    : NETWORK_CONFIG.AMBIENT_PARTICLE_COUNT;

  // Initialize particles positions, velocities, and base colors
  const { positions, originalPositions, seeds, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const orig = new Float32Array(particleCount * 3);
    const s = new Float32Array(particleCount);
    const col = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color(NETWORK_CONFIG.COLORS.AMBIENT_PARTICLE);

    for (let i = 0; i < particleCount; i++) {
      // Ambient distribution covering viewport with depth
      const x = (Math.random() - 0.5) * viewport.width * 1.2;
      const y = (Math.random() - 0.5) * viewport.height * 1.2;
      const z = (Math.random() - 0.5) * 4;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      s[i] = Math.random() * 100;

      // Base color with dim alpha effect
      col[i * 3] = baseColor.r * 0.4;
      col[i * 3 + 1] = baseColor.g * 0.4;
      col[i * 3 + 2] = baseColor.b * 0.4;
    }

    return {
      positions: pos,
      originalPositions: orig,
      seeds: s,
      colors: col,
    };
  }, [particleCount, viewport.width, viewport.height]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const colAttr = geo.attributes.color as THREE.BufferAttribute;
    if (!posAttr || !colAttr) return;

    const posArray = posAttr.array as Float32Array;
    const colArray = colAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    const cursor = pointerPos.current;
    const active = isPointerActive.current;
    const cursorRadiusSq = NETWORK_CONFIG.CURSOR_RADIUS * NETWORK_CONFIG.CURSOR_RADIUS;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const seed = seeds[i];

      // Subtle slow harmonic drift
      const origX = originalPositions[idx];
      const origY = originalPositions[idx + 1];
      const origZ = originalPositions[idx + 2];

      const driftX = Math.sin(time * 0.3 + seed) * 0.15;
      const driftY = Math.cos(time * 0.25 + seed * 1.2) * 0.15;

      posArray[idx] = origX + driftX;
      posArray[idx + 1] = origY + driftY;
      posArray[idx + 2] = origZ;

      // Cursor proximity illumination
      if (active && cursor) {
        const dx = posArray[idx] - cursor.x;
        const dy = posArray[idx + 1] - cursor.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < cursorRadiusSq) {
          const proximity = 1 - Math.sqrt(distSq) / NETWORK_CONFIG.CURSOR_RADIUS;
          colArray[idx] = THREE.MathUtils.lerp(0.1, 0.4, proximity);
          colArray[idx + 1] = THREE.MathUtils.lerp(0.3, 0.9, proximity);
          colArray[idx + 2] = THREE.MathUtils.lerp(0.5, 1.0, proximity);
          continue;
        }
      }

      // Default ambient dim state
      colArray[idx] = THREE.MathUtils.lerp(colArray[idx], 0.08, delta * 3);
      colArray[idx + 1] = THREE.MathUtils.lerp(colArray[idx + 1], 0.25, delta * 3);
      colArray[idx + 2] = THREE.MathUtils.lerp(colArray[idx + 2], 0.45, delta * 3);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.035 : 0.045}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
