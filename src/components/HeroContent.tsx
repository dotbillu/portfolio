"use client";
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface HeroContentProps {
  scrollYProgress: MotionValue<number>;
}

export const HeroContent = ({ scrollYProgress }: HeroContentProps) => {
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.7]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
      style={{ scale: heroScale, opacity: heroOpacity }}
    >
      <h1
        className="font-anton text-[10vw] md:text-8xl lg:text-9xl tracking-tighter text-[#4D2D9A]"
        style={{ lineHeight: "0.85" }}
      >
        <p>WELCOME !</p>
      </h1>
      <p className="mt-6 text-xl text-gray-700 max-w-2xl">
        Hi! I&apos;m Abhay. A software engineer exploring the delicate art of shaping
        ideas into experiences that resonate.
      </p>
     
    </motion.div>
  );
};