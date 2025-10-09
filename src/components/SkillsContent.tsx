"use client";
import React, { useMemo } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface SkillsContentProps {
  scrollYProgress: MotionValue<number>;
}

interface SkillItemProps {
  skill: string;
  scrollYProgress: MotionValue<number>;
  skillIndex: number;
  totalSkills: number;
}

const SkillItem = ({ skill, scrollYProgress, skillIndex, totalSkills }: SkillItemProps) => {
  const start = 0.3 + (skillIndex / totalSkills) * 0.6;
  const end = start + 0.1;
  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [0.1, 1],
  );
  const y = useTransform(
    scrollYProgress,
    [start, end],
    ["10px", "0px"],
  );

  return (
    <motion.li
      className="text-3xl md:text-4xl font-medium text-gray-900"
      style={{ opacity, y }}
    >
      {skill}
    </motion.li>
  );
};

const skills = {
  Languages: ["TypeScript", "JavaScript", "C++", "Rust", "Lua"],
  Frontend: ["React", "Next.js", "React Three Fiber", "Tailwind CSS"],
  "Backend & DB": ["Node.js", "Express.js", "MongoDB"],
  Web3: ["Solana"],
  Tools: ["Arch Linux", "Git & GitHub", "Neovim", "Docker"],
};

export const SkillsContent = ({ scrollYProgress }: SkillsContentProps) => {
  const allSkills = useMemo(() => Object.values(skills).flat(), []);
  const totalSkills = allSkills.length;

  const skillsContainerOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.3],
    [0, 1],
  );
  const skillsContainerY = useTransform(
    scrollYProgress,
    [0.2, 0.3],
    ["50px", "0px"],
  );

  return (
    <motion.div
      className="max-w-5xl w-full p-8 pt-24 pb-24"
      style={{ opacity: skillsContainerOpacity, y: skillsContainerY }}
    >
      <div className="flex flex-wrap gap-x-12 gap-y-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="min-w-[200px] text-left">
            <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {category}
            </h3>
            <ul className="space-y-3">
              {items.map((skill) => {
                const skillIndex = allSkills.indexOf(skill);
                return (
                  <SkillItem
                    key={skill}
                    skill={skill}
                    scrollYProgress={scrollYProgress}
                    skillIndex={skillIndex}
                    totalSkills={totalSkills}
                  />
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};