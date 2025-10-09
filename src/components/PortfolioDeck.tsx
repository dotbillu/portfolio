"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { StackingCard } from "./StackingCard";

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