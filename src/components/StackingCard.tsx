"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Card3D } from "./Card3D";

interface CardData {
  id: string;
  title: string;
  text: string;
  img: string;
  links?: Array<{ href: string; label: string }>;
}

interface StackingCardProps {
  card: CardData;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}

export const StackingCard = ({ card, index, totalCards, scrollYProgress }: StackingCardProps) => {
  const y = useTransform(scrollYProgress, (progress) => {
    const activeCardIndex = progress * (totalCards - 1);
    const distance = index - activeCardIndex;
    return `${distance * 45}%`;
  });
  const scale = useTransform(scrollYProgress, (progress) => {
    const activeCardIndex = progress * (totalCards - 1);
    const distance = Math.abs(index - activeCardIndex);
    return Math.max(1 - distance * 0.1, 0.5);
  });
  const zIndex = useTransform(scrollYProgress, (progress) => {
    const activeCardIndex = progress * (totalCards - 1);
    const distance = Math.abs(index - activeCardIndex);
    return totalCards - distance;
  });
  return (
    <motion.div
      className="absolute w-full h-full flex items-center justify-center p-4 md:p-8"
      style={{ zIndex, y, scale }}
    >
      <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-900/10 ring-1 ring-gray-900/5 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="flex flex-col justify-center items-start text-left">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {card.title}
            </h2>
            <p className="text-lg text-slate-700 font-light leading-relaxed">
              {card.text}
            </p>
            {card.links && (
              <div className="mt-6 flex items-center gap-4">
                {card.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <color attach="background" args={["transparent"]} />
              <ambientLight intensity={1.5} />
              <directionalLight position={[0, 2, 5]} intensity={2.0} />
              <Card3D imageUrl={card.img} />
            </Canvas>
          </div>
        </div>
      </div>
    </motion.div>
  );
};