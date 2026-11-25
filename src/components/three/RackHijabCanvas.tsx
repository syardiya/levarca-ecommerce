"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  HijabGlbScene,
  GlbErrorBoundary,
  ProceduralFallbackHijab,
} from "@/components/three/HijabGlbModel";

interface RackHijabPreviewCanvasProps {
  fabricHex: string;
  sheenHex: string;
  shadowHex: string;
  isCentered: boolean;
  offsetFromCenter: number;
  phaseOffset?: number;
}

export default function RackHijabCanvas(props: RackHijabPreviewCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const manualRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStateRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    baseRotY: number;
    baseRotX: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    baseRotY: 0,
    baseRotX: 0,
  });

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    const lowCores =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4;
    setIsLowPower(mobile || lowCores);

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01, rootMargin: "200px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStateRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      baseRotY: manualRotationRef.current.y,
      baseRotX: manualRotationRef.current.x,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerRef.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      };
    }

    if (dragStateRef.current.active) {
      const dx = e.clientX - dragStateRef.current.startX;
      const dy = e.clientY - dragStateRef.current.startY;
      manualRotationRef.current = {
        y: THREE.MathUtils.clamp(
          dragStateRef.current.baseRotY + dx * 0.005,
          -0.08,
          0.08
        ),
        x: THREE.MathUtils.clamp(
          dragStateRef.current.baseRotX + dy * 0.004,
          -0.12,
          0.12
        ),
      };
    }
  };

  const handlePointerUpOrLeave = () => {
    dragStateRef.current.active = false;
    setIsDragging(false);
    pointerRef.current = { x: 0, y: 0 };
  };

  const fallbackNode = (
    <ProceduralFallbackHijab
      fabricHex={props.fabricHex}
      sheenHex={props.sheenHex}
      shadowHex={props.shadowHex}
    />
  );

  const resolvedPhaseOffset =
    props.phaseOffset !== undefined
      ? props.phaseOffset
      : props.offsetFromCenter * 1.45;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrLeave}
      onPointerCancel={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      style={{ touchAction: "pan-x pan-y" }}
      className={`w-full h-full relative flex items-center justify-center pointer-events-auto ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <Canvas
        frameloop={isVisible ? "always" : "never"}
        dpr={isLowPower ? [1, 1.15] : [1, 1.4]}
        camera={{ position: [0, 0.0, 4.6], fov: 38 }}
        gl={{
          antialias: !isLowPower,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Calibrated Studio Lighting: ~45° Key Light (2.2), Fill Light (0.85), Subtle Rim Light */}
        <ambientLight intensity={0.55} color="#FFFDF9" />
        <hemisphereLight
          color="#FFFDF9"
          groundColor="#CFC5B8"
          intensity={0.45}
        />
        {/* ~45° Side Key Light (intensity ~2.2) */}
        <directionalLight
          position={[4.0, 3.6, 4.0]}
          intensity={2.2}
          color="#FFFBF5"
        />
        {/* Opposite Fill Light (intensity ~0.85) */}
        <directionalLight
          position={[-3.6, 1.5, 3.2]}
          intensity={0.85}
          color="#F5EDE3"
        />
        {/* Subtle Rim Light */}
        <directionalLight
          position={[-1.0, 3.0, -4.0]}
          intensity={0.62}
          color={props.sheenHex}
        />

        <GlbErrorBoundary fallback={fallbackNode}>
          <Suspense fallback={fallbackNode}>
            <HijabGlbScene
              fabricHex={props.fabricHex}
              sheenHex={props.sheenHex}
              shadowHex={props.shadowHex}
              mode="rack"
              isCentered={props.isCentered}
              offsetFromCenter={props.offsetFromCenter}
              phaseOffset={resolvedPhaseOffset}
              interactivePointer={pointerRef}
              manualRotationRef={manualRotationRef}
            />
          </Suspense>
        </GlbErrorBoundary>
      </Canvas>
    </div>
  );
}
