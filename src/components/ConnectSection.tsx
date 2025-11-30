"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiGithub, SiLinkedin, SiLeetcode, SiCodeforces } from "react-icons/si";
import { ConnectCard } from "./ConnectCard";

export function ConnectSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const xLeft = useTransform(progress, [0, 1], [-500, 0]);
  const xRight = useTransform(progress, [0, 1], [500, 0]);
  const yTop = useTransform(progress, [0, 1], [-400, 0]);
  const yBottom = useTransform(progress, [0, 1], [400, 0]);

  const cardOpacity = useTransform(progress, [0.4, 0.7], [0, 1]);
  const cardScale = useTransform(progress, [0.4, 0.8], [0.7, 1]);
  const textOpacity = useTransform(progress, [0.6, 0.8], [1, 0]);
  const textScale = useTransform(progress, [0.6, 0.8], [1, 0.7]);

  return (
    <section
      ref={targetRef}
      id="connect"
      className="relative h-[180vh] bg-[#FFF1EB]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl h-[600px]">
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center text-center"
            style={{ opacity: textOpacity, scale: textScale }}
          >
            <h2 className="font-anton text-7xl md:text-9xl text-[#4D2D9A] tracking-tighter">
              LETS CONNECT!
            </h2>

            <div className="h-10" />

            <div className="text-sm uppercase tracking-widest text-slate-500">
              Scroll <span className="text-2xl block mt-2">↓</span>
            </div>
          </motion.div>
          <ConnectCard
            title="GitHub"
            id="@dotbillu"
            link="https://github.com/dotbillu"
            className="top-[58px] right-[55%] w-80 h-48 bg-[#1b1c1d]"
            textColor="text-white"
            subTextColor="text-gray-400"
            icon={<SiGithub size={140} />}
            motionStyle={{
              x: xLeft,
              y: yTop,
              opacity: cardOpacity,
              scale: cardScale,
            }}
          />
          <ConnectCard
            title="LinkedIn"
            id="Abhay Jha"
            link="https://www.linkedin.com/in/abhay-jha-1874a5223/"
            className="top-[26px] left-[55%] w-80 h-56 bg-[#190066]"
            textColor="text-white"
            subTextColor="text-gray-400"
            icon={<SiLinkedin size={140} />}
            motionStyle={{
              x: xRight,
              y: yTop,
              opacity: cardOpacity,
              scale: cardScale,
            }}
          />
          <ConnectCard
            title="LeetCode"
            id="@notbillu"
            link="https://leetcode.com/notbillu"
            className="bottom-[26px] right-[55%] w-80 h-56 bg-[#b2dcee]"
            textColor="text-slate-900"
            subTextColor="text-slate-700"
            icon={<SiLeetcode size={140} />}
            motionStyle={{
              x: xLeft,
              y: yBottom,
              opacity: cardOpacity,
              scale: cardScale,
            }}
          />
          <ConnectCard
            title="Codeforces"
            id="@notbillu"
            link="https://codeforces.com/profile/notbillu"
            className="bottom-[58px] left-[55%] w-80 h-48 bg-[#1b1c1d]"
            textColor="text-white"
            subTextColor="text-gray-400"
            icon={<SiCodeforces size={140} />}
            motionStyle={{
              x: xRight,
              y: yBottom,
              opacity: cardOpacity,
              scale: cardScale,
            }}
          />
        </div>
      </div>
    </section>
  );
}
