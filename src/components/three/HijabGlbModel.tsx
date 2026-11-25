"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const HIJAB_GLB_PATH = "/models/hijab.glb";

// Preload the production 17,920-triangle GLB model with 4 Shape Keys
useGLTF.preload(HIJAB_GLB_PATH);

/**
 * Ref-counted singleton cache for procedural CanvasTextures:
 * 1) `bumpMap`: Fine plain-weave Modal Viscose micro-fiber + Double-Stitch hem border (~0.5% - 1.2% UV edge)
 * 2) `roughnessMap`: Matte surface variation
 * 3) `stitchAlphaMap`: White-based multiplier map that highlights the twin Double-Stitch thread lines along the 0..1 UV perimeter without dulling the main fabric body
 */
interface ViscoseTextureBundle {
  bumpMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  stitchAlphaMap: THREE.CanvasTexture;
}

let cachedTextureBundle: ViscoseTextureBundle | null = null;
let textureRefCount = 0;

export function acquireModalViscoseTextures(): ViscoseTextureBundle | null {
  if (typeof document === "undefined") return null;

  textureRefCount += 1;
  if (cachedTextureBundle) {
    return cachedTextureBundle;
  }

  const size = 512;
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext("2d");

  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext("2d");

  const stitchCanvas = document.createElement("canvas");
  stitchCanvas.width = size;
  stitchCanvas.height = size;
  const sCtx = stitchCanvas.getContext("2d");

  if (bCtx && rCtx && sCtx) {
    const bImg = bCtx.createImageData(size, size);
    const rImg = rCtx.createImageData(size, size);
    const sImg = sCtx.createImageData(size, size);

    const bData = bImg.data;
    const rData = rImg.data;
    const sData = sImg.data;

    for (let y = 0; y < size; y++) {
      const v = y / (size - 1);
      const distV = Math.min(v, 1.0 - v);

      for (let x = 0; x < size; x++) {
        const u = x / (size - 1);
        const distU = Math.min(u, 1.0 - u);

        const edgeDist = Math.min(distU, distV);
        const idx = (y * size + x) * 4;

        // Fine plain-weave warp & weft threads + modal viscose lengthwise fiber
        const warp = Math.sin(x * 1.5708);
        const weft = Math.sin(y * 1.5708);
        const plainWeave = warp * weft * 16;
        const microSlub =
          Math.sin(y * 0.35 + Math.sin(x * 0.15) * 2.0) * 7 +
          Math.cos(x * 0.42) * 5;

        let bumpVal = 128 + plainWeave + microSlub;
        let roughVal = 240 + warp * weft * 10; // High matte base roughness
        let colorMult = 255; // Pure 255 white in main fabric body so base hex colors stay 100% accurate

        // Rolled hem ridge & Double Stitch lines between 0.5% (0.005) and 1.2% (0.012) from UV edge
        if (edgeDist < 0.0145) {
          if (edgeDist < 0.0045) {
            bumpVal += 28;
            colorMult = 242;
          }

          const onLine1 = edgeDist >= 0.0048 && edgeDist <= 0.0068;
          const onLine2 = edgeDist >= 0.0098 && edgeDist <= 0.0118;
          const onHemCrease = edgeDist > 0.0125 && edgeDist < 0.0142;

          if (onLine1 || onLine2) {
            const alongCoord = distU < distV ? y : x;
            const stitchPhase = alongCoord % 6;
            if (stitchPhase < 4) {
              bumpVal = 225;
              roughVal = 205;
              colorMult = 236;
            } else {
              bumpVal = 55;
              roughVal = 250;
              colorMult = 210;
            }
          } else if (onHemCrease) {
            bumpVal = 82;
            colorMult = 230;
          }
        }

        const bClamped = Math.min(255, Math.max(0, Math.round(bumpVal)));
        const rClamped = Math.min(255, Math.max(0, Math.round(roughVal)));
        const cClamped = Math.min(255, Math.max(0, Math.round(colorMult)));

        bData[idx] = bClamped;
        bData[idx + 1] = bClamped;
        bData[idx + 2] = bClamped;
        bData[idx + 3] = 255;

        rData[idx] = rClamped;
        rData[idx + 1] = rClamped;
        rData[idx + 2] = rClamped;
        rData[idx + 3] = 255;

        sData[idx] = cClamped;
        sData[idx + 1] = cClamped;
        sData[idx + 2] = cClamped;
        sData[idx + 3] = 255;
      }
    }

    bCtx.putImageData(bImg, 0, 0);
    rCtx.putImageData(rImg, 0, 0);
    sCtx.putImageData(sImg, 0, 0);
  }

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.ClampToEdgeWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;
  bumpMap.needsUpdate = true;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.ClampToEdgeWrapping;
  roughnessMap.wrapT = THREE.ClampToEdgeWrapping;
  roughnessMap.needsUpdate = true;

  const stitchAlphaMap = new THREE.CanvasTexture(stitchCanvas);
  stitchAlphaMap.wrapS = THREE.ClampToEdgeWrapping;
  stitchAlphaMap.wrapT = THREE.ClampToEdgeWrapping;
  stitchAlphaMap.colorSpace = THREE.SRGBColorSpace;
  stitchAlphaMap.needsUpdate = true;

  cachedTextureBundle = {
    bumpMap,
    roughnessMap,
    stitchAlphaMap,
  };

  return cachedTextureBundle;
}

