"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { AURORA_CONFIG } from "@/lib/constants";

interface AuroraParticlesProps {
  isMobile: boolean;
  cursorPosRef: React.RefObject<THREE.Vector3>;
  isCursorActiveRef: React.RefObject<boolean>;
  isReducedMotion: boolean;
}

export function AuroraParticles({
  isMobile,
  cursorPosRef,
  isCursorActiveRef,
  isReducedMotion,
}: AuroraParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const streaksRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();

  const particleCount = isMobile
    ? AURORA_CONFIG.MOBILE_PARTICLE_COUNT
    : AURORA_CONFIG.PARTICLE_COUNT;

  // Initialize atmospheric particles
  const { positions, originalPositions, seeds, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const orig = new Float32Array(particleCount * 3);
    const s = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(AURORA_CONFIG.COLORS.CYAN_LIGHT);
    const blue = new THREE.Color(AURORA_CONFIG.COLORS.BLUE_VIBRANT);

    for (let i = 0; i < particleCount; i++) {
      // Distribute broadly, biased towards center & right
      const x = (Math.random() - 0.3) * viewport.width * 1.1;
      const y = (Math.random() - 0.5) * viewport.height * 1.1;
      const z = (Math.random() - 0.5) * 3.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      s[i * 3] = Math.random() * 50;
      s[i * 3 + 1] = 0.2 + Math.random() * 0.4; // speed
      s[i * 3 + 2] = 0.5 + Math.random() * 0.5; // size variation

      const pColor = Math.random() > 0.4 ? cyan : blue;
      col[i * 3] = pColor.r * 0.35;
      col[i * 3 + 1] = pColor.g * 0.35;
      col[i * 3 + 2] = pColor.b * 0.35;
    }

    return {
      positions: pos,
      originalPositions: orig,
      seeds: s,
      colors: col,
    };
  }, [particleCount, viewport.width, viewport.height]);

  // Subtle Light Streaks
  const streakCount = isMobile ? 2 : AURORA_CONFIG.STREAK_COUNT;
  const { streakPositions, streakColors, streakVelocities } = useMemo(() => {
    const pos = new Float32Array(streakCount * 2 * 3);
    const col = new Float32Array(streakCount * 2 * 3);
    const vel = new Float32Array(streakCount);

    const streakColor = new THREE.Color(AURORA_CONFIG.COLORS.BLUE_VIBRANT);

    for (let i = 0; i < streakCount; i++) {
      const x = (Math.random() - 0.1) * viewport.width * 0.8;
      const y = (Math.random() - 0.5) * viewport.height * 0.9;
      const z = (Math.random() - 0.5) * 2;
      const length = 0.6 + Math.random() * 0.8;

      const idx = i * 6;
      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;

      // Tail
      pos[idx + 3] = x - length * 0.8;
      pos[idx + 4] = y - length * 0.2;
      pos[idx + 5] = z;

      // Head bright, tail fading
      col[idx] = streakColor.r * 0.5;
      col[idx + 1] = streakColor.g * 0.7;
      col[idx + 2] = streakColor.b * 0.9;

      col[idx + 3] = streakColor.r * 0.05;
      col[idx + 4] = streakColor.g * 0.08;
      col[idx + 5] = streakColor.b * 0.15;

      vel[i] = 0.2 + Math.random() * 0.3;
    }

    return {
      streakPositions: pos,
      streakColors: col,
      streakVelocities: vel,
    };
  }, [streakCount, viewport.width, viewport.height]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const colAttr = geo.attributes.color as THREE.BufferAttribute;
    if (!posAttr || !colAttr) return;

    const posArray = posAttr.array as Float32Array;
    const colArray = colAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    const cursor = cursorPosRef.current;
    const isCursorActive = isCursorActiveRef.current && !isReducedMotion;
    const interactionRadiusSq = 2.4 * 2.4;

    // 1. Update Atmospheric Dust Particles
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const seedTime = seeds[idx];
      const speed = seeds[idx + 1];

      const origX = originalPositions[idx];
      const origY = originalPositions[idx + 1];
      const origZ = originalPositions[idx + 2];

      // Slow organic ambient drift
      let driftX = Math.sin(time * 0.2 * speed + seedTime) * 0.22;
      let driftY = Math.cos(time * 0.18 * speed + seedTime * 1.3) * 0.18;

      let currentX = origX + driftX;
      let currentY = origY + driftY;
      let currentZ = origZ;

      // Cursor interaction: subtle attraction & brightness boost
      if (isCursorActive && cursor) {
        const dx = cursor.x - currentX;
        const dy = cursor.y - currentY;
        const distSq = dx * dx + dy * dy;

        if (distSq < interactionRadiusSq) {
          const proximity = 1 - Math.sqrt(distSq) / 2.4;
          // Gentle attraction toward cursor
          currentX += dx * proximity * 0.14;
          currentY += dy * proximity * 0.14;

          colArray[idx] = THREE.MathUtils.lerp(0.1, 0.45, proximity);
          colArray[idx + 1] = THREE.MathUtils.lerp(0.35, 0.85, proximity);
          colArray[idx + 2] = THREE.MathUtils.lerp(0.65, 1.0, proximity);
        } else {
          colArray[idx] = THREE.MathUtils.lerp(colArray[idx], 0.08, delta * 2.5);
          colArray[idx + 1] = THREE.MathUtils.lerp(colArray[idx + 1], 0.25, delta * 2.5);
          colArray[idx + 2] = THREE.MathUtils.lerp(colArray[idx + 2], 0.5, delta * 2.5);
        }
      }

      posArray[idx] = currentX;
      posArray[idx + 1] = currentY;
      posArray[idx + 2] = currentZ;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // 2. Update Light Streaks
    if (streaksRef.current && !isReducedMotion) {
      const sGeo = streaksRef.current.geometry;
      const sPosAttr = sGeo.attributes.position as THREE.BufferAttribute;
      if (sPosAttr) {
        const sPosArray = sPosAttr.array as Float32Array;

        for (let s = 0; s < streakCount; s++) {
          const sIdx = s * 6;
          const v = streakVelocities[s];

          sPosArray[sIdx] += delta * v * 0.6;
          sPosArray[sIdx + 1] += delta * v * 0.15;

          sPosArray[sIdx + 3] += delta * v * 0.6;
          sPosArray[sIdx + 4] += delta * v * 0.15;

          // Wrap around viewport boundary
          if (sPosArray[sIdx] > viewport.width * 0.7) {
            const resetX = -viewport.width * 0.5;
            const len = sPosArray[sIdx] - sPosArray[sIdx + 3];
            sPosArray[sIdx] = resetX;
            sPosArray[sIdx + 3] = resetX - len;
          }
        }
        sPosAttr.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* Tiny Ambient Floating Dust Particles */}
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
          size={isMobile ? 0.04 : 0.055}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Subtle Blue Light Streaks */}
      <lineSegments ref={streaksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[streakPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[streakColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
