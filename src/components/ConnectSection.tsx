"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiGithub, SiLinkedin, SiLeetcode, SiCodeforces, SiHashnode, SiDiscord } from "react-icons/si";
import { FaChess, FaTwitter } from "react-icons/fa";
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

  const githubScale = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const githubOpacity = useTransform(scrollYProgress, [0.05, 0.12], [0, 1]);
  const githubY = useTransform(scrollYProgress, [0.05, 0.15], [50, 0]);

  const linkedinScale = useTransform(scrollYProgress, [0.12, 0.22], [0, 1]);
  const linkedinOpacity = useTransform(scrollYProgress, [0.12, 0.18], [0, 1]);
  const linkedinY = useTransform(scrollYProgress, [0.12, 0.22], [50, 0]);

  const leetcodeScale = useTransform(scrollYProgress, [0.19, 0.29], [0, 1]);
  const leetcodeOpacity = useTransform(scrollYProgress, [0.19, 0.25], [0, 1]);
  const leetcodeY = useTransform(scrollYProgress, [0.19, 0.29], [50, 0]);

  const codeforcesScale = useTransform(scrollYProgress, [0.26, 0.36], [0, 1]);
  const codeforcesOpacity = useTransform(scrollYProgress, [0.26, 0.32], [0, 1]);
  const codeforcesY = useTransform(scrollYProgress, [0.26, 0.36], [50, 0]);

  const hashnodeScale = useTransform(scrollYProgress, [0.33, 0.43], [0, 1]);
  const hashnodeOpacity = useTransform(scrollYProgress, [0.33, 0.39], [0, 1]);
  const hashnodeY = useTransform(scrollYProgress, [0.33, 0.43], [50, 0]);

  const twitterScale = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const twitterOpacity = useTransform(scrollYProgress, [0.4, 0.46], [0, 1]);
  const twitterY = useTransform(scrollYProgress, [0.4, 0.5], [50, 0]);

  const chessScale = useTransform(scrollYProgress, [0.47, 0.57], [0, 1]);
  const chessOpacity = useTransform(scrollYProgress, [0.47, 0.53], [0, 1]);
  const chessY = useTransform(scrollYProgress, [0.47, 0.57], [50, 0]);

  const discordScale = useTransform(scrollYProgress, [0.54, 0.64], [0, 1]);
  const discordOpacity = useTransform(scrollYProgress, [0.54, 0.6], [0, 1]);
  const discordY = useTransform(scrollYProgress, [0.54, 0.64], [50, 0]);

  const scrollDownOpacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0]);

  return (
    <section
      ref={targetRef}
      id="connect"
      className="relative h-[300vh] md:h-[400vh] bg-[#FFF1EB]"
    >
      <div className={`sticky top-0 h-screen ${isMobile ? 'flex items-start justify-center pt-28' : 'flex items-center justify-center'} overflow-hidden`}>
        <div className={`${isMobile ? 'w-full max-w-sm px-4' : 'w-full max-w-4xl px-4 pt-16'} relative z-20`}>
            <div className="w-full text-center mb-2">
              <h2 className={`font-anton ${isMobile ? 'text-5xl' : 'text-9xl'} text-[#4D2D9A] tracking-tighter`}>
                LETS CONNECT!
              </h2>
              <motion.div
                className="text-sm uppercase tracking-widest text-slate-500"
                style={{
                  opacity: scrollDownOpacity
                }}
              >
                Scroll <span className="text-xl block mt-1">↓</span>
              </motion.div>
            </div>

            <div className={`grid grid-cols-2 ${isMobile ? 'gap-4 gap-y-2 pr-4 max-w-xs' : 'gap-8 gap-y-3 px-4 max-w-4xl'}`}>
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
                {isMobile ? (
                  <a
                    href="https://github.com/dotbillu"
                    className="w-full h-16 bg-gray-50 rounded-2xl border border-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <SiGithub size={28} className="text-gray-800" />
                  </a>
                ) : (
                  <ConnectCard
                    title="GitHub"
                    id="@dotbillu"
                    link="https://github.com/dotbillu"
                    className="w-full h-20 bg-gray-50 rounded-2xl border border-white"
                    textColor="text-gray-900"
                    subTextColor="text-gray-600"
                    icon={<SiGithub size={32} />}
                    iconColor="text-gray-800"
                    motionStyle={{}}
                    benchmark={["400+", "Contributions"]}
                  />
                )}
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
                {isMobile ? (
                  <a
                    href="https://www.linkedin.com/in/abhay-jha-1874a5223/"
                    className="w-full h-16 bg-blue-50 rounded-2xl border border-white shadow-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                  >
                    <SiLinkedin size={28} className="text-blue-600" />
                  </a>
                ) : (
                  <ConnectCard
                    title="LinkedIn"
                    id="Abhay Jha"
                    link="https://www.linkedin.com/in/abhay-jha-1874a5223/"
                    className="w-full h-20 bg-blue-50 rounded-2xl border border-white"
                    textColor="text-gray-900"
                    subTextColor="text-gray-600"
                    icon={<SiLinkedin size={32} />}
                    iconColor="text-blue-600"
                    motionStyle={{}}
                  />
                )}
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
                {isMobile ? (
                  <a
                    href="https://leetcode.com/notbillu"
                    className="w-full h-16 bg-orange-50 rounded-2xl border border-white shadow-lg flex items-center justify-center hover:bg-orange-100 transition-colors"
                  >
                    <SiLeetcode size={28} className="text-[#F89F1B]" />
                  </a>
                ) : (
                  <ConnectCard
                    title="LeetCode"
                    id="@notbillu"
                    link="https://leetcode.com/notbillu"
                    className="w-full h-20 bg-orange-50 rounded-2xl border border-white"
                    textColor="text-gray-900"
                    subTextColor="text-gray-600"
                    icon={<SiLeetcode size={32} />}
                    iconColor="text-[#F89F1B]"
                    motionStyle={{}}
                    benchmark={["250+", "Questions"]}
                  />
                )}
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
                {isMobile ? (
                  <a
                    href="https://codeforces.com/profile/notbillu"
                    className="w-full h-16 bg-red-50 rounded-2xl border border-white shadow-lg flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <SiCodeforces size={28} className="text-red-600" />
                  </a>
                ) : (
                  <ConnectCard
                    title="Codeforces"
                    id="@notbillu"
                    link="https://codeforces.com/profile/notbillu"
                    className="w-full h-20 bg-red-50 rounded-2xl border border-white"
                    textColor="text-gray-900"
                    subTextColor="text-gray-600"
                    icon={<SiCodeforces size={32} />}
                    iconColor="text-red-600"
                    motionStyle={{}}
                    benchmark={["Expert", "1600+"]}
                  />
                )}
              </motion.div>

              <motion.div
                style={{
                  scale: hashnodeScale,
                  opacity: hashnodeOpacity,
                  y: hashnodeY
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                {isMobile ? (
                  <a
                    href="https://notbillu.hashnode.dev/"
                    className="w-full h-16 bg-purple-50 rounded-2xl border border-white shadow-lg flex items-center justify-center hover:bg-purple-100 transition-colors"
                  >
                    <SiHashnode size={28} className="text-purple-600" />
                  </a>
                ) : (
                  <ConnectCard
                    title="Hashnode"
                    id="@notbillu"
                    link="https://notbillu.hashnode.dev/"
                    className="w-full h-20 bg-purple-50 rounded-2xl border border-white"
                    textColor="text-gray-900"
                    subTextColor="text-gray-600"
                    icon={<SiHashnode size={32} />}
                    iconColor="text-purple-600"
                    motionStyle={{}}
                    benchmark={["Tech", "Blog"]}
                  />
                )}
              </motion.div>

              <motion.div
                style={{
                  scale: twitterScale,
                  opacity: twitterOpacity,
                  y: twitterY
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                {isMobile ? (
                  <a
                    href="https://twitter.com/notbillu"
                    className="w-full h-16 bg-sky-50 rounded-2xl border border-white shadow-lg flex items-center justify-center hover:bg-sky-100 transition-colors"
                  >
                    <FaTwitter size={28} className="text-sky-500" />
                  </a>
                ) : (
                  <ConnectCard
                    title="Twitter"
                    id="@notbillu"
                    link="https://twitter.com/notbillu"
                    className="w-full h-20 bg-sky-50 rounded-2xl"
                    textColor="text-gray-900"
                    subTextColor="text-gray-600"
                    icon={<FaTwitter size={32} />}
                    iconColor="text-sky-500"
                    motionStyle={{}}
                    benchmark={["Tech", "Tweets"]}
                  />
                )}
              </motion.div>

              <motion.div
                style={{
                  scale: chessScale,
                  opacity: chessOpacity,
                  y: chessY
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                {isMobile ? (
                  <a
                    href="https://chess.com/member/sinnofwrath"
                    className="w-full h-16 bg-green-50 rounded-2xl border border-white shadow-lg flex items-center justify-center hover:bg-green-100 transition-colors"
                  >
                    <FaChess size={28} className="text-green-600" />
                  </a>
                ) : (
                  <ConnectCard
                    title="Chess.com"
                    id="@sinnofwrath"
                    link="https://chess.com/member/sinnofwrath"
                    className="w-full h-20 bg-green-50 rounded-2xl"
                    textColor="text-gray-900"
                    subTextColor="text-gray-600"
                    icon={<FaChess size={32} />}
                    iconColor="text-green-600"
                    motionStyle={{}}
                    benchmark={["Chess", "Player"]}
                  />
                )}
              </motion.div>

              <motion.div
                style={{
                  scale: discordScale,
                  opacity: discordOpacity,
                  y: discordY
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                {isMobile ? (
                  <a
                    href="#"
                    className="w-full h-16 bg-indigo-50 rounded-2xl border border-white shadow-lg flex items-center justify-center hover:bg-indigo-100 transition-colors"
                  >
                    <SiDiscord size={28} className="text-indigo-600" />
                  </a>
                ) : (
                  <ConnectCard
                    title="Discord"
                    id="@aubama420"
                    link="#"
                    className="w-full h-20 bg-indigo-50 rounded-2xl"
                    textColor="text-gray-900"
                    subTextColor="text-gray-600"
                    icon={<SiDiscord size={32} />}
                    iconColor="text-indigo-600"
                    motionStyle={{}}
                    benchmark={["Community", "Chat"]}
                  />
                )}
              </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
