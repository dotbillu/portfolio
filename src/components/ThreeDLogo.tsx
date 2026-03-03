"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/logo3d.glb");

function InteractiveModel({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/logo3d.glb");
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouse.current.x = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      mouse.current.y = Math.max(-1, Math.min(1, -(e.clientY - centerY) / (window.innerHeight / 2)));
    };
    const handleMouseLeave = () => {
      mouse.current.x = 0;
      mouse.current.y = 0;
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  useFrame(() => {
    if (!modelRef.current) return;

    const targetX = mouse.current.x * 0.25;
    const targetY = mouse.current.y * 0.25;

    // Smoothly interpolate current rotation towards the mouse target
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetX, 0.1);
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, -targetY, 0.1);
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={1.5} rotation={[0, -100 * (Math.PI / 180), 0]} />
    </group>
  );
}

export default function ThreeDLogo({ onClick }: { onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      className="absolute z-50  transition-transform mt-30 right-0 bg-pink"
      style={{ width: "200px", height: "200px" }}
      aria-label="Interactive 3D Logo"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <InteractiveModel containerRef={containerRef} />
      </Canvas>
    </div>
  );
}
