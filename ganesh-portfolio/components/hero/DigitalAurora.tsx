"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AURORA_CONFIG } from "@/lib/constants";
import { AuroraParticles } from "./AuroraParticles";

const auroraVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  uniform float uMouseRadius;
  uniform float uInitProgress;
  uniform vec3 uColorCyan;
  uniform vec3 uColorBlueVibrant;
  uniform vec3 uColorBlueDeep;
  uniform vec3 uColorHighlight;
  uniform vec2 uResolution;

  varying vec2 vUv;
  varying vec3 vPosition;

  // Smooth pseudo-noise function
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0; // [-1.0, 1.0]
    uv.x *= uResolution.x / uResolution.y;

    // Time scaling for smooth organic flow
    float t = uTime * 0.28;

    // Cursor field interaction: warp coordinate space toward cursor
    float distToCursor = length(uv - uMouse);
    float cursorInfluence = smoothstep(uMouseRadius, 0.0, distToCursor) * uMouseActive;
    vec2 warpedUv = uv;
    warpedUv += (uMouse - uv) * (cursorInfluence * 0.22);

    // Multi-octave undulating aurora waves
    // Flow biased to center-right (x > -0.2)
    float wave1 = sin(warpedUv.x * 1.8 + t * 0.8 + noise(warpedUv * 1.5 + t * 0.3) * 2.2);
    float wave2 = cos(warpedUv.x * 2.6 - t * 0.6 + noise(warpedUv * 2.2 - t * 0.4) * 1.8);
    float wave3 = sin((warpedUv.x + warpedUv.y) * 2.2 + t * 0.5);

    // Calculate vertical ribbon curvature
    float ribbonY1 = wave1 * 0.45 + (noise(vec2(warpedUv.x * 0.8, t * 0.2)) - 0.5) * 0.6;
    float ribbonY2 = wave2 * 0.38 - 0.2 + (noise(vec2(warpedUv.x * 1.2, -t * 0.25)) - 0.5) * 0.5;
    float ribbonY3 = wave3 * 0.3 + 0.25;

    // Atmospheric thickness and falloff for ribbons
    float d1 = abs(warpedUv.y - ribbonY1);
    float d2 = abs(warpedUv.y - ribbonY2);
    float d3 = abs(warpedUv.y - ribbonY3);

    float band1 = exp(-d1 * 3.2);
    float band2 = exp(-d2 * 2.8);
    float band3 = exp(-d3 * 4.5);

    // Color mixing: subtle low-intensity cyan/blue palette
    vec3 color = vec3(0.0);
    color += uColorBlueDeep * band1 * 0.4;
    color += uColorBlueVibrant * band2 * 0.5;
    color += uColorCyan * band3 * 0.6;

    // Soft crest highlights
    float highlight = pow(max(0.0, band2 * band3), 1.8) * 0.7;
    color += uColorHighlight * highlight;

    // Dynamic cursor field energy boost
    if (cursorInfluence > 0.0) {
      color += uColorCyan * cursorInfluence * 0.25;
      color += uColorHighlight * pow(cursorInfluence, 2.0) * 0.15;
    }

    // Horizontal mask: Left side must remain dark & clean for hero typography
    // Text is on the left (uv.x < 0.0), Aurora flourishes on center-right (uv.x > -0.2)
    float leftFade = smoothstep(-1.2, 0.25, warpedUv.x);
    // Vertical soft edge vignette
    float topBottomFade = smoothstep(1.0, 0.3, abs(vUv.y - 0.5) * 2.0);

    float alpha = (band1 * 0.25 + band2 * 0.3 + band3 * 0.35 + highlight * 0.2) * leftFade * topBottomFade;
    alpha *= uInitProgress;

    gl_FragColor = vec4(color, clamp(alpha * 0.45, 0.0, 0.5));
  }
