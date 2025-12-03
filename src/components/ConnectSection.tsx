"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiGithub, SiLinkedin, SiLeetcode, SiCodeforces } from "react-icons/si";
import { ConnectCard } from "./ConnectCard";

export function ConnectSection() {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const mobileTitleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const mobileTitleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const githubScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const githubOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const githubY = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);

  const linkedinScale = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const linkedinOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const linkedinY = useTransform(scrollYProgress, [0.45, 0.7], [50, 0]);

  const leetcodeScale = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);
  const leetcodeOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const leetcodeY = useTransform(scrollYProgress, [0.65, 0.9], [50, 0]);

  const codeforcesScale = useTransform(scrollYProgress, [0.8, 1.0], [0, 1]);
  const codeforcesOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const codeforcesY = useTransform(scrollYProgress, [0.8, 1.0], [50, 0]);

  const scrollDownOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

  return (
    <section
      ref={targetRef}
      id="connect"
      className="relative h-[180vh] bg-[#FFF1EB]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {!isMounted ? (
          <div className="relative w-full max-w-4xl h-[600px]">
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <h2 className="font-anton text-7xl md:text-9xl text-[#4D2D9A] tracking-tighter">
                LETS CONNECT!
              </h2>
              <div className="h-10" />
              <div className="text-sm uppercase tracking-widest text-slate-500">
                Loading...
              </div>
            </div>
          </div>
        ) : isMobile ? (
          <div className="w-full max-w-sm px-4">
            <div className="w-full text-center mb-2">
              <h2 className="font-anton text-5xl text-[#4D2D9A] tracking-tighter">
                LETS CONNECT!
              </h2>
              <div className="h-6" />
              <motion.div
                className="text-sm uppercase tracking-widest text-slate-500"
                style={{
                  opacity: scrollDownOpacity
                }}
              >
                Scroll <span className="text-xl block mt-1">↓</span>
              </motion.div>
            </div>

            <div className="space-y-3 pr-4">
              <motion.div
                style={{
                  scale: githubScale,
                  opacity: githubOpacity,
                  y: githubY
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <ConnectCard
                  title="GitHub"
                  id="@dotbillu"
                  link="https://github.com/dotbillu"
                  className="w-full h-20 bg-gray-50 rounded-2xl"
                  textColor="text-gray-900"
                  subTextColor="text-gray-600"
                  icon={<SiGithub size={32} />}
                  iconColor="text-gray-800"
                  motionStyle={{}}
                  benchmark={["400+", "contributions"]}
                />
              </motion.div>

              <motion.div
                style={{
                  scale: linkedinScale,
                  opacity: linkedinOpacity,
                  y: linkedinY
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <ConnectCard
                  title="LinkedIn"
                  id="Abhay Jha"
                  link="https://www.linkedin.com/in/abhay-jha-1874a5223/"
                  className="w-full h-20 bg-blue-50 rounded-2xl"
                  textColor="text-gray-900"
                  subTextColor="text-gray-600"
                  icon={<SiLinkedin size={32} />}
                  iconColor="text-blue-600"
                  motionStyle={{}}
                />
              </motion.div>

              <motion.div
                style={{
                  scale: leetcodeScale,
                  opacity: leetcodeOpacity,
                  y: leetcodeY
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <ConnectCard
                  title="LeetCode"
                  id="@notbillu"
                  link="https://leetcode.com/notbillu"
                  className="w-full h-20 bg-orange-50 rounded-2xl"
                  textColor="text-gray-900"
                  subTextColor="text-gray-600"
                  icon={<SiLeetcode size={32} />}
                  iconColor="text-[#F89F1B]"
                  motionStyle={{}}
                  benchmark={["250+", "questions"]}
                />
              </motion.div>

              <motion.div
                style={{
                  scale: codeforcesScale,
                  opacity: codeforcesOpacity,
                  y: codeforcesY
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <ConnectCard
                  title="Codeforces"
                  id="@notbillu"
                  link="https://codeforces.com/profile/notbillu"
                  className="w-full h-20 bg-red-50 rounded-2xl"
                  textColor="text-gray-900"
                  subTextColor="text-gray-600"
                  icon={<SiCodeforces size={32} />}
                  iconColor="text-red-600"
                  motionStyle={{}}
                  benchmark={["expert", "1600+"]}
                />
              </motion.div>
            </div>
          </div>
        ) : (
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
              className="top-[58px] right-[55%] w-80 h-48 bg-gray-50"
              textColor="text-gray-900"
              subTextColor="text-gray-600"
              icon={<SiGithub size={100} />}
              iconColor="text-gray-800"
              motionStyle={{
                x: xLeft,
                y: yTop,
                opacity: cardOpacity,
                scale: cardScale,
              }}
              benchmark={["400+", "contributions"]}
            />
            <ConnectCard
              title="LinkedIn"
              id="Abhay Jha"
              link="https://www.linkedin.com/in/abhay-jha-1874a5223/"
              className="top-[26px] left-[55%] w-80 h-56 bg-blue-50"
              textColor="text-gray-900"
              subTextColor="text-gray-600"
              icon={<SiLinkedin size={100} />}
              iconColor="text-blue-600"
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
              className="bottom-[26px] right-[55%] w-80 h-56 bg-orange-50"
              textColor="text-gray-900"
              subTextColor="text-gray-600"
              icon={<SiLeetcode size={100} />}
              iconColor="text-orange-600"
              motionStyle={{
                x: xLeft,
                y: yBottom,
                opacity: cardOpacity,
                scale: cardScale,
              }}
              benchmark={["250+", "questions"]}
            />
            <ConnectCard
              title="Codeforces"
              id="@notbillu"
              link="https://codeforces.com/profile/notbillu"
              className="bottom-[58px] left-[55%] w-80 h-48 bg-red-50"
              textColor="text-gray-900"
              subTextColor="text-gray-600"
              icon={<SiCodeforces size={100} />}
              iconColor="text-red-600"
              motionStyle={{
                x: xRight,
                y: yBottom,
                opacity: cardOpacity,
                scale: cardScale,
              }}
              benchmark={["expert", "1600+"]}
            />
          </div>
        )}
      </div>
    </section>
  );
}
