"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

// --- DATA (Unchanged) ---
const cardsData = [
  { id: "card-1", title: "Project One", text: "A detailed description of the first project, highlighting the technologies used and the problems solved.", img: "https://assets.codepen.io/210284/flower-9.jpg" },
  { id: "card-2", title: "Project Two", text: "An overview of the second project, focusing on the core features and the development process.", img: "https://assets.codepen.io/210284/flower-8.jpg" },
  { id: "card-3", title: "Project Three", text: "Insights into the third project, discussing the challenges faced and the solutions implemented.", img: "https://assets.codepen.io/210284/flower-7.jpg" },
  { id: "card-4", title: "Project Four", text: "A summary of the fourth project, detailing its purpose and the final outcome.", img: "https://assets.codepen.io/210284/flower-6.jpg" },
];

// --- R3F Component (Unchanged) ---
const Card3D = ({ imageUrl }) => {
  const meshRef = useRef();
  const texture = useTexture(imageUrl);
  const aspect = texture.image.width / texture.image.height;
  const width = 4.5;
  const height = width / aspect;
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
    </mesh>
  );
};

// --- Single Card Component (Unchanged from last version) ---
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
            style={{
                zIndex,
                y,
                scale,
            }}
        >
            <div className="w-full max-w-lg md:max-w-3xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-900/10 ring-1 ring-gray-900/5 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
                    <div className="flex flex-col justify-center items-start text-left">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{card.title}</h2>
                        <p className="text-lg text-slate-700 font-light leading-relaxed">{card.text}</p>
                    </div>
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center">
                        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                            <color attach="background" args={['#FFF1EB']} />
                            <ambientLight intensity={1} />
                            <directionalLight position={[0, 2, 5]} intensity={1.5} />
                            <Card3D imageUrl={card.img} />
                        </Canvas>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Main Component (MODIFIED) ---
export default function PortfolioDeck() {
    const containerRef = useRef(null);
    const totalCards = cardsData.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
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
    const headerBorderRadius = useTransform(smoothProgress, headerRange, ["0px", "48px"]);

    // **MODIFICATION**: Replaced the scale/opacity pop-up with a y-transform slide-up.
    const cardsY = useTransform(smoothProgress, cardsAppearRange, ['100vh', '0vh']);

    const cardStackProgress = useTransform(smoothProgress, cardStackRange, [0, 1]);

    return (
        <div className="font-sans antialiased bg-[#DDA26E]">
            <main ref={containerRef} className="relative" style={{ height: `${totalCards * 200}vh` }}>
                <div className="sticky top-0 h-screen overflow-hidden">
                    {/* The motion.div for the card deck now slides up instead of scaling */}
                    <motion.div
                         style={{ y: cardsY }}
                         className="absolute inset-0 z-0"
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
                            scale: headerScale,
                            borderRadius: headerBorderRadius,
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#FFF1EB] z-10"
                    >
                        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight text-[#131212]">
                            Featured Projects
                        </h1>
                        <p className="text-xl md:text-2xl font-light max-w-3xl leading-relaxed text-slate-700">
                            A curated selection of my work. Scroll down to see the details of each project.
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
