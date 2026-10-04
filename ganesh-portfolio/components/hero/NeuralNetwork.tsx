"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { NETWORK_CONFIG } from "@/lib/constants";
import { ParticleField } from "./ParticleField";
import { DataPackets, NodeData } from "./DataPackets";

interface GhostParticle {
  pos: THREE.Vector3;
  opacity: number;
  life: number;
  maxLife: number;
}

function SceneInner({
  isMobile,
  isReducedMotion,
  pointerPosRef,
  isPointerActiveRef,
}: {
  isMobile: boolean;
  isReducedMotion: boolean;
  pointerPosRef: React.RefObject<THREE.Vector3>;
  isPointerActiveRef: React.RefObject<boolean>;
}) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const instancedNodesRef = useRef<THREE.InstancedMesh>(null);
  const haloMeshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const ghostMeshRef = useRef<THREE.InstancedMesh>(null);

  const nodeCount = isMobile
    ? NETWORK_CONFIG.MOBILE_NODE_COUNT
    : NETWORK_CONFIG.NODE_COUNT;
  const majorCount = isMobile ? 3 : NETWORK_CONFIG.MAJOR_NODE_COUNT;

  // Track initialization sequence progress
  const initTimerRef = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Ghost micro-particles for interaction memory
  const ghostParticlesRef = useRef<GhostParticle[]>([]);
  const lastSpawnPosRef = useRef<THREE.Vector3>(new THREE.Vector3());

  // 1. Generate Nodes & Positions
  const { nodes, nodeDataList } = useMemo(() => {
    const list: NodeData[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const isMajor = i < majorCount;

      // Distribute primarily to right and lower-right
      let x = 0;
      if (isMobile) {
        x = (Math.random() - 0.25) * viewport.width * 0.85;
      } else {
        // Desktop: 80% biased toward center-right to right edge
        if (Math.random() < 0.8) {
          x = (0.05 + Math.random() * 0.45) * viewport.width;
        } else {
          // Sparse nodes around center/lower-left
          x = (-0.28 + Math.random() * 0.3) * viewport.width;
        }
      }

      const y = (Math.random() - 0.5) * viewport.height * 0.95;
      const z = (Math.random() - 0.5) * 1.8;

      const baseSize = isMajor ? 0.095 : 0.05 + Math.random() * 0.025;

      const pos = new THREE.Vector3(x, y, z);
      list.push({
        id: i,
        basePos: pos.clone(),
        currentPos: pos.clone(),
        targetPos: pos.clone(),
        isMajor,
        baseSize,
        currentScale: 0,
        glow: isMajor ? 0.45 : 0.15,
        pulseEnergy: 0,
        neighbors: [],
      });
    }

    return { nodes: list, nodeDataList: list };
  }, [nodeCount, majorCount, viewport.width, viewport.height, isMobile]);

  // Keep a stable ref for DataPackets traversal
  const nodesRef = useRef<NodeData[]>(nodeDataList);
  nodesRef.current = nodeDataList;

  // 2. Precompute Graph Connections
  const { pairs, linePositions, lineColors } = useMemo(() => {
    const pairList: [number, number][] = [];
    const maxDist = NETWORK_CONFIG.MAX_CONNECTION_DISTANCE;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const d = nodes[i].basePos.distanceTo(nodes[j].basePos);
        if (d < maxDist) {
          // Check connection density limit per node to keep clean topology
          const maxConnections = nodes[i].isMajor || nodes[j].isMajor ? 6 : 4;
          if (
            nodes[i].neighbors.length < maxConnections &&
            nodes[j].neighbors.length < maxConnections
          ) {
            pairList.push([i, j]);
            nodes[i].neighbors.push(j);
            nodes[j].neighbors.push(i);
          }
        }
      }
    }

    const posArray = new Float32Array(pairList.length * 2 * 3);
    const colArray = new Float32Array(pairList.length * 2 * 3);

    return {
      pairs: pairList,
      linePositions: posArray,
      lineColors: colArray,
    };
  }, [nodes, nodeCount]);

  const connectionPairsRef = useRef<[number, number][]>(pairs);
  connectionPairsRef.current = pairs;

  // Color constants
  const baseNodeColor = useMemo(
    () => new THREE.Color(NETWORK_CONFIG.COLORS.NODE_BASE),
    []
  );
  const majorNodeColor = useMemo(
    () => new THREE.Color(NETWORK_CONFIG.COLORS.NODE_MAJOR),
    []
  );
  const activeNodeColor = useMemo(
    () => new THREE.Color(NETWORK_CONFIG.COLORS.NODE_ACTIVE),
    []
  );
  const highlightColor = useMemo(
    () => new THREE.Color(NETWORK_CONFIG.COLORS.NODE_HIGHLIGHT),
    []
  );
  const lineBaseColor = useMemo(
    () => new THREE.Color(NETWORK_CONFIG.COLORS.LINE_BASE),
    []
  );
  const lineActiveColor = useMemo(
    () => new THREE.Color(NETWORK_CONFIG.COLORS.LINE_ACTIVE),
    []
  );
  const lineHighlightColor = useMemo(
    () => new THREE.Color(NETWORK_CONFIG.COLORS.LINE_HIGHLIGHT),
    []
  );

  // Initialize ghost particles buffer
  useEffect(() => {
    ghostParticlesRef.current = [];
  }, []);

  useFrame((state, delta) => {
    initTimerRef.current += delta;
    const initTime = initTimerRef.current;

    // Initialization Stages (0ms - 1500ms):
    // 0ms - 200ms: dark
    // 200ms - 400ms: a few nodes appear
    // 400ms - 600ms: connections appear
    // 600ms - 800ms: more nodes become visible
    // 800ms+: network fully stabilized
    const globalScaleFactor = isReducedMotion
      ? 1
      : THREE.MathUtils.clamp((initTime - 0.2) / 0.8, 0, 1);
    const lineAlphaFactor = isReducedMotion
      ? 1
      : THREE.MathUtils.clamp((initTime - 0.4) / 0.7, 0, 1);

    const cursor = pointerPosRef.current;
    const isHovered = isPointerActiveRef.current && cursor !== null;
    const cursorRadius = NETWORK_CONFIG.CURSOR_RADIUS;
    const pullStrength = NETWORK_CONFIG.NODE_PULL_STRENGTH;

    // Parallax scene shift
    if (groupRef.current && !isReducedMotion) {
      const targetParallaxX = isHovered
        ? (state.pointer.x * NETWORK_CONFIG.PARALLAX_STRENGTH)
        : 0;
      const targetParallaxY = isHovered
        ? (state.pointer.y * NETWORK_CONFIG.PARALLAX_STRENGTH)
        : 0;
      groupRef.current.position.x +=
        (targetParallaxX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y +=
        (targetParallaxY - groupRef.current.position.y) * 0.05;
    }

    // Identify closest node
    let closestNodeIndex = -1;
    let minCursorDistance = Infinity;

    if (isHovered && cursor) {
      for (let i = 0; i < nodeCount; i++) {
        const d = cursor.distanceTo(nodes[i].currentPos);
        if (d < minCursorDistance) {
          minCursorDistance = d;
          closestNodeIndex = i;
        }
      }
    }

    // 1. Update Nodes
    if (instancedNodesRef.current) {
      const mesh = instancedNodesRef.current;
      const haloMesh = haloMeshRef.current;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        // Decay pulse energy from data packets
        if (node.pulseEnergy > 0) {
          node.pulseEnergy = Math.max(0, node.pulseEnergy - delta * 3.5);
        }

        // Distance to cursor
        let distToCursor = 999;
        let proximityFactor = 0;

        if (isHovered && cursor && !isReducedMotion) {
          distToCursor = cursor.distanceTo(node.basePos);
          if (distToCursor < cursorRadius) {
            proximityFactor = 1 - distToCursor / cursorRadius;
            // Magnetic pull toward cursor
            const dir = new THREE.Vector3().subVectors(cursor, node.basePos);
            node.targetPos.copy(node.basePos).addScaledVector(
              dir,
              proximityFactor * pullStrength
            );
          } else {
            node.targetPos.copy(node.basePos);
          }
        } else {
          node.targetPos.copy(node.basePos);
        }

        // Smooth position interpolation (spring-like damping)
        node.currentPos.lerp(node.targetPos, isReducedMotion ? 1 : 0.09);

        // Smooth scale interpolation based on initialization stage & proximity
        const isClosest = i === closestNodeIndex && minCursorDistance < cursorRadius;
        const targetScale =
          node.baseSize *
          globalScaleFactor *
          (1 + proximityFactor * 0.45 + (isClosest ? 0.35 : 0) + node.pulseEnergy * 0.6);

        node.currentScale = THREE.MathUtils.lerp(
          node.currentScale,
          targetScale,
          0.12
        );

        dummy.position.copy(node.currentPos);
        dummy.scale.set(
          node.currentScale,
          node.currentScale,
          node.currentScale
        );
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        // Halo / Bloom ring for major and closest nodes
        if (haloMesh) {
          const haloScale = node.currentScale * (node.isMajor ? 2.4 : 1.8);
          dummy.scale.set(haloScale, haloScale, haloScale);
          dummy.updateMatrix();
          haloMesh.setMatrixAt(i, dummy.matrix);
        }

        // Calculate node color
        const baseColor = node.isMajor ? majorNodeColor : baseNodeColor;
        const targetColor = new THREE.Color().copy(baseColor);

        if (isClosest) {
          targetColor.copy(highlightColor);
        } else if (proximityFactor > 0.05) {
          targetColor.lerp(activeNodeColor, proximityFactor);
        }

        if (node.pulseEnergy > 0) {
          targetColor.lerp(highlightColor, node.pulseEnergy);
        }

        mesh.setColorAt(i, targetColor);
        if (haloMesh) {
          const haloColor = new THREE.Color().copy(targetColor).multiplyScalar(0.4);
          haloMesh.setColorAt(i, haloColor);
        }
      }

      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      if (haloMesh) {
        haloMesh.instanceMatrix.needsUpdate = true;
        if (haloMesh.instanceColor) haloMesh.instanceColor.needsUpdate = true;
      }
    }

    // 2. Update Connection Lines
    if (linesRef.current && pairs.length > 0) {
      const geo = linesRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const colAttr = geo.attributes.color as THREE.BufferAttribute;

      if (posAttr && colAttr) {
        const posArray = posAttr.array as Float32Array;
        const colArray = colAttr.array as Float32Array;

        for (let p = 0; p < pairs.length; p++) {
          const [idxA, idxB] = pairs[p];
          const nodeA = nodes[idxA];
          const nodeB = nodes[idxB];
          const offset = p * 6;

          // Positions
          posArray[offset] = nodeA.currentPos.x;
          posArray[offset + 1] = nodeA.currentPos.y;
          posArray[offset + 2] = nodeA.currentPos.z;

          posArray[offset + 3] = nodeB.currentPos.x;
          posArray[offset + 4] = nodeB.currentPos.y;
          posArray[offset + 5] = nodeB.currentPos.z;

          // Line lighting & proximity
          let lineBrightness = 0;
          if (isHovered && cursor && !isReducedMotion) {
            const dA = cursor.distanceTo(nodeA.currentPos);
            const dB = cursor.distanceTo(nodeB.currentPos);
            const minD = Math.min(dA, dB);

            if (minD < cursorRadius) {
              lineBrightness = (1 - minD / cursorRadius) * 0.85;
            }
          }

          // Energy pulse traversal boosts line brightness
          const pulseBoost = Math.max(nodeA.pulseEnergy, nodeB.pulseEnergy) * 0.7;
          const totalBrightness = Math.min(
            1,
            (lineBrightness + pulseBoost) * lineAlphaFactor
          );

          let rA: number, gA: number, bA: number;
          let rB: number, gB: number, bB: number;

          if (totalBrightness > 0.05) {
            const mixedColor = new THREE.Color()
              .copy(lineBaseColor)
              .lerp(
                totalBrightness > 0.6 ? lineHighlightColor : lineActiveColor,
                totalBrightness
              );
            rA = mixedColor.r * lineAlphaFactor;
            gA = mixedColor.g * lineAlphaFactor;
            bA = mixedColor.b * lineAlphaFactor;
            rB = rA;
            gB = gA;
            bB = bA;
          } else {
            // Dormant ambient line
            rA = lineBaseColor.r * lineAlphaFactor * 0.45;
            gA = lineBaseColor.g * lineAlphaFactor * 0.45;
            bA = lineBaseColor.b * lineAlphaFactor * 0.45;
            rB = rA;
            gB = gA;
            bB = bA;
          }

          colArray[offset] = rA;
          colArray[offset + 1] = gA;
          colArray[offset + 2] = bA;

          colArray[offset + 3] = rB;
          colArray[offset + 4] = gB;
          colArray[offset + 5] = bB;
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
      }
    }

    // 3. Mouse Interaction Memory (Ghost Trail)
    if (ghostMeshRef.current && !isReducedMotion && !isMobile) {
      const ghosts = ghostParticlesRef.current;

      // Spawn ghost particle if cursor moved sufficiently
      if (isHovered && cursor) {
        if (cursor.distanceTo(lastSpawnPosRef.current) > 0.18) {
          if (ghosts.length < 8) {
            ghosts.push({
              pos: cursor.clone().add(
                new THREE.Vector3(
                  (Math.random() - 0.5) * 0.08,
                  (Math.random() - 0.5) * 0.08,
                  0
                )
              ),
              opacity: 0.8,
              life: 0.45,
              maxLife: 0.45,
            });
            lastSpawnPosRef.current.copy(cursor);
          }
        }
      }

      // Update ghosts
      for (let g = ghosts.length - 1; g >= 0; g--) {
        const item = ghosts[g];
        item.life -= delta;
        if (item.life <= 0) {
          ghosts.splice(g, 1);
        }
      }

      // Render up to 8 ghost particles
      for (let i = 0; i < 8; i++) {
        if (i < ghosts.length) {
          const item = ghosts[i];
          const lifeProgress = item.life / item.maxLife;
          const scale = 0.035 * lifeProgress;
          dummy.position.copy(item.pos);
          dummy.scale.set(scale, scale, scale);
          dummy.updateMatrix();
          ghostMeshRef.current.setMatrixAt(i, dummy.matrix);

          const col = new THREE.Color(NETWORK_CONFIG.COLORS.PACKET).multiplyScalar(
            lifeProgress * 0.8
          );
          ghostMeshRef.current.setColorAt(i, col);
        } else {
          dummy.scale.set(0, 0, 0);
          dummy.updateMatrix();
          ghostMeshRef.current.setMatrixAt(i, dummy.matrix);
        }
      }

      ghostMeshRef.current.instanceMatrix.needsUpdate = true;
      if (ghostMeshRef.current.instanceColor) {
        ghostMeshRef.current.instanceColor.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient background particles */}
      <ParticleField
        isMobile={isMobile}
        pointerPos={pointerPosRef}
        isPointerActive={isPointerActiveRef}
      />

      {/* Dynamic Network Connection Lines */}
      {pairs.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[lineColors, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}

      {/* Primary Network Nodes */}
      <instancedMesh
        ref={instancedNodesRef}
        args={[undefined, undefined, nodeCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={NETWORK_CONFIG.COLORS.NODE_BASE}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Soft Glow Halos for Nodes */}
      <instancedMesh
        ref={haloMeshRef}
        args={[undefined, undefined, nodeCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Data Packets travelling across the network */}
      <DataPackets
        nodesRef={nodesRef}
        connectionPairsRef={connectionPairsRef}
        isReducedMotion={isReducedMotion}
      />

      {/* Mouse Interaction Memory Ghost Particles */}
      {!isMobile && !isReducedMotion && (
        <instancedMesh
          ref={ghostMeshRef}
          args={[undefined, undefined, 8]}
          frustumCulled={false}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </instancedMesh>
      )}
    </group>
  );
}

interface NeuralNetworkProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function NeuralNetwork({ containerRef }: NeuralNetworkProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const pointerPosRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const isPointerActiveRef = useRef<boolean>(false);

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

      // Map normalized 2D coordinates into approximate 3D world plane at z=0
      // With camera at [0, 0, 10] and fov 50, tan(25 deg) * 10 * 2 = ~9.32 height
      const visibleHeight = 9.32;
      const visibleWidth = visibleHeight * (rect.width / rect.height);

      pointerPosRef.current.set(
        (x * visibleWidth) / 2,
        (y * visibleHeight) / 2,
        0
      );
      isPointerActiveRef.current = true;
    };

    const handlePointerLeave = () => {
      isPointerActiveRef.current = false;
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
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <SceneInner
          isMobile={isMobile}
          isReducedMotion={isReducedMotion}
          pointerPosRef={pointerPosRef}
          isPointerActiveRef={isPointerActiveRef}
        />
      </Canvas>
    </div>
  );
}
