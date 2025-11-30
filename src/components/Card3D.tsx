"use client";
import React, { useMemo, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

interface Card3DProps {
  imageUrl: string;
  onClick?: () => void;
}

export const Card3D = ({ imageUrl, onClick }: Card3DProps) => {
  const texture = useTexture(imageUrl);
  const meshRef = useRef<THREE.Mesh>(null);
  const { invalidate, viewport } = useThree();

  useLayoutEffect(() => {
    if (texture) {
      texture.anisotropy = 16;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      invalidate();
    }
  }, [texture, invalidate]);

  const config = useMemo(() => {
    const img = texture.image as HTMLImageElement;
    const imageAspect = img ? img.width / img.height : 16 / 9;

    let width, height;

    if (imageAspect > 1) {
      width = viewport.width * 0.9;
      if (width > 8) width = 8;
      height = width / imageAspect;
    } else {
      height = 4.2;
      width = height * imageAspect;
    }

    const radius = 0.5;
    const borderThickness = 0.08;

    const createShape = (w: number, h: number, r: number) => {
      const s = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      s.moveTo(x, y + r);
      s.lineTo(x, y + h - r);
      s.quadraticCurveTo(x, y + h, x + r, y + h);
      s.lineTo(x + w - r, y + h);
      s.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
      s.lineTo(x + w, y + r);
      s.quadraticCurveTo(x + w, y, x + w - r, y);
      s.lineTo(x + r, y);
      s.quadraticCurveTo(x, y, x, y + r);
      return s;
    };

    const geometry = new THREE.ShapeGeometry(
      createShape(width, height, radius),
      64
    );
    const borderGeometry = new THREE.ShapeGeometry(
      createShape(
        width + borderThickness,
        height + borderThickness,
        radius + borderThickness / 2
      ),
      64
    );

    return { geometry, borderGeometry };
  }, [texture.image, viewport.width]);

  useLayoutEffect(() => {
    if (meshRef.current) {
      const geom = meshRef.current.geometry;
      geom.computeBoundingBox();
      const box = geom.boundingBox!;
      const size = new THREE.Vector3();
      box.getSize(size);

      const pos = geom.attributes.position;
      const uv = geom.attributes.uv;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        uv.setXY(i, (x - box.min.x) / size.x, (y - box.min.y) / size.y);
      }
      uv.needsUpdate = true;
      invalidate();
    }
  }, [config, invalidate]);

  return (
    <group onClick={onClick}>
      <mesh geometry={config.borderGeometry} position={[0, 0, -0.01]}>
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh
        ref={meshRef}
        geometry={config.geometry}
        position={[0, 0, 0.01]}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
};