export function releaseModalViscoseTextures(): void {
  textureRefCount = Math.max(0, textureRefCount - 1);
  if (textureRefCount === 0 && cachedTextureBundle) {
    cachedTextureBundle.bumpMap.dispose();
    cachedTextureBundle.roughnessMap.dispose();
    cachedTextureBundle.stitchAlphaMap.dispose();
    cachedTextureBundle = null;
  }
}

interface CachedHijabAsset {
  geometry: THREE.BufferGeometry;
  morphTargetDictionary: Record<string, number>;
  morphCount: number;
}

let cachedHijabAsset: CachedHijabAsset | null = null;

function getOrExtractHijabAsset(scene: THREE.Group): CachedHijabAsset | null {
  if (cachedHijabAsset) {
    return cachedHijabAsset;
  }

  let foundMesh: THREE.Mesh | null = null;
  scene.traverse((child) => {
    if (!foundMesh && (child as THREE.Mesh).isMesh) {
      foundMesh = child as THREE.Mesh;
    }
  });

  if (!foundMesh) return null;

  const sourceMesh = foundMesh as THREE.Mesh;
  const geo = sourceMesh.geometry;

  if (!geo.attributes.normal) {
    geo.computeVertexNormals();
  }

  const dict: Record<string, number> = sourceMesh.morphTargetDictionary
    ? { ...sourceMesh.morphTargetDictionary }
    : {
        Sway_Side: 0,
        Billow_Depth: 1,
        Fold_Shift: 2,
        Hem_Flutter: 3,
      };

  const morphPos = geo.morphAttributes.position;
  const morphNorm = geo.morphAttributes.normal;
  const morphCount = Math.max(
    morphPos ? morphPos.length : 0,
    morphNorm ? morphNorm.length : 0,
    Object.keys(dict).length,
    4
  );

  cachedHijabAsset = {
    geometry: geo,
    morphTargetDictionary: dict,
    morphCount,
  };

  return cachedHijabAsset;
}

/**
 * Helper to detect Midnight Navy (#1C2942) or dark variants so we apply the tuned
 * Midnight Navy sheen profile (sheen: 0.60, sheenRoughness: 0.72, sheenColor: '#4F678E')
 * while light/pastel variants use the soft matte profile (sheen: 0.32, sheenRoughness: 0.82).
 */
function isMidnightNavyOrDark(hex: string): boolean {
  const normalized = hex.trim().toUpperCase();
  if (
    normalized === "#1C2942" ||
    normalized === "#141E30" ||
    normalized === "#151D2B"
  ) {
    return true;
  }
  const c = new THREE.Color(hex);
  const lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  return lum < 0.1;
}

