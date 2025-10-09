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

// --- Components ---

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
            MyPortfolio
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

export function HeroSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={targetRef} className="relative h-[150vh] bg-[#FAF4F0]">
      <div className="sticky top-0 h-screen">
        <div className="h-full flex flex-col items-center justify-center p-8">
          <motion.div
            className="flex flex-col items-center text-center"
            style={{ scale, opacity }}
          >
            <h1
              className="font-anton text-[10vw] md:text-8xl lg:text-9xl tracking-tighter leading-none text-[#4D2D9A]"
              style={{ lineHeight: "0.85" }}
            >
              YOUR NAME
              <br />
              HERE
            </h1>
            <p className="mt-6 text-xl text-gray-700 max-w-2xl">
              Welcome to my digital space. I build things for the web.
            </p>
          </motion.div>
        </div>
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
    img: "/caelivisio.png", // Updated image path
    links: [
      // Added links for Caelivisio
      { href: "https://webcaelivisio.vercel.app/", label: "Live Demo" },
      { href: "https://github.com/your-caelivisio-repo", label: "GitHub" }, // **Please update this GitHub link if it's different from the deployed link**
    ],
  },
   {
    id: "card-3",
    title: "Kyoka",
    text: "A live chess analysis tool designed to track and analyze games in real-time. This project is currently in development; follow the progress on GitHub.",
    img: "/Kyoka.png",
    links: [
        { href: "https://github.com/dotbillu/KYOKA", label: "GitHub" }
    ]
  },
  {
    id: "card-4",
    title: "TrendWise",
    text: "A smart content performance analyzer to track and visualize online article trends. Features AI-backed insights, keyword extraction, and visual dashboards.",
    img: "/trendwise.png",
    links: [
        { href: "https://trend-wise-five.vercel.app/", label: "Live Demo" },
        { href: "https://github.com/dotbillu/TrendWise", label: "GitHub" }
    ]
  },];

const Card3D = ({ imageUrl }) => {
  const meshRef = useRef();
  const texture = useTexture(imageUrl);
  const aspect = texture ? texture.image.width / texture.image.height : 16 / 9;

  // Increased width to make the image bigger
  const width = 6.0; // Original was 4.5, adjusted for a slightly larger appearance
  const height = width / aspect;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      {/* Adjusted roughness and metalness for a brighter, clearer appearance */}
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
              {/* Increased ambient and directional light intensity for brightness */}
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

const ConnectCard = ({ title, id, link, className, motionStyle }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`absolute p-8 rounded-3xl text-gray-800 shadow-lg flex flex-col justify-end ${className}`}
      style={motionStyle}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-lg text-gray-600">{id}</p>
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
            id="your-username"
            link="https://github.com/your-username"
            className="top-[58px] right-[55%] w-80 h-48 bg-[#D1E8E2]"
            motionStyle={{
              x: xLeft,
              y: yTop,
              opacity: cardOpacity,
              scale: cardScale,
            }}
          />
          <ConnectCard
            title="LinkedIn"
            id="Your Name"
            link="https://linkedin.com/in/your-profile"
            className="top-[26px] left-[55%] w-80 h-56 bg-[#A0C4FF]"
            motionStyle={{
              x: xRight,
              y: yTop,
              opacity: cardOpacity,
              scale: cardScale,
            }}
          />
          <ConnectCard
            title="LeetCode"
            id="your-username"
            link="https://leetcode.com/your-username"
            className="bottom-[26px] right-[55%] w-80 h-56 bg-[#FFD166]"
            motionStyle={{
              x: xLeft,
              y: yBottom,
              opacity: cardOpacity,
              scale: cardScale,
            }}
          />
          <ConnectCard
            title="Codeforces"
            id="your-username"
            link="https://codeforces.com/profile/your-username"
            className="bottom-[58px] left-[55%] w-80 h-48 bg-[#F7C5A8]"
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

// --- Final Export: Home ---
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
      {/* Custom stylized scrollbar -- shorter, opaque, and solid colors */}
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

      <HeroSection />

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