`;

function AuroraMesh({
  cursorPosRef,
  isCursorActiveRef,
  isReducedMotion,
  isMobile,
}: {
  cursorPosRef: React.RefObject<THREE.Vector3>;
  isCursorActiveRef: React.RefObject<boolean>;
  isReducedMotion: boolean;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const initTimerRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseActive: { value: 0 },
      uMouseRadius: { value: 1.6 },
      uInitProgress: { value: 0 },
      uColorCyan: { value: new THREE.Color(AURORA_CONFIG.COLORS.CYAN_LIGHT) },
      uColorBlueVibrant: { value: new THREE.Color(AURORA_CONFIG.COLORS.BLUE_VIBRANT) },
      uColorBlueDeep: { value: new THREE.Color(AURORA_CONFIG.COLORS.BLUE_DEEP) },
      uColorHighlight: { value: new THREE.Color(AURORA_CONFIG.COLORS.WHITE_BLUE) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  );

  useFrame((_, delta) => {
    initTimerRef.current += delta;
    const initTime = initTimerRef.current;

    // Initialization: fades in from 200ms to 1000ms
    const progress = isReducedMotion
      ? 1
      : THREE.MathUtils.clamp((initTime - 0.2) / 0.8, 0, 1);

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += isReducedMotion ? delta * 0.2 : delta;
      materialRef.current.uniforms.uInitProgress.value = progress;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);

      const cursor = cursorPosRef.current;
      const isActive = isCursorActiveRef.current && !isReducedMotion;

      if (cursor && isActive) {
        // Map 3D cursor position to shader normalized space
        const targetX = (cursor.x / (viewport.width * 0.5)) * (size.width / size.height);
        const targetY = cursor.y / (viewport.height * 0.5);

        materialRef.current.uniforms.uMouse.value.x +=
          (targetX - materialRef.current.uniforms.uMouse.value.x) * 0.08;
        materialRef.current.uniforms.uMouse.value.y +=
          (targetY - materialRef.current.uniforms.uMouse.value.y) * 0.08;
        materialRef.current.uniforms.uMouseActive.value +=
          (1.0 - materialRef.current.uniforms.uMouseActive.value) * 0.08;
      } else {
        materialRef.current.uniforms.uMouseActive.value +=
          (0.0 - materialRef.current.uniforms.uMouseActive.value) * 0.05;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[viewport.width * 1.3, viewport.height * 1.3, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={auroraVertexShader}
        fragmentShader={auroraFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function AuroraScene({
  isMobile,
  isReducedMotion,
  cursorPosRef,
  isCursorActiveRef,
}: {
  isMobile: boolean;
  isReducedMotion: boolean;
  cursorPosRef: React.RefObject<THREE.Vector3>;
  isCursorActiveRef: React.RefObject<boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Subtle mouse parallax on aurora group
    if (groupRef.current && !isReducedMotion && isCursorActiveRef.current) {
      const targetParallaxX = state.pointer.x * (AURORA_CONFIG.PARALLAX.AURORA * 0.02);
      const targetParallaxY = state.pointer.y * (AURORA_CONFIG.PARALLAX.AURORA * 0.02);
      groupRef.current.position.x += (targetParallaxX - groupRef.current.position.x) * 0.06;
      groupRef.current.position.y += (targetParallaxY - groupRef.current.position.y) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Volumetric Shader Aurora Plane */}
      <AuroraMesh
        cursorPosRef={cursorPosRef}
        isCursorActiveRef={isCursorActiveRef}
        isReducedMotion={isReducedMotion}
        isMobile={isMobile}
      />

      {/* Atmospheric Particles & Light Streaks */}
      <AuroraParticles
        isMobile={isMobile}
        cursorPosRef={cursorPosRef}
        isCursorActiveRef={isCursorActiveRef}
        isReducedMotion={isReducedMotion}
      />
    </group>
  );
}

interface DigitalAuroraProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  mouseDataRef: React.RefObject<{
    normX: number;
    normY: number;
    pixelX: number;
    pixelY: number;
    isActive: boolean;
  }>;
}

export function DigitalAurora({ containerRef, mouseDataRef }: DigitalAuroraProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const cursorPosRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const isCursorActiveRef = useRef<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
    if (!container || isMobile) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Map to 3D plane (fov 50, z=10 -> height ~9.32)
      const visibleHeight = 9.32;
      const visibleWidth = visibleHeight * (rect.width / rect.height);

      cursorPosRef.current.set(
        (x * visibleWidth) / 2,
        (y * visibleHeight) / 2,
        0
      );
      isCursorActiveRef.current = true;
    };

    const handlePointerLeave = () => {
      isCursorActiveRef.current = false;
    };

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [containerRef, isMobile]);

  if (!mounted) {
    return <div className="absolute inset-0 bg-[#020814]" />;
  }

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-70">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <AuroraScene
          isMobile={isMobile}
          isReducedMotion={isReducedMotion}
          cursorPosRef={cursorPosRef}
          isCursorActiveRef={isCursorActiveRef}
        />
      </Canvas>
    </div>
  );
}
