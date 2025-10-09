"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SiGithub, SiLinkedin, SiLeetcode, SiCodeforces } from "react-icons/si";

function Navbar({ variant }) {
  const links = [
    { name: "Projects", href: "#projects" },
    { name: "Connect", href: "#connect" },
  ];

  const variants = {
    hero: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    island:
      "max-w-sm mx-auto bg-white/80 backdrop-blur-lg rounded-full shadow-lg",
  };

  const linkVariants = {
    hero: "text-sm font-medium text-gray-600 hover:text-black",
    island:
      "text-sm font-medium text-gray-700 hover:text-black px-4 py-2 rounded-full hover:bg-gray-100",
  };

  return (
    <motion.div
      key={variant}
      initial={{ y: "-150%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "-150%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed top-4 left-0 right-0 z-50`}
    >
      <div className={variants[variant]}>
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-bold text-xl text-gray-800">
            HOME
          </a>
          <div className="flex items-center space-x-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={linkVariants[variant]}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const HeroContent = ({ scrollYProgress }) => {
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
        Hi! I'm Abhay. A software engineer exploring the delicate art of shaping
        ideas into experiences that resonate.
      </p>
     
    </motion.div>
  );
};

const SkillsContent = ({ scrollYProgress }) => {
  const skills = {
    Languages: ["TypeScript", "JavaScript", "C++", "Rust", "Lua"],
    Frontend: ["React", "Next.js", "React Three Fiber", "Tailwind CSS"],
    "Backend & DB": ["Node.js", "Express.js", "MongoDB"],
    Web3: ["Solana"],
    Tools: ["Arch Linux", "Git & GitHub", "Neovim", "Docker"],
  };
  const allSkills = Object.values(skills).flat();

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
                const totalSkills = allSkills.length;
                const skillIndex = allSkills.indexOf(skill);
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
                    key={skill}
                    className="text-3xl md:text-4xl font-medium text-gray-900"
                    style={{ opacity, y }}
                  >
                    {skill}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export function HeroAndSkillsContainer() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      id="skills"
      ref={targetRef}
      className="relative h-[800vh] bg-[#FFF1EB]"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <HeroContent scrollYProgress={scrollYProgress} />
        <SkillsContent scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}

const cardsData = [
  {
    id: "card-1",
    title: "Scrib-Draw",
    text: "A collaborative drawing app built with React, Konva.js, and Next.js. Features an intuitive canvas, real-time updates via WebSockets, and a clean UI styled with Tailwind CSS.",
    img: "/Scribdraw.png",
    links: [
      { href: "https://scrib-draw-web.vercel.app/", label: "Live Demo" },
      { href: "https://github.com/dotbillu/Scrib-draw", label: "GitHub" },
    ],
  },
  {
    id: "card-2",
    title: "Caelivisio",
    text: "A real-time space application that tracks asteroids and meteors using NASA APIs. Provides up-to-date data and visualizations for celestial objects.",
    img: "/caelivisio.png",
    links: [
      { href: "https://webcaelivisio.vercel.app/", label: "Live Demo" },
      { href: "https://github.com/dotbillu/webcaelivisio", label: "GitHub" },
    ],
  },
  {
    id: "card-3",
    title: "Kyoka",
    text: "A live chess analysis tool designed to track and analyze games in real-time. This project is currently in development; follow the progress on GitHub.",
    img: "/Kyoka.png",
    links: [{ href: "https://github.com/dotbillu/KYOKA", label: "GitHub" }],
  },
  {
    id: "card-4",
    title: "TrendWise",
    text: "A smart content performance analyzer to track and visualize online article trends. Features AI-backed insights, keyword extraction, and visual dashboards.",
    img: "/trendwise.png",
    links: [
      { href: "https://trend-wise-five.vercel.app/", label: "Live Demo" },
      { href: "https://github.com/dotbillu/TrendWise", label: "GitHub" },
    ],
  },
];

const Card3D = ({ imageUrl }) => {
  const meshRef = useRef();
  const texture = useTexture(imageUrl);
  const aspect = texture ? texture.image.width / texture.image.height : 16 / 9;
  const width = 6.0;
  const height = width / aspect;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} roughness={0.0} metalness={0.0} />
    </mesh>
  );
};

const StackingCard = ({ card, index, totalCards, scrollYProgress }) => {
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

function PortfolioDeck() {
  const containerRef = useRef(null);
  const totalCards = cardsData.length;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 35,
    mass: 0.5,
  });
  const headerRange = [0, 0.2];
  const cardsAppearRange = [0.2, 0.4];
  const cardStackRange = [0.4, 1];
  const headerScale = useTransform(smoothProgress, headerRange, [1, 0]);
  const headerBorderRadius = useTransform(smoothProgress, headerRange, [
    "0px",
    "48px",
  ]);
  const cardsY = useTransform(smoothProgress, cardsAppearRange, [
    "100vh",
    "0vh",
  ]);
  const cardStackProgress = useTransform(
    smoothProgress,
    cardStackRange,
    [0, 1],
  );

  return (
    <div id="projects" className="font-sans antialiased">
      <main
        ref={containerRef}
        className="relative"
        style={{ height: `${totalCards * 200}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ y: cardsY }} className="absolute inset-0 z-0">
            {cardsData.map((card, idx) => (
              <StackingCard
                key={card.id}
                card={card}
                index={idx}
                totalCards={totalCards}
                scrollYProgress={cardStackProgress}
              />
            ))}
          </motion.div>
          <motion.header
            style={{ scale: headerScale, borderRadius: headerBorderRadius }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#FFF1EB] z-10"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight text-[#131212]">
              Featured Projects
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl leading-relaxed text-slate-700">
              A curated selection of my work. Scroll down to see the details of
              each project.
            </p>
            <div className="mt-12 text-sm uppercase tracking-widest text-slate-500">
              Scroll <span className="text-2xl block mt-2">↓</span>
            </div>
          </motion.header>
        </div>
      </main>
    </div>
  );
}

const ConnectCard = ({
  title,
  id,
  link,
  className,
  motionStyle,
  icon,
  textColor = "text-gray-800",
  subTextColor = "text-gray-600",
}) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`absolute p-8 rounded-3xl shadow-lg flex flex-col justify-end overflow-hidden ${className}`}
      style={motionStyle}
    >
      <div className="absolute -top-4 -right-4 text-white/10">{icon}</div>
      <h3 className={`text-2xl font-bold ${textColor}`}>{title}</h3>
      <p className={`mt-1 text-lg ${subTextColor}`}>{id}</p>
    </motion.a>
  );
};

function ConnectSection() {
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
      className="relative h-[180vh] bg-[#E5FFC3]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl h-[600px]">
          <motion.div
            className="w-full h-full flex items-center justify-center"
            style={{ opacity: textOpacity, scale: textScale }}
          >
            <h2 className="font-anton text-7xl md:text-9xl text-center text-[#4D2D9A] tracking-tighter">
              CONNECT
            </h2>
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

export default function Home() {
  const [navVariant, setNavVariant] = useState("hero");
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