export interface HijabGlbSceneProps {
  fabricHex: string;
  sheenHex: string;
  shadowHex: string;
  mode: "hero" | "rack";
  isCentered?: boolean;
  offsetFromCenter?: number;
  phaseOffset?: number;
  interactivePointer?: React.MutableRefObject<{ x: number; y: number }>;
  manualRotationRef?: React.MutableRefObject<{ x: number; y: number }>;
}

export function HijabGlbScene({
  fabricHex,
  sheenHex,
  mode,
  isCentered = true,
  offsetFromCenter = 0,
  phaseOffset = 0,
  interactivePointer,
  manualRotationRef,
}: HijabGlbSceneProps) {
  const gltf = useGLTF(HIJAB_GLB_PATH);
  const pivotGroupRef = useRef<THREE.Group>(null);

  const hijabAsset = useMemo(
    () => getOrExtractHijabAsset(gltf.scene),
    [gltf.scene]
  );

  const isNavy = useMemo(() => isMidnightNavyOrDark(fabricHex), [fabricHex]);

  // Create an independent Matte Modal Viscose MeshPhysicalMaterial per instance
  const modalViscoseMaterial = useMemo(() => {
    const textures = acquireModalViscoseTextures();
    const darkNavy = isMidnightNavyOrDark(fabricHex);
    const baseColor = new THREE.Color(fabricHex);
    const initialSheenColor = darkNavy
      ? new THREE.Color("#4F678E")
      : new THREE.Color(fabricHex).lerp(new THREE.Color(sheenHex), 0.55);

    return new THREE.MeshPhysicalMaterial({
      color: baseColor,
      map: textures ? textures.stitchAlphaMap : null,
      roughness: 0.85,
      metalness: 0.0,
      clearcoat: 0.0,
      specularIntensity: 0.15,
      envMapIntensity: 0.25,
      sheen: darkNavy ? 0.6 : 0.32,
      sheenRoughness: darkNavy ? 0.72 : 0.82,
      sheenColor: initialSheenColor,
      bumpMap: textures ? textures.bumpMap : null,
      bumpScale: 0.01,
      roughnessMap: textures ? textures.roughnessMap : null,
      side: THREE.DoubleSide,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Synchronously construct an independent THREE.Mesh instance BEFORE the first WebGL render frame!
   * In Three.js, `new THREE.Mesh(geometry, material)` automatically calls `this.updateMorphTargets()`,
   * and we also explicitly assign a fresh `morphTargetInfluences = new Array(count).fill(0)` and
   * cloned `morphTargetDictionary` per instance so `WebGLMorphTargets.update` NEVER encounters
   * `undefined` on the very first frame and each Rack clone owns an isolated influences array.
   */
  const hijabMesh = useMemo(() => {
    if (!hijabAsset) return null;
    const m = new THREE.Mesh(hijabAsset.geometry, modalViscoseMaterial);
    m.name = "LEVARCA_Pashmina";
    m.castShadow = true;
    m.receiveShadow = true;
    m.updateMorphTargets();
    m.morphTargetDictionary = { ...hijabAsset.morphTargetDictionary };
    m.morphTargetInfluences = new Array(hijabAsset.morphCount).fill(0);
    return m;
  }, [hijabAsset, modalViscoseMaterial]);

  useEffect(() => {
    return () => {
      modalViscoseMaterial.dispose();
      releaseModalViscoseTextures();
    };
  }, [modalViscoseMaterial]);

  const targetFabricColor = useMemo(
    () => new THREE.Color(fabricHex),
    [fabricHex]
  );
  const targetSheenColor = useMemo(() => {
    if (isNavy) {
      return new THREE.Color("#4F678E");
    }
    return new THREE.Color(fabricHex).lerp(new THREE.Color(sheenHex), 0.55);
  }, [fabricHex, sheenHex, isNavy]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const omega = (Math.PI * 2) / 10.0;
    const phase = t * omega + phaseOffset;

    // 1) Framing & Rotation Control for Hero and Rack
    if (pivotGroupRef.current) {
      const px = interactivePointer
        ? interactivePointer.current.x
        : state.pointer.x || 0;
      const py = interactivePointer
        ? interactivePointer.current.y
        : state.pointer.y || 0;

      const dragY = manualRotationRef ? manualRotationRef.current.y : 0;
      const dragX = manualRotationRef ? manualRotationRef.current.x : 0;

      if (mode === "hero") {
        pivotGroupRef.current.position.y =
          1.24 + Math.sin(phase) * 0.042;

        const targetRotY = Math.sin(phase * 0.7) * 0.1 + px * 0.34 + dragY;
        const targetRotX = Math.cos(phase * 0.85) * 0.03 - py * 0.14 + dragX;
        const targetRotZ = Math.sin(phase) * 0.022 - px * 0.06;

        pivotGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          pivotGroupRef.current.rotation.y,
          targetRotY,
          0.09
        );
        pivotGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          pivotGroupRef.current.rotation.x,
          targetRotX,
          0.09
        );
        pivotGroupRef.current.rotation.z = THREE.MathUtils.lerp(
          pivotGroupRef.current.rotation.z,
          targetRotZ,
          0.09
        );
      } else {
        pivotGroupRef.current.position.y = 1.36;

        let targetRotY: number;
        if (isCentered) {
          const gentleSwing = Math.sin(phase) * 0.055 + px * 0.025 + dragY;
          targetRotY = THREE.MathUtils.clamp(gentleSwing, -0.08, 0.08);
        } else {
          const sideSign = offsetFromCenter > 0 ? -1 : 1;
          const sideBase =
            sideSign * 0.25 + Math.sin(phase) * 0.035 + dragY * 0.2;
          targetRotY = THREE.MathUtils.clamp(sideBase, -0.3, 0.3);
        }

        const targetRotZ =
          Math.sin(phase * 1.1) * (isCentered ? 0.018 : 0.01) - px * 0.03;
        const targetRotX = isCentered
          ? THREE.MathUtils.clamp(-py * 0.08 + dragX, -0.12, 0.12)
          : 0;

        pivotGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          pivotGroupRef.current.rotation.y,
          targetRotY,
          0.09
        );
        pivotGroupRef.current.rotation.z = THREE.MathUtils.lerp(
          pivotGroupRef.current.rotation.z,
          targetRotZ,
          0.09
        );
        pivotGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          pivotGroupRef.current.rotation.x,
          targetRotX,
          0.09
        );
      }
    }

    // 2) Accurate color & sheen interpolation
    if (hijabMesh) {
      const mat = hijabMesh.material as THREE.MeshPhysicalMaterial;
      if (mat && mat.color) {
        mat.color.lerp(targetFabricColor, 0.14);
        mat.sheenColor.lerp(targetSheenColor, 0.14);
        mat.sheen = THREE.MathUtils.lerp(
          mat.sheen,
          isNavy ? 0.6 : 0.32,
          0.12
        );
        mat.sheenRoughness = THREE.MathUtils.lerp(
          mat.sheenRoughness,
          isNavy ? 0.72 : 0.82,
          0.12
        );
        mat.roughness = 0.85;
        mat.specularIntensity = 0.15;
      }
    }

    // 3) Strict guard before updating morph target weights (Sway_Side, Billow_Depth, Fold_Shift, Hem_Flutter)
    if (!hijabMesh?.morphTargetInfluences || !hijabMesh?.morphTargetDictionary) {
      return;
    }

    const dict = hijabMesh.morphTargetDictionary;
    const influences = hijabMesh.morphTargetInfluences;

    const swayIdx = dict["Sway_Side"] ?? 0;
    const billowIdx = dict["Billow_Depth"] ?? 1;
    const foldIdx = dict["Fold_Shift"] ?? 2;
    const flutterIdx = dict["Hem_Flutter"] ?? 3;

    const targetSway = 0.45 + 0.42 * Math.sin(phase);
    const targetBillow = 0.48 + 0.4 * Math.sin(phase + 1.57);
    const targetFold = 0.42 + 0.36 * Math.sin(phase * 1.5 + 0.85);
    const targetFlutter =
      0.46 +
      0.35 * Math.sin(phase * 2.0 + 2.1) +
      0.12 * Math.cos(phase * 3.0);

    if (influences[swayIdx] !== undefined) {
      influences[swayIdx] = THREE.MathUtils.lerp(
        influences[swayIdx],
        targetSway,
        0.1
      );
    }
    if (influences[billowIdx] !== undefined) {
      influences[billowIdx] = THREE.MathUtils.lerp(
        influences[billowIdx],
        targetBillow,
        0.1
      );
    }
    if (influences[foldIdx] !== undefined) {
      influences[foldIdx] = THREE.MathUtils.lerp(
        influences[foldIdx],
        targetFold,
        0.1
      );
    }
    if (influences[flutterIdx] !== undefined) {
      influences[flutterIdx] = THREE.MathUtils.lerp(
        influences[flutterIdx],
        Math.min(1, Math.max(0, targetFlutter)),
        0.1
      );
    }
  });

  // Strictly uniform scale [s, s, s] so the 14 cm Z-volume is never flattened
  const uniformScale = mode === "hero" ? 1.65 : isCentered ? 1.52 : 1.4;

  if (!hijabAsset || !hijabMesh) {
    return null;
  }

  return (
    <group
      ref={pivotGroupRef}
      position={[0, mode === "hero" ? 1.24 : 1.36, 0]}
    >
      {mode === "rack" && (
        <group position={[0, 0, 0]}>
          {/* Champagne-Brass Hook Loop wrapping the Rack Rail */}
          <mesh position={[0, 0.24, 0]}>
            <torusGeometry args={[0.11, 0.018, 12, 24]} />
            <meshStandardMaterial
              color="#C8A97E"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
          {/* Vertical Hook Neck */}
          <mesh position={[0, 0.11, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 0.14, 12]} />
            <meshStandardMaterial
              color="#C8A97E"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
          {/* Warm Walnut Wooden Hanger Bar sharing the exact same rotation axis as the hijab */}
          <mesh position={[0, 0.035, 0]}>
            <boxGeometry args={[0.86, 0.055, 0.065]} />
            <meshStandardMaterial
              color="#6E4E37"
              metalness={0.1}
              roughness={0.58}
            />
          </mesh>
          {/* Twin Gold Clips holding the top edge below the wooden bar */}
          <mesh position={[-0.22, -0.005, 0]}>
            <boxGeometry args={[0.04, 0.045, 0.075]} />
            <meshStandardMaterial
              color="#C8A97E"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0.22, -0.005, 0]}>
            <boxGeometry args={[0.04, 0.045, 0.075]} />
            <meshStandardMaterial
              color="#C8A97E"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        </group>
      )}

      <primitive
        object={hijabMesh}
        position={[0, mode === "rack" ? -0.02 : 0, 0]}
        scale={[uniformScale, uniformScale, uniformScale]}
      />
    </group>
  );
}

/**
 * Safe ErrorBoundary + Procedural Fallback in case /models/hijab.glb fails to load
 */
export class GlbErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function ProceduralFallbackHijab({
  fabricHex,
  sheenHex,
}: {
  fabricHex: string;
  sheenHex: string;
  shadowHex?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const darkNavy = isMidnightNavyOrDark(fabricHex);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.12;
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.04;
    }
  });

  // Draped tapered cylinder/cone silhouette matching the pashmina proportions during the 1-second GLB load
  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.16, 0.56, 2.75, 24, 1, true]} />
        <meshPhysicalMaterial
          color={fabricHex}
          roughness={0.85}
          metalness={0.0}
          clearcoat={0.0}
          specularIntensity={0.15}
          envMapIntensity={0.25}
          sheen={darkNavy ? 0.6 : 0.32}
          sheenRoughness={darkNavy ? 0.72 : 0.82}
          sheenColor={darkNavy ? "#4F678E" : sheenHex}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
