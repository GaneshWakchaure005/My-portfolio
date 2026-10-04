"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { NETWORK_CONFIG } from "@/lib/constants";

export interface NodeData {
  id: number;
  basePos: THREE.Vector3;
  currentPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  isMajor: boolean;
  baseSize: number;
  currentScale: number;
  glow: number;
  pulseEnergy: number;
  neighbors: number[];
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  size: number;
  color: THREE.Color;
  active: boolean;
  delay: number;
}

interface DataPacketsProps {
  nodesRef: React.RefObject<NodeData[]>;
  connectionPairsRef: React.RefObject<[number, number][]>;
  isReducedMotion: boolean;
}

export function DataPackets({
  nodesRef,
  connectionPairsRef,
  isReducedMotion,
}: DataPacketsProps) {
  const count = NETWORK_CONFIG.DATA_PACKET_COUNT;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize packets state
  const packets = useMemo<Packet[]>(() => {
    const list: Packet[] = [];
    const cyan = new THREE.Color(NETWORK_CONFIG.COLORS.PACKET);
    const blue = new THREE.Color(NETWORK_CONFIG.COLORS.LINE_ACTIVE);

    for (let i = 0; i < count; i++) {
      list.push({
        fromIndex: -1,
        toIndex: -1,
        progress: 0,
        speed:
          NETWORK_CONFIG.PACKET_SPEED_MIN +
          Math.random() *
            (NETWORK_CONFIG.PACKET_SPEED_MAX - NETWORK_CONFIG.PACKET_SPEED_MIN),
        size: 0.05 + Math.random() * 0.02,
        color: Math.random() > 0.3 ? cyan : blue,
        active: false,
        delay: i * 0.3 + Math.random() * 0.5,
      });
    }
    return list;
  }, [count]);

  useFrame((_, delta) => {
    if (isReducedMotion || !meshRef.current) return;
    const nodes = nodesRef.current;
    const pairs = connectionPairsRef.current;
    if (!nodes || nodes.length === 0 || !pairs || pairs.length === 0) return;

    for (let i = 0; i < count; i++) {
      const pkt = packets[i];

      // Handle packet startup delay
      if (pkt.delay > 0) {
        pkt.delay -= delta;
        dummy.position.set(0, 0, -999);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        continue;
      }

      // Pick initial valid route if inactive
      if (pkt.fromIndex === -1 || pkt.toIndex === -1) {
        const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
        if (randomPair) {
          pkt.fromIndex = randomPair[0];
          pkt.toIndex = randomPair[1];
          pkt.progress = 0;
          pkt.active = true;
        } else {
          continue;
        }
      }

      // Progress along edge
      pkt.progress += delta * pkt.speed;

      const fromNode = nodes[pkt.fromIndex];
      const toNode = nodes[pkt.toIndex];

      if (!fromNode || !toNode) {
        pkt.fromIndex = -1;
        continue;
      }

      if (pkt.progress >= 1.0) {
        // Reached destination node: trigger energy pulse on destination node!
        toNode.pulseEnergy = 1.0;

        // Choose next hop from toNode's neighbors
        if (toNode.neighbors.length > 0) {
          const nextIndex =
            toNode.neighbors[
              Math.floor(Math.random() * toNode.neighbors.length)
            ];
          pkt.fromIndex = pkt.toIndex;
          pkt.toIndex = nextIndex;
          pkt.progress = 0;
          pkt.speed =
            NETWORK_CONFIG.PACKET_SPEED_MIN +
            Math.random() *
              (NETWORK_CONFIG.PACKET_SPEED_MAX -
                NETWORK_CONFIG.PACKET_SPEED_MIN);
        } else {
          // Re-pick random pair
          const randomPair =
            pairs[Math.floor(Math.random() * pairs.length)];
          pkt.fromIndex = randomPair[0];
          pkt.toIndex = randomPair[1];
          pkt.progress = 0;
        }
      }

      // Current position along connection
      const currentPos = new THREE.Vector3().lerpVectors(
        fromNode.currentPos,
        toNode.currentPos,
        pkt.progress
      );

      dummy.position.copy(currentPos);
      // Subtle pulse scale as it travels
      const pulseScale = pkt.size * (1 + 0.3 * Math.sin(pkt.progress * Math.PI));
      dummy.scale.set(pulseScale, pulseScale, pulseScale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, pkt.color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  if (isReducedMotion) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial
        toneMapped={false}
        color={NETWORK_CONFIG.COLORS.PACKET}
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
