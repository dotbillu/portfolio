"use client";
import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Card3DProps {
  imageUrl: string;
}

export const Card3D = ({ imageUrl }: Card3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const aspect = texture ? texture.image.width / texture.image.height : 16 / 9;
  const width = 6.0;
  const height = width / aspect;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} roughness={0.0} metalness={0.0} />
    </mesh>
  );
};