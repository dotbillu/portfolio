"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface SkillsContentProps {
  scrollYProgress: MotionValue<number>;
}

const SkillItem = ({ skill, index }: { skill: string; index: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }} 
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="text-3xl md:text-4xl font-medium text-gray-900"
    >
      {skill}
    </motion.li>
  );
};

const skills = {
  Languages: ["TypeScript", "JavaScript", "C++", "Rust", "Lua"],
  Frontend: ["React", "Next.js", "React Three Fiber", "Tailwind CSS", "Jotai"],
  "Backend & DB": ["Node.js", "Express.js", "MongoDB", "PostgreSQL"],
  Web3: ["Solana"],
  "My Tools": ["Arch Linux", "Git & GitHub", "Neovim", "Docker"],
};

export const SkillsContent = ({ scrollYProgress }: SkillsContentProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const skillsContainerOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const yDesktop = useTransform(scrollYProgress, [0.15, 0.25], ["50px", "0px"]);
  const yMobile = useTransform(scrollYProgress, 
    [0.15, 0.25, 0.8],
    ["50px", "0px", "-800px"] 
  );

  const skillsContainerY = isMobile ? yMobile : yDesktop;

  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.15 ? "auto" : "none");

  return (
    <motion.div
      className="max-w-5xl w-full p-8 pt-32 pb-48 md:pt-24 md:pb-24 mt-20 md:mt-0"
      style={{ 
        opacity: skillsContainerOpacity, 
        y: skillsContainerY,
        pointerEvents 
      }}
    >
      <div className="flex flex-col md:flex-row md:flex-wrap gap-y-12 md:gap-x-12 md:gap-y-10">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="w-full md:w-auto md:min-w-[200px] text-left">
            <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b md:border-none pb-2 md:pb-0 border-gray-200">
              {category}
            </h3>
            <ul className="space-y-3">
              {items.map((skill, index) => (
                <SkillItem
                  key={skill}
                  skill={skill}
                  index={index}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
