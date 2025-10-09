"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Your Navbar Component ---
// This is now wrapped in a motion.div to be animated
function Navbar() {
  return (
    <div className="w-[95%] mx-auto h-14 bg-white rounded-2xl shadow-md flex items-center justify-between px-8">
      <div className="font-bold text-xl text-gray-800">MyPortfolio</div>
      <div className="hidden md:flex space-x-6 text-gray-700">
          <a href="#projects" className="hover:text-purple-700">Projects</a>
          <a href="#about" className="hover:text-purple-700">About</a>
          <a href="#contact" className="hover:text-purple-700">Contact</a>
      </div>
    </div>
  );
}

// --- Main Hero Section Component ---
export default function HeroSection() {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    // Animation for the clockwise wipe
    const wipeAngle = useTransform(scrollYProgress, [0.1, 0.7], ['360deg', '0deg']);
    
    // **NEW**: Animation for the navbar slide-up
    // It starts sliding when the wipe is mostly done (at 70% progress) and is fully hidden by 90%.
    const navbarY = useTransform(scrollYProgress, [0.7, 0.9], ['0%', '-150%']);

    return (
        <section ref={targetRef} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen">
                {/* **NEW**: The Navbar is wrapped in a motion.div to apply the slide-up animation */}
                <motion.div style={{ y: navbarY }} className="fixed top-6 left-0 right-0 z-50">
                    <Navbar />
                </motion.div>

                {/* This background is revealed by the wipe. It should match the Projects section's bg color. */}
                <div className="absolute inset-0 bg-[#DDA26E]">
                    <div className="h-screen flex items-center justify-center">
                         {/* This text appears as the wipe happens, leading into the next section */}
                        <h2 className="text-white text-5xl font-bold">
                            Featured Projects
                        </h2>
                    </div>
                </div>

                {/* The Purple Hero Section with the CLOCKWISE WIPE animation */}
                <motion.div
                    className="absolute inset-0 bg-purple-700"
                    style={{
                        '--wipe-angle': wipeAngle,
                        maskImage: 'conic-gradient(from -90deg at 50% 50%, black var(--wipe-angle), transparent var(--wipe-angle))',
                        WebkitMaskImage: 'conic-gradient(from -90deg at 50% 50%, black var(--wipe-angle), transparent var(--wipe-angle))',
                    }}
                >
                    <div className="h-screen flex flex-col items-center justify-center text-white p-8">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
                                Creative Developer & Designer
                            </h1>
                            <p className="text-xl md:text-2xl font-light max-w-3xl leading-relaxed text-purple-200">
                                I build beautiful, interactive, and performant web experiences that leave a lasting impression.
                            </p>
                            <button className="mt-12 px-8 py-4 bg-white text-purple-700 font-bold rounded-full text-lg hover:bg-purple-100 transition-colors duration-300">
                                View My Work
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

