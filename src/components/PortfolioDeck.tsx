"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { StackingCard } from "./StackingCard";

export interface CardData {
  id: string;
  title: string;
  titleColor?: string;
  logo?: string;
  text: string | string[];
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
      "Slyme is a hyperlocal social ecosystem designed to gamify community action and environmental impact. It leverages geolocation to connect users through a shared feed and interactive live map 'Rooms' for real-world collaboration.",
      "Implements a real-time geospatial engine allowing users to visualize local activity, join dynamic rooms, and coordinate community events on an interactive map.",
      "Features a 'Gig' marketplace and social feed, enabling users to monetize local tasks and coordinate environmental drives with 10+ active beta users.",
      "Frontend: Built with Next.js and Tailwind for performance, utilizing Jotai for atomic state management and Framer Motion for fluid UX.",
      "Backend: Scalable Node.js & Express architecture using Prisma (PostgreSQL) and WebSockets for low-latency live updates.",
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
      "Scrib-Draw is a real-time collaborative whiteboard designed for system design diagrams and rapid brainstorming. It offers a shared infinite canvas where teams can visualize architectures together.",
      "Equipped with vector tools (shapes, arrows, freehand) specifically tuned for creating clean system architecture diagrams and flowcharts.",
      "Features real-time synchronization via WebSockets, allowing multiple users to draw, edit, and brainstorm on the same canvas instantly.",
      "Implements complex canvas interactions including object resizing, layer management, and undo/redo history using Konva.js.",
      "Frontend: Next.js, React, Tailwind CSS, Konva.js (Canvas API)",
      "Backend: Node.js, Express, Socket.io for bidirectional communication",
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
      "Caelivisio is a real-time astronomical dashboard designed to monitor Near-Earth Objects (NEOs). It bridges the gap between raw scientific telemetry and public accessibility by visualizing celestial data.",
      "Integrates directly with NASA's NeoWs (Near Earth Object Web Service) API to fetch, filter, and normalize daily data streams regarding asteroid velocity, diameter, and miss distance.",
      "Features a dynamic classification system that automatically flags and highlights 'Potentially Hazardous Asteroids' (PHAs) based on NASA's collision probability algorithms.",
      "Frontend: Next.js and React for a responsive interface, utilizing Tailwind CSS for a modern, dark-mode 'space' aesthetic.",
      "Data Handling: Efficient data fetching patterns with Next.js API routes to handle external rate limits and caching.",
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
      "KeyBlast is a high-performance CLI typing trainer built entirely in Bash/Zsh. It transforms the terminal into a minimal, distraction-free typing simulator designed for developers to warm up their fingers and improve coding speed.",
      "Supports multiple training modes, including standard English vocabulary and syntax-specific drills for JavaScript and C++ to practice real-world coding patterns.",
      "Features a reactive terminal UI with real-time WPM calculation, live accuracy tracking, and dynamic highlighting using raw ANSI escape codes.",
      "Engineered with standard Unix utilities (`bc`, `tput`, `figlet`) for a zero-dependency*, bloat-free experience that runs instantly on any Linux environment.",
      "Tech Stack: Pure Bash/Zsh Scripting, Unix Pipes, and Nerd Fonts.",
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

  const cardsAppearRange = [0.25, 0.45];
  const cardStackRange = [0.45, 0.9];
  const cardsExitRange = [0.9, 1];
  const textScale = useTransform(smoothProgress, headerRange, [1, 0]);
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
        style={{ height: `${totalCards * 100}vh` }}
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
              style={{ scale: textScale }}
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
