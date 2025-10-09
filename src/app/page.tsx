"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Navbar } from "../components/Navbar";
import { HeroAndSkillsContainer } from "../components/HeroAndSkillsContainer";
import { PortfolioDeck } from "../components/PortfolioDeck";
import { ConnectSection } from "../components/ConnectSection";

export default function Home() {
  const [navVariant, setNavVariant] = useState<"hero" | "island" | "hidden">("hero");
  const { scrollYProgress: pageScrollProgress } = useScroll();
  const connectSectionRef = useRef(null);
  const { scrollYProgress: transitionProgress } = useScroll({
    target: connectSectionRef,
    offset: ["start end", "start center"],
  });
  const bgClipPath = useTransform(
    transitionProgress,
    [0, 0.5],
    ["inset(0% 0% 0% 0%)", "inset(50% 50% 50% 50%)"],
  );
  const thumbY = useTransform(pageScrollProgress, [0, 1], ["0%", "300%"]);

  return (
    <>
      <div className="fixed top-1/2 right-4 z-50 h-32 w-4 -translate-y-1/2">
        <div className="relative h-full w-full rounded-full bg-slate-800 p-0.5">
          <motion.div
            className="h-1/4 w-full rounded-full bg-slate-200"
            style={{ y: thumbY }}
          />
        </div>
      </div>

      <AnimatePresence>
        {navVariant !== "hidden" && <Navbar variant={navVariant} />}
      </AnimatePresence>

      <motion.div
        className="absolute top-0 h-16"
        onViewportEnter={() => setNavVariant("hero")}
      />

      <HeroAndSkillsContainer />

      <motion.div
        className="relative -top-16 h-16"
        onViewportEnter={() => setNavVariant("hidden")}
        onViewportLeave={() => setNavVariant("hero")}
      />

      <div className="relative">
        <motion.div
          style={{ clipPath: bgClipPath }}
          className="sticky top-0 h-full bg-[#DDA26E] z-0"
        />
        <div className="relative z-10">
          <PortfolioDeck />
        </div>
      </div>

      <div ref={connectSectionRef}>
        <ConnectSection />
      </div>
    </>
  );
}