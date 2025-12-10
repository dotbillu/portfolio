"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { StackingCard } from "./StackingCard";

export interface CardData {
  id: string;
  title: string;
  titleColor?: string;
  logo?: string;
  text: string | string[];
  textMobile?: string | string[];
  imgs: string[];
  links?: Array<{ href: string; label: string }>;
}

const cardsData: CardData[] = [
  {
    id: "card-1",
    title: "lyme",
    logo: "/slymelogo.png",
    titleColor: "#F2898D",
    text: [
      "Hyperlocal social platform gamifying community action and environmental impact through geolocation-based 'Rooms' and shared feeds.",
      "Real-time geospatial engine for visualizing local activity, joining dynamic rooms, and coordinating community events.",
      "'Gig' marketplace and social feed for monetizing local tasks and coordinating environmental drives with 10+ beta users.",
      "Frontend: Next.js, Tailwind, Jotai for state management, Framer Motion for smooth UX.",
      "Backend: Node.js, Express, Prisma with PostgreSQL, WebSockets for real-time updates.",
    ],
    textMobile: [
      "Hyperlocal social platform with gamified community action via geolocation 'Rooms'.",
      "Real-time geospatial engine for local activity and room coordination.",
      "'Gig' marketplace for local tasks with 10+ beta users.",
      "Frontend: Next.js, Tailwind, Jotai, Framer Motion.",
      "Backend: Node.js, Express, Prisma, PostgreSQL, WebSockets.",
    ],
    imgs: [
      "/slyme.png",
      "/slyme0.png",
      "/slyme1.png",
      "/slyme2.png",
      "/slyme3.png",
      "/slyme4.png",
      "/slyme5.png",
      "/slyme6.png",
    ],
    links: [
      { href: "https://slyme-eosin.vercel.app/", label: "Live Demo" },
      { href: "https://github.com/dotbillu/slyme", label: "GitHub" },
    ],
  },
  {
    id: "card-2",
    title: "Scrib-Draw",
    text: [
      "Real-time collaborative whiteboard for system design diagrams and rapid brainstorming with shared infinite canvas.",
      "Vector tools (shapes, arrows, freehand) optimized for clean architecture diagrams and flowcharts.",
      "WebSocket-powered real-time synchronization for instant collaborative drawing and brainstorming.",
      "Complex canvas interactions with object resizing, layer management, and undo/redo using Konva.js.",
      "Frontend: Next.js, React, Tailwind, Konva.js for canvas manipulation.",
      "Backend: Node.js, Express, Socket.io for real-time communication.",
    ],
    textMobile: [
      "Real-time collaborative whiteboard for system design and brainstorming.",
      "Vector tools for clean architecture diagrams and flowcharts.",
      "WebSocket-powered real-time synchronization.",
      "Advanced canvas interactions with Konva.js.",
      "Frontend: Next.js, React, Tailwind, Konva.js.",
      "Backend: Node.js, Express, Socket.io.",
    ],
    imgs: ["/scribdrw1.png", "/scribdrw2.png"],
    links: [
      { href: "https://scrib-draw-web.vercel.app/", label: "Live Demo" },
      { href: "https://github.com/dotbillu/Scrib-draw", label: "GitHub" },
    ],
  },
  {
    id: "card-3",
    title: "Caelivisio",
    text: [
      "Real-time astronomical dashboard monitoring Near-Earth Objects (NEOs) with accessible celestial data visualization.",
      "Direct NASA NeoWs API integration for fetching, filtering, and normalizing asteroid velocity, diameter, and miss distance data.",
      "Dynamic classification system flagging 'Potentially Hazardous Asteroids' using NASA's collision probability algorithms.",
      "Frontend: Next.js, React, Tailwind with dark-mode space aesthetic.",
      "Data handling: Efficient Next.js API routes with rate limiting and caching.",
    ],
    textMobile: [
      "Real-time astronomical dashboard for NEO monitoring.",
      "NASA NeoWs API integration for asteroid data.",
      "Hazardous asteroid classification system.",
      "Frontend: Next.js, React, Tailwind with space theme.",
      "Efficient API routes with rate limiting and caching.",
    ],
    imgs: ["/caelivisio.png"],
    links: [
      { href: "https://webcaelivisio.vercel.app/", label: "Live Demo" },
      { href: "https://github.com/dotbillu/webcaelivisio", label: "GitHub" },
    ],
  },
  {
    id: "card-4",
    title: "KeyBlast",
    text: [
      "High-performance CLI typing trainer in Bash/Zsh for developers to improve coding speed with distraction-free terminal interface.",
      "Multiple training modes including standard vocabulary and language-specific drills for JavaScript and C++.",
      "Reactive terminal UI with real-time WPM calculation, accuracy tracking, and ANSI escape code highlighting.",
      "Zero-dependency design using Unix utilities (`bc`, `tput`, `figlet`) for instant Linux compatibility.",
      "Tech: Pure Bash/Zsh scripting with Unix pipes and Nerd Fonts.",
    ],
    textMobile: [
      "High-performance CLI typing trainer in Bash/Zsh.",
      "Multiple training modes for vocabulary and coding languages.",
      "Reactive terminal UI with real-time WPM tracking.",
      "Zero-dependency design using Unix utilities.",
      "Tech: Pure Bash/Zsh scripting with Unix tools.",
    ],
    imgs: [
      "/keyblast1.png",
      "/keyblast2.png",
      "/keyblast3.png",
      "/keyblast4.png",
    ],
    links: [{ href: "https://github.com/dotbillu/KeyBlast", label: "GitHub" }],
  },
];

export function PortfolioDeck() {
  const containerRef = useRef(null);
  const totalCards = cardsData.length;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.3,
    restDelta: 0.001,
  });
  const headerRange = [0, 0.2];

  const cardsAppearRange = [0.25, 0.45];
  const cardStackRange = [0.45, 0.9];
  const cardsExitRange = [0.9, 1];
  const textScale = useTransform(smoothProgress, headerRange, [1, 0.8]);
  const textOpacity = useTransform(smoothProgress, headerRange, [1, 0]);
  const headerPointerEvents = useTransform(smoothProgress, (val) =>
    val > 0.2 ? "none" : "auto",
  );
  const cardsY = useTransform(
    smoothProgress,
    [0.25, 0.45, 0.9, 1],
    ["100%", "0%", "0%", "-100%"],
  );
  const cardsOpacity = useTransform(smoothProgress, [0.24, 0.25], [0, 1]);
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
        style={{ height: `${totalCards * (isMobile ? 60 : 100)}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{
              y: cardsY,
              opacity: cardsOpacity,
            }}
            className="absolute inset-0 z-20"
          >
            {cardsData.map((card, idx) => (
              <StackingCard
                key={card.id}
                card={card}
                index={idx}
                totalCards={totalCards}
                scrollYProgress={cardStackProgress}
                isMobile={isMobile}
              />
            ))}
          </motion.div>

          <motion.header
            style={{
              pointerEvents: headerPointerEvents as any,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#FFF1EB] z-10 px-4"
          >
            <motion.div
              style={{ scale: textScale, opacity: textOpacity }}
              className="w-full max-w-4xl"
            >
              <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight text-[#131212]">
                Featured Projects
              </h1>
              <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-slate-700">
                A curated selection of my work. Scroll down to see the details
                of each project.
              </p>
              <div className="mt-12 text-sm uppercase tracking-widest text-slate-500">
                Scroll <span className="text-2xl block mt-2">↓</span>
              </div>
            </motion.div>
          </motion.header>
        </div>
      </main>
    </div>
  );
}
