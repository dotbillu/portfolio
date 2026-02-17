"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
// Import useGLTF when you have your actual 3D model:
// import { useGLTF } from "@react-three/drei";

function InteractiveModel() {
  const modelRef = useRef<THREE.Group>(null);

  // 🛑 WHEN YOU GET YOUR 3D LOGO (.glb file):
  // 1. Put 'logo.glb' in your public folder.
  // 2. Uncomment this line:
  // const { scene } = useGLTF('/logo.glb');

  useFrame((state) => {
    if (!modelRef.current) return;

    // state.pointer tracks the mouse globally across the screen from -1 to 1
    const targetX = state.pointer.x * 0.8; 
    const targetY = state.pointer.y * 0.8; 

    // Smoothly interpolate current rotation towards the mouse target
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetX, 0.1);
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, -targetY, 0.1);
  });

  return (
    <group ref={modelRef}>
      {/* 🛑 REPLACE THIS ENTIRE <mesh> BLOCK WITH YOUR MODEL LATER: */}
      {/* <primitive object={scene} scale={1.5} /> */}

      {/* --- TEMPORARY 3D SHAPE: A dark cone representing the "nose" --- */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[1, 2, 4]} />
        <meshStandardMaterial color="#222222" flatShading />
      </mesh>
    </group>
  );
}

export default function ThreeDLogo({ onClick }: { onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="relative z-50 cursor-pointer transition-transform hover:scale-110 active:scale-95"
      style={{ width: "40px", height: "40px" }}
      aria-label="Interactive 3D Logo"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <InteractiveModel />
      </Canvas>
    </div>
  );
}
