"use client";
import React, { useRef, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Card3DProps {
  imageUrl: string;
}

export const Card3D = ({ imageUrl }: Card3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  // texture quality & color settings
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;


  const [width, height] = useMemo(() => {
    if (texture.image) {
      const img = texture.image;
      const aspect = img.width / img.height;


      const baseWidth = 6; // arbitrary base size for consistency
      const scaledHeight = baseWidth / aspect;
      return [baseWidth, scaledHeight];
    }
    return [6, 3.5]; // fallback while loading
  }, [texture.image]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshPhysicalMaterial
        map={texture}
        clearcoat={0.0}
        clearcoatRoughness={0.0}
        roughness={0.25}
        metalness={0.0}
        side={THREE.FrontSide}
        toneMapped={false}
      />
    </mesh>
  );
};

