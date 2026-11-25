"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  HijabGlbScene,
  GlbErrorBoundary,
  ProceduralFallbackHijab,
} from "@/components/three/HijabGlbModel";

function StudioFloorShadow({ shadowHex }: { shadowHex: string }) {
  const shadowRef = useRef<THREE.Mesh>(null);

  const shadowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 6, 64, 64, 60);
      grad.addColorStop(0, "rgba(25, 20, 18, 0.36)");
      grad.addColorStop(0.48, "rgba(25, 20, 18, 0.15)");
      grad.addColorStop(1, "rgba(25, 20, 18, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useEffect(() => {
    return () => {
      if (shadowTexture) shadowTexture.dispose();
    };
  }, [shadowTexture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (shadowRef.current) {
      const pulse = 1 - Math.sin(t * 0.6283) * 0.05;
      shadowRef.current.scale.set(1.2 * pulse, 0.6 * pulse, 1);
    }
  });

  return (
    <mesh
      ref={shadowRef}
      position={[0.02, -1.96, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[2.6, 2.6]} />
      <meshBasicMaterial
        map={shadowTexture}
        color={shadowHex}
        transparent
        opacity={0.76}
        depthWrite={false}
      />
    </mesh>
  );
}

export interface HeroHijabCanvasProps {
  fabricHex: string;
  sheenHex: string;
  shadowHex: string;
}

export default function HeroHijabCanvas({
  fabricHex,
  sheenHex,
  shadowHex,
}: HeroHijabCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const manualRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    baseRotX: number;
    baseRotY: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    baseRotX: 0,
    baseRotY: 0,
  });

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileDevice(mobile);
      const lowCores =
        typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency !== undefined &&
        navigator.hardwareConcurrency <= 4;
      setIsLowPower(mobile || lowCores);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });

    const el = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (el && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(el);
    }

    return () => {
      window.removeEventListener("resize", checkDevice);
      if (observer) observer.disconnect();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      baseRotX: manualRotationRef.current.x,
      baseRotY: manualRotationRef.current.y,
    };
    setIsDragging(true);
    if (!hasInteracted) setHasInteracted(true);
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

    if (dragStartRef.current.active) {
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      manualRotationRef.current = {
        y: dragStartRef.current.baseRotY + dx * 0.012,
        x: Math.max(
          -0.45,
          Math.min(0.45, dragStartRef.current.baseRotX + dy * 0.006)
        ),
      };
    }
  };

  const handlePointerUpOrLeave = () => {
    dragStartRef.current.active = false;
    setIsDragging(false);
    pointerRef.current = { x: 0, y: 0 };
  };

  const fallbackNode = (
    <ProceduralFallbackHijab
      fabricHex={fabricHex}
      sheenHex={sheenHex}
      shadowHex={shadowHex}
    />
  );

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrLeave}
      onPointerCancel={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      style={{ touchAction: "pan-y" }}
      className={`w-full h-full relative pointer-events-auto ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      title="Sentuh & geser kiri/kanan untuk memutar 3D Pashmina"
    >
      <Canvas
        frameloop={isVisible ? "always" : "never"}
        dpr={isLowPower ? [1, 1.25] : [1, 1.65]}
        camera={{ position: [0, -0.2, 5.3], fov: 38 }}
        gl={{
          antialias: !isLowPower,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.55} color="#FFFDF9" />
        <hemisphereLight
          color="#FFFDF9"
          groundColor="#CFC5B8"
          intensity={0.45}
        />
        {/* ~45° Side Key Light (intensity ~2.2) */}
        <directionalLight
          position={[4.2, 3.6, 4.2]}
          intensity={2.2}
          color="#FFFBF5"
        />
        {/* Opposite Fill Light (intensity ~0.85) */}
        <directionalLight
          position={[-3.8, 1.4, 3.4]}
          intensity={0.85}
          color="#F5EDE3"
        />
        {/* Subtle Rim Light */}
        <directionalLight
          position={[-1.2, 3.0, -4.2]}
          intensity={0.65}
          color={sheenHex}
        />

        {/* On Desktop, enable OrbitControls for 3D camera orbit;
            On Mobile (<768px), disable OrbitControls so vertical page scroll never gets trapped
            while horizontal finger swipe smoothly rotates the hijab via manualRotationRef! */}
        {!isMobileDevice && (
          <OrbitControls
            target={[0, -0.2, 0]}
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.07}
            rotateSpeed={0.65}
            minPolarAngle={Math.PI * 0.32}
            maxPolarAngle={Math.PI * 0.68}
          />
        )}

        <GlbErrorBoundary fallback={fallbackNode}>
          <Suspense fallback={fallbackNode}>
            <HijabGlbScene
              fabricHex={fabricHex}
              sheenHex={sheenHex}
              shadowHex={shadowHex}
              mode="hero"
              phaseOffset={0}
              interactivePointer={pointerRef}
              manualRotationRef={manualRotationRef}
            />
          </Suspense>
        </GlbErrorBoundary>

        <StudioFloorShadow shadowHex={shadowHex} />
      </Canvas>

      {/* Subtle 3D Gesture Hint Badge that fades out after first user interaction */}
      <div
        className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${
          hasInteracted
            ? "opacity-0 translate-y-2"
            : "opacity-90 translate-y-0"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-stone-900/15 shadow-xs text-[11px] text-stone-700 whitespace-nowrap">
          <span className="inline-block animate-pulse text-amber-800 font-semibold">
            ⟳
          </span>
          <span>Geser untuk putar 3D 360°</span>
        </div>
      </div>
    </div>
  );
}
